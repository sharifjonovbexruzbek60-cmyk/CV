import React, { useState, useEffect } from 'react';
import { Mail, Github, Send, Copy, Check, MessageSquare, Shield, ExternalLink } from 'lucide-react';
import { CV_DATA } from '../data/cvData';

interface ContactProps {
  lang: 'en' | 'uz';
}

export const ContactSection: React.FC<ContactProps> = ({ lang }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    message: ''
  });

  const [savedStatus, setSavedStatus] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  // Load drafted message from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('i00nit_contact_draft');
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch {
        // fallback
      }
    }
  }, []);

  // Save changes to localStorage
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const updated = { ...formData, [e.target.name]: e.target.value };
    setFormData(updated);
    localStorage.setItem('i00nit_contact_draft', JSON.stringify(updated));
  };

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Construct mailto link
    const subject = encodeURIComponent(`Cybersecurity Opportunity / Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `From: ${formData.name}\nOrganization: ${formData.organization}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${CV_DATA.emails[0]}?cc=${CV_DATA.emails[1]}&subject=${subject}&body=${body}`;

    setSavedStatus(lang === 'en' ? 'Opening email client...' : 'Pochta mijozi ochilmoqda...');
    setTimeout(() => setSavedStatus(null), 4000);
  };

  return (
    <section id="contact" className="py-12 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Contacts */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>{lang === 'en' ? 'Direct Communication' : 'To\'g\'ridan-to\'g\'ri Aloqa'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
                {lang === 'en' ? 'Contact Behruzbek' : 'Bog\'lanish'}
              </h2>
              <p className="text-sm text-slate-400 mt-1 leading-relaxed">
                {lang === 'en'
                  ? 'Open to junior cybersecurity apprenticeships, entry-level internships, and technical collaboration.'
                  : 'Boshlang\'ich amaliyot, stajirovka hamda laboratoriya mashg\'ulotlariga doimo ochiq.'}
              </p>
            </div>

            {/* Email Cards */}
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-[11px] font-mono text-slate-400 uppercase">
                    {lang === 'en' ? 'Primary Email' : 'Asosiy Email'}
                  </span>
                  <div className="text-sm font-mono font-semibold text-white">
                    {CV_DATA.emails[0]}
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleCopyEmail(CV_DATA.emails[0])}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                    title="Copy Email"
                  >
                    {copiedEmail === CV_DATA.emails[0] ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <a
                    href={`mailto:${CV_DATA.emails[0]}`}
                    className="p-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 transition-colors"
                    title="Send Email"
                  >
                    <Mail className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-[11px] font-mono text-slate-400 uppercase">
                    {lang === 'en' ? 'Secondary Email' : 'Ikkinchi Email'}
                  </span>
                  <div className="text-sm font-mono font-semibold text-white">
                    {CV_DATA.emails[1]}
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleCopyEmail(CV_DATA.emails[1])}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                    title="Copy Email"
                  >
                    {copiedEmail === CV_DATA.emails[1] ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <a
                    href={`mailto:${CV_DATA.emails[1]}`}
                    className="p-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 transition-colors"
                    title="Send Email"
                  >
                    <Mail className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-[11px] font-mono text-slate-400 uppercase">GitHub Profile</span>
                  <div className="text-sm font-mono font-semibold text-cyan-300">
                    github.com/{CV_DATA.githubUser}
                  </div>
                </div>

                <a
                  href={CV_DATA.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Inquiry Form with Persistence */}
          <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
              <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>{lang === 'en' ? 'Send a Message / Interview Invite' : 'Xabar Yuborish / Suhbat Taklifi'}</span>
              </h3>
              <span className="text-[11px] font-mono text-slate-400">
                {lang === 'en' ? 'Draft autosaves locally' : 'Qoralama saqlanadi'}
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">
                    {lang === 'en' ? 'Your Name / Recruiter' : 'Ismingiz / HR'}:
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Team Lead / Recruiter"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">
                    {lang === 'en' ? 'Your Email' : 'Email manzilingiz'}:
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="contact@company.uz"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  {lang === 'en' ? 'Organization / Department' : 'Tashkilot / Bo\'lim'}:
                </label>
                <input
                  type="text"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  placeholder="Security Team / Tech Lab / Organization"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  {lang === 'en' ? 'Message / Opportunity Details' : 'Xabar Matni'}:
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder={
                    lang === 'en'
                      ? 'Discussing potential internship or reviewing CV qualifications...'
                      : 'Amaliyot yoki suhbat bo\'yicha xabar matni...'
                  }
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-emerald-400 font-mono">
                  {savedStatus}
                </span>

                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition-colors shadow-sm ml-auto"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? 'Send via Email' : 'Email orqali yuborish'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
