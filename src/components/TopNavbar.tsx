import React from 'react';
import { Shield, Printer, Globe } from 'lucide-react';

interface TopNavbarProps {
  activeTab: 'portfolio' | 'cv' | 'terminal' | 'lab';
  setActiveTab: (tab: 'portfolio' | 'cv' | 'terminal' | 'lab') => void;
  lang: 'en' | 'uz';
  setLang: (lang: 'en' | 'uz') => void;
  onPrintCV: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  activeTab,
  setActiveTab,
  lang,
  setLang,
  onPrintCV
}) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-8 py-3.5 no-print">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <a 
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('portfolio');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 text-slate-100 font-bold tracking-tight hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 group"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:border-emerald-400/60 transition-colors">
            <Shield className="w-4 h-4" />
          </div>
          <span className="text-base sm:text-lg font-display">Behruzbek Sharifjonov</span>
        </a>

        {/* Zone 2: 4-5 single-line clean navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'portfolio' 
                ? 'text-emerald-400 font-semibold border-b-2 border-emerald-400' 
                : 'hover:text-white'
            }`}
          >
            {lang === 'en' ? 'Portfolio' : 'Portfoliyo'}
          </button>
          
          <button
            onClick={() => setActiveTab('lab')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'lab' 
                ? 'text-emerald-400 font-semibold border-b-2 border-emerald-400' 
                : 'hover:text-white'
            }`}
          >
            {lang === 'en' ? 'Interactive Lab' : 'Interaktiv Lab'}
          </button>

          <button
            onClick={() => setActiveTab('terminal')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'terminal' 
                ? 'text-emerald-400 font-semibold border-b-2 border-emerald-400' 
                : 'hover:text-white'
            }`}
          >
            {lang === 'en' ? 'CLI Terminal' : 'Terminal CLI'}
          </button>

          <button
            onClick={() => setActiveTab('cv')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'cv' 
                ? 'text-emerald-400 font-semibold border-b-2 border-emerald-400' 
                : 'hover:text-white'
            }`}
          >
            {lang === 'en' ? 'Executive CV' : 'Rezyume (CV)'}
          </button>

          <a
            href="#projects"
            onClick={() => {
              if (activeTab !== 'portfolio') setActiveTab('portfolio');
            }}
            className="whitespace-nowrap shrink-0 hover:text-white transition-colors py-1"
          >
            {lang === 'en' ? 'Projects' : 'Loyihalar'}
          </a>
        </nav>

        {/* Zone 3: 1 primary action button + language switch */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Language Switcher */}
          <button
            onClick={() => setLang(lang === 'en' ? 'uz' : 'en')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono font-medium rounded-md border border-slate-700 bg-slate-900/80 text-slate-300 hover:text-white hover:border-slate-500 transition-colors whitespace-nowrap shrink-0"
            title="Switch Language / Tilni almashtirish"
            aria-label="Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span>{lang === 'en' ? 'UZ' : 'EN'}</span>
          </button>

          {/* Primary Action Button */}
          <button
            onClick={onPrintCV}
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-md bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors shadow-sm whitespace-nowrap shrink-0"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Print / Export CV' : 'CV ni yuklab olish'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
