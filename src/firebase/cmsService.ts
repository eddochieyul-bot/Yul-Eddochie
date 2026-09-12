import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from './config';
import {
  CmsLeadershipOfficer,
  CmsEvent,
  CmsNewsArticle,
  CmsProgramme,
  CmsGalleryItem,
  CmsAnnouncement,
  CmsResource,
  CmsChapter,
  CmsSubscriber,
  CmsCampaign,
  CmsMembershipApplication,
  CmsEmailDispatch,
  CmsContactMessage,
  CmsActivityLog,
  CmsWebsiteSettings,
  CmsOpportunity,
  CmsVolunteerApplication,
  CmsAcademyCourse,
  CmsCertificate,
  CmsStory,
  CmsMilestone,
  CmsFaqItem,
  CmsCommunityLink,
  CmsImpactMetric,
  CmsTeamApplication,
  CmsVideo,
} from './types';
import {
  LEADERSHIP_OFFICERS,
  PROGRAMMES,
  EVENTS,
  NEWS_ARTICLES,
  GALLERY_ITEMS,
  RESOURCES,
  REGIONAL_CHAPTERS,
  INITIAL_OPPORTUNITIES,
  INITIAL_ACADEMY_COURSES,
  INITIAL_MILESTONES,
  INITIAL_FAQS,
  OFFICIAL_SOCIAL_CHANNELS,
  INITIAL_VERIFIED_CERTIFICATES,
  INITIAL_STORIES,
  INITIAL_VIDEOS,
  IMPACT_METRICS,
} from '../data/organizationData';

export const OFFICIAL_ADMIN_EMAIL = 'aylaafrica.org@gmail.com';

// ==========================================
// AUDIT ACTIVITY LOGS
// ==========================================
export async function logActivity(
  action: string,
  entity: string,
  description: string,
  adminEmail?: string
) {
  try {
    const logsRef = collection(db, 'activity_logs');
    await addDoc(logsRef, {
      action,
      entity,
      description,
      adminEmail: adminEmail || 'System / Visitor',
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.warn('Could not persist activity log:', err);
  }
}

// Log official administrative notification for aylafrica.org@gmail.com
export async function notifyAylaAdministration(
  subject: string,
  payload: Record<string, any>
) {
  try {
    const notifRef = collection(db, 'admin_notifications');
    await addDoc(notifRef, {
      targetEmail: OFFICIAL_ADMIN_EMAIL,
      subject,
      payload,
      createdAt: new Date().toISOString(),
      status: 'queued', // Ready for backend dispatch / SMTP
    });
    await logActivity('ADMIN_ALERT', 'Email Notification', `${subject}: ${JSON.stringify(payload)}`);
  } catch (err) {
    console.warn('Failed to queue administrative notification:', err);
  }
}

// ==========================================
// IMAGE UPLOAD / COMPRESSION HELPER
// ==========================================
export async function uploadImageFile(file: File, folder = 'cms-media'): Promise<string> {
  // 1. Try Firebase Cloud Storage first
  try {
    const timestamp = Date.now();
    const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const storageRef = ref(storage, `${folder}/${timestamp}_${cleanName}`);
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);
  } catch (storageErr) {
    console.warn('Firebase Storage direct upload fell back to client-optimized data URL:', storageErr);
    // 2. High-reliability fallback: Client-side compressed canvas base64 image
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxDim = 1200;
          let width = img.width;
          let height = img.height;

          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL('image/jpeg', 0.85));
          } else {
            resolve(e.target?.result as string);
          }
        };
        img.onerror = () => resolve(e.target?.result as string);
        img.src = e.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
}

// ==========================================
// 1. LEADERSHIP CMS
// ==========================================
export function subscribeToLeadership(
  callback: (officers: CmsLeadershipOfficer[]) => void,
  publishedOnly = false
) {
  const colRef = collection(db, 'leadership');
  return onSnapshot(
    colRef,
    (snapshot) => {
      if (snapshot.empty) {
        // Fallback to baseline official leadership
        const baseline: CmsLeadershipOfficer[] = LEADERSHIP_OFFICERS.map((lo, idx) => ({
          id: lo.id,
          fullName: lo.holderName,
          position: lo.title,
          title: lo.title,
          constitutionalRole: lo.constitutionalRole,
          office: lo.office,
          department: lo.department,
          biography: lo.shortBio,
          profilePhoto: '',
          country: 'Pan-African',
          email: '',
          socials: { twitter: '@AYLA_Africa', instagram: '@ayla.africa', linkedin: 'AYLA Africa' },
          responsibilities: lo.responsibilities,
          displayOrder: idx + 1,
          published: true,
          status: lo.status,
          updatedAt: new Date().toISOString(),
        }));
        callback(publishedOnly ? baseline.filter((x) => x.published) : baseline);
        return;
      }
      let items = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      })) as CmsLeadershipOfficer[];

      items.sort((a, b) => (a.displayOrder || 99) - (b.displayOrder || 99));
      if (publishedOnly) {
        items = items.filter((x) => x.published);
      }
      callback(items);
    },
    (err) => {
      console.warn('Error subscribing to leadership:', err);
      callback(
        LEADERSHIP_OFFICERS.map((lo, idx) => ({
          id: lo.id,
          fullName: lo.holderName,
          position: lo.title,
          title: lo.title,
          constitutionalRole: lo.constitutionalRole,
          office: lo.office,
          department: lo.department,
          biography: lo.shortBio,
          profilePhoto: '',
          country: 'Pan-African',
          responsibilities: lo.responsibilities,
          displayOrder: idx + 1,
          published: true,
          status: lo.status,
          updatedAt: new Date().toISOString(),
        }))
      );
    }
  );
}

export async function saveLeadershipOfficer(officer: Partial<CmsLeadershipOfficer>, adminEmail?: string) {
  const id = officer.id || `lead-${Date.now()}`;
  const docRef = doc(db, 'leadership', id);
  const data = {
    ...officer,
    id,
    updatedAt: new Date().toISOString(),
  };
  await setDoc(docRef, data, { merge: true });
  await logActivity('SAVE_LEADER', 'Leadership', `Saved leader: ${officer.fullName || id}`, adminEmail);
  return id;
}

export async function deleteLeadershipOfficer(id: string, adminEmail?: string) {
  await deleteDoc(doc(db, 'leadership', id));
  await logActivity('DELETE_LEADER', 'Leadership', `Deleted leader with id: ${id}`, adminEmail);
}

// ==========================================
// 2. EVENTS CMS
// ==========================================
export function subscribeToEvents(
  callback: (events: CmsEvent[]) => void,
  publishedOnly = false
) {
  const colRef = collection(db, 'events');
  return onSnapshot(
    colRef,
    (snapshot) => {
      if (snapshot.empty) {
        // Fallback to baseline events from organizationData
        const baseline: CmsEvent[] = EVENTS.map((ev) => ({
          id: ev.id,
          title: ev.title,
          description: ev.description,
          date: ev.date,
          startTime: ev.time,
          location: ev.location,
          eventType: ev.type.toLowerCase().includes('virtual')
            ? 'online'
            : ev.type.toLowerCase().includes('regional')
            ? 'physical'
            : 'hybrid',
          organizer: 'AYLA Continental Secretariat',
          contactInfo: 'aylafrica.org@gmail.com',
          featured: ev.id === 'ev-1',
          published: true,
          status: ev.status,
          createdAt: new Date().toISOString(),
        }));
        callback(publishedOnly ? baseline.filter((x) => x.published) : baseline);
        return;
      }
      let items = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })) as CmsEvent[];

      items.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      if (publishedOnly) {
        items = items.filter((x) => x.published);
      }
      callback(items);
    },
    (err) => {
      console.warn('Error subscribing to events:', err);
      callback([]);
    }
  );
}

export async function saveEvent(event: Partial<CmsEvent>, adminEmail?: string) {
  const id = event.id || `event-${Date.now()}`;
  const docRef = doc(db, 'events', id);
  const data = {
    ...event,
    id,
    createdAt: event.createdAt || new Date().toISOString(),
  };
  await setDoc(docRef, data, { merge: true });
  await logActivity('SAVE_EVENT', 'Events', `Saved event: ${event.title || id}`, adminEmail);
  return id;
}

export async function deleteEvent(id: string, adminEmail?: string) {
  await deleteDoc(doc(db, 'events', id));
  await logActivity('DELETE_EVENT', 'Events', `Deleted event: ${id}`, adminEmail);
}

