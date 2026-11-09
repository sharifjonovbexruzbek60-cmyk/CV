import React, { useState } from 'react';
import { Github, ExternalLink, Code2, ShieldAlert, ChevronDown, ChevronUp } from 'lucide-react';
import { PROJECTS_DATA, ProjectItem } from '../data/cvData';

interface ProjectsSectionProps {
  lang: 'en' | 'uz';
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ lang }) => {
  const [expandedCode, setExpandedCode] = useState<string | null>(null);

  const toggleCode = (id: string) => {
    setExpandedCode(expandedCode === id ? null : id);
  };

  return (
    <section id="projects" className="py-12 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>{lang === 'en' ? 'Open-Source GitHub Portfolio' : 'Ochiq Manbali GitHub Loyihalari'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
              {lang === 'en' ? 'Practical Lab Implementations' : 'Amaliy Laboratoriya Loyihalari'}
            </h2>
            <p className="text-sm text-slate-400 max-w-2xl mt-1">
              {lang === 'en'
                ? 'Authentic open-source repositories documenting low-level TCP/IP transport, Python socket programming, password entropy analysis, and web vulnerability research.'
                : 'TCP/IP transporti, Python soketlari, parol entropiyasi va veb zaifliklarini o\'rganishga bag\'ishlangan ochiq repozitoriylar.'}
            </p>
          </div>

          <a
            href="https://github.com/sharifjonovbexruzbek60-cmyk"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-mono font-medium rounded-lg bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-200 hover:text-white transition-colors shrink-0"
          >
            <Github className="w-4 h-4 text-emerald-400" />
            <span>github.com/sharifjonovbexruzbek60-cmyk</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>

        {/* Projects Grid: 3 in a row on desktop or Bento */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS_DATA.map((proj) => (
            <div
              key={proj.id}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700 transition-colors shadow-lg"
            >
              <div>
                {/* Clean unboxed tags with typographic separator */}
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 mb-2">
                  <span>{proj.tags[0]}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span>{proj.tags[1]}</span>
                  {proj.tags[2] && (
                    <>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span>{proj.tags[2]}</span>
                    </>
                  )}
                </div>

                {/* Title and Repo Link */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="text-base font-bold text-white font-mono hover:text-emerald-400 transition-colors">
                    <a href={proj.repoUrl} target="_blank" rel="noreferrer">
                      {proj.name}
                    </a>
                  </h3>
                  <a
                    href={proj.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1 text-slate-400 hover:text-white transition-colors"
                    title="View GitHub Repository"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {lang === 'en' ? proj.descriptionEn : proj.descriptionUz}
                </p>

                {/* Key Technical Highlights */}
                <div className="space-y-1.5 mb-4">
                  {(lang === 'en' ? proj.technicalDetailsEn : proj.technicalDetailsUz).map((point, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-400">
                      <span className="text-emerald-400 mt-0.5">•</span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Scope Note & Code Preview Toggle */}
              <div className="pt-3 border-t border-slate-800/80 space-y-2">
                <div className="text-[10px] font-mono text-amber-400/90 bg-amber-500/10 p-2 rounded border border-amber-500/20">
                  {lang === 'en' ? proj.scopeNoteEn : proj.scopeNoteUz}
                </div>

                {proj.codePreview && (
                  <div>
                    <button
                      onClick={() => toggleCode(proj.id)}
                      className="w-full flex items-center justify-between py-1 px-2 rounded text-[11px] font-mono text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors"
                    >
                      <span className="flex items-center gap-1.5">
                        <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                        {expandedCode === proj.id ? 'Hide Source Snippet' : 'View Core Snippet'}
                      </span>
                      {expandedCode === proj.id ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </button>

                    {expandedCode === proj.id && (
                      <div className="mt-2 p-3 bg-slate-950 rounded-lg border border-slate-800 text-[11px] font-mono overflow-x-auto text-emerald-300 leading-relaxed">
                        <pre>{proj.codePreview}</pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
