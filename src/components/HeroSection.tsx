import React from 'react';
import { Terminal, FileText, ArrowRight, Github, ExternalLink, Shield, Cpu, CheckCircle2, Server } from 'lucide-react';
import { CV_DATA } from '../data/cvData';

interface HeroSectionProps {
  lang: 'en' | 'uz';
  setActiveTab: (tab: 'portfolio' | 'cv' | 'terminal' | 'lab') => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ lang, setActiveTab }) => {
  return (
    <section id="home" className="py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Split-Screen Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Clean Kicker */}
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <span className="font-semibold uppercase tracking-wider">
                  {lang === 'en' ? 'Portfolio & CV' : 'Portfoliyo va CV'}
                </span>
                <span aria-hidden="true" className="text-slate-600">/</span>
                <span className="text-slate-400">Junior Candidate</span>
              </div>

              {/* Display Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-display text-balance">
                Behruzbek Sharifjonov
              </h1>

              {/* Sub-headline */}
              <div className="text-base sm:text-lg font-medium text-emerald-300 font-mono">
                {lang === 'en' ? CV_DATA.headlineEn : CV_DATA.headlineUz}
              </div>

              {/* Modest, Factual Lead Copy */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                {lang === 'en'
                  ? 'Cybersecurity learner with hands-on practice in TCP/IP networking, Linux (Kali Linux, Ubuntu WSL), Python socket scripting, and web vulnerability analysis. Practicing on TryHackMe (Top 15%) and Hack The Box (@i00nit) strictly within authorized lab scopes.'
                  : 'TCP/IP tarmoqlari, Linux tizimlari (Kali Linux, Ubuntu WSL), Python soket dasturlash va veb xavfsizligini o\'rganayotgan nomzod. TryHackMe (Top 15%) va Hack The Box (@i00nit) platformalarida faqat ruxsat berilgan lab doirasida mashq qiladi.'}
              </p>

              {/* Clean Unboxed Metadata with Typographic Separators */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400 pt-1 font-mono">
                <span>TryHackMe: Top 15%</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>Hack The Box: @i00nit</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>5 GitHub Repos</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>Authorized Labs Only</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-6 mt-6 border-t border-slate-800/80">
              <button
                onClick={() => setActiveTab('cv')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm transition-colors shadow-sm"
              >
                <FileText className="w-4 h-4" />
                <span>{lang === 'en' ? 'Review CV' : 'CV ni ko\'rish'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setActiveTab('lab')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white font-medium text-xs sm:text-sm transition-colors"
              >
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>{lang === 'en' ? 'Interactive Lab' : 'Interaktiv Lab'}</span>
              </button>

              <button
                onClick={() => setActiveTab('terminal')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-300 hover:text-white font-mono text-xs transition-colors"
              >
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>Terminal CLI</span>
              </button>
            </div>
          </div>

          {/* Right Column: Clean Technical Lab Overview Card (Replacing Boy Image) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 shadow-2xl flex-1 flex flex-col justify-between p-5 sm:p-6">
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                    <Server className="w-4 h-4 text-emerald-400" />
                    <span>{lang === 'en' ? 'Lab Setup & Environment' : 'Laboratoriya Muhiti'}</span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400">Localhost / WSL</span>
                </div>

                {/* Technical Environment Specs */}
                <div className="space-y-3 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-[11px] text-slate-500 uppercase">Operating Systems:</span>
                    <div className="text-slate-200 font-semibold">
                      Ubuntu WSL 2 · Kali Linux Subsystem
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-[11px] text-slate-500 uppercase">Core Tools & Sockets:</span>
                    <div className="text-slate-200 font-semibold">
                      Python 3 (socket, regex) · Wireshark · Bash
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-[11px] text-slate-500 uppercase">Practical Focus:</span>
                    <div className="text-slate-200">
                      TCP Handshakes · CWE-601 Redirection · Entropy Analysis
                    </div>
                  </div>
                </div>
              </div>

              {/* Profiles Digest */}
              <div className="pt-4 mt-4 border-t border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">GitHub:</span>
                  <a
                    href={CV_DATA.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-400 hover:underline font-mono flex items-center gap-1"
                  >
                    <span>{CV_DATA.githubUser}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400">TryHackMe:</span>
                  <span className="font-mono text-emerald-300">Top 15% Platform Rank</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Hack The Box:</span>
                  <span className="font-mono text-slate-300">@i00nit (Starting Point)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width Factual Metrics Strip */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-xs">
          <div className="space-y-1">
            <span className="font-mono text-slate-400 uppercase tracking-wider">
              TryHackMe
            </span>
            <div className="text-2xl font-bold text-emerald-400 font-mono tabular-nums">
              Top 15%
            </div>
            <p className="text-[11px] text-slate-400">
              {lang === 'en' ? 'Completed 40+ practical rooms' : '40 dan ortiq amaliy xonalar'}
            </p>
          </div>

          <div className="space-y-1">
            <span className="font-mono text-slate-400 uppercase tracking-wider">
              Hack The Box
            </span>
            <div className="text-2xl font-bold text-cyan-400 font-mono tabular-nums">
              @i00nit
            </div>
            <p className="text-[11px] text-slate-400">
              {lang === 'en' ? 'Active junior learner profile' : 'Boshlang\'ich faol profil'}
            </p>
          </div>

          <div className="space-y-1">
            <span className="font-mono text-slate-400 uppercase tracking-wider">
              GitHub
            </span>
            <div className="text-2xl font-bold text-white font-mono tabular-nums">
              5 Repos
            </div>
            <p className="text-[11px] text-slate-400">
              {lang === 'en' ? 'Public socket & research scripts' : 'Ochiq soket va tahlil skriptlari'}
            </p>
          </div>

          <div className="space-y-1">
            <span className="font-mono text-slate-400 uppercase tracking-wider">
              {lang === 'en' ? 'Testing Scope' : 'Sinov Qoidasi'}
            </span>
            <div className="text-2xl font-bold text-emerald-400 font-mono tabular-nums">
              100% Lab
            </div>
            <p className="text-[11px] text-slate-400">
              {lang === 'en' ? 'Strictly authorized environments' : 'Faqat ruxsat berilgan muhitda'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
