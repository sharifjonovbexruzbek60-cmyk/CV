import React from 'react';
import { Shield, Server, Compass, FileCheck, Lock, CheckCircle2 } from 'lucide-react';
import { CV_DATA } from '../data/cvData';

interface EthicsProps {
  lang: 'en' | 'uz';
}

export const EthicsAndMethodology: React.FC<EthicsProps> = ({ lang }) => {
  const phases = [
    {
      num: "01",
      titleEn: "Reconnaissance (Razvedka)",
      titleUz: "Razvedka (Reconnaissance)",
      descEn: "Passive & active intelligence gathering, DNS inspection, WHOIS lookups, subdomains, and attack surface discovery within strict scope.",
      descUz: "Passiv va faol ma'lumot to'plash, DNS tahlili, subdomainlar va hujum maydonini (attack surface) ruxsat berilgan doirada aniqlash."
    },
    {
      num: "02",
      titleEn: "Scanning & Enumeration",
      titleUz: "Skanerlash va Ro'yxatlash",
      descEn: "TCP socket probing, service banner grabbing, protocol state inspection (SYN/ACK), and identification of running services.",
      descUz: "TCP soket diagnostikasi, xizmatlar bannerlarini olish, port holatlarini (SYN-ACK) tekshirish va ishlayotgan xizmatlarni aniqlash."
    },
    {
      num: "03",
      titleEn: "Vulnerability Analysis",
      titleUz: "Zaifliklarni Tahlil Qilish",
      descEn: "Auditing logic flaws, CWE-601 open redirects, blind SQL injection injection vectors, and input parameter sanitization.",
      descUz: "Veb mantiqiy xatolarini tekshirish, CWE-601 ochiq yo'naltirish, blind SQLi parametrlari va kiritish maydonlarini tekshirish."
    },
    {
      num: "04",
      titleEn: "Lab PoC Validation",
      titleUz: "Laboratoriyada PoC Tekshiruvi",
      descEn: "Developing benign Proof-of-Concept demonstrations in controlled virtual machines to verify vulnerability validity without disruption.",
      descUz: "Xavfsizlik nuqsonini tasdiqlash uchun xavfsiz laboratoriya muhitida xavfsiz PoC (Proof-of-Concept) kodini sinab ko'rish."
    },
    {
      num: "05",
      titleEn: "Responsible Reporting",
      titleUz: "Mas'uliyatli Xavfsizlik Hisoboti",
      descEn: "Compiling formal remediation blueprints, CVSS severity classification, reproducible steps, and defensive patches for system owners.",
      descUz: "Zaiflikni bartaraf etish bo'yicha aniq tavsiyalar, CVSS darajasi va qadam-baqadam tuzatish ko'rsatmasidan iborat rasmiy hisobot."
    }
  ];

  return (
    <section id="ethics" className="py-12 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>{lang === 'en' ? 'Methodology & Defensive Security' : 'Metodologiya va Himoyaviy Xavfsizlik'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
            {lang === 'en' ? 'Structured Workflow & Ethical Discipline' : 'Bosqichma-bosqich Jarayon va Axloqiy Intizom'}
          </h2>
          <p className="text-sm text-slate-400 max-w-2xl mt-1">
            {lang === 'en'
              ? 'Understanding cybersecurity as a disciplined, legal, and engineering discipline centered on defensive remediation and authorized testing.'
              : 'Kiberxavfsizlikka qonuniy, tizimli va muhandislik intizomi sifatida yondashish: himoyaviy tuzatish va qat\'iy ruxsat asosidagi amaliyot.'}
          </p>
        </div>

        {/* 5 Pentesting Phases */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-12">
          {phases.map((phase) => (
            <div key={phase.num} className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-400">{phase.num}</span>
                <h3 className="text-sm font-bold text-white mt-1 mb-2 font-display">
                  {lang === 'en' ? phase.titleEn : phase.titleUz}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {lang === 'en' ? phase.descEn : phase.descUz}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 2-Column Deep Dive: Data Centers & Ethical Pledge */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Data Center Knowledge */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Server className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-display">
                  {lang === 'en' ? 'Data Center & Infrastructure Foundations' : 'Ma\'lumotlar Markazi (Data Center) Tushunchalari'}
                </h3>
                <span className="text-xs text-slate-400 font-mono">
                  {lang === 'en' ? 'Architectural & perimeter awareness' : 'Infratuzilma va perimetr xavfsizligi'}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              {lang === 'en'
                ? 'Appreciates the physical and logical realities of modern enterprise infrastructure: server rack topologies, redundant power systems, Demilitarized Zones (DMZ), VLAN segregation, internal gateway routers, and firewall border filters.'
                : 'Zamonaviy korxona infratuzilmasining jismoniy va mantiqiy tuzilishini tushunadi: server stoykalari, zaxira quvvat ta\'minoti, DMZ (demilitarizatsiya zonasi), VLAN ajratish, ichki routerlar va xavfsizlik devori (firewall) filtrlash qoidalari.'}
            </p>

            <div className="space-y-2 text-xs text-slate-400 font-mono">
              <div className="flex items-center gap-2 p-2 rounded bg-slate-950 border border-slate-800">
                <span className="text-cyan-400">✓</span>
                <span>{lang === 'en' ? 'Network Segmentation: DMZ vs Internal Database Tier' : 'Tarmoq segmentatsiyasi: DMZ va ichki ma\'lumotlar bazasi'}</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-slate-950 border border-slate-800">
                <span className="text-cyan-400">✓</span>
                <span>{lang === 'en' ? 'Host Subsystems: Ubuntu WSL & Kali Linux bridging' : 'Linux quyi tizimlari: Ubuntu WSL va Kali Linux ko\'priklari'}</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-slate-950 border border-slate-800">
                <span className="text-cyan-400">✓</span>
                <span>{lang === 'en' ? 'Transport layer packet flows via Wireshark' : 'Wireshark orqali paketlar oqimi diagnostikasi'}</span>
              </div>
            </div>
          </div>

          {/* Ethical Research Pledge */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-display">
                  {lang === 'en' ? 'Responsible Security Commitment' : 'Axloqiy Xavfsizlik Majburiyati'}
                </h3>
                <span className="text-xs text-slate-400 font-mono">
                  {lang === 'en' ? 'Zero unauthorized actions policy' : 'Faqat ruxsat berilgan tahlil tamoyili'}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              {lang === 'en'
                ? 'Security research carries serious legal and ethical obligations. Behruzbek explicitly pledges to practice solely on self-owned virtual machines, sanctioned platforms (TryHackMe, HTB), or explicitly authorized scopes.'
                : 'Kiberxavfsizlik jiddiy huquqiy va axloqiy mas\'uliyatni talab qiladi. Behruzbek barcha amaliyotlarni faqat shaxsiy virtual tizimlarda, TryHackMe/HTB laboratoriyalarida yoki rasmiy ruxsat olingan loyihalarda olib borishini tasdiqlaydi.'}
            </p>

            <ul className="space-y-2 text-xs text-slate-300">
              {(lang === 'en' ? CV_DATA.ethicalPrinciplesEn : CV_DATA.ethicalPrinciplesUz).map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