// ==========================================
// 3. NEWS CMS
// ==========================================
export function subscribeToNews(
  callback: (news: CmsNewsArticle[]) => void,
  publishedOnly = false
) {
  const colRef = collection(db, 'news');
  return onSnapshot(
    colRef,
    (snapshot) => {
      if (snapshot.empty) {
        const baseline: CmsNewsArticle[] = NEWS_ARTICLES.map((na) => ({
          id: na.id,
          title: na.title,
          slug: na.slug,
          category: na.category,
          author: na.author,
          publishDate: na.date,
          excerpt: na.excerpt,
          content: na.content.join('\n\n'),
          featured: na.featured,
          tags: ['Pan-African', na.category],
          published: true,
          readTime: na.readTime,
        }));
        callback(publishedOnly ? baseline.filter((x) => x.published) : baseline);
        return;
      }
      let items = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })) as CmsNewsArticle[];

      items.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
      if (publishedOnly) {
        items = items.filter((x) => x.published);
      }
      callback(items);
    },
    (err) => {
      console.warn('Error subscribing to news:', err);
      callback([]);
    }
  );
}

export async function saveNewsArticle(article: Partial<CmsNewsArticle>, adminEmail?: string) {
  const id = article.id || `news-${Date.now()}`;
  const docRef = doc(db, 'news', id);
  const data = {
    ...article,
    id,
    publishDate: article.publishDate || new Date().toISOString().split('T')[0],
  };
  await setDoc(docRef, data, { merge: true });
  await logActivity('SAVE_NEWS', 'News', `Saved article: ${article.title || id}`, adminEmail);
  return id;
}

export async function deleteNewsArticle(id: string, adminEmail?: string) {
  await deleteDoc(doc(db, 'news', id));
  await logActivity('DELETE_NEWS', 'News', `Deleted news article: ${id}`, adminEmail);
}

// ==========================================
// 4. PROGRAMMES CMS
// ==========================================
export function subscribeToProgrammes(
  callback: (programmes: CmsProgramme[]) => void,
  publishedOnly = false
) {
  const colRef = collection(db, 'programmes');
  return onSnapshot(
    colRef,
    (snapshot) => {
      if (snapshot.empty) {
        const baseline: CmsProgramme[] = PROGRAMMES.map((p, idx) => ({
          id: p.id,
          slug: p.slug,
          route: p.route,
          title: p.title,
          subtitle: p.subtitle,
          category: p.category,
          description: p.description,
          programmeDetails: p.fullDetails,
          fullDetails: p.fullDetails,
          image: p.image,
          objectives: p.objectives,
          pillars: p.pillars,
          impactMetric: p.impactMetric,
          targetAudience: p.targetAudience,
          duration: p.duration,
          displayOrder: idx + 1,
          published: true,
        }));
        callback(publishedOnly ? baseline.filter((x) => x.published) : baseline);
        return;
      }
      let items = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })) as CmsProgramme[];

      items.sort((a, b) => (a.displayOrder || 99) - (b.displayOrder || 99));
      if (publishedOnly) {
        items = items.filter((x) => x.published);
      }
      callback(items);
    },
    (err) => {
      console.warn('Error subscribing to programmes:', err);
      callback([]);
    }
  );
}

export async function saveProgramme(programme: Partial<CmsProgramme>, adminEmail?: string) {
  const id = programme.id || `prog-${Date.now()}`;
  const docRef = doc(db, 'programmes', id);
  const data = {
    ...programme,
    id,
  };
  await setDoc(docRef, data, { merge: true });
  await logActivity('SAVE_PROGRAMME', 'Programmes', `Saved programme: ${programme.title || id}`, adminEmail);
  return id;
}

export async function deleteProgramme(id: string, adminEmail?: string) {
  await deleteDoc(doc(db, 'programmes', id));
  await logActivity('DELETE_PROGRAMME', 'Programmes', `Deleted programme: ${id}`, adminEmail);
}

// ==========================================
// 5. GALLERY CMS
// ==========================================
export function subscribeToGallery(
  callback: (items: CmsGalleryItem[]) => void,
  publishedOnly = false
) {
  const colRef = collection(db, 'gallery');
  return onSnapshot(
    colRef,
    (snapshot) => {
      if (snapshot.empty) {
        const baseline: CmsGalleryItem[] = GALLERY_ITEMS.map((g, idx) => ({
          id: g.id,
          title: g.title,
          caption: g.caption,
          category: g.category,
          imageUrl: '',
          date: g.date || '2025',
          year: g.year || '2025',
          location: g.location,
          displayOrder: idx + 1,
          published: true,
        }));
        callback(publishedOnly ? baseline.filter((x) => x.published) : baseline);
        return;
      }
      let items = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })) as CmsGalleryItem[];

      items.sort((a, b) => (a.displayOrder || 99) - (b.displayOrder || 99));
      if (publishedOnly) {
        items = items.filter((x) => x.published);
      }
      callback(items);
    },
    (err) => {
      console.warn('Error subscribing to gallery:', err);
      callback([]);
    }
  );
}

export async function saveGalleryItem(item: Partial<CmsGalleryItem>, adminEmail?: string) {
  const id = item.id || `gal-${Date.now()}`;
  const docRef = doc(db, 'gallery', id);
  const data = {
    ...item,
    id,
  };
  await setDoc(docRef, data, { merge: true });
  await logActivity('SAVE_GALLERY', 'Gallery', `Saved gallery photo: ${item.title || id}`, adminEmail);
  return id;
}

export async function deleteGalleryItem(id: string, adminEmail?: string) {
  await deleteDoc(doc(db, 'gallery', id));
  await logActivity('DELETE_GALLERY', 'Gallery', `Deleted gallery item: ${id}`, adminEmail);
}

// ==========================================
// 6. ANNOUNCEMENTS CMS
// ==========================================
export function subscribeToAnnouncements(
  callback: (items: CmsAnnouncement[]) => void,
  publishedOnly = false
) {
  const colRef = collection(db, 'announcements');
  return onSnapshot(
    colRef,
    (snapshot) => {
      if (snapshot.empty) {
        const baseline: CmsAnnouncement[] = [
          {
            id: 'ann-1',
            title: 'Call for Regional Chapter Coordinators (2026-2028 Term)',
            content: 'The Executive Council announces open nominations for Chapter Coordinators across North, East, West, Central, and Southern Africa. Applications close end of quarter.',
            publishDate: '2026-03-01',
            isImportant: true,
            linkUrl: '/membership/register',
            published: true,
          },
          {
            id: 'ann-2',
            title: 'Publication of the Revised AYLA Constitution (5th Edition)',
            content: 'The Supreme Law of AYLA has been deposited with the continental repository and is available for download and institutional review.',
            publishDate: '2026-02-15',
            isImportant: false,
            linkUrl: '/constitution',
            published: true,
          },
        ];
        callback(publishedOnly ? baseline.filter((x) => x.published) : baseline);
        return;
      }
      let items = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })) as CmsAnnouncement[];

      items.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
      if (publishedOnly) {
        items = items.filter((x) => x.published);
      }
      callback(items);
    },
    (err) => {
      console.warn('Error subscribing to announcements:', err);
      callback([]);
    }
  );
}

export async function saveAnnouncement(item: Partial<CmsAnnouncement>, adminEmail?: string) {
  const id = item.id || `ann-${Date.now()}`;
  const docRef = doc(db, 'announcements', id);
  const data = {
    ...item,
    id,
    publishDate: item.publishDate || new Date().toISOString().split('T')[0],
  };
  await setDoc(docRef, data, { merge: true });
  await logActivity('SAVE_ANNOUNCEMENT', 'Announcements', `Saved announcement: ${item.title || id}`, adminEmail);
  return id;
}

export async function deleteAnnouncement(id: string, adminEmail?: string) {
  await deleteDoc(doc(db, 'announcements', id));
  await logActivity('DELETE_ANNOUNCEMENT', 'Announcements', `Deleted announcement: ${id}`, adminEmail);
}

// ==========================================
// 7. RESOURCES CMS
// ==========================================
export function subscribeToResources(
  callback: (items: CmsResource[]) => void,
  publishedOnly = false
) {
  const colRef = collection(db, 'resources');
  return onSnapshot(
    colRef,
    (snapshot) => {
      if (snapshot.empty) {
        const baseline: CmsResource[] = RESOURCES.map((r) => ({
          id: r.id,
          title: r.title,
          description: r.description,
          category: r.category,
          fileUrl: '/constitution',
          fileSize: r.fileSize,
          fileFormat: r.fileFormat || r.format || 'PDF',
          publishDate: r.publishDate,
          published: true,
        }));
        callback(publishedOnly ? baseline.filter((x) => x.published) : baseline);
        return;
      }
      let items = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })) as CmsResource[];

      items.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
      if (publishedOnly) {
        items = items.filter((x) => x.published);
      }
      callback(items);
    },
    (err) => {
      console.warn('Error subscribing to resources:', err);
      callback([]);
    }
  );
}

export async function saveResource(item: Partial<CmsResource>, adminEmail?: string) {
  const id = item.id || `res-${Date.now()}`;
  const docRef = doc(db, 'resources', id);
  const data = {
    ...item,
    id,
    publishDate: item.publishDate || new Date().toISOString().split('T')[0],
  };
  await setDoc(docRef, data, { merge: true });
  await logActivity('SAVE_RESOURCE', 'Resources', `Saved resource: ${item.title || id}`, adminEmail);
  return id;
}

