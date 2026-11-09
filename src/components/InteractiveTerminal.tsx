import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Sparkles, CornerDownLeft, RotateCcw } from 'lucide-react';
import { CV_DATA, PROJECTS_DATA } from '../data/cvData';

interface TerminalProps {
  lang: 'en' | 'uz';
}

interface HistoryItem {
  id: string;
  command: string;
  output: React.ReactNode;
  time: string;
}

export const InteractiveTerminal: React.FC<TerminalProps> = ({ lang }) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    // Load from localStorage if present
    const saved = localStorage.getItem('i00nit_term_history');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((item: { command: string; time: string }, idx: number) => ({
            id: `init-${idx}`,
            command: item.command,
            output: getCommandOutput(item.command, lang),
            time: item.time
          }));
        }
      } catch {
        // fallback
      }
    }
    return [
      {
        id: 'welcome',
        command: 'whoami',
        output: (
          <div className="space-y-1.5 text-slate-300">
            <p className="text-emerald-400 font-semibold">
              Behruzbek Sharifjonov (i00nit) — Junior Cybersecurity Candidate
            </p>
            <p className="text-xs text-slate-400">
              Age: 14 · Practical lab learner · TryHackMe: Top 15% · HTB: @i00nit
            </p>
            <p className="text-xs text-slate-400">
              Type <span className="text-cyan-400 font-mono font-bold">help</span> to list commands or click quick shortcuts below.
            </p>
          </div>
        ),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
  });

  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [commandList, setCommandList] = useState<string[]>(['whoami']);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  function getCommandOutput(cmd: string, currentLang: 'en' | 'uz'): React.ReactNode {
    const trimmed = cmd.trim().toLowerCase();
    
    if (trimmed === 'help') {
      return (
        <div className="space-y-1 text-xs">
          <p className="text-emerald-400 font-semibold mb-1">
            {currentLang === 'en' ? 'Available Commands:' : 'Mavjud Buyruqlar:'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 font-mono">
            <div><span className="text-cyan-400 font-bold">whoami</span> - {currentLang === 'en' ? 'Candidate bio & age' : 'Nomzod haqida'}</div>
            <div><span className="text-cyan-400 font-bold">skills</span> - {currentLang === 'en' ? 'Technical skills' : 'Ko\'nikmalar'}</div>
            <div><span className="text-cyan-400 font-bold">projects</span> - {currentLang === 'en' ? '5 GitHub repos' : '5 ta GitHub loyiha'}</div>
            <div><span className="text-cyan-400 font-bold">thm</span> - {currentLang === 'en' ? 'TryHackMe rank (Top 15%)' : 'TryHackMe reytingi'}</div>
            <div><span className="text-cyan-400 font-bold">htb</span> - {currentLang === 'en' ? 'Hack The Box status (@i00nit)' : 'Hack The Box holati'}</div>
            <div><span className="text-cyan-400 font-bold">scan --demo</span> - {currentLang === 'en' ? 'TCP socket scan demo' : 'TCP soket skanerlash'}</div>
            <div><span className="text-cyan-400 font-bold">cwe-601</span> - {currentLang === 'en' ? 'Open Redirect research' : 'CWE-601 zaifligi'}</div>
            <div><span className="text-cyan-400 font-bold">cat cv.txt</span> - {currentLang === 'en' ? 'Quick CV view' : 'Tezkor CV'}</div>
            <div><span className="text-cyan-400 font-bold">contact</span> - {currentLang === 'en' ? 'Emails & GitHub' : 'Bog\'lanish'}</div>
            <div><span className="text-cyan-400 font-bold">ethics</span> - {currentLang === 'en' ? 'Security pledge' : 'Axloqiy qoida'}</div>
            <div><span className="text-cyan-400 font-bold">clear</span> - {currentLang === 'en' ? 'Clear screen' : 'Tozalash'}</div>
          </div>
        </div>
      );
    }

    if (trimmed === 'whoami') {
      return (
        <div className="space-y-1 text-xs">
          <p className="text-emerald-300 font-bold">Behruzbek Sharifjonov (14 yosh / 14 years old)</p>
          <p className="text-slate-300">
            {currentLang === 'en'
              ? 'Cybersecurity learner practicing networking, Linux systems, Python socket programming, and web security in authorized labs.'
              : 'Tarmoqlar, Linux tizimlari, Python soketlari va veb xavfsizligini ruxsat berilgan shaxsiy laboratoriyalarda o\'rganayotgan yosh nomzod.'}
          </p>
          <div className="flex flex-wrap gap-2 text-slate-400 pt-1">
            <span>THM: Top 15%</span>
            <span>·</span>
            <span>HTB: @i00nit</span>
            <span>·</span>
            <span>Focus: Authorized Labs</span>
          </div>
        </div>
      );
    }

    if (trimmed === 'skills') {
      return (
        <div className="space-y-2 text-xs">
          <p className="text-emerald-400 font-semibold">{currentLang === 'en' ? 'Core Competencies:' : 'Asosiy Ko\'nikmalar:'}</p>
          {CV_DATA.skills.map((cat, i) => (
            <div key={i} className="border-l-2 border-slate-700 pl-2">
              <span className="text-cyan-300 font-medium">
                {currentLang === 'en' ? cat.categoryEn : cat.categoryUz}:
              </span>{' '}
              <span className="text-slate-300">{cat.items.join(', ')}</span>
            </div>
          ))}
        </div>
      );
    }

    if (trimmed === 'projects') {
      return (
        <div className="space-y-2 text-xs">
          <p className="text-emerald-400 font-semibold">{currentLang === 'en' ? 'Verified GitHub Repositories:' : 'GitHub Repozitoriylari:'}</p>
          {PROJECTS_DATA.map((p) => (
            <div key={p.id} className="border-b border-slate-800/80 pb-1.5">
              <a
                href={p.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="text-cyan-400 hover:underline font-mono font-semibold"
              >
                {p.repoName}
              </a>
              <span className="text-slate-500 text-[11px] ml-2">({p.tags.join(', ')})</span>
              <p className="text-slate-400 text-[11px] mt-0.5">
                {currentLang === 'en' ? p.descriptionEn : p.descriptionUz}
              </p>
            </div>
          ))}
        </div>
      );
    }

    if (trimmed === 'thm' || trimmed === 'tryhackme') {
      return (
        <div className="space-y-1 text-xs">
          <p className="text-emerald-400 font-bold">TryHackMe Profile & Achievements</p>
          <p className="text-slate-200">
            {currentLang === 'en'
              ? 'Ranked in the Top 15% of all worldwide TryHackMe learners.'
              : 'Dunyo bo\'ylab TryHackMe o\'rganuvchilari orasida eng yuqori 15% qatorida.'}
          </p>
          <p className="text-slate-400">
            Completed tracks: Linux Fundamentals, Network Services (DNS, SSH, SMB, HTTP), Web Fundamentals, Nmap Network Scanning, Burp Suite Basics, and OWASP Top 10 rooms.
          </p>
        </div>
      );
    }

    if (trimmed === 'htb' || trimmed === 'hackthebox') {
      return (
        <div className="space-y-1 text-xs">
          <p className="text-emerald-400 font-bold">Hack The Box — Handle: @i00nit</p>
          <p className="text-slate-300">
            {currentLang === 'en'
              ? 'Active junior learner on Hack The Box. Currently working through Starting Point Tier 0 & Tier 1 targets and foundational HTB Academy modules.'
              : 'Hack The Box platformasida yangi faol o\'rganuvchi. Hozirda Starting Point (Tier 0 & 1) mashqlari va HTB Akademiya modullarini o\'rganmoqda.'}
          </p>
        </div>
      );
    }

    if (trimmed.startsWith('scan') || trimmed === 'scan --demo') {
      return (
        <div className="space-y-1 text-xs font-mono text-slate-300 bg-slate-900/60 p-2.5 rounded border border-slate-800">
          <p className="text-cyan-400">[i00nit-prober] Starting TCP SYN check on target: 127.0.0.1 (WSL Lab Host)</p>
          <p className="text-slate-400">PORT      STATE    SERVICE      BANNER / PROTOCOL</p>
          <p className="text-emerald-400">22/tcp    OPEN     ssh          OpenSSH 8.9p1 Ubuntu</p>
          <p className="text-emerald-400">80/tcp    OPEN     http         nginx 1.18.0 (Internal Lab)</p>
          <p className="text-emerald-400">443/tcp   OPEN     https        TLS v1.3 Lab Certificate</p>
          <p className="text-slate-500">3306/tcp  CLOSED   mysql        Connection Refused (RST packet)</p>
          <p className="text-emerald-400">8080/tcp  OPEN     http-proxy   Python SimpleHTTPServer</p>
          <p className="text-slate-400 text-[11px] pt-1">
            * Simulated diagnostic scan illustrating TCP 3-way handshake (SYN-ACK / RST response).
          </p>
        </div>
      );
    }

    if (trimmed === 'cwe-601') {
      return (
        <div className="space-y-1.5 text-xs">
          <p className="text-emerald-400 font-bold">CWE-601: URL Redirection to Untrusted Site (Open Redirect)</p>
          <p className="text-slate-300">
            {currentLang === 'en'
              ? 'Occurs when a web application accepts untrusted input in return_to or next query parameters without validating the target domain against a strict whitelist.'
              : 'Veb ilova foydalanuvchi kiritgan redirect parametrini tekshirmasdan boshqa tashqi manzilga yo\'naltirganda yuzaga keladi (phishing xavfi).'}
          </p>
          <div className="p-2 bg-slate-900 rounded font-mono text-[11px] text-amber-300">
            Remediation: 1. Strict domain whitelist · 2. Relative URLs only (/dashboard) · 3. Avoid blind redirects
          </div>
        </div>
      );
    }

    if (trimmed === 'cat cv.txt' || trimmed === 'cv') {
      return (
        <div className="space-y-1 text-xs font-mono text-slate-300">
          <p className="text-emerald-400 font-bold">=== BEHRUZBEK SHARIFJONOV — JUNIOR CYBERSECURITY CANDIDATE ===</p>
          <p>Email: {CV_DATA.emails.join(' | ')}</p>
          <p>GitHub: {CV_DATA.githubUrl}</p>
          <p>Age: 14 | THM: Top 15% | HTB: @i00nit | Focus: Authorized Labs</p>
          <p className="text-slate-400">
            Focus: TCP/IP Sockets, Kali Linux, Python Scripting, Web Security (CWE-601, SQLi logic), Wireshark.
          </p>
          <p className="text-cyan-400">Tip: Click 'Executive CV' tab above for the printable version.</p>
        </div>
      );
    }

    if (trimmed === 'contact') {
      return (
        <div className="space-y-1 text-xs">
          <p className="text-emerald-400 font-bold">{currentLang === 'en' ? 'Direct Contact Points:' : 'Bog\'lanish:'}</p>
          <p className="text-slate-300 font-mono">Primary: <a href="mailto:sharifjonovbexruzbek60@gmail.com" className="text-cyan-400 hover:underline">sharifjonovbexruzbek60@gmail.com</a></p>
          <p className="text-slate-300 font-mono">Secondary: <a href="mailto:b23520284@gmail.com" className="text-cyan-400 hover:underline">b23520284@gmail.com</a></p>
          <p className="text-slate-300 font-mono">GitHub: <a href={CV_DATA.githubUrl} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">{CV_DATA.githubUser}</a></p>
        </div>
      );
    }

    if (trimmed === 'ethics') {
      return (
        <div className="space-y-1 text-xs">
          <p className="text-emerald-400 font-bold">{currentLang === 'en' ? 'Ethical Security Pledge:' : 'Axloqiy Kodeks:'}</p>
          <ul className="list-disc pl-4 text-slate-300 space-y-0.5">
            {(currentLang === 'en' ? CV_DATA.ethicalPrinciplesEn : CV_DATA.ethicalPrinciplesUz).map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </div>
      );
    }

    if (trimmed === 'sudo') {
      return (
        <div className="text-xs text-rose-400 font-mono">
          [!] User 'i00nit' is not in the sudoers file. This incident will be reported to the lab supervisor.
        </div>
      );
    }

    if (trimmed === 'date') {
      return (
        <div className="text-xs text-slate-300 font-mono">
          {new Date().toString()}
        </div>
      );
    }

    return (
      <div className="text-xs text-rose-400 font-mono">
        command not found: {cmd}. Type <span className="text-cyan-400 font-bold">help</span> to list available commands.
      </div>
    );
  }

  const handleExecute = (cmdText: string) => {
    const trimmed = cmdText.trim();
    if (!trimmed) return;

    if (trimmed.toLowerCase() === 'clear') {
      setHistory([]);
      setInputVal('');
      localStorage.removeItem('i00nit_term_history');
      return;
    }

    const newCommandList = [...commandList, trimmed];
    setCommandList(newCommandList);
    setHistoryIndex(-1);

    const newHistoryItem: HistoryItem = {
      id: `${Date.now()}-${Math.random()}`,
      command: trimmed,
      output: getCommandOutput(trimmed, lang),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updated = [...history, newHistoryItem];
    setHistory(updated);
    setInputVal('');

    // Save recent 15 commands to localStorage
    const savedItems = updated.slice(-15).map(h => ({ command: h.command, time: h.time }));
    localStorage.setItem('i00nit_term_history', JSON.stringify(savedItems));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleExecute(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandList.length === 0) return;
      const nextIndex = historyIndex === -1 ? commandList.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputVal(commandList[nextIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= commandList.length) {
        setHistoryIndex(-1);
        setInputVal('');
      } else {
        setHistoryIndex(nextIndex);
        setInputVal(commandList[nextIndex]);
      }
    }
  };

  const quickCommands = ['whoami', 'skills', 'projects', 'scan --demo', 'thm', 'cwe-601', 'ethics'];

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl font-mono text-sm">
      {/* Terminal Header */}
      <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
          <span className="text-xs text-slate-400 ml-2 font-mono flex items-center gap-1.5">
            <TerminalIcon className="w-3.5 h-3.5 text-emerald-400" />
            i00nit@cyber-lab:~ (Ubuntu WSL / Kali Linux Subsystem)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleExecute('clear')}
            className="text-[11px] text-slate-400 hover:text-slate-200 px-2 py-1 rounded bg-slate-800/80 hover:bg-slate-800 transition-colors flex items-center gap-1"
            title="Clear terminal"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Quick Action Chips */}
      <div className="bg-slate-950/60 px-4 py-2 border-b border-slate-800/60 flex items-center gap-2 overflow-x-auto text-xs no-scrollbar">
        <span className="text-slate-500 text-[11px] whitespace-nowrap flex items-center gap-1 shrink-0">
          <Sparkles className="w-3 h-3 text-cyan-400" />
          {lang === 'en' ? 'Quick run:' : 'Tezkor buyruq:'}
        </span>
        {quickCommands.map((cmd) => (
          <button
            key={cmd}
            onClick={() => handleExecute(cmd)}
            className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-cyan-200 text-xs transition-colors whitespace-nowrap shrink-0 border border-slate-700/60 font-mono"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Terminal Screen Body */}
      <div 
        className="p-4 sm:p-5 min-h-[360px] max-h-[520px] overflow-y-auto space-y-4 bg-slate-950/95 cursor-text text-slate-200"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((item) => (
          <div key={item.id} className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-emerald-400 font-bold">i00nit@cyber-lab:~$</span>
              <span className="text-slate-100 font-semibold">{item.command}</span>
              <span className="text-slate-600 text-[10px] ml-auto">{item.time}</span>
            </div>
            <div className="pl-3 border-l border-slate-800">
              {item.output}
            </div>
          </div>
        ))}

        {/* Active Input Line */}
        <div className="flex items-center gap-2 pt-1">
          <span className="text-emerald-400 font-bold text-xs shrink-0">i00nit@cyber-lab:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={lang === 'en' ? "type command (e.g. 'help', 'skills', 'scan --demo')..." : "buyruq kiriting ('help', 'projects', 'thm')..."}
            className="flex-1 bg-transparent border-none outline-none text-slate-100 font-mono text-xs focus:ring-0 placeholder:text-slate-600"
            autoFocus
          />
          <button
            onClick={() => handleExecute(inputVal)}
            disabled={!inputVal.trim()}
            className="p-1 text-slate-400 hover:text-emerald-400 disabled:opacity-30 transition-colors"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        <div ref={terminalEndRef} />
      </div>
    </div>
  );
};
