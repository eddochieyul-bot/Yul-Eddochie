import React, { useState } from 'react';
import { recordMembershipApplication, generateInstitutionalMembershipId, assignMembershipId } from '../../../firebase/cmsService';
import { useAdminAuth } from '../../../context/AdminAuthContext';
import {
  FileSpreadsheet,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  X,
  ExternalLink,
  Users,
  Check,
} from 'lucide-react';

interface ImportGoogleFormCsvModalProps {
  onClose: () => void;
  onImportComplete: () => void;
}

const OFFICIAL_GOOGLE_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSd96IKbbyBeVbfmNfkTEhwNkwiPiVWJFYoRST7vk6uyC6knzQ/viewform?usp=header';

export function ImportGoogleFormCsvModal({
  onClose,
  onImportComplete,
}: ImportGoogleFormCsvModalProps) {
  const { user } = useAdminAuth();
  const [csvData, setCsvData] = useState<any[]>([]);
  const [fileName, setFileName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [autoGenerateIds, setAutoGenerateIds] = useState(true);
  const [autoApprove, setAutoApprove] = useState(true);
  const [importedCount, setImportedCount] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const parseCsvText = (text: string) => {
    try {
      const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
      if (lines.length < 2) {
        setErrorMessage('The uploaded CSV file does not contain enough data rows.');
        return;
      }

      // Simple CSV header parser
      const parseRow = (rowStr: string) => {
        const result: string[] = [];
        let cur = '';
        let inQuotes = false;
        for (let i = 0; i < rowStr.length; i++) {
          const char = rowStr[i];
          if (char === '"' && (i === 0 || rowStr[i - 1] !== '\\')) {
            inQuotes = !inQuotes;
          } else if (char === ',' && !inQuotes) {
            result.push(cur.trim().replace(/^"|"$/g, ''));
            cur = '';
          } else {
            cur += char;
          }
        }
        result.push(cur.trim().replace(/^"|"$/g, ''));
        return result;
      };

      const headers = parseRow(lines[0]).map((h) => h.toLowerCase());

      // Find indices for common Google Form questions
      const nameIndex = headers.findIndex((h) => h.includes('name') || h.includes('full'));
      const emailIndex = headers.findIndex((h) => h.includes('email') || h.includes('mail'));
      const phoneIndex = headers.findIndex((h) => h.includes('phone') || h.includes('tel') || h.includes('whatsapp') || h.includes('contact'));
      const countryIndex = headers.findIndex((h) => h.includes('country') || h.includes('residence') || h.includes('location'));
      const nationalityIndex = headers.findIndex((h) => h.includes('nationality') || h.includes('citizen') || h.includes('state'));
      const chapterIndex = headers.findIndex((h) => h.includes('chapter') || h.includes('region'));
      const categoryIndex = headers.findIndex((h) => h.includes('category') || h.includes('tier') || h.includes('role'));
      const motivationIndex = headers.findIndex((h) => h.includes('motivation') || h.includes('statement') || h.includes('why'));

      const parsedRecords: any[] = [];

      for (let i = 1; i < lines.length; i++) {
        const cols = parseRow(lines[i]);
        if (cols.length === 0 || !cols.some((c) => c.length > 0)) continue;

        const email = emailIndex !== -1 ? cols[emailIndex] : cols.find((c) => c.includes('@')) || '';
        const fullName = nameIndex !== -1 ? cols[nameIndex] : cols[1] || 'Registered Delegate';
        const phone = phoneIndex !== -1 ? cols[phoneIndex] : '';
        const country = countryIndex !== -1 ? cols[countryIndex] : '';
        const nationality = nationalityIndex !== -1 ? cols[nationalityIndex] : country;
        const chapter = chapterIndex !== -1 ? cols[chapterIndex] : 'Continental Assembly';
        const category = categoryIndex !== -1 ? cols[categoryIndex] : 'Accredited Youth Delegate';
        const motivation = motivationIndex !== -1 ? cols[motivationIndex] : '';

        if (fullName || email) {
          parsedRecords.push({
            fullName: fullName.trim(),
            email: email.trim(),
            phone: phone.trim(),
            countryOfResidence: country.trim() || 'Africa',
            nationality: nationality.trim() || country.trim() || 'African',
            chapterOfInterest: chapter.trim(),
            membershipCategory: category.trim(),
            motivationStatement: motivation.trim(),
            source: 'Google Forms CSV Import',
          });
        }
      }

      setCsvData(parsedRecords);
      setErrorMessage(null);
    } catch (e: any) {
      setErrorMessage('Failed to parse CSV file: ' + e.message);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      parseCsvText(content);
    };
    reader.readAsText(file);
  };

  const handleExecuteImport = async () => {
    if (csvData.length === 0) return;
    setIsProcessing(true);
    let successCount = 0;

    try {
      for (const record of csvData) {
        // Record in Firestore
        const appId = await recordMembershipApplication(record);

        // If auto-generate IDs and approve
        if (autoGenerateIds && appId) {
          const generatedId = generateInstitutionalMembershipId(
            record.countryOfResidence || record.nationality
          );
          await assignMembershipId(
            appId,
            generatedId,
            record.membershipCategory || 'Accredited Youth Delegate',
            user?.email || undefined
          );
        }
        successCount++;
      }

      setImportedCount(successCount);
      setTimeout(() => {
        onImportComplete();
        onClose();
      }, 2000);
    } catch (err: any) {
      alert('Error during batch import: ' + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full my-8 text-white shadow-2xl relative max-h-[92vh] flex flex-col">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white font-['Outfit']">
                Import Google Form Registrations
              </h2>
              <p className="text-xs text-slate-400">
                Bulk upload responses from the official AYLA membership registration form
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

        {importedCount !== null ? (
          <div className="py-12 text-center space-y-4 my-auto">
            <div className="w-14 h-14 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white font-['Outfit']">
              Successfully Imported {importedCount} Members!
            </h3>
            <p className="text-xs text-slate-300 max-w-md mx-auto">
              All member profiles and membership IDs have been registered into the AYLA Institutional Database.
            </p>
          </div>
        ) : (
          <div className="space-y-5 flex-1 overflow-y-auto pr-1">
            {/* Form Info Box */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <div className="font-semibold text-white">How to export responses from Google Forms:</div>
                <div className="text-slate-400 text-[11px] mt-0.5">
                  In Google Forms &gt; <em>Responses</em> tab &gt; click <em>View in Sheets</em> &gt; <em>File</em> &gt; <em>Download</em> &gt; <em>Comma Separated Values (.csv)</em>.
                </div>
              </div>
              <a
                href={OFFICIAL_GOOGLE_FORM_URL}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 font-semibold text-xs transition-colors flex items-center gap-1.5 whitespace-nowrap self-start sm:self-auto"
              >
                <span>Open Google Form</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Drag & Drop / File Input */}
            <label className="border-2 border-dashed border-slate-700 hover:border-amber-500/60 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-slate-950/40">
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="hidden"
              />
              <UploadCloud className="w-10 h-10 text-amber-400 mb-3" />
              <span className="text-sm font-bold text-white mb-1">
                {fileName ? fileName : 'Choose CSV file or drag & drop here'}
              </span>
              <span className="text-xs text-slate-400">
                Accepts official Google Form responses export (.csv)
              </span>
            </label>

            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-800 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Parsed Preview */}
            {csvData.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-white flex items-center gap-2">
                    <Users className="w-4 h-4 text-amber-400" />
                    <span>Detected {csvData.length} Applicant Record(s)</span>
                  </div>
                </div>

                <div className="max-h-40 overflow-y-auto rounded-xl border border-slate-800 bg-slate-950/80 divide-y divide-slate-800/60 text-xs">
                  {csvData.slice(0, 10).map((row, idx) => (
                    <div key={idx} className="p-2.5 flex items-center justify-between gap-2">
                      <div className="font-semibold text-white truncate max-w-[200px]">
                        {row.fullName}
                      </div>
                      <div className="text-slate-400 font-mono text-[11px] truncate max-w-[180px]">
                        {row.email}
                      </div>
                      <div className="text-emerald-400 text-[10px] whitespace-nowrap">
                        {row.countryOfResidence || 'Africa'}
                      </div>
                    </div>
                  ))}
                  {csvData.length > 10 && (
                    <div className="p-2 text-center text-slate-500 text-[11px]">
                      + {csvData.length - 10} more records in file
                    </div>
                  )}
                </div>

                {/* Options */}
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={autoGenerateIds}
                      onChange={(e) => setAutoGenerateIds(e.target.checked)}
                      className="rounded accent-amber-500"
                    />
                    <span>Auto-generate official Pan-African Membership IDs (AYLA-XX-2026-XXXX)</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={autoApprove}
                      onChange={(e) => setAutoApprove(e.target.checked)}
                      className="rounded accent-amber-500"
                    />
                    <span>Automatically grant accredited membership status</span>
                  </label>
                </div>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleExecuteImport}
                disabled={csvData.length === 0 || isProcessing}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Check className="w-4 h-4" />
                <span>{isProcessing ? 'Importing...' : `Import ${csvData.length} Records`}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