export async function deleteResource(id: string, adminEmail?: string) {
  await deleteDoc(doc(db, 'resources', id));
  await logActivity('DELETE_RESOURCE', 'Resources', `Deleted resource: ${id}`, adminEmail);
}

// ==========================================
// 8. CHAPTERS CMS
// ==========================================
export function subscribeToChapters(
  callback: (items: CmsChapter[]) => void,
  publishedOnly = false
) {
  const colRef = collection(db, 'chapters');
  return onSnapshot(
    colRef,
    (snapshot) => {
      if (snapshot.empty) {
        const baseline: CmsChapter[] = REGIONAL_CHAPTERS.map((c) => ({
          id: c.id,
          region: c.name,
          country: c.countries.join(', '),
          chapterName: c.name,
          coordinator: c.coordinator || 'Regional Bureau Interim Secretariat',
          contactInfo: 'aylafrica.org@gmail.com',
          description: `Covers ${c.countries.length} nations across the region with focal hub situated in ${c.focalHub}.`,
          status: 'Active Focal Hub',
          published: true,
          focalHub: c.focalHub,
          regionalPriorities: c.regionalPriorities,
          keyFocus: c.keyFocus,
        }));
        callback(publishedOnly ? baseline.filter((x) => x.published) : baseline);
        return;
      }
      let items = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })) as CmsChapter[];

      if (publishedOnly) {
        items = items.filter((x) => x.published);
      }
      callback(items);
    },
    (err) => {
      console.warn('Error subscribing to chapters:', err);
      callback([]);
    }
  );
}

export async function saveChapter(chapter: Partial<CmsChapter>, adminEmail?: string) {
  const id = chapter.id || `chap-${Date.now()}`;
  const docRef = doc(db, 'chapters', id);
  const data = {
    ...chapter,
    id,
  };
  await setDoc(docRef, data, { merge: true });
  await logActivity('SAVE_CHAPTER', 'Chapters', `Saved chapter: ${chapter.chapterName || id}`, adminEmail);
  return id;
}

export async function deleteChapter(id: string, adminEmail?: string) {
  await deleteDoc(doc(db, 'chapters', id));
  await logActivity('DELETE_CHAPTER', 'Chapters', `Deleted chapter: ${id}`, adminEmail);
}

// ==========================================
// 9. NEWSLETTER SUBSCRIBERS
// ==========================================
export async function addNewsletterSubscriber(
  email: string,
  source = 'Continental Dispatch Homepage'
): Promise<{ success: boolean; message: string; isNew: boolean }> {
  const trimmed = email.trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) {
    return { success: false, message: 'Please provide a valid email address.', isNew: false };
  }

  try {
    const sanitizedId = trimmed.replace(/[^a-zA-Z0-9]/g, '_');
    const docRef = doc(db, 'newsletter_subscribers', sanitizedId);
    
    await setDoc(
      docRef,
      {
        id: sanitizedId,
        email: trimmed,
        status: 'active',
        source,
        subscribedAt: new Date().toISOString(),
      },
      { merge: true }
    );

    // Notify AYLA administration & audit
    await notifyAylaAdministration('New AYLA Newsletter Subscriber', {
      email: trimmed,
      source,
      subscribedAt: new Date().toISOString(),
    });

    return {
      success: true,
      message: 'Thank you for subscribing! You will receive official assembly communiqués, dispatches, and reports.',
      isNew: true,
    };
  } catch (err: any) {
    console.error('Subscription error:', err);
    return {
      success: false,
      message: err.message || 'Subscription failed. Please check your connection and try again.',
      isNew: false,
    };
  }
}

export const subscribeToNewsletter = addNewsletterSubscriber;

export function subscribeToNewsletterSubscribers(callback: (subs: CmsSubscriber[]) => void) {
  const colRef = collection(db, 'newsletter_subscribers');
  return onSnapshot(
    colRef,
    (snapshot) => {
      const items = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })) as CmsSubscriber[];
      items.sort((a, b) => new Date(b.subscribedAt).getTime() - new Date(a.subscribedAt).getTime());
      callback(items);
    },
    (err) => {
      console.warn('Error fetching subscribers:', err);
      callback([]);
    }
  );
}

export const subscribeToSubscribers = subscribeToNewsletterSubscribers;

export async function updateSubscriberStatus(id: string, status: 'active' | 'unsubscribed', adminEmail?: string) {
  const docRef = doc(db, 'newsletter_subscribers', id);
  await updateDoc(docRef, {
    status,
    unsubscribedAt: status === 'unsubscribed' ? new Date().toISOString() : null,
  });
  await logActivity('UPDATE_SUBSCRIBER', 'Newsletter', `Updated subscriber ${id} to ${status}`, adminEmail);
}

export async function deleteSubscriber(id: string, adminEmail?: string) {
  await deleteDoc(doc(db, 'newsletter_subscribers', id));
  await logActivity('DELETE_SUBSCRIBER', 'Newsletter', `Removed subscriber ${id}`, adminEmail);
}

// ==========================================
// 10. NEWSLETTER CAMPAIGNS
// ==========================================
export function subscribeToCampaigns(callback: (campaigns: CmsCampaign[]) => void) {
  const colRef = collection(db, 'newsletter_campaigns');
  return onSnapshot(
    colRef,
    (snapshot) => {
      const items = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })) as CmsCampaign[];
      items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      callback(items);
    },
    (err) => {
      console.warn('Error fetching campaigns:', err);
      callback([]);
    }
  );
}

export async function saveCampaign(campaign: Partial<CmsCampaign>, adminEmail?: string) {
  const id = campaign.id || `camp-${Date.now()}`;
  const docRef = doc(db, 'newsletter_campaigns', id);
  const data = {
    ...campaign,
    id,
    createdAt: campaign.createdAt || new Date().toISOString(),
  };
  await setDoc(docRef, data, { merge: true });
  await logActivity('SAVE_CAMPAIGN', 'Campaigns', `Saved campaign: ${campaign.subject || id}`, adminEmail);
  return id;
}

export async function sendCampaign(campaignId: string, recipientCountOrEmail?: number | string, maybeAdminEmail?: string): Promise<{ sentCount: number }> {
  let recipientCount = typeof recipientCountOrEmail === 'number' ? recipientCountOrEmail : 0;
  const adminEmail = typeof recipientCountOrEmail === 'string' ? recipientCountOrEmail : maybeAdminEmail;
  if (!recipientCount) {
    try {
      const subSnap = await getDocs(query(collection(db, 'newsletter_subscribers'), where('status', '==', 'active')));
      recipientCount = subSnap.size;
    } catch {
      recipientCount = 1;
    }
  }
  const docRef = doc(db, 'newsletter_campaigns', campaignId);
  const sentAt = new Date().toISOString();
  await updateDoc(docRef, {
    status: 'sent',
    sentAt,
    recipientCount,
  });
  await logActivity('SEND_CAMPAIGN', 'Campaigns', `Dispatched campaign ${campaignId} to ${recipientCount} recipients`, adminEmail);
  await notifyAylaAdministration('AYLA Newsletter Campaign Dispatched', {
    campaignId,
    recipientCount,
    sentAt,
    sentBy: adminEmail,
  });
  return { sentCount: recipientCount };
}

export const subscribeToNewsletterCampaigns = subscribeToCampaigns;
export const saveNewsletterCampaign = saveCampaign;
export const sendNewsletterCampaign = sendCampaign;

// ==========================================
// 11. MEMBERSHIP APPLICATIONS & CONTACT MESSAGES
// ==========================================
export function subscribeToMembershipApplications(callback: (apps: CmsMembershipApplication[]) => void) {
  const colRef = collection(db, 'membership_applications');
  return onSnapshot(
    colRef,
    (snapshot) => {
      const items = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })) as CmsMembershipApplication[];
      items.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
      callback(items);
    },
    (err) => {
      console.warn('Error fetching membership applications:', err);
      callback([]);
    }
  );
}

export async function recordMembershipApplication(data: Partial<CmsMembershipApplication>) {
  const colRef = collection(db, 'membership_applications');
  const docData = {
    ...data,
    status: 'pending',
    submittedAt: new Date().toISOString(),
  };
  const docSnap = await addDoc(colRef, docData);
  await notifyAylaAdministration('New AYLA Membership Application', {
    applicantName: data.fullName,
    applicantEmail: data.email,
    country: data.countryOfResidence,
    submittedAt: new Date().toISOString(),
  });
  return docSnap.id;
}

export async function updateMembershipApplicationStatus(id: string, status: 'pending' | 'reviewed' | 'approved', notes?: string, adminEmail?: string) {
  const docRef = doc(db, 'membership_applications', id);
  await updateDoc(docRef, {
    status,
    notes: notes || '',
    updatedAt: new Date().toISOString(),
  });
  await logActivity('UPDATE_MEMBERSHIP_APP', 'Membership', `Updated application ${id} to ${status}`, adminEmail);
}

