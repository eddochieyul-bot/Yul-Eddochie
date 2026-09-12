import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as fbSignOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  GoogleAuthProvider,
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { AdminRole, AdminUser } from '../firebase/types';

// Institutional Super Admins whitelist for zero-delay bypass & automatic authorization
export const AUTHORIZED_SUPER_ADMIN_EMAILS = [
  'aylaafrica.org@gmail.com',
  'aylafrica.org@gmail.com',
  'admin@aylaafrica.org',
  'eddochieyul@gmail.com',
];

interface AdminAuthContextType {
  user: User | null;
  adminProfile: AdminUser | null;
  role: string;
  loading: boolean;
  isAuthorized: boolean;
  isAuthorizedAdmin: boolean;
  isSuperAdmin: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  registerAuthorizedAdmin: (email: string, pass: string, displayName: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
  clearError: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [adminProfile, setAdminProfile] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Safety timeout: never let loading hang indefinitely
  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setError(null);

      if (!currentUser || !currentUser.email) {
        setUser(null);
        setAdminProfile(null);
        setIsAuthorized(false);
        setLoading(false);
        return;
      }

      const email = currentUser.email.toLowerCase();
      const isWhitelisted = AUTHORIZED_SUPER_ADMIN_EMAILS.includes(email);

      // FAST PATH: Authorized Super Admin accounts bypass Firestore network bottlenecks immediately
      if (isWhitelisted) {
        const superProfile: AdminUser = {
          uid: currentUser.uid,
          email,
          displayName: currentUser.displayName || email.split('@')[0],
          role: 'super_admin',
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
          active: true,
        };
        setUser(currentUser);
        setAdminProfile(superProfile);
        setIsAuthorized(true);
        setLoading(false);

        // Background non-blocking sync to Firestore
        (async () => {
          try {
            const adminDocRef = doc(db, 'admins', currentUser.uid);
            await Promise.race([
              setDoc(adminDocRef, superProfile, { merge: true }),
              new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 3000)),
            ]);
          } catch (e) {
            console.warn('Background admin profile sync deferred:', e);
          }
        })();
        return;
      }

      // Non-whitelisted emails: Check Firestore with timeout
      try {
        const adminDocRef = doc(db, 'admins', currentUser.uid);
        const adminSnap = (await Promise.race([
          getDoc(adminDocRef),
          new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 3500)),
        ])) as any;

        if (adminSnap && adminSnap.exists()) {
          const profile = adminSnap.data() as AdminUser;
          if (profile.active === false) {
            await fbSignOut(auth);
            setError('Your administrative account has been deactivated. Please contact the Secretariat.');
            setIsAuthorized(false);
            setLoading(false);
            return;
          }
          setUser(currentUser);
          setAdminProfile(profile);
          setIsAuthorized(true);
        } else {
          await fbSignOut(auth);
          setError(`Access denied. The account (${email}) is not registered in the AYLA Admin Roster.`);
          setUser(null);
          setAdminProfile(null);
          setIsAuthorized(false);
        }
      } catch (err: any) {
        console.error('Error verifying admin authorization:', err);
        setError('Authorization verification timed out. Please try again.');
        setIsAuthorized(false);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      console.error('Google Sign-In error:', err);
      if (err.code === 'auth/popup-blocked') {
        setError('Google sign-in popup was blocked by your browser. Please allow popups or open the application in a new tab.');
      } else if (err.code === 'auth/popup-closed-by-user') {
        setError('Google sign-in window was closed before completing authentication.');
      } else {
        setError(err.message || 'Google sign-in was interrupted.');
      }
      setLoading(false);
      throw err;
    }
  };

  const loginWithEmail = async (email: string, pass: string) => {
    setError(null);
    setLoading(true);
    const cleanEmail = email.trim().toLowerCase();
    try {
      await signInWithEmailAndPassword(auth, cleanEmail, pass);
    } catch (err: any) {
      console.error('Email sign in error:', err);
      if (err.code === 'auth/operation-not-allowed') {
        const msg =
          'Email/Password sign-in is not enabled in your Firebase Console. Please use "Sign in with Google" with your authorized admin account (e.g. eddochieyul@gmail.com or aylaafrica.org@gmail.com).';
        setError(msg);
        setLoading(false);
        throw new Error(msg);
      }

      if (
        (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') &&
        AUTHORIZED_SUPER_ADMIN_EMAILS.includes(cleanEmail)
      ) {
        try {
          await registerAuthorizedAdmin(cleanEmail, pass, 'AYLA Secretariat Lead');
          return;
        } catch (regErr: any) {
          if (regErr.code === 'auth/email-already-in-use') {
            setError('Incorrect administrative password. If you forgot your password, please use the Recover tab.');
            setLoading(false);
            throw err;
          }
        }
      }

      setError(
        err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password'
          ? 'Invalid credentials. Please verify your email and administrative password, or sign in with Google.'
          : err.message || 'Login failed.'
      );
      setLoading(false);
      throw err;
    }
  };

  const registerAuthorizedAdmin = async (email: string, pass: string, displayName: string) => {
    setError(null);
    setLoading(true);
    const cleanEmail = email.trim().toLowerCase();
    if (!AUTHORIZED_SUPER_ADMIN_EMAILS.includes(cleanEmail)) {
      setLoading(false);
      const msg = `Registration restricted: Only official AYLA emails (${AUTHORIZED_SUPER_ADMIN_EMAILS.join(', ')}) can provision new credentials.`;
      setError(msg);
      throw new Error(msg);
    }

    try {
      const userCred = await createUserWithEmailAndPassword(auth, cleanEmail, pass);
      const adminDocRef = doc(db, 'admins', userCred.user.uid);
      const profile: AdminUser = {
        uid: userCred.user.uid,
        email: cleanEmail,
        displayName: displayName || cleanEmail.split('@')[0],
        role: 'super_admin',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        active: true,
      };
      await setDoc(adminDocRef, profile);
      setUser(userCred.user);
      setAdminProfile(profile);
      setIsAuthorized(true);
    } catch (err: any) {
      console.error('Admin registration error:', err);
      if (err.code === 'auth/operation-not-allowed') {
        const msg =
          'Email/Password provider is disabled in Firebase Console. Please sign in with your authorized Google account (e.g. eddochieyul@gmail.com or aylaafrica.org@gmail.com) instead.';
        setError(msg);
        setLoading(false);
        throw new Error(msg);
      }
      setError(err.message || 'Admin account setup failed.');
      setLoading(false);
      throw err;
    }
  };

  const resetPassword = async (email: string) => {
    setError(null);
    try {
      await sendPasswordResetEmail(auth, email.trim());
    } catch (err: any) {
      if (err.code === 'auth/operation-not-allowed') {
        const msg =
          'Email/Password recovery is not enabled in Firebase Console. Please use "Sign in with Google" instead.';
        setError(msg);
        throw new Error(msg);
      }
      setError(err.message || 'Password reset failed.');
      throw err;
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await fbSignOut(auth);
      setUser(null);
      setAdminProfile(null);
      setIsAuthorized(false);
    } finally {
      setLoading(false);
    }
  };

  const isSuperAdmin =
    adminProfile?.role === 'super_admin' ||
    (user?.email ? AUTHORIZED_SUPER_ADMIN_EMAILS.includes(user.email.toLowerCase()) : false);

  const role = adminProfile?.role || (isSuperAdmin ? 'super_admin' : 'editor');

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        adminProfile,
        role,
        loading,
        isAuthorized,
        isAuthorizedAdmin: isAuthorized,
        isSuperAdmin,
        loginWithGoogle,
        loginWithEmail,
        registerAuthorizedAdmin,
        resetPassword,
        logout,
        error,
        clearError: () => setError(null),
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}
