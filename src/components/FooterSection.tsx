import React from 'react';
import { Shield, Github, Mail } from 'lucide-react';
import { CV_DATA } from '../data/cvData';

interface FooterProps {
  lang: 'en' | 'uz';
}

export const FooterSection: React.FC<FooterProps> = ({ lang }) => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 py-8 text-xs text-slate-500 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold text-slate-300">Behruzbek Sharifjonov</span>
          <span aria-hidden="true" className="text-slate-700">·</span>
          <span>{lang === 'en' ? 'Junior Cybersecurity Portfolio & CV' : 'Kiberxavfsizlik Portfoliosi va CV'}</span>
        </div>

        <div className="flex items-center gap-4 font-mono text-[11px]">
          <a
            href={CV_DATA.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="hover:text-slate-300 transition-colors flex items-center gap-1"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
          <a
            href={`mailto:${CV_DATA.emails[0]}`}
            className="hover:text-slate-300 transition-colors flex items-center gap-1"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>{CV_DATA.emails[0]}</span>
          </a>
          <span>Junior Candidate</span>
        </div>
      </div>
    </footer>
  );
};