// Country Code Mapping for Continental Institutional IDs
const COUNTRY_CODES: Record<string, string> = {
  nigeria: 'NG',
  kenya: 'KE',
  ghana: 'GH',
  'south africa': 'ZA',
  rwanda: 'RW',
  uganda: 'UG',
  tanzania: 'TZ',
  egypt: 'EG',
  ethiopia: 'ET',
  zimbabwe: 'ZW',
  zambia: 'ZM',
  senegal: 'SN',
  morocco: 'MA',
  cameroon: 'CM',
  cote: 'CI',
  "côte d'ivoire": 'CI',
  ivory: 'CI',
  drc: 'CD',
  congo: 'CG',
  namibia: 'NA',
  botswana: 'BW',
  liberia: 'LR',
  sierra: 'SL',
  gambia: 'GM',
  malawi: 'MW',
  benin: 'BJ',
  togo: 'TG',
  mozambique: 'MZ',
  angola: 'AO',
};

export function generateInstitutionalMembershipId(countryOrNationality?: string): string {
  const norm = (countryOrNationality || '').trim().toLowerCase();
  let code = 'AF';
  for (const [countryKey, alpha] of Object.entries(COUNTRY_CODES)) {
    if (norm.includes(countryKey)) {
      code = alpha;
      break;
    }
  }
  const year = new Date().getFullYear();
  const serial = Math.floor(1000 + Math.random() * 9000);
  return `AYLA-${code}-${year}-${serial}`;
}

