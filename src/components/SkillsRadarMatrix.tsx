import React, { useState } from 'react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip
} from 'recharts';
import { RADAR_SKILLS, RadarSkillPoint } from '../data/cvData';
import { Activity, ShieldCheck, Terminal, Network, Code, FileText } from 'lucide-react';

interface SkillsRadarProps {
  lang: 'en' | 'uz';
}

export const SkillsRadarMatrix: React.FC<SkillsRadarProps> = ({ lang }) => {
  const [activeDomain, setActiveDomain] = useState<string>('Networking');

  const chartData = RADAR_SKILLS.map((item) => ({
    domain: lang === 'en' ? item.domain : item.domainUz,
    rawDomain: item.domain,
    score: item.score,
    fullMark: item.fullMark,
    highlight: lang === 'en' ? item.highlightEn : item.highlightUz
  }));

  const selectedSkill = RADAR_SKILLS.find(s => s.domain === activeDomain) || RADAR_SKILLS[0];

  const getDomainIcon = (d: string) => {
    switch (d) {
      case 'Networking':
        return <Network className="w-4 h-4 text-emerald-400" />;
      case 'Linux':
        return <Terminal className="w-4 h-4 text-cyan-400" />;
      case 'Web Security':
        return <ShieldCheck className="w-4 h-4 text-amber-400" />;
      case 'Programming':
        return <Code className="w-4 h-4 text-emerald-400" />;
      default:
        return <Activity className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <section className="py-12 border-t border-slate-800/80 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>{lang === 'en' ? 'Technical Competency Evaluation' : 'Texnik Ko\'nikmalar Bahosi'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
              {lang === 'en' ? 'Visual Skills Matrix' : 'Ko\'nikmalar Radari'}
            </h2>
            <p className="text-sm text-slate-400 max-w-xl mt-1">
              {lang === 'en'
                ? 'Proficiency distribution across core domains: Networking, Web Security, Linux, and Python Programming.'
                : 'Asosiy sohalar (Tarmoq, Veb xavfsizligi, Linux va Dasturlash) bo\'yicha amaliy bilim darajalari.'}
            </p>
          </div>

          <div className="text-xs font-mono text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>{lang === 'en' ? 'Measured by practical lab output' : 'Amaliy lab natijalari asosida'}</span>
          </div>
        </div>

        {/* 2-Column Layout: Radar on Left, Detailed Metric Breakdown on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          {/* Radar Chart Container */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center min-h-[340px] sm:min-h-[400px] w-full">
            <ResponsiveContainer width="100%" height={360}>
              <RadarChart data={chartData} cx="50%" cy="50%" outerRadius="75%">
                <PolarGrid stroke="#334155" strokeDasharray="3 3" />
                <PolarAngleAxis
                  dataKey="domain"
                  stroke="#94a3b8"
                  tick={{ fill: '#cbd5e1', fontSize: 12, fontFamily: 'monospace' }}
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 100]}
                  stroke="#475569"
                  tick={{ fill: '#64748b', fontSize: 10 }}
                />
                <Radar
                  name="Proficiency"
                  dataKey="score"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.28}
                  strokeWidth={2}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-slate-950 border border-slate-700 px-3 py-2 rounded-lg text-xs font-mono shadow-xl">
                          <p className="text-emerald-400 font-bold">{data.domain}</p>
                          <p className="text-white mt-0.5">
                            {lang === 'en' ? 'Proficiency' : 'Daraja'}: <span className="text-emerald-300 font-bold">{data.score}%</span>
                          </p>
                          <p className="text-slate-400 text-[11px] mt-1">{data.highlight}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Interactive Domain Highlights */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider mb-3">
              {lang === 'en' ? 'Domain Breakdown & Focus' : 'Sohalar va Amaliyot'}
            </h3>

            <div className="space-y-2">
              {RADAR_SKILLS.map((item) => {
                const isSelected = item.domain === activeDomain;
                return (
                  <button
                    key={item.domain}
                    onClick={() => setActiveDomain(item.domain)}
                    className={`w-full text-left p-3 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-slate-950 border-emerald-500/60 shadow-md'
                        : 'bg-slate-950/50 border-slate-800 hover:border-slate-700 hover:bg-slate-950/80'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        {getDomainIcon(item.domain)}
                        <span className={`text-xs font-mono font-bold ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                          {lang === 'en' ? item.domain : item.domainUz}
                        </span>
                      </div>
                      <span className="text-xs font-mono font-bold text-emerald-400 tabular-nums">
                        {item.score}%
                      </span>
                    </div>

                    <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden mb-1.5">
                      <div
                        className="h-full bg-emerald-500 transition-all duration-300"
                        style={{ width: `${item.score}%` }}
                      />
                    </div>

                    <p className="text-[11px] text-slate-400 leading-snug">
                      {lang === 'en' ? item.highlightEn : item.highlightUz}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
