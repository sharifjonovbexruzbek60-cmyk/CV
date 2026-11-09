import React, { useState } from 'react';
import { KeyRound, Network, AlertTriangle, ShieldCheck, CheckCircle2, XCircle, ArrowRight, Info, Play, RotateCcw } from 'lucide-react';

interface LabToolsProps {
  lang: 'en' | 'uz';
}

export const InteractiveLabTools: React.FC<LabToolsProps> = ({ lang }) => {
  const [activeTool, setActiveTool] = useState<'password' | 'scanner' | 'cwe601'>('password');

  // 1. Password Analyzer State
  const [samplePassword, setSamplePassword] = useState('CyberCenter#2026!');
  
  // Calculate entropy & patterns
  const calculatePasswordStats = (pwd: string) => {
    let pool = 0;
    const hasLower = /[a-z]/.test(pwd);
    const hasUpper = /[A-Z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    const hasSpecial = /[^a-zA-Z0-9]/.test(pwd);

    if (hasLower) pool += 26;
    if (hasUpper) pool += 26;
    if (hasNumber) pool += 10;
    if (hasSpecial) pool += 33;

    const entropy = pool > 0 && pwd.length > 0 ? (pwd.length * Math.log2(pool)).toFixed(1) : '0';
    const numEntropy = parseFloat(entropy);

    // Checks
    const isSequential = /(?:012|123|234|345|456|567|678|789|abc|bcd|cde|def|qwe|asd)/i.test(pwd);
    const hasRepeated = /(.)\1{2,}/.test(pwd);
    const isCommon = ['password', '123456', 'admin', 'qwerty', 'pentest'].some(c => pwd.toLowerCase().includes(c));

    let rating: 'Weak' | 'Moderate' | 'Strong' | 'Very Strong' = 'Weak';
    if (numEntropy >= 75 && !isSequential && !isCommon) rating = 'Very Strong';
    else if (numEntropy >= 50 && !isCommon) rating = 'Strong';
    else if (numEntropy >= 35) rating = 'Moderate';

    let crackTime = '< 1 second';
    if (numEntropy > 80) crackTime = 'Centuries (Resistant to offline GPU brute-force)';
    else if (numEntropy > 60) crackTime = 'Several years';
    else if (numEntropy > 45) crackTime = 'Several days to months';
    else if (numEntropy > 30) crackTime = 'A few hours / minutes';

    return {
      length: pwd.length,
      pool,
      entropy: numEntropy,
      hasLower,
      hasUpper,
      hasNumber,
      hasSpecial,
      isSequential,
      hasRepeated,
      isCommon,
      rating,
      crackTime
    };
  };

  const pwdStats = calculatePasswordStats(samplePassword);

  // 2. Port Scanner Simulator State
  const [scanHost, setScanHost] = useState('127.0.0.1 (WSL Host)');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState<Array<{ port: number; proto: string; state: 'OPEN' | 'CLOSED' | 'FILTERED'; service: string; banner: string }>>([
    { port: 22, proto: 'tcp', state: 'OPEN', service: 'ssh', banner: 'OpenSSH 8.9p1 (SYN-ACK received in 1.2ms)' },
    { port: 80, proto: 'tcp', state: 'OPEN', service: 'http', banner: 'Nginx 1.18.0 Lab Web Server' },
    { port: 443, proto: 'tcp', state: 'OPEN', service: 'https', banner: 'TLS v1.3 Local Certificate' },
    { port: 3306, proto: 'tcp', state: 'CLOSED', service: 'mysql', banner: 'Connection Refused (RST packet returned)' },
    { port: 8080, proto: 'tcp', state: 'OPEN', service: 'http-proxy', banner: 'Python SimpleHTTPServer (Lab testing)' }
  ]);

  const handleSimulateScan = () => {
    setIsScanning(true);
    setScanResults([]);
    const defaultPorts = [
      { port: 21, proto: 'tcp', state: 'CLOSED' as const, service: 'ftp', banner: 'RST received' },
      { port: 22, proto: 'tcp', state: 'OPEN' as const, service: 'ssh', banner: 'OpenSSH 8.9p1 (SYN-ACK 1.4ms)' },
      { port: 80, proto: 'tcp', state: 'OPEN' as const, service: 'http', banner: 'Nginx/1.18.0 (Ubuntu WSL)' },
      { port: 443, proto: 'tcp', state: 'OPEN' as const, service: 'https', banner: 'TLS 1.3 Handshake OK' },
      { port: 3306, proto: 'tcp', state: 'CLOSED' as const, service: 'mysql', banner: 'Port not bound' },
      { port: 8080, proto: 'tcp', state: 'OPEN' as const, service: 'http-alt', banner: 'Python HTTP daemon' }
    ];

    let current = 0;
    const interval = setInterval(() => {
      if (current < defaultPorts.length) {
        const item = defaultPorts[current];
        setScanResults(prev => [...prev, item]);
        current++;
      } else {
        clearInterval(interval);
        setIsScanning(false);
      }
    }, 350);
  };

  // 3. CWE-601 Open Redirect Lab State
  const [redirectParam, setRedirectParam] = useState('https://evil-attacker.com/fake-login');
  const [defenseMode, setDefenseMode] = useState<'vulnerable' | 'remediated'>('vulnerable');

  const WHITELIST_DOMAINS = ['internal-lab.local', 'edu.uz', 'github.com'];

  const testRedirectSafety = () => {
    try {
      if (defenseMode === 'vulnerable') {
        return {
          outcome: 'REDIRECT_EXTERNAL',
          url: redirectParam,
          safe: false,
          reasonEn: 'CWE-601 Vulnerability Triggered: Application blindly redirected user to unverified external domain!',
          reasonUz: 'CWE-601 Xavfi Yuzaga Keldi: Tizim foydalanuvchini tekshiruvsiz begona domen manziliga yo\'naltirdi!'
        };
      }

      // Remediated Mode: check relative or whitelist
      if (redirectParam.startsWith('/') && !redirectParam.startsWith('//')) {
        return {
          outcome: 'SAFE_INTERNAL',
          url: redirectParam,
          safe: true,
          reasonEn: 'Defense Successful: Internal relative path permitted safely.',
          reasonUz: 'Muvaffaqiyatli himoya: Faqat ichki nisbiy manzilga ruxsat berildi.'
        };
      }

      const parsed = new URL(redirectParam);
      if (WHITELIST_DOMAINS.includes(parsed.hostname)) {
        return {
          outcome: 'SAFE_WHITELIST',
          url: redirectParam,
          safe: true,
          reasonEn: `Defense Successful: Destination hostname '${parsed.hostname}' is in the strict whitelist.`,
          reasonUz: `Muvaffaqiyatli himoya: '${parsed.hostname}' manzili ruxsat etilgan oq ro'yxatda mavjud.`
        };
      } else {
        return {
          outcome: 'BLOCKED_UNAUTHORIZED',
          url: '/dashboard',
          safe: true,
          reasonEn: `Untrusted Domain Blocked: '${parsed.hostname}' is not in the whitelist. Fallback safely routed to /dashboard.`,
          reasonUz: `Begona domen bloklandi: '${parsed.hostname}' ro'yxatda yo'q. Xavfsiz tarzda /dashboard sahifasiga yo'naltirildi.`
        };
      }
    } catch {
      return {
        outcome: 'INVALID_URL',
        url: '/dashboard',
        safe: true,
        reasonEn: 'Malformed URL: Safely reverted to default internal route /dashboard.',
        reasonUz: 'Noto\'g\'ri URL: Tizim xavfsiz holda asosiy /dashboard ga yo\'naltirdi.'
      };
    }
  };

  const redirectResult = testRedirectSafety();

  return (
    <section id="interactive-lab" className="py-12 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>{lang === 'en' ? 'Live Interactive Lab Modules' : 'Jonli Interaktiv Laboratoriya'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
            {lang === 'en' ? 'Practical Security Explorations' : 'Amaliy Xavfsizlik Tajribalari'}
          </h2>
          <p className="text-sm text-slate-400 max-w-2xl mt-1">
            {lang === 'en'
              ? 'Hands-on interactive demonstrations modeled directly on Behruzbek\'s GitHub repositories: password entropy analysis, TCP socket probing, and CWE-601 remediation.'
              : 'Behruzbekning GitHub loyihalari asosida yaratilgan interaktiv modullar: parol entropiyasini tekshirish, TCP soket diagnostikasi va CWE-601 zaifligini bartaraf etish.'}
          </p>
        </div>

        {/* Tool Selector Tabs */}
        <div className="flex items-center gap-2 p-1.5 bg-slate-900 border border-slate-800 rounded-xl max-w-xl mb-8">
          <button
            onClick={() => setActiveTool('password')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-medium transition-colors ${
              activeTool === 'password'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Entropy Analyser' : 'Parol Entropiyasi'}</span>
          </button>

          <button
            onClick={() => setActiveTool('scanner')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-medium transition-colors ${
              activeTool === 'scanner'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'TCP Socket Prober' : 'TCP Soket Skaneri'}</span>
          </button>

          <button
            onClick={() => setActiveTool('cwe601')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-medium transition-colors ${
              activeTool === 'cwe601'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'CWE-601 Lab' : 'CWE-601 Laboratoriyasi'}</span>
          </button>
        </div>

        {/* TOOL 1: PASSWORD ANALYSER */}
        {activeTool === 'password' && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8">
            {/* Educational Disclaimer Banner */}
            <div className="mb-6 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3 text-xs text-amber-300">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold">{lang === 'en' ? 'Educational Tool Notice:' : 'Ta\'limiy Eslatma:'}</span>{' '}
                {lang === 'en'
                  ? 'Based on Behruzbek\'s password-security-analyser. Runs 100% locally in your browser memory. Never input actual personal or production passwords.'
                  : 'Behruzbekning password-security-analyser loyihasi asosida yaratilgan. Faqat mahalliy xotirada ishlaydi. Hech qachon haqiqiy shaxsiy yoki xizmat parollarini kiritmang.'}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Input and breakdown */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-2">
                    {lang === 'en' ? 'Test Sample String / Pattern:' : 'Namunaviy Parol Qolipi:'}
                  </label>
                  <input
                    type="text"
                    value={samplePassword}
                    onChange={(e) => setSamplePassword(e.target.value)}
                    placeholder="Enter test pattern..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm font-mono text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                  <div className="flex gap-2 mt-2">
                    {['Summer2026!', 'qwerty12345', 'K!ber#Xavfsizlik_998', 'admin'].map((preset) => (
                      <button
                        key={preset}
                        onClick={() => setSamplePassword(preset)}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Character Pool Analysis */}
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
                    {lang === 'en' ? 'Character Space Composition' : 'Belgilar To\'plami Tahlili'}
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div className={`p-2.5 rounded-lg border flex items-center justify-between ${pwdStats.hasLower ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
                      <span>a-z (Lowercase)</span>
                      {pwdStats.hasLower ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                    </div>
                    <div className={`p-2.5 rounded-lg border flex items-center justify-between ${pwdStats.hasUpper ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
                      <span>A-Z (Uppercase)</span>
                      {pwdStats.hasUpper ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                    </div>
                    <div className={`p-2.5 rounded-lg border flex items-center justify-between ${pwdStats.hasNumber ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
                      <span>0-9 (Numbers)</span>
                      {pwdStats.hasNumber ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                    </div>
                    <div className={`p-2.5 rounded-lg border flex items-center justify-between ${pwdStats.hasSpecial ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
                      <span>!@#$ (Symbols)</span>
                      {pwdStats.hasSpecial ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                </div>

                {/* Pattern Vulnerability Flags */}
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
                    {lang === 'en' ? 'Heuristic Vulnerability Checks' : 'Xavfli Qoliplarni Tekshirish'}
                  </h4>
                  <div className="space-y-1.5 text-xs">
                    <div className={`p-2 rounded-lg flex items-center justify-between ${pwdStats.isSequential ? 'bg-rose-950/40 border border-rose-500/30 text-rose-300' : 'bg-slate-950 border border-slate-800/80 text-slate-400'}`}>
                      <span>Sequential key walk detected (e.g. 123, qwe, abc)</span>
                      <span>{pwdStats.isSequential ? 'FAIL' : 'PASS'}</span>
                    </div>
                    <div className={`p-2 rounded-lg flex items-center justify-between ${pwdStats.hasRepeated ? 'bg-rose-950/40 border border-rose-500/30 text-rose-300' : 'bg-slate-950 border border-slate-800/80 text-slate-400'}`}>
                      <span>Character repetition (3+ identical consecutive characters)</span>
                      <span>{pwdStats.hasRepeated ? 'FAIL' : 'PASS'}</span>
                    </div>
                    <div className={`p-2 rounded-lg flex items-center justify-between ${pwdStats.isCommon ? 'bg-rose-950/40 border border-rose-500/30 text-rose-300' : 'bg-slate-950 border border-slate-800/80 text-slate-400'}`}>
                      <span>Common dictionary substring detected</span>
                      <span>{pwdStats.isCommon ? 'FAIL' : 'PASS'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Quantitative Entropy Metrics */}
              <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <span className="text-xs font-mono text-slate-400">{lang === 'en' ? 'Calculated Shannon Entropy' : 'Shennon Entropiyasi'}</span>
                    <span className="text-lg font-mono font-bold text-emerald-400 tabular-nums">
                      {pwdStats.entropy} bits
                    </span>
                  </div>

                  <div className="py-4 space-y-3">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-400">{lang === 'en' ? 'Resistance Rating' : 'Himoya Darajasi'}</span>
                        <span className={`font-semibold ${
                          pwdStats.rating === 'Very Strong' ? 'text-emerald-400' :
                          pwdStats.rating === 'Strong' ? 'text-cyan-400' :
                          pwdStats.rating === 'Moderate' ? 'text-amber-400' : 'text-rose-400'
                        }`}>
                          {pwdStats.rating}
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${
                            pwdStats.rating === 'Very Strong' ? 'bg-emerald-500' :
                            pwdStats.rating === 'Strong' ? 'bg-cyan-500' :
                            pwdStats.rating === 'Moderate' ? 'bg-amber-500' : 'bg-rose-500'
                          }`}
                          style={{ width: `${Math.min(100, (pwdStats.entropy / 100) * 100)}%` }}
                        />
                      </div>
                    </div>

                    <div className="text-xs space-y-1.5 pt-2">
                      <div className="flex justify-between text-slate-400">
                        <span>{lang === 'en' ? 'Length' : 'Uzunligi'}:</span>
                        <span className="font-mono text-white tabular-nums">{pwdStats.length} chars</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>{lang === 'en' ? 'Character Space (R)' : 'Belgilar maydoni (R)'}:</span>
                        <span className="font-mono text-white tabular-nums">{pwdStats.pool} possible glyphs</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>{lang === 'en' ? 'Offline Brute-Force' : 'Offline buzish vaqti'}:</span>
                        <span className="font-mono text-cyan-300 text-right">{pwdStats.crackTime}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800/80 text-[11px] text-slate-400 font-mono">
                  Formula: E = L * log2(R)
                  <br />
                  {lang === 'en'
                    ? 'Evaluated strictly client-side via regex & logarithmic pool calculation.'
                    : 'Brauzerda logarifmik formulalar yordamida hisoblangan ta\'limiy tahlil.'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TOOL 2: TCP PORT SCANNER PROBER */}
        {activeTool === 'scanner' && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-white font-display">
                  {lang === 'en' ? 'TCP Socket Probe Simulator' : 'TCP Soket Skaneri Simulyatsiyasi'}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {lang === 'en'
                    ? 'Based on python-port-scanner & Vibe-Scanner-WSL. Demonstrates 3-way TCP handshake socket mechanics on authorized virtual hosts.'
                    : 'python-port-scanner va Vibe-Scanner-WSL asosida. Ruxsat berilgan virtual hostda TCP 3-tomonlama handshake mexanizmini ko\'rsatadi.'}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={scanHost}
                  onChange={(e) => setScanHost(e.target.value)}
                  className="bg-slate-950 border border-slate-700 text-slate-300 text-xs rounded-lg px-3 py-2 font-mono focus:outline-none"
                >
                  <option value="127.0.0.1 (WSL Host)">127.0.0.1 (WSL Lab Host)</option>
                  <option value="10.10.10.24 (HTB Lab)">10.10.10.24 (HTB Lab Box)</option>
                  <option value="192.168.1.1 (Lab Router)">192.168.1.1 (Lab Gateway)</option>
                </select>

                <button
                  onClick={handleSimulateScan}
                  disabled={isScanning}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold text-xs rounded-lg transition-colors"
                >
                  {isScanning ? (
                    <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Play className="w-3.5 h-3.5 fill-current" />
                  )}
                  <span>{isScanning ? 'Probing Sockets...' : 'Run Lab Probe'}</span>
                </button>
              </div>
            </div>

            {/* Handshake Explanation Diagram */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6 text-xs">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono">
                <div className="text-cyan-400 font-semibold mb-1">1. [SYN Packet]</div>
                <div className="text-slate-400">Client sends socket connect request with initial sequence number.</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono">
                <div className="text-emerald-400 font-semibold mb-1">2. [SYN-ACK / RST]</div>
                <div className="text-slate-400">Open ports return SYN-ACK. Closed ports reply with immediate RST.</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono">
                <div className="text-amber-400 font-semibold mb-1">3. [ACK / Established]</div>
                <div className="text-slate-400">Socket handshake completes or closes gracefully with socket.close().</div>
              </div>
            </div>

            {/* Table of Scanned Ports */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-900/90 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="px-4 py-3">PORT</th>
                    <th className="px-4 py-3">PROTO</th>
                    <th className="px-4 py-3">STATE</th>
                    <th className="px-4 py-3">SERVICE</th>
                    <th className="px-4 py-3">SOCKET DIAGNOSTIC</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {scanResults.map((row) => (
                    <tr key={row.port} className="hover:bg-slate-900/40 transition-colors">
                      <td className="px-4 py-3 font-bold text-white tabular-nums">{row.port}</td>
                      <td className="px-4 py-3 text-slate-400 uppercase">{row.proto}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                          row.state === 'OPEN' 
                            ? 'bg-emerald-950/80 border border-emerald-500/40 text-emerald-400' 
                            : 'bg-rose-950/60 border border-rose-500/30 text-rose-400'
                        }`}>
                          {row.state}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-cyan-300">{row.service}</td>
                      <td className="px-4 py-3 text-slate-400 text-[11px]">{row.banner}</td>
                    </tr>
                  ))}
                  {scanResults.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                        {lang === 'en' ? 'Click "Run Lab Probe" to initiate TCP socket transmission...' : '"Run Lab Probe" tugmasini bosing...'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TOOL 3: CWE-601 OPEN REDIRECT LAB */}
        {activeTool === 'cwe601' && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-white font-display">
                  CWE-601: URL Redirection to Untrusted Site (Open Redirect)
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {lang === 'en'
                    ? 'Interactive demonstration from Vulnerability-Research showcasing how unvalidated redirects occur and how defensive whitelisting remediates them.'
                    : 'Vulnerability-Research loyihasidagi tadqiqot: ochiq yo\'naltirish qanday sodir bo\'ladi va oq ro\'yxat (whitelist) yordamida qanday himoyalanadi.'}
                </p>
              </div>

              {/* Mode Toggle */}
              <div className="flex items-center gap-1 p-1 bg-slate-950 border border-slate-800 rounded-lg">
                <button
                  onClick={() => setDefenseMode('vulnerable')}
                  className={`px-3 py-1.5 text-xs font-mono font-medium rounded-md transition-colors ${
                    defenseMode === 'vulnerable'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  [!] Vulnerable Code
                </button>
                <button
                  onClick={() => setDefenseMode('remediated')}
                  className={`px-3 py-1.5 text-xs font-mono font-medium rounded-md transition-colors ${
                    defenseMode === 'remediated'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  [✓] Remediated Defense
                </button>
              </div>
            </div>

            {/* Simulated Address Bar */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 mb-6 space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">
                  Simulated Request: <span className="text-slate-500">http://internal-lab.local/login?redirect_to=</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={redirectParam}
                    onChange={(e) => setRedirectParam(e.target.value)}
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="text-[11px] text-slate-500">Presets:</span>
                  <button
                    onClick={() => setRedirectParam('https://evil-attacker.com/fake-login')}
                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-rose-300 hover:bg-slate-700"
                  >
                    Evil Phishing Link
                  </button>
                  <button
                    onClick={() => setRedirectParam('/profile/dashboard')}
                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-emerald-300 hover:bg-slate-700"
                  >
                    Internal Relative Route (/profile/dashboard)
                  </button>
                  <button
                    onClick={() => setRedirectParam('http://internal-lab.local/resources')}
                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300 hover:bg-slate-700"
                  >
                    Whitelisted Domain (internal-lab.local)
                  </button>
                </div>
              </div>

              {/* Execution Outcome */}
              <div className={`p-4 rounded-xl border ${
                redirectResult.safe 
                  ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200' 
                  : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
              }`}>
                <div className="flex items-center gap-2 font-mono text-xs font-bold mb-1">
                  {redirectResult.safe ? (
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                  )}
                  <span>Status: {redirectResult.outcome}</span>
                </div>
                <p className="text-xs">
                  {lang === 'en' ? redirectResult.reasonEn : redirectResult.reasonUz}
                </p>
                <div className="mt-2 text-xs font-mono text-slate-400 flex items-center gap-2">
                  <span>Final Redirect Destination:</span>
                  <span className="font-bold text-white px-2 py-0.5 rounded bg-black/40">
                    {redirectResult.url}
                  </span>
                </div>
              </div>
            </div>

            {/* Code Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-slate-950 border border-rose-950/80">
                <div className="text-rose-400 font-semibold mb-2 flex items-center gap-1.5">
                  <XCircle className="w-3.5 h-3.5" />
                  Vulnerable Implementation (CWE-601)
                </div>
                <pre className="text-slate-400 text-[11px] overflow-x-auto leading-relaxed">
{`# Flawed Flask/Python endpoint
@app.route('/login', methods=['POST'])
def login():
    # Authenticate credentials...
    next_url = request.args.get('redirect_to')
    # Blind trust: Attacker can supply any URL
    return redirect(next_url) # ⚠️ VULNERABLE`}
                </pre>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-emerald-950/80">
                <div className="text-emerald-400 font-semibold mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Defensively Hardened Implementation
                </div>
                <pre className="text-slate-300 text-[11px] overflow-x-auto leading-relaxed">
{`ALLOWED_DOMAINS = {'internal-lab.local'}

def safe_redirect(target):
    if not target:
        return redirect('/dashboard')
    parsed = urlparse(target)
    # Require relative path OR approved domain
    if not parsed.netloc or parsed.netloc in ALLOWED_DOMAINS:
        return redirect(target)
    return redirect('/dashboard') # ✓ REMEDIATED`}
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