export async function assignMembershipId(
  id: string,
  membershipId: string,
  membershipTier: string = 'Ordinary Member',
  adminEmail?: string
) {
  const docRef = doc(db, 'membership_applications', id);
  const updateData: Partial<CmsMembershipApplication> = {
    membershipId,
    membershipTier,
    status: 'approved',
    approvedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  await updateDoc(docRef, updateData as any);
  await logActivity(
    'ASSIGN_MEMBERSHIP_ID',
    'Membership',
    `Conferred Membership ID ${membershipId} (${membershipTier}) to applicant ${id}`,
    adminEmail
  );
}

export async function issueMemberCertificate(
  id: string,
  certificateNumber?: string,
  adminEmail?: string
) {
  const docRef = doc(db, 'membership_applications', id);
  const certNum = certificateNumber || `AYLA-CERT-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
  const updateData: Partial<CmsMembershipApplication> = {
    certificateIssuedAt: new Date().toISOString(),
    certificateNumber: certNum,
    updatedAt: new Date().toISOString(),
  };
  await updateDoc(docRef, updateData as any);
  await logActivity(
    'ISSUE_CERTIFICATE',
    'Membership',
    `Issued official certificate ${certNum} to member ${id}`,
    adminEmail
  );
  return certNum;
}

export async function deleteMembershipApplication(id: string, adminEmail?: string) {
  await deleteDoc(doc(db, 'membership_applications', id));
  await logActivity('DELETE_MEMBERSHIP_APP', 'Membership', `Deleted application record ${id}`, adminEmail);
}

export async function sendMemberEmail(params: {
  recipientEmail: string;
  recipientName: string;
  subject: string;
  body: string;
  templateUsed?: string;
  applicationId?: string;
  adminEmail?: string;
}) {
  const colRef = collection(db, 'email_dispatches');
  const dispatchData: CmsEmailDispatch = {
    id: `disp-${Date.now()}`,
    type: 'single',
    recipientEmail: params.recipientEmail,
    recipientName: params.recipientName,
    recipientCount: 1,
    subject: params.subject,
    body: params.body,
    templateUsed: params.templateUsed || 'Direct Secretariat Message',
    sentBy: params.adminEmail || 'AYLA Secretariat',
    sentAt: new Date().toISOString(),
    status: 'sent',
  };
  await addDoc(colRef, dispatchData);

  if (params.applicationId) {
    const docRef = doc(db, 'membership_applications', params.applicationId);
    await updateDoc(docRef, {
      lastEmailSentAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }).catch(() => {});
  }

  await logActivity(
    'SEND_SINGLE_EMAIL',
    'Communications',
    `Sent email to ${params.recipientName} (${params.recipientEmail}): "${params.subject}"`,
    params.adminEmail
  );

  return dispatchData;
}

export async function sendMassMemberEmail(params: {
  targetGroup: string;
  recipientEmails: string[];
  subject: string;
  body: string;
  templateUsed?: string;
  adminEmail?: string;
}) {
  const colRef = collection(db, 'email_dispatches');
  const dispatchData: CmsEmailDispatch = {
    id: `mass-${Date.now()}`,
    type: 'mass',
    recipientCount: params.recipientEmails.length,
    targetGroup: params.targetGroup,
    subject: params.subject,
    body: params.body,
    templateUsed: params.templateUsed || 'Mass Secretariat Broadcast',
    sentBy: params.adminEmail || 'AYLA Secretariat',
    sentAt: new Date().toISOString(),
    status: 'sent',
  };
  await addDoc(colRef, dispatchData);

  // Also record in newsletter campaigns for archive consistency
  try {
    await addDoc(collection(db, 'newsletter_campaigns'), {
      subject: params.subject,
      headline: `Mass Broadcast: ${params.targetGroup}`,
      body: params.body,
      status: 'sent',
      sentAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      recipientCount: params.recipientEmails.length,
      recipients: params.recipientEmails.slice(0, 100),
    });
  } catch (e) {
    console.warn('Could not mirror mass dispatch to campaigns:', e);
  }

  await logActivity(
    'SEND_MASS_EMAIL',
    'Communications',
    `Dispatched mass broadcast to ${params.recipientEmails.length} recipients (${params.targetGroup}): "${params.subject}"`,
    params.adminEmail
  );

  return dispatchData;
}

export function subscribeToEmailDispatches(callback: (dispatches: CmsEmailDispatch[]) => void) {
  const colRef = collection(db, 'email_dispatches');
  return onSnapshot(
    colRef,
    (snapshot) => {
      const items = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })) as CmsEmailDispatch[];
      items.sort((a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime());
      callback(items);
    },
    (err) => {
      console.warn('Error fetching email dispatches:', err);
      callback([]);
    }
  );
}

export function subscribeToContactMessages(callback: (msgs: CmsContactMessage[]) => void) {
  const colRef = collection(db, 'contact_messages');
  return onSnapshot(
    colRef,
    (snapshot) => {
      const items = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })) as CmsContactMessage[];
      items.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
      callback(items);
    },
    (err) => {
      console.warn('Error fetching contact messages:', err);
      callback([]);
    }
  );
}

export async function submitContactMessage(msg: {
  fullName: string;
  email: string;
  phone?: string;
  category?: string;
  subject: string;
  message: string;
}) {
  const colRef = collection(db, 'contact_messages');
  await addDoc(colRef, {
    ...msg,
    category: msg.category || 'General Enquiry',
    status: 'unread',
    submittedAt: new Date().toISOString(),
  });
  await notifyAylaAdministration(`AYLA Secretariat Contact [${msg.category || 'General'}]: ${msg.subject}`, {
    senderName: msg.fullName,
    senderEmail: msg.email,
    category: msg.category || 'General Enquiry',
    subject: msg.subject,
    submittedAt: new Date().toISOString(),
  });
}

export async function updateContactMessageStatus(
  id: string,
  status: 'unread' | 'read' | 'replied' | 'archived',
  adminEmail?: string
) {
  const docRef = doc(db, 'contact_messages', id);
  await updateDoc(docRef, { status });
  await logActivity('UPDATE_CONTACT_STATUS', 'Messages', `Marked message ${id} as ${status}`, adminEmail);
}

export async function deleteContactMessage(id: string, adminEmail?: string) {
  const docRef = doc(db, 'contact_messages', id);
  await deleteDoc(docRef);
  await logActivity('DELETE_CONTACT', 'Messages', `Deleted contact message ${id}`, adminEmail);
}

// ==========================================
// 12. ACTIVITY LOGS & OVERVIEW STATS
// ==========================================
export function subscribeToActivityLogs(callback: (logs: CmsActivityLog[]) => void, maxCount = 20) {
  const colRef = collection(db, 'activity_logs');
  return onSnapshot(
    colRef,
    (snapshot) => {
      const items = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })) as CmsActivityLog[];
      items.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      callback(items.slice(0, maxCount));
    },
    (err) => {
      console.warn('Error fetching activity logs:', err);
      callback([]);
    }
  );
}

// ==========================================
// 13. WEBSITE SETTINGS & SEEDING
// ==========================================
export function subscribeToWebsiteSettings(callback: (settings: CmsWebsiteSettings) => void) {
  const docRef = doc(db, 'website_settings', 'global');
  return onSnapshot(
    docRef,
    (snapshot) => {
      if (snapshot.exists()) {
        callback(snapshot.data() as CmsWebsiteSettings);
      } else {
        callback({
          notificationEmail: OFFICIAL_ADMIN_EMAIL,
          emergencyBannerEnabled: false,
          emergencyBannerText: '',
          maintenanceMode: false,
          lastUpdated: new Date().toISOString(),
        });
      }
    },
    (err) => {
      console.warn('Error fetching website settings:', err);
      callback({
        notificationEmail: OFFICIAL_ADMIN_EMAIL,
        emergencyBannerEnabled: false,
        emergencyBannerText: '',
        maintenanceMode: false,
        lastUpdated: new Date().toISOString(),
      });
    }
  );
}

export async function saveWebsiteSettings(settings: Partial<CmsWebsiteSettings>, adminEmail?: string) {
  const docRef = doc(db, 'website_settings', 'global');
  const data = {
    ...settings,
    lastUpdated: new Date().toISOString(),
  };
  await setDoc(docRef, data, { merge: true });
  await logActivity('UPDATE_SETTINGS', 'Settings', 'Updated global website settings', adminEmail);
}

// Seed baseline records from organizationData into Firestore for immediate management
export async function seedInitialDataIfNeeded(adminEmail?: string) {
  // Check leadership
  const leadSnap = await getDocs(collection(db, 'leadership'));
  if (leadSnap.empty) {
    for (let idx = 0; idx < LEADERSHIP_OFFICERS.length; idx++) {
      const lo = LEADERSHIP_OFFICERS[idx];
      await setDoc(doc(db, 'leadership', lo.id), {
        id: lo.id,
        fullName: lo.holderName,
        position: lo.title,
        title: lo.title,
        constitutionalRole: lo.constitutionalRole,
        office: lo.office,
        department: lo.department,
        biography: lo.shortBio,
        profilePhoto: '',
        country: 'Pan-African',
        email: '',
        socials: { twitter: '@AYLA_Africa', instagram: '@ayla.africa', linkedin: 'AYLA Africa' },
        responsibilities: lo.responsibilities,
        displayOrder: idx + 1,
        published: true,
        status: lo.status,
        updatedAt: new Date().toISOString(),
      });
    }
  }

  // Check events
  const evSnap = await getDocs(collection(db, 'events'));
  if (evSnap.empty) {
    for (const ev of EVENTS) {
      await setDoc(doc(db, 'events', ev.id), {
        id: ev.id,
        title: ev.title,
        description: ev.description,
        date: ev.date,
        startTime: ev.time,
        location: ev.location,
        eventType: ev.type.toLowerCase().includes('virtual')
          ? 'online'
          : ev.type.toLowerCase().includes('regional')
          ? 'physical'
          : 'hybrid',
        organizer: 'AYLA Continental Secretariat',
        contactInfo: 'aylafrica.org@gmail.com',
        featured: ev.id === 'ev-1',
        published: true,
        status: ev.status,
        createdAt: new Date().toISOString(),
      });
    }
  }

  // Check news
  const newsSnap = await getDocs(collection(db, 'news'));
  if (newsSnap.empty) {
    for (const na of NEWS_ARTICLES) {
      await setDoc(doc(db, 'news', na.id), {
        id: na.id,
        title: na.title,
        slug: na.slug,
        category: na.category,
        author: na.author,
        publishDate: na.date,
        excerpt: na.excerpt,
        content: na.content.join('\n\n'),
        featured: na.featured,
        tags: ['Pan-African', na.category],
        published: true,
        readTime: na.readTime,
      });
    }
  }

  // Check programmes
  const progSnap = await getDocs(collection(db, 'programmes'));
  if (progSnap.empty) {
    for (let idx = 0; idx < PROGRAMMES.length; idx++) {
      const p = PROGRAMMES[idx];
      await setDoc(doc(db, 'programmes', p.id), {
        id: p.id,
        slug: p.slug,
        route: p.route,
        title: p.title,
        subtitle: p.subtitle,
        category: p.category,
        description: p.description,
        programmeDetails: p.fullDetails,
        fullDetails: p.fullDetails,
        image: p.image,
        objectives: p.objectives,
        pillars: p.pillars,
        impactMetric: p.impactMetric,
        targetAudience: p.targetAudience,
        duration: p.duration,
        displayOrder: idx + 1,
        published: true,
      });
    }
  }

  // Check gallery
  const galSnap = await getDocs(collection(db, 'gallery'));
  if (galSnap.empty) {
    for (let idx = 0; idx < GALLERY_ITEMS.length; idx++) {
      const g = GALLERY_ITEMS[idx];
      await setDoc(doc(db, 'gallery', g.id), {
        id: g.id,
        title: g.title,
        caption: g.caption,
        category: g.category,
        imageUrl: '',
        date: g.date || '2025',
        year: g.year || '2025',
        location: g.location,
        displayOrder: idx + 1,
        published: true,
      });
    }
  }

  // Check resources
  const resSnap = await getDocs(collection(db, 'resources'));
  if (resSnap.empty) {
    for (const r of RESOURCES) {
      await setDoc(doc(db, 'resources', r.id), {
        id: r.id,
        title: r.title,
        description: r.description,
        category: r.category,
        fileUrl: '/constitution',
        fileSize: r.fileSize,
        fileFormat: r.fileFormat || r.format || 'PDF',
        publishDate: r.publishDate,
        published: true,
      });
    }
  }

  // Check chapters
  const chapSnap = await getDocs(collection(db, 'chapters'));
  if (chapSnap.empty) {
    for (const c of REGIONAL_CHAPTERS) {
      await setDoc(doc(db, 'chapters', c.id), {
        id: c.id,
        region: c.name,
        country: c.countries.join(', '),
        chapterName: c.name,
        coordinator: c.coordinator || 'Regional Bureau Interim Secretariat',
        contactInfo: 'aylafrica.org@gmail.com',
        description: `Covers ${c.countries.length} nations across the region with focal hub situated in ${c.focalHub}.`,
        status: 'Active Focal Hub',
        published: true,
        focalHub: c.focalHub,
        regionalPriorities: c.regionalPriorities,
        keyFocus: c.keyFocus,
      });
    }
  }

  await logActivity('SEED_BASELINE', 'Database', 'Synchronized baseline AYLA organizational data to Firestore', adminEmail);
}

// ==========================================
// 14. ADMIN ROSTER & AUDIT LOGS
// ==========================================
export function subscribeToAdmins(callback: (admins: any[]) => void) {
  const colRef = collection(db, 'admins');
  return onSnapshot(
    colRef,
    (snapshot) => {
      const items = snapshot.docs.map((d) => ({
        id: d.id,
        uid: d.id,
        ...d.data(),
      }));
      callback(items);
    },
    (err) => {
      console.warn('Error fetching admin roster:', err);
      callback([]);
    }
  );
}

export async function saveAdminUser(
  adminData: {
    email: string;
    displayName: string;
    role: string;
    active: boolean;
  },
  actingAdminEmail?: string
) {
  const sanitizedId = adminData.email.replace(/[^a-zA-Z0-9]/g, '_');
  const docRef = doc(db, 'admins', sanitizedId);
  const data = {
    ...adminData,
    uid: sanitizedId,
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
  };
  await setDoc(docRef, data, { merge: true });
  await logActivity('SAVE_ADMIN', 'Security', `Updated admin permissions for ${adminData.email} (${adminData.role})`, actingAdminEmail);
}

export async function revokeAdminUser(adminId: string, adminEmailOrActor?: string, maybeActor?: string) {
  const actor = maybeActor || adminEmailOrActor;
  const target = maybeActor ? adminEmailOrActor : adminId;
  const docRef = doc(db, 'admins', adminId);
  await updateDoc(docRef, { active: false });
  await logActivity('REVOKE_ADMIN', 'Security', `Revoked administrative access for ${target}`, actor);
}

export async function fetchAuditLogs(maxCount = 50): Promise<CmsActivityLog[]> {
  try {
    const colRef = collection(db, 'activity_logs');
    const q = query(colRef, orderBy('timestamp', 'desc'), limit(maxCount));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    })) as CmsActivityLog[];
  } catch (err) {
    console.warn('Error fetching audit logs:', err);
    return [];
  }
}

// ==========================================
// 15. OPPORTUNITIES HUB CMS
// ==========================================
export function subscribeToOpportunities(
  callback: (opportunities: CmsOpportunity[]) => void,
  publishedOnly = false
) {
  const colRef = collection(db, 'opportunities');
  return onSnapshot(
    colRef,
    (snapshot) => {
      if (snapshot.empty) {
        const baseline: CmsOpportunity[] = INITIAL_OPPORTUNITIES;
        callback(publishedOnly ? baseline.filter((x) => x.published) : baseline);
        return;
      }
      let items = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      })) as CmsOpportunity[];

      items.sort((a, b) => new Date(b.createdAt || b.publishedDate || 0).getTime() - new Date(a.createdAt || a.publishedDate || 0).getTime());
      if (publishedOnly) {
        items = items.filter((x) => x.published);
      }
      callback(items);
    },
    (err) => {
      console.warn('Error subscribing to opportunities:', err);
      callback(publishedOnly ? INITIAL_OPPORTUNITIES.filter((x) => x.published) : INITIAL_OPPORTUNITIES);
    }
  );
}

export async function saveOpportunity(
  opportunity: Partial<CmsOpportunity> & { title: string },
  adminEmail?: string
) {
  const isNew = !opportunity.id;
  const oppId = opportunity.id || `opp-${Date.now()}`;
  const docRef = doc(db, 'opportunities', oppId);
  const data: CmsOpportunity = {
    id: oppId,
    title: opportunity.title,
    organization: opportunity.organization || 'AYLA Youth Network Partner',
    description: opportunity.description || '',
    category: opportunity.category || 'Other Youth Opportunities',
    country: opportunity.country || 'Pan-African',
    region: opportunity.region || 'All African Union Regions',
    eligibility: opportunity.eligibility || 'Open to African youth aged 18–35',
    applicationDeadline: opportunity.applicationDeadline || 'Rolling Application',
    applicationOpeningDate: opportunity.applicationOpeningDate || '',
    applicationLink: opportunity.applicationLink || '#',
    featuredImage: opportunity.featuredImage || '',
    tags: opportunity.tags || ['Youth', 'Africa'],
    publishedDate: opportunity.publishedDate || new Date().toISOString().split('T')[0],
    featured: opportunity.featured ?? false,
    published: opportunity.published ?? true,
    createdAt: opportunity.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  await setDoc(docRef, data, { merge: true });
  await logActivity(
    isNew ? 'CREATE_OPPORTUNITY' : 'UPDATE_OPPORTUNITY',
    'Opportunities',
    `${isNew ? 'Created' : 'Updated'} opportunity: ${data.title}`,
    adminEmail
  );
}

export async function deleteOpportunity(id: string, adminEmail?: string) {
  const docRef = doc(db, 'opportunities', id);
  await deleteDoc(docRef);
  await logActivity('DELETE_OPPORTUNITY', 'Opportunities', `Deleted opportunity ${id}`, adminEmail);
}

export async function toggleOpportunityStatus(id: string, field: 'published' | 'featured', value: boolean, adminEmail?: string) {
  const docRef = doc(db, 'opportunities', id);
  await updateDoc(docRef, { [field]: value, updatedAt: new Date().toISOString() });
  await logActivity('TOGGLE_OPPORTUNITY', 'Opportunities', `Set ${field} to ${value} for opportunity ${id}`, adminEmail);
}

// ==========================================
// 16. VOLUNTEER WITH AYLA
// ==========================================
export async function submitVolunteerApplication(app: {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  skills: string;
  areaOfInterest: string;
  relevantExperience: string;
  availability: string;
  whyVolunteer: string;
  portfolioUrl?: string;
}) {
  const colRef = collection(db, 'volunteer_applications');
  const docData: CmsVolunteerApplication = {
    id: `vol-${Date.now()}`,
    ...app,
    status: 'pending',
    submittedAt: new Date().toISOString(),
  };
  await addDoc(colRef, docData);
  await notifyAylaAdministration(`New Volunteer Application: ${app.fullName} (${app.areaOfInterest})`, {
    fullName: app.fullName,
    email: app.email,
    phone: app.phone,
    country: app.country,
    areaOfInterest: app.areaOfInterest,
    submittedAt: new Date().toISOString(),
  });
  await logActivity('VOLUNTEER_APPLICATION', 'Volunteers', `New volunteer application received from ${app.fullName} (${app.country})`);
}

export function subscribeToVolunteerApplications(callback: (apps: CmsVolunteerApplication[]) => void) {
  const colRef = collection(db, 'volunteer_applications');
  return onSnapshot(
    colRef,
    (snapshot) => {
      const items = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })) as CmsVolunteerApplication[];
      items.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
      callback(items);
    },
    (err) => {
      console.warn('Error subscribing to volunteer applications:', err);
      callback([]);
    }
  );
}

export async function updateVolunteerApplicationStatus(
  id: string,
  status: 'pending' | 'reviewed' | 'approved' | 'rejected' | 'archived',
  notes?: string,
  adminEmail?: string
) {
  const docRef = doc(db, 'volunteer_applications', id);
  await updateDoc(docRef, {
    status,
    notes: notes || '',
    updatedAt: new Date().toISOString(),
  });
  await logActivity('UPDATE_VOLUNTEER_STATUS', 'Volunteers', `Updated application ${id} status to ${status}`, adminEmail);
}

export async function deleteVolunteerApplication(id: string, adminEmail?: string) {
  const docRef = doc(db, 'volunteer_applications', id);
  await deleteDoc(docRef);
  await logActivity('DELETE_VOLUNTEER', 'Volunteers', `Deleted volunteer application ${id}`, adminEmail);
}

// ==========================================
// 17. AYLA LEADERSHIP ACADEMY
// ==========================================
export function subscribeToAcademyCourses(
  callback: (courses: CmsAcademyCourse[]) => void,
  publishedOnly = false
) {
  const colRef = collection(db, 'academy_courses');
  return onSnapshot(
    colRef,
    (snapshot) => {
      if (snapshot.empty) {
        const baseline: CmsAcademyCourse[] = INITIAL_ACADEMY_COURSES;
        callback(publishedOnly ? baseline.filter((x) => x.published) : baseline);
        return;
      }
      let items = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })) as CmsAcademyCourse[];
      items.sort((a, b) => (a.displayOrder || 99) - (b.displayOrder || 99));
      if (publishedOnly) {
        items = items.filter((x) => x.published);
      }
      callback(items);
    },
    (err) => {
      console.warn('Error subscribing to academy courses:', err);
      callback(publishedOnly ? INITIAL_ACADEMY_COURSES.filter((x) => x.published) : INITIAL_ACADEMY_COURSES);
    }
  );
}

export async function saveAcademyCourse(
  course: Partial<CmsAcademyCourse> & { title: string },
  adminEmail?: string
) {
  const isNew = !course.id;
  const courseId = course.id || `acad-${Date.now()}`;
  const docRef = doc(db, 'academy_courses', courseId);
  const data: CmsAcademyCourse = {
    id: courseId,
    title: course.title,
    description: course.description || '',
    instructor: course.instructor || 'AYLA Academy Faculty Council',
    instructorTitle: course.instructorTitle || 'Senior Fellow',
    category: course.category || 'Leadership Development',
    duration: course.duration || '4 Weeks',
    deliveryMethod: course.deliveryMethod || 'Online',
    startDate: course.startDate || 'Upcoming Cohort',
    registrationDeadline: course.registrationDeadline || 'To be announced',
    eligibility: course.eligibility || 'Open to registered AYLA members',
    learningOutcomes: course.learningOutcomes || [],
    registrationButtonText: course.registrationButtonText || 'Enroll Now',
    registrationUrl: course.registrationUrl || '#/membership/register',
    relatedResources: course.relatedResources || [],
    certificateAvailable: course.certificateAvailable ?? false,
    featured: course.featured ?? false,
    published: course.published ?? true,
    displayOrder: course.displayOrder || 1,
    image: course.image || '',
    createdAt: course.createdAt || new Date().toISOString(),
  };

  await setDoc(docRef, data, { merge: true });
  await logActivity(
    isNew ? 'CREATE_COURSE' : 'UPDATE_COURSE',
    'Academy',
    `${isNew ? 'Created' : 'Updated'} course: ${data.title}`,
    adminEmail
  );
}

export async function deleteAcademyCourse(id: string, adminEmail?: string) {
  const docRef = doc(db, 'academy_courses', id);
  await deleteDoc(docRef);
  await logActivity('DELETE_COURSE', 'Academy', `Deleted course ${id}`, adminEmail);
}

// ==========================================
// 18. AYLA CERTIFICATES & VERIFICATION
// ==========================================
export function subscribeToCertificates(callback: (certs: CmsCertificate[]) => void) {
  const colRef = collection(db, 'certificates');
  return onSnapshot(
    colRef,
    (snapshot) => {
      if (snapshot.empty) {
        callback(INITIAL_VERIFIED_CERTIFICATES);
        return;
      }
      const items = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })) as CmsCertificate[];
      items.sort((a, b) => new Date(b.issueDate || 0).getTime() - new Date(a.issueDate || 0).getTime());
      callback(items);
    },
    (err) => {
      console.warn('Error subscribing to certificates:', err);
      callback(INITIAL_VERIFIED_CERTIFICATES);
    }
  );
}

export async function verifyCertificateByNumber(
  certNumberQuery: string
): Promise<{ found: boolean; certificate?: CmsCertificate; status: 'Valid' | 'Invalid' | 'NotFound' }> {
  const cleanNumber = certNumberQuery.trim().toUpperCase();
  if (!cleanNumber) {
    return { found: false, status: 'NotFound' };
  }

  try {
    const colRef = collection(db, 'certificates');
    const q = query(colRef, where('certificateNumber', '==', cleanNumber));
    const snap = await getDocs(q);

    if (!snap.empty) {
      const cert = snap.docs[0].data() as CmsCertificate;
      return {
        found: true,
        certificate: cert,
        status: cert.isValid ? 'Valid' : 'Invalid',
      };
    }
  } catch (err) {
    console.warn('Firestore query failed for certificate, checking baseline cache:', err);
  }

  // Fallback to baseline verified registry
  const match = INITIAL_VERIFIED_CERTIFICATES.find(
    (c) => c.certificateNumber.toUpperCase() === cleanNumber || c.verificationCode.toUpperCase() === cleanNumber
  );

  if (match) {
    return {
      found: true,
      certificate: match,
      status: match.isValid ? 'Valid' : 'Invalid',
    };
  }

  return { found: false, status: 'NotFound' };
}

export async function saveCertificate(cert: Partial<CmsCertificate> & { recipientName: string; certificateNumber: string }, adminEmail?: string) {
  const isNew = !cert.id;
  const certId = cert.id || `cert-${Date.now()}`;
  const docRef = doc(db, 'certificates', certId);
  const data: CmsCertificate = {
    id: certId,
    certificateNumber: cert.certificateNumber.trim().toUpperCase(),
    verificationCode: cert.verificationCode || `AYLA-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
    recipientName: cert.recipientName,
    programme: cert.programme || 'Continental Leadership Programme',
    certificateType: cert.certificateType || 'Programme Participation',
    issueDate: cert.issueDate || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    issuingAuthority: cert.issuingAuthority || 'AYLA Continental Secretariat',
    isValid: cert.isValid ?? true,
    notes: cert.notes || '',
    createdAt: cert.createdAt || new Date().toISOString(),
  };

  await setDoc(docRef, data, { merge: true });
  await logActivity(
    isNew ? 'ISSUE_CERTIFICATE' : 'UPDATE_CERTIFICATE',
    'Certificates',
    `${isNew ? 'Issued' : 'Updated'} certificate ${data.certificateNumber} for ${data.recipientName}`,
    adminEmail
  );
}

