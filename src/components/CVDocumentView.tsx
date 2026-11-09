import React, { useState, useEffect } from 'react';
import { Printer, Copy, Check, Edit3, Save, RotateCcw, Shield, ExternalLink, Mail, Github } from 'lucide-react';
import { CV_DATA, PROJECTS_DATA, DEFAULT_PLACEHOLDERS, UserPlaceholders } from '../data/cvData';

interface CVDocumentViewProps {
  lang: 'en' | 'uz';
}

export const CVDocumentView: React.FC<CVDocumentViewProps> = ({ lang }) => {
  const [placeholders, setPlaceholders] = useState<UserPlaceholders>(() => {
    const saved = localStorage.getItem('i00nit_cv_placeholders');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return DEFAULT_PLACEHOLDERS;
  });

  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [tempFields, setTempFields] = useState<UserPlaceholders>(placeholders);

  useEffect(() => {
    setTempFields(placeholders);
  }, [placeholders]);

  const handleSaveFields = () => {
    setPlaceholders(tempFields);
    localStorage.setItem('i00nit_cv_placeholders', JSON.stringify(tempFields));
    setIsEditing(false);
  };

  const handleResetFields = () => {
    setPlaceholders(DEFAULT_PLACEHOLDERS);
    setTempFields(DEFAULT_PLACEHOLDERS);
    localStorage.removeItem('i00nit_cv_placeholders');
    setIsEditing(false);
  };

  const generatePlainTextATS = () => {
    return `BEHRUZBEK SHARIFJONOV
Junior Cybersecurity Learner & Candidate
Age: 14
Location: ${placeholders.location}
Phone: ${placeholders.phone}
Primary Email: ${CV_DATA.emails[0]}
Secondary Email: ${CV_DATA.emails[1]}
GitHub: ${CV_DATA.githubUrl}
TryHackMe: Top 15% Platform Rank | Hack The Box: @i00nit

==================================================
PROFESSIONAL SUMMARY
==================================================
${CV_DATA.summaryEn}

==================================================
OBJECTIVE
==================================================
- Role Objective: Junior Cybersecurity Intern / Apprentice.

==================================================
CORE TECHNICAL COMPETENCIES
==================================================
- Networking & Protocols: TCP/IP (3-Way Handshake, TCP Flags), Wireshark Packet Inspection, Python Socket Programming, DNS/HTTP/HTTPS analysis.
- Operating Systems & Tools: Kali Linux ISO, Ubuntu WSL, Bash shell scripting, system permissions, process inspection.
- Web Application Security: CWE-601 (Open Redirects), Blind SQL Injection fundamentals, Input Validation, OWASP Top 10 concepts.
- Methodology & Workflow: Reconnaissance (Passive/Active OSINT, Port Scanning), Vulnerability Analysis, Lab PoC Exploitation, Post-Exploitation concepts, Responsible Disclosure Reporting.
- Infrastructure: Data Center (Ma'lumotlar markazi) fundamentals, network segmentation, firewall routing concepts.

==================================================
HANDS-ON LAB PROJECTS & RESEARCH
==================================================
1. Vibe-Scanner-WSL (GitHub: ${CV_DATA.githubUrl}/Vibe-Scanner-WSL)
   - Researched low-level TCP/IP transport mechanics and socket timeouts on Ubuntu WSL.
   - Designed for personal authorized lab environments and network diagnostic learning.

2. python-port-scanner (GitHub: ${CV_DATA.githubUrl}/python-port-scanner)
   - Built a foundational Python socket utility to analyze TCP connection states (SYN-ACK / RST).
   - Designed exclusively as an educational reference for understanding protocol transport.

3. password-security-analyser (GitHub: ${CV_DATA.githubUrl}/password-security-analyser)
   - Developed client-side entropy calculator using Shannon information entropy formulas.
   - Detects sequential keys, repetitions, and weak dictionary patterns with zero network transmission.

4. Vulnerability-Research (GitHub: ${CV_DATA.githubUrl}/Vulnerability-Research)
   - Researched CWE-601 URL redirection vulnerabilities and authored defensive remediation blueprints.
   - Formulated developer remediation guidance (strict domain whitelisting and relative path enforcement).

5. Red-Teamer (GitHub: ${CV_DATA.githubUrl}/Red-Teamer)
   - Structured notebook tracking ethical penetration testing workflows, lab notes, and bug bounty reporting methodology.

==================================================
PRACTICAL PLATFORMS & TRAINING
==================================================
- TryHackMe: Top 15% worldwide rank. Completed 40+ rooms (Linux Fundamentals, Network Services, Web Fundamentals, OWASP Top 10).
- Hack The Box: Active learner (@i00nit), progressing through Starting Point labs.

==================================================
ETHICAL CONDUCT & RESPONSIBLE DISCLOSURE
==================================================
- Strict adherence to authorized testing scopes only (local virtual labs and permitted targets).
- Zero unauthorized testing; commitment to coordinated vulnerability disclosure and user safety.

==================================================
EDUCATION & LANGUAGES
==================================================
- Education: ${placeholders.education}
- Languages: ${placeholders.languages}
`;
  };

  const handleCopyATS = () => {
    navigator.clipboard.writeText(generatePlainTextATS());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-6 sm:py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Action Bar (Hidden during print) */}
        <div className="no-print mb-6 p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span className="text-xs font-mono font-medium text-slate-300">
              {lang === 'en' ? 'ATS-Optimized One-Page Document' : 'ATS Standartlariga Mos Bir Sahifalik CV'}
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-700 bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isEditing ? (lang === 'en' ? 'Close Editor' : 'Tahrirni yopish') : (lang === 'en' ? 'Edit Placeholders' : 'Maydonlarni tahrirlash')}</span>
            </button>

            <button
              onClick={handleCopyATS}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-700 bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              <span>{copied ? (lang === 'en' ? 'Copied to Clipboard!' : 'Nusxalandi!') : (lang === 'en' ? 'Copy ATS Text' : 'Matnni nusxalash')}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Print / Save PDF' : 'Chop etish / PDF'}</span>
            </button>
          </div>
        </div>

        {/* Placeholders Editor Drawer */}
        {isEditing && (
          <div className="no-print mb-6 p-5 rounded-xl bg-slate-900/90 border border-cyan-500/30 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                {lang === 'en' ? 'Customize CV Placeholders (Saved Locally)' : 'CV Maydonlarini Shaxsiylashtirish (Mahalliy saqlanadi)'}
              </h3>
              <button
                onClick={handleResetFields}
                className="text-[11px] text-slate-400 hover:text-rose-400 flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Defaults</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <label className="block text-slate-400 mb-1">Phone Number / Telefon:</label>
                <input
                  type="text"
                  value={tempFields.phone}
                  onChange={(e) => setTempFields({ ...tempFields, phone: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Location / Yashash joyi:</label>
                <input
                  type="text"
                  value={tempFields.location}
                  onChange={(e) => setTempFields({ ...tempFields, location: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-400 mb-1">Education / Ta'lim maqsadlari:</label>
                <input
                  type="text"
                  value={tempFields.education}
                  onChange={(e) => setTempFields({ ...tempFields, education: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-400 mb-1">Languages / Til bilish darajasi:</label>
                <input
                  type="text"
                  value={tempFields.languages}
                  onChange={(e) => setTempFields({ ...tempFields, languages: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsEditing(false)}
                className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveFields}
                className="px-4 py-1.5 text-xs font-bold rounded bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save to CV</span>
              </button>
            </div>
          </div>
        )}

        {/* Printable Paper CV Container */}
        <div className="print-page bg-white text-slate-900 rounded-xl shadow-xl p-8 sm:p-12 border border-slate-200 print:border-none print:shadow-none print:p-0">
          {/* Header Section */}
          <div className="border-b-2 border-slate-900 pb-5 mb-5">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 font-display">
                {CV_DATA.name}
              </h1>
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                {lang === 'en' ? 'Junior Cybersecurity Candidate' : 'Junior Kiberxavfsizlik Nomzodi'}
              </span>
            </div>

            <p className="text-sm font-semibold text-slate-700 mt-1">
              {lang === 'en' ? CV_DATA.headlineEn : CV_DATA.headlineUz}
            </p>

            {/* Clean Unboxed Metadata with Typographic Separators */}
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-slate-600 mt-2 font-mono">
              <span>{placeholders.location}</span>
              <span aria-hidden="true" className="text-slate-400">·</span>
              <span>{placeholders.phone}</span>
              <span aria-hidden="true" className="text-slate-400">·</span>
              <a href={`mailto:${CV_DATA.emails[0]}`} className="text-slate-900 hover:underline">
                {CV_DATA.emails[0]}
              </a>
              <span aria-hidden="true" className="text-slate-400">·</span>
              <a href={CV_DATA.githubUrl} target="_blank" rel="noreferrer" className="text-slate-900 hover:underline">
                github.com/{CV_DATA.githubUser}
              </a>
              <span aria-hidden="true" className="text-slate-400">·</span>
              <span className="font-semibold text-slate-900">TryHackMe: Top 15%</span>
              <span aria-hidden="true" className="text-slate-400">·</span>
              <span>HTB: @i00nit</span>
            </div>
          </div>

          {/* Section: Professional Summary */}
          <div className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2 font-display">
              {lang === 'en' ? 'Professional Summary & Candidacy' : 'Nomzod Haqida Qisqacha'}
            </h2>
            <p className="text-xs text-slate-700 leading-relaxed text-justify">
              {lang === 'en' ? CV_DATA.summaryEn : CV_DATA.summaryUz}
            </p>
          </div>

          {/* Section: Core Technical Competencies */}
          <div className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2 font-display">
              {lang === 'en' ? 'Core Technical Competencies' : 'Asosiy Texnik Ko\'nikmalar'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs">
              {CV_DATA.skills.map((skillGroup, idx) => (
                <div key={idx} className="space-y-0.5">
                  <span className="font-bold text-slate-900">
                    {lang === 'en' ? skillGroup.categoryEn : skillGroup.categoryUz}:
                  </span>{' '}
                  <span className="text-slate-700">
                    {skillGroup.items.join(', ')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Lab Projects & Applied Research */}
          <div className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2 font-display">
              {lang === 'en' ? 'Hands-On Lab Projects & Security Research' : 'Amaliy Loyihalar va Tadqiqotlar'}
            </h2>
            <div className="space-y-3">
              {PROJECTS_DATA.map((proj) => (
                <div key={proj.id} className="text-xs">
                  <div className="flex flex-wrap items-baseline justify-between gap-1">
                    <span className="font-bold text-slate-900">
                      {proj.name}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">
                      github.com/{CV_DATA.githubUser}/{proj.repoName}
                    </span>
                  </div>
                  
                  <p className="text-slate-700 mt-0.5">
                    {lang === 'en' ? proj.descriptionEn : proj.descriptionUz}
                  </p>

                  <ul className="list-disc pl-4 text-slate-600 mt-1 space-y-0.5 text-[11px]">
                    {(lang === 'en' ? proj.technicalDetailsEn : proj.technicalDetailsUz).map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>

                  <div className="text-[10px] font-mono text-slate-500 mt-0.5 italic">
                    {lang === 'en' ? proj.scopeNoteEn : proj.scopeNoteUz}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Practical Platforms & Verified Progress */}
          <div className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2 font-display">
              {lang === 'en' ? 'Practical Security Platforms & Training' : 'Amaliy Xavfsizlik Platformalari'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="border border-slate-200 rounded p-2.5 bg-slate-50/50">
                <div className="flex items-center justify-between font-bold text-slate-900 mb-0.5">
                  <span>TryHackMe</span>
                  <span className="text-emerald-800 font-mono">Top 15% Worldwide</span>
                </div>
                <p className="text-slate-600 text-[11px]">
                  {lang === 'en' ? CV_DATA.platforms.tryhackme.detailsEn : CV_DATA.platforms.tryhackme.detailsUz}
                </p>
              </div>

              <div className="border border-slate-200 rounded p-2.5 bg-slate-50/50">
                <div className="flex items-center justify-between font-bold text-slate-900 mb-0.5">
                  <span>Hack The Box</span>
                  <span className="text-slate-800 font-mono">Handle: @i00nit</span>
                </div>
                <p className="text-slate-600 text-[11px]">
                  {lang === 'en' ? CV_DATA.platforms.hackthebox.statusEn : CV_DATA.platforms.hackthebox.statusUz}
                </p>
              </div>
            </div>
          </div>

          {/* Section: Ethical Standards & Academic Objective */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs pt-2 border-t border-slate-300">
            <div>
              <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-1 font-display">
                {lang === 'en' ? 'Education & Background' : 'Ta\'lim va Ma\'lumot'}
              </h3>
              <p className="text-slate-700 text-[11px] leading-relaxed">
                {placeholders.education}
              </p>
              <div className="mt-1 text-slate-600 text-[11px]">
                <span className="font-semibold">Languages:</span> {placeholders.languages}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-1 font-display">
                {lang === 'en' ? 'Responsible Security Commitment' : 'Axloqiy Mas\'uliyat'}
              </h3>
              <p className="text-slate-700 text-[11px] leading-relaxed">
                {lang === 'en'
                  ? 'All testing performed exclusively in authorized virtual lab machines or approved bug bounty scopes. Strict commitment to ethical research and responsible disclosure.'
                  : 'Barcha tahlillar faqat shaxsiy lab yoki rasman ruxsat berilgan loyihalarda o\'tkaziladi. Axloqiy me\'yorlar va mas\'uliyatli hisobotga qat\'iy amal qilinadi.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
