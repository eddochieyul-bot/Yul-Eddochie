import React, { useState, useEffect } from 'react';
import { CmsMembershipApplication } from '../../../firebase/types';
import {
  generateInstitutionalMembershipId,
  assignMembershipId,
} from '../../../firebase/cmsService';
import { useAdminAuth } from '../../../context/AdminAuthContext';
import {
  CreditCard,
  RefreshCw,
  CheckCircle2,
  X,
  Shield,
  Sparkles,
  User,
  Globe,
} from 'lucide-react';

interface GenerateMembershipIdModalProps {
  member: CmsMembershipApplication;
  onClose: () => void;
  onSuccess?: (updatedMember: CmsMembershipApplication) => void;
}

const MEMBERSHIP_TIERS = [
  'Accredited Youth Delegate',
  'Ordinary Member',
  'Chapter Executive',
  'Continental Fellow',
  'Associate Member',
  'Institutional Partner Delegate',
];

export function GenerateMembershipIdModal({
  member,
  onClose,
  onSuccess,
}: GenerateMembershipIdModalProps) {
  const { user } = useAdminAuth();
  const [customId, setCustomId] = useState('');
  const [selectedTier, setSelectedTier] = useState(
    member.membershipTier || member.membershipCategory || 'Accredited Youth Delegate'
  );
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (member.membershipId) {
      setCustomId(member.membershipId);
    } else {
      const generated = generateInstitutionalMembershipId(
        member.countryOfResidence || member.nationality
      );
      setCustomId(generated);
    }
  }, [member]);

  const handleRegenerate = () => {
    const generated = generateInstitutionalMembershipId(
      member.countryOfResidence || member.nationality
    );
    setCustomId(generated);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customId.trim()) {
      alert('Membership ID cannot be blank.');
      return;
    }

    setIsSaving(true);
    try {
      await assignMembershipId(
        member.id,
        customId.trim().toUpperCase(),
        selectedTier,
        user?.email || undefined
      );

      const updated: CmsMembershipApplication = {
        ...member,
        membershipId: customId.trim().toUpperCase(),
        membershipTier: selectedTier,
        status: 'approved',
        approvedAt: new Date().toISOString(),
      };

      if (onSuccess) {
        onSuccess(updated);
      }
      onClose();
    } catch (err: any) {
      alert('Error assigning Membership ID: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full my-8 text-white shadow-2xl relative">
        {/* Top Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white font-['Outfit']">
                Confer Membership ID
              </h2>
              <p className="text-xs text-slate-400">
                Official accreditation identifier for {member.fullName}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-5">
          {/* Member Summary Header */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <div className="font-bold text-white text-sm">{member.fullName}</div>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-semibold text-[10px]">
                {member.countryOfResidence || member.nationality || 'African Citizen'}
              </span>
            </div>
            <div className="text-slate-400">{member.email}</div>
          </div>

          {/* Membership Tier */}
          <div>
            <label className="text-xs font-semibold text-slate-300 mb-2 block">
              Accreditation Category / Tier
            </label>
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-500 font-medium"
            >
              {MEMBERSHIP_TIERS.map((tier) => (
                <option key={tier} value={tier}>
                  {tier}
                </option>
              ))}
            </select>
          </div>

          {/* Membership ID Generator Input */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Official Alphanumeric Membership ID
              </label>
              <button
                type="button"
                onClick={handleRegenerate}
                className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer font-medium"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Regenerate ID</span>
              </button>
            </div>

            <div className="relative">
              <input
                type="text"
                value={customId}
                onChange={(e) => setCustomId(e.target.value)}
                required
                placeholder="AYLA-NG-2026-XXXX"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-amber-500/40 text-amber-400 font-mono text-base tracking-wider focus:outline-none focus:border-amber-400 uppercase font-bold"
              />
              <Shield className="w-4 h-4 text-amber-400/60 absolute right-4 top-3.5" />
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5">
              Institutional Pan-African schema: <code className="text-slate-300">AYLA-[COUNTRY_CODE]-[YEAR]-[SERIAL]</code>
            </p>
          </div>

          {/* Card Preview */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border border-amber-500/30 text-white shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-[10px] font-black tracking-widest text-amber-400 uppercase">
                AYLA ACCREDITED IDENTITY
              </div>
              <span className="text-[9px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                ACTIVE
              </span>
            </div>

            <div className="text-lg font-bold font-mono tracking-wider text-white">{customId}</div>

            <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800">
              <span className="text-slate-400 truncate max-w-[180px]">{member.fullName}</span>
              <span className="text-amber-300 font-semibold">{selectedTier}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isSaving ? 'Conferring...' : 'Confer & Approve Member'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