export async function deleteCertificate(id: string, adminEmail?: string) {
  const docRef = doc(db, 'certificates', id);
  await deleteDoc(docRef);
  await logActivity('DELETE_CERTIFICATE', 'Certificates', `Deleted certificate record ${id}`, adminEmail);
}

// ==========================================
// 19. AYLA STORIES — VOICES OF YOUNG AFRICA
// ==========================================
export function subscribeToStories(
  callback: (stories: CmsStory[]) => void,
  publishedOnly = false
) {
  const colRef = collection(db, 'stories');
  return onSnapshot(
    colRef,
    (snapshot) => {
      if (snapshot.empty) {
        callback(publishedOnly ? INITIAL_STORIES.filter((x) => x.published) : INITIAL_STORIES);
        return;
      }
      let items = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })) as CmsStory[];
      items.sort((a, b) => new Date(b.publicationDate || 0).getTime() - new Date(a.publicationDate || 0).getTime());
      if (publishedOnly) {
        items = items.filter((x) => x.published);
      }
      callback(items);
    },
    (err) => {
      console.warn('Error subscribing to stories:', err);
      callback(publishedOnly ? INITIAL_STORIES.filter((x) => x.published) : INITIAL_STORIES);
    }
  );
}

export async function saveStory(
  story: Partial<CmsStory> & { title: string; personName: string },
  adminEmail?: string
) {
  const isNew = !story.id;
  const storyId = story.id || `story-${Date.now()}`;
  const docRef = doc(db, 'stories', storyId);
  const slug = story.slug || story.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const data: CmsStory = {
    id: storyId,
    title: story.title,
    slug,
    personName: story.personName,
    country: story.country || 'Pan-African',
    chapter: story.chapter || '',
    role: story.role || 'AYLA Member',
    profileImage: story.profileImage || '',
    story: story.story || '',
    featuredImage: story.featuredImage || '',
    publicationDate: story.publicationDate || new Date().toISOString().split('T')[0],
    category: story.category || 'Member Stories',
    published: story.published ?? true,
    featured: story.featured ?? false,
    createdAt: story.createdAt || new Date().toISOString(),
  };

  await setDoc(docRef, data, { merge: true });
  await logActivity(
    isNew ? 'CREATE_STORY' : 'UPDATE_STORY',
    'Stories',
    `${isNew ? 'Created' : 'Updated'} story: ${data.title} (${data.personName})`,
    adminEmail
  );
}

