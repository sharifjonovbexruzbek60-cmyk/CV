import React, { useState, useEffect } from 'react';
import { TopNavbar } from './components/TopNavbar';
import { HeroSection } from './components/HeroSection';
import { CVDocumentView } from './components/CVDocumentView';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { InteractiveLabTools } from './components/InteractiveLabTools';
import { SkillsRadarMatrix } from './components/SkillsRadarMatrix';
import { ProjectsSection } from './components/ProjectsSection';
import { EthicsAndMethodology } from './components/EthicsAndMethodology';
import { ContactSection } from './components/ContactSection';
import { FooterSection } from './components/FooterSection';
import { Terminal, Shield, ArrowUpRight, Cpu } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'cv' | 'terminal' | 'lab'>('portfolio');
  const [lang, setLang] = useState<'en' | 'uz'>(() => {
    const saved = localStorage.getItem('i00nit_lang');
    return saved === 'en' || saved === 'uz' ? saved : 'uz'; // Uzbek default as user requested ozbek tilida, toggleable anytime
  });

  useEffect(() => {
    localStorage.setItem('i00nit_lang', lang);
  }, [lang]);

  const handlePrintCV = () => {
    setActiveTab('cv');
    setTimeout(() => {
      window.print();
    }, 150);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500/20 selection:text-emerald-300">
      {/* Top Navbar adhering to Top Bar Contract */}
      <TopNavbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lang={lang}
        setLang={setLang}
        onPrintCV={handlePrintCV}
      />

      <main className="flex-1">
        {/* TAB 1: EXECUTIVE CV VIEW */}
        {activeTab === 'cv' && (
          <div className="animate-fadeIn">
            <CVDocumentView lang={lang} />
          </div>
        )}

        {/* TAB 2: CLI TERMINAL VIEW */}
        {activeTab === 'terminal' && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 animate-fadeIn">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold font-display text-white flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-emerald-400" />
                  <span>{lang === 'en' ? 'Interactive Linux Subsystem Terminal' : 'Interaktiv Linux Quyi Tizim CLI'}</span>
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  {lang === 'en'
                    ? 'Execute authentic terminal commands to inspect Behruzbek\'s skills, projects, network prober, and academic roadmap.'
                    : 'Behruzbekning ko\'nikmalari, loyihalari va tarmoq simulyatsiyasini terminal orqali tekshirish uchun buyruqlarni ishga tushiring.'}
                </p>
              </div>

              <button
                onClick={() => setActiveTab('portfolio')}
                className="text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900 w-fit"
              >
                ← {lang === 'en' ? 'Back to Overview' : 'Asosiy sahifaga qaytish'}
              </button>
            </div>

            <InteractiveTerminal lang={lang} />
          </div>
        )}

        {/* TAB 3: INTERACTIVE LAB TOOLS VIEW */}
        {activeTab === 'lab' && (
          <div className="animate-fadeIn">
            <InteractiveLabTools lang={lang} />
          </div>
        )}

        {/* TAB 4: COMPLETE PORTFOLIO VIEW */}
        {activeTab === 'portfolio' && (
          <div className="animate-fadeIn">
            {/* Hero Section */}
            <HeroSection lang={lang} setActiveTab={setActiveTab} />

            {/* Visual Skills Radar Matrix */}
            <SkillsRadarMatrix lang={lang} />

            {/* Embedded Live Terminal Preview */}
            <section className="py-8 bg-slate-950/60 border-t border-slate-900">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>{lang === 'en' ? 'Live Interactive Terminal Environment' : 'Jonli Interaktiv Terminal Muhiti'}</span>
                  </div>
                  <button
                    onClick={() => setActiveTab('terminal')}
                    className="text-xs font-mono text-slate-400 hover:text-emerald-400 flex items-center gap-1"
                  >
                    <span>{lang === 'en' ? 'Expand Fullscreen' : 'To\'liq oynada ochish'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <InteractiveTerminal lang={lang} />
              </div>
            </section>

            {/* Projects Showcase */}
            <ProjectsSection lang={lang} />

            {/* Interactive Lab Tools */}
            <InteractiveLabTools lang={lang} />

            {/* Methodology & Ethics */}
            <EthicsAndMethodology lang={lang} />

            {/* Direct Contact & Persistence Form */}
            <ContactSection lang={lang} />
          </div>
        )}
      </main>

      {/* Clean Footer */}
      <FooterSection lang={lang} />
    </div>
  );
}