export async function deleteStory(id: string, adminEmail?: string) {
  const docRef = doc(db, 'stories', id);
  await deleteDoc(docRef);
  await logActivity('DELETE_STORY', 'Stories', `Deleted story ${id}`, adminEmail);
}

// ==========================================
// 20. AYLA JOURNEY / TIMELINE
// ==========================================
export function subscribeToMilestones(
  callback: (milestones: CmsMilestone[]) => void,
  publishedOnly = false
) {
  const colRef = collection(db, 'milestones');
  return onSnapshot(
    colRef,
    (snapshot) => {
      if (snapshot.empty) {
        callback(publishedOnly ? INITIAL_MILESTONES.filter((x) => x.published) : INITIAL_MILESTONES);
        return;
      }
      let items = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })) as CmsMilestone[];
      items.sort((a, b) => (a.displayOrder || 99) - (b.displayOrder || 99));
      if (publishedOnly) {
        items = items.filter((x) => x.published);
      }
      callback(items);
    },
    (err) => {
      console.warn('Error subscribing to milestones:', err);
      callback(publishedOnly ? INITIAL_MILESTONES.filter((x) => x.published) : INITIAL_MILESTONES);
    }
  );
}

export async function saveMilestone(
  milestone: Partial<CmsMilestone> & { title: string; year: string },
  adminEmail?: string
) {
  const isNew = !milestone.id;
  const msId = milestone.id || `ms-${Date.now()}`;
  const docRef = doc(db, 'milestones', msId);
  const data: CmsMilestone = {
    id: msId,
    year: milestone.year,
    dateOrMonth: milestone.dateOrMonth || '',
    title: milestone.title,
    category: milestone.category || 'Important Institutional Milestones',
    description: milestone.description || '',
    location: milestone.location || '',
    verified: milestone.verified ?? true,
    published: milestone.published ?? true,
    displayOrder: milestone.displayOrder || 1,
  };

  await setDoc(docRef, data, { merge: true });
  await logActivity(
    isNew ? 'CREATE_MILESTONE' : 'UPDATE_MILESTONE',
    'Journey',
    `${isNew ? 'Added' : 'Updated'} milestone: ${data.title} (${data.year})`,
    adminEmail
  );
}

export async function deleteMilestone(id: string, adminEmail?: string) {
  const docRef = doc(db, 'milestones', id);
  await deleteDoc(docRef);
  await logActivity('DELETE_MILESTONE', 'Journey', `Deleted milestone ${id}`, adminEmail);
}

// ==========================================
// 21. FAQ SYSTEM
// ==========================================
export function subscribeToFaqs(
  callback: (faqs: CmsFaqItem[]) => void,
  publishedOnly = false
) {
  const colRef = collection(db, 'faqs');
  return onSnapshot(
    colRef,
    (snapshot) => {
      if (snapshot.empty) {
        callback(publishedOnly ? INITIAL_FAQS.filter((x) => x.published) : INITIAL_FAQS);
        return;
      }
      let items = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })) as CmsFaqItem[];
      items.sort((a, b) => (a.displayOrder || 99) - (b.displayOrder || 99));
      if (publishedOnly) {
        items = items.filter((x) => x.published);
      }
      callback(items);
    },
    (err) => {
      console.warn('Error subscribing to faqs:', err);
      callback(publishedOnly ? INITIAL_FAQS.filter((x) => x.published) : INITIAL_FAQS);
    }
  );
}

export async function saveFaq(
  faq: Partial<CmsFaqItem> & { question: string; answer: string },
  adminEmail?: string
) {
  const isNew = !faq.id;
  const faqId = faq.id || `faq-${Date.now()}`;
  const docRef = doc(db, 'faqs', faqId);
  const data: CmsFaqItem = {
    id: faqId,
    question: faq.question,
    answer: faq.answer,
    category: faq.category || 'GENERAL',
    displayOrder: faq.displayOrder || 1,
    published: faq.published ?? true,
  };

  await setDoc(docRef, data, { merge: true });
  await logActivity(
    isNew ? 'CREATE_FAQ' : 'UPDATE_FAQ',
    'FAQs',
    `${isNew ? 'Created' : 'Updated'} FAQ: ${data.question.substring(0, 40)}...`,
    adminEmail
  );
}

export async function deleteFaq(id: string, adminEmail?: string) {
  const docRef = doc(db, 'faqs', id);
  await deleteDoc(docRef);
  await logActivity('DELETE_FAQ', 'FAQs', `Deleted FAQ ${id}`, adminEmail);
}

// ==========================================
// 22. COMMUNITY LINKS
// ==========================================
export function subscribeToCommunityLinks(callback: (links: CmsCommunityLink[]) => void) {
  const colRef = collection(db, 'community_channels');
  return onSnapshot(
    colRef,
    (snapshot) => {
      if (snapshot.empty) {
        const baseline: CmsCommunityLink[] = OFFICIAL_SOCIAL_CHANNELS.map((ch, idx) => ({
          id: ch.id,
          platform: ch.shortName,
          name: ch.name,
          url: ch.url,
          handle: ch.handle,
          description: ch.description,
          displayOrder: idx + 1,
          active: true,
        }));
        callback(baseline);
        return;
      }
      const items = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })) as CmsCommunityLink[];
      items.sort((a, b) => (a.displayOrder || 99) - (b.displayOrder || 99));
      callback(items);
    },
    (err) => {
      console.warn('Error subscribing to community links:', err);
      const baseline: CmsCommunityLink[] = OFFICIAL_SOCIAL_CHANNELS.map((ch, idx) => ({
        id: ch.id,
        platform: ch.shortName,
        name: ch.name,
        url: ch.url,
        handle: ch.handle,
        description: ch.description,
        displayOrder: idx + 1,
        active: true,
      }));
      callback(baseline);
    }
  );
}

export async function saveCommunityLink(link: Partial<CmsCommunityLink> & { name: string; url: string }, adminEmail?: string) {
  const isNew = !link.id;
  const linkId = link.id || `comm-${Date.now()}`;
  const docRef = doc(db, 'community_channels', linkId);
  const data: CmsCommunityLink = {
    id: linkId,
    platform: link.platform || 'Community Channel',
    name: link.name,
    url: link.url,
    handle: link.handle || '',
    description: link.description || '',
    region: link.region || '',
    displayOrder: link.displayOrder || 1,
    active: link.active ?? true,
  };

  await setDoc(docRef, data, { merge: true });
  await logActivity(
    isNew ? 'CREATE_COMMUNITY_LINK' : 'UPDATE_COMMUNITY_LINK',
    'Community',
    `${isNew ? 'Created' : 'Updated'} community channel: ${data.name}`,
    adminEmail
  );
}

export async function deleteCommunityLink(id: string, adminEmail?: string) {
  const docRef = doc(db, 'community_channels', id);
  await deleteDoc(docRef);
  await logActivity('DELETE_COMMUNITY_LINK', 'Community', `Deleted community link ${id}`, adminEmail);
}

// ==========================================
// 23. IMPACT METRICS
// ==========================================
export function subscribeToImpactMetrics(callback: (metrics: CmsImpactMetric[]) => void) {
  const colRef = collection(db, 'impact_metrics');
  return onSnapshot(
    colRef,
    (snapshot) => {
      if (snapshot.empty) {
        const baseline: CmsImpactMetric[] = IMPACT_METRICS.map((m, idx) => ({
          id: m.editableKey,
          key: m.editableKey,
          label: m.label,
          value: m.value,
          note: m.note,
          displayOrder: idx + 1,
          published: true,
        }));
        callback(baseline);
        return;
      }
      const items = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })) as CmsImpactMetric[];
      items.sort((a, b) => (a.displayOrder || 99) - (b.displayOrder || 99));
      callback(items);
    },
    (err) => {
      console.warn('Error subscribing to impact metrics:', err);
      const baseline: CmsImpactMetric[] = IMPACT_METRICS.map((m, idx) => ({
        id: m.editableKey,
        key: m.editableKey,
        label: m.label,
        value: m.value,
        note: m.note,
        displayOrder: idx + 1,
        published: true,
      }));
      callback(baseline);
    }
  );
}

export async function saveImpactMetric(metric: Partial<CmsImpactMetric> & { label: string; value: string }, adminEmail?: string) {
  const isNew = !metric.id;
  const metricId = metric.id || `metric-${Date.now()}`;
  const docRef = doc(db, 'impact_metrics', metricId);
  const data: CmsImpactMetric = {
    id: metricId,
    key: metric.key || metricId,
    label: metric.label,
    value: metric.value,
    note: metric.note || '',
    displayOrder: metric.displayOrder || 1,
    published: metric.published ?? true,
  };

  await setDoc(docRef, data, { merge: true });
  await logActivity(
    isNew ? 'CREATE_METRIC' : 'UPDATE_METRIC',
    'Metrics',
    `${isNew ? 'Created' : 'Updated'} impact metric: ${data.label} = ${data.value}`,
    adminEmail
  );
}

export async function deleteImpactMetric(id: string, adminEmail?: string) {
  const docRef = doc(db, 'impact_metrics', id);
  await deleteDoc(docRef);
  await logActivity('DELETE_METRIC', 'Metrics', `Deleted impact metric ${id}`, adminEmail);
}

// ==========================================
// 24. JOIN THE AYLA TEAM
// ==========================================
export async function submitTeamApplication(app: {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  department: string;
  experience: string;
  motivation: string;
  portfolioUrl?: string;
  availability: string;
}) {
  const colRef = collection(db, 'team_applications');
  const docData: CmsTeamApplication = {
    id: `team-${Date.now()}`,
    ...app,
    status: 'pending',
    submittedAt: new Date().toISOString(),
  };
  await addDoc(colRef, docData);
  await notifyAylaAdministration(`New Team Application: ${app.fullName} (${app.department})`, {
    fullName: app.fullName,
    email: app.email,
    phone: app.phone,
    department: app.department,
    country: app.country,
    submittedAt: new Date().toISOString(),
  });
  await logActivity('TEAM_APPLICATION', 'Team', `New application for ${app.department} from ${app.fullName}`);
}

export function subscribeToTeamApplications(callback: (apps: CmsTeamApplication[]) => void) {
  const colRef = collection(db, 'team_applications');
  return onSnapshot(
    colRef,
    (snapshot) => {
      const items = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })) as CmsTeamApplication[];
      items.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
      callback(items);
    },
    (err) => {
      console.warn('Error subscribing to team applications:', err);
      callback([]);
    }
  );
}

export async function updateTeamApplicationStatus(
  id: string,
  status: 'pending' | 'reviewed' | 'interview' | 'approved' | 'rejected' | 'archived',
  notes?: string,
  adminEmail?: string
) {
  const docRef = doc(db, 'team_applications', id);
  await updateDoc(docRef, {
    status,
    notes: notes || '',
    updatedAt: new Date().toISOString(),
  });
  await logActivity('UPDATE_TEAM_STATUS', 'Team', `Updated application ${id} status to ${status}`, adminEmail);
}

export async function deleteTeamApplication(id: string, adminEmail?: string) {
  const docRef = doc(db, 'team_applications', id);
  await deleteDoc(docRef);
  await logActivity('DELETE_TEAM_APP', 'Team', `Deleted team application ${id}`, adminEmail);
}

// ==========================================
// 25. AYLA VIDEO / MEDIA STORIES (WATCH AYLA)
// ==========================================
export function subscribeToVideos(
  callback: (videos: CmsVideo[]) => void,
  publishedOnly = false
) {
  const colRef = collection(db, 'videos');
  return onSnapshot(
    colRef,
    (snapshot) => {
      if (snapshot.empty) {
        callback(publishedOnly ? INITIAL_VIDEOS.filter((x) => x.published) : INITIAL_VIDEOS);
        return;
      }
      let items = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })) as CmsVideo[];
      items.sort((a, b) => (a.displayOrder || 99) - (b.displayOrder || 99));
      if (publishedOnly) {
        items = items.filter((x) => x.published);
      }
      callback(items);
    },
    (err) => {
      console.warn('Error subscribing to videos:', err);
      callback(publishedOnly ? INITIAL_VIDEOS.filter((x) => x.published) : INITIAL_VIDEOS);
    }
  );
}

export async function saveVideo(
  video: Partial<CmsVideo> & { title: string; videoUrl: string },
  adminEmail?: string
) {
  const isNew = !video.id;
  const vidId = video.id || `vid-${Date.now()}`;
  const docRef = doc(db, 'videos', vidId);
  const data: CmsVideo = {
    id: vidId,
    title: video.title,
    videoUrl: video.videoUrl,
    description: video.description || '',
    thumbnail: video.thumbnail || '',
    category: video.category || 'AYLA Institutional Video',
    featured: video.featured ?? false,
    published: video.published ?? true,
    displayOrder: video.displayOrder || 1,
    createdAt: video.createdAt || new Date().toISOString(),
  };

  await setDoc(docRef, data, { merge: true });
  await logActivity(
    isNew ? 'CREATE_VIDEO' : 'UPDATE_VIDEO',
    'Videos',
    `${isNew ? 'Added' : 'Updated'} video: ${data.title}`,
    adminEmail
  );
}

export async function deleteVideo(id: string, adminEmail?: string) {
  const docRef = doc(db, 'videos', id);
  await deleteDoc(docRef);
  await logActivity('DELETE_VIDEO', 'Videos', `Deleted video ${id}`, adminEmail);
}

