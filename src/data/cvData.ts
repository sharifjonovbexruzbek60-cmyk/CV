export interface ProjectItem {
  id: string;
  name: string;
  repoName: string;
  repoUrl: string;
  badge: string;
  descriptionEn: string;
  descriptionUz: string;
  technicalDetailsEn: string[];
  technicalDetailsUz: string[];
  scopeNoteEn: string;
  scopeNoteUz: string;
  tags: string[];
  codePreview?: string;
}

export interface UserPlaceholders {
  phone: string;
  location: string;
  education: string;
  languages: string;
  targetRole: string;
}

export interface RadarSkillPoint {
  domain: string;
  domainUz: string;
  score: number;
  fullMark: number;
  highlightEn: string;
  highlightUz: string;
}

export const RADAR_SKILLS: RadarSkillPoint[] = [
  {
    domain: "Networking",
    domainUz: "Tarmoq",
    score: 80,
    fullMark: 100,
    highlightEn: "TCP/IP, 3-way handshake, Wireshark, sockets",
    highlightUz: "TCP/IP, 3 tomonlama handshake, Wireshark, soketlar"
  },
  {
    domain: "Linux",
    domainUz: "Linux Tizimi",
    score: 85,
    fullMark: 100,
    highlightEn: "Kali Linux, Ubuntu WSL, Bash, process inspection",
    highlightUz: "Kali Linux, Ubuntu WSL, Bash skriptlar, jarayonlar"
  },
  {
    domain: "Web Security",
    domainUz: "Veb Xavfsizligi",
    score: 72,
    fullMark: 100,
    highlightEn: "CWE-601 open redirects, blind SQLi logic, OWASP basics",
    highlightUz: "CWE-601 ochiq yo'naltirish, blind SQLi, OWASP asoslari"
  },
  {
    domain: "Programming",
    domainUz: "Dasturlash",
    score: 76,
    fullMark: 100,
    highlightEn: "Python scripting, socket library, regex parsing",
    highlightUz: "Python skriptlar, socket kutubxonasi, regex"
  },
  {
    domain: "Recon & OSINT",
    domainUz: "Razvedka / OSINT",
    score: 74,
    fullMark: 100,
    highlightEn: "DNS enumeration, passive discovery, port probing",
    highlightUz: "DNS tahlili, passiv qidiruv, port skanerlash"
  },
  {
    domain: "Methodology",
    domainUz: "Hisobot & Axloq",
    score: 82,
    fullMark: 100,
    highlightEn: "Responsible disclosure, lab PoC, scope discipline",
    highlightUz: "Mas'uliyatli hisobot, lab PoC, ruxsatli tahlil"
  }
];

export const DEFAULT_PLACEHOLDERS: UserPlaceholders = {
  phone: "+998 [On Request / Talab qilinganda]",
  location: "Tashkent, Uzbekistan",
  education: "Secondary School Student; Independent Cybersecurity Learner",
  languages: "Uzbek (Native), English (Technical / Working), Russian (Conversational)",
  targetRole: "Junior Cybersecurity Learner / Intern",
};

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "vibe-scanner-wsl",
    name: "Vibe-Scanner-WSL",
    repoName: "Vibe-Scanner-WSL",
    repoUrl: "https://github.com/sharifjonovbexruzbek60-cmyk/Vibe-Scanner-WSL",
    badge: "Networking / WSL / Python",
    descriptionEn: "Python socket script on Ubuntu WSL to inspect TCP connection states, timeouts, and network interfaces.",
    descriptionUz: "Ubuntu WSL va Python'da yozilgan soket skripti: TCP ulanish holatlari va timeoutlarni tahlil qiladi.",
    technicalDetailsEn: [
      "Tests socket states and timeout handling in WSL",
      "Inspects host-to-guest networking behaviors",
      "Educational exploration of TCP transport"
    ],
    technicalDetailsUz: [
      "WSL muhitida soket ulanish va timeoutlarni tekshirish",
      "Host va mehmon tizim tarmoq aloqasini o'rganish",
      "TCP transport qatlamini ta'limiy o'rganish"
    ],
    scopeNoteEn: "Scope: Run only on personal lab setups or authorized local hosts.",
    scopeNoteUz: "Qoida: Faqat shaxsiy lab yoki ruxsat berilgan hostlarda ishlatiladi.",
    tags: ["Python", "WSL", "TCP/IP", "Sockets"],
    codePreview: `# Educational socket connection handler
import socket

def test_host_port(host, port, timeout=1.5):
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.settimeout(timeout)
    try:
        result = s.connect_ex((host, port))
        return "OPEN" if result == 0 else "CLOSED"
    except socket.error as err:
        return f"ERR: {err}"
    finally:
        s.close()`
  },
  {
    id: "python-port-scanner",
    name: "python-port-scanner",
    repoName: "python-port-scanner",
    repoUrl: "https://github.com/sharifjonovbexruzbek60-cmyk/python-port-scanner",
    badge: "Python Sockets",
    descriptionEn: "Beginner Python socket script testing TCP connections to understand handshakes and port status codes.",
    descriptionUz: "Python socket kutubxonasida TCP portlarni tekshirib, handshake va javob kodlarini tushunuvchi loyiha.",
    technicalDetailsEn: [
      "Sequential TCP socket probing with timeout controls",
      "Demonstrates OPEN (SYN-ACK) vs CLOSED (RST) states",
      "Study project, not a production tool"
    ],
    technicalDetailsUz: [
      "Timeout bilan ketma-ket TCP soket tekshiruvi",
      "OPEN (SYN-ACK) va CLOSED (RST) holatlarini ko'rsatish",
      "Ta'limiy loyiha, ishlab chiqarish vositasi emas"
    ],
    scopeNoteEn: "Note: Built for protocol learning, not enterprise scanning.",
    scopeNoteUz: "Eslatma: Tarmoq asoslarini o'rganish uchun yozilgan.",
    tags: ["Python", "Sockets", "TCP Handshake"],
    codePreview: `for port in [21, 22, 80, 443, 8080]:
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.settimeout(0.8)
    code = sock.connect_ex(('127.0.0.1', port))
    if code == 0:
        print(f"[+] Port {port} is OPEN (SYN-ACK received)")
    sock.close()`
  },
  {
    id: "password-security-analyser",
    name: "password-security-analyser",
    repoName: "password-security-analyser",
    repoUrl: "https://github.com/sharifjonovbexruzbek60-cmyk/password-security-analyser",
    badge: "Defensive / Regex / Entropy",
    descriptionEn: "Local educational tool evaluating password entropy and common pattern weaknesses without sending data online.",
    descriptionUz: "Parol entropiyasi va qoliplarni brauzerning o'zida tekshiruvchi ta'limiy vosita (ma'lumot tarmoqqa chiqmaydi).",
    technicalDetailsEn: [
      "Calculates Shannon entropy: E = L * log2(R)",
      "Detects sequential keys, repetitions, and dictionary words",
      "Client-side only for privacy"
    ],
    technicalDetailsUz: [
      "Shennon entropiyasini hisoblash (E = L * log2(R))",
      "Ketma-ket belgilar va oddiy so'zlarni aniqlash",
      "Faqat mahalliy ishlaydi, tarmoqqa yubormaydi"
    ],
    scopeNoteEn: "Warning: Educational tool only. Never enter real personal passwords.",
    scopeNoteUz: "Ogohlantirish: Ta'limiy vosita. Haqiqiy parollarni kiritmang.",
    tags: ["Python", "Regex", "Entropy", "Security"],
    codePreview: `import math, re

def calculate_entropy(password):
    pool = 0
    if re.search(r"[a-z]", password): pool += 26
    if re.search(r"[A-Z]", password): pool += 26
    if re.search(r"[0-9]", password): pool += 10
    if re.search(r"[^a-zA-Z0-9]", password): pool += 33
    if pool == 0: return 0
    return round(len(password) * math.log2(pool), 2)`
  },
  {
    id: "vulnerability-research",
    name: "Vulnerability-Research",
    repoName: "Vulnerability-Research",
    repoUrl: "https://github.com/sharifjonovbexruzbek60-cmyk/Vulnerability-Research",
    badge: "Web Security / CWE-601",
    descriptionEn: "Notes and lab research on web vulnerabilities, focusing on CWE-601 Open Redirects and defense patterns.",
    descriptionUz: "Veb zaifliklari, xususan CWE-601 ochiq yo'naltirish va uni himoyalash bo'yicha tadqiqot qaydlari.",
    technicalDetailsEn: [
      "Analyzes unvalidated return_to/next URL parameters",
      "Outlines domain whitelisting and relative-path enforcement",
      "Includes structured bug bounty reporting format"
    ],
    technicalDetailsUz: [
      "Tekshirilmagan redirect parametrlarini tahlil qilish",
      "Oq ro'yxat va nisbiy manzillar orqali himoyalash",
      "Bug bounty hisobot namunasini o'z ichiga oladi"
    ],
    scopeNoteEn: "Focus: Root-cause remediation and developer fix guidelines.",
    scopeNoteUz: "Asosiy e'tibor: Xavfsiz kod yozish va tuzatish tavsiyalari.",
    tags: ["Web Security", "CWE-601", "Remediation", "AppSec"],
    codePreview: `// Vulnerable:
const target = req.query.redirect_to;
res.redirect(target); // Blind open redirect

// Defensively Remediated:
const ALLOWED_HOSTS = ['internal-lab.local'];
const parsed = new URL(target, 'http://internal-lab.local');
if (ALLOWED_HOSTS.includes(parsed.hostname)) {
  res.redirect(parsed.href);
} else {
  res.redirect('/dashboard');
}`
  },
  {
    id: "red-teamer",
    name: "Red-Teamer",
    repoName: "Red-Teamer",
    repoUrl: "https://github.com/sharifjonovbexruzbek60-cmyk/Red-Teamer",
    badge: "Methodology / Notes",
    descriptionEn: "Learning log tracking reconnaissance steps, scanning tools, lab notes, and reporting templates.",
    descriptionUz: "Pentesting bosqichlari (razvedka, skanerlash, tahlil, hisobot) bo'yicha shaxsiy o'rganish konspekti.",
    technicalDetailsEn: [
      "Recon notes (passive OSINT, DNS, port enumeration)",
      "Linux command lines and privilege escalation basics",
      "Bug bounty report templates"
    ],
    technicalDetailsUz: [
      "Razvedka qaydlari (OSINT, DNS, port tahlili)",
      "Linux buyruqlari va huquq oshirish nazariyasi",
      "Bug bounty hisobot tuzilishi"
    ],
    scopeNoteEn: "Purpose: Study diary showing hands-on learning progress.",
    scopeNoteUz: "Maqsad: O'rganish jarayonini aks ettiruvchi qaydlar.",
    tags: ["Recon", "Linux", "Methodology", "Notes"],
  }
];

export const CV_DATA = {
  name: "Behruzbek Sharifjonov",
  headlineEn: "Junior Cybersecurity Learner & Candidate",
  headlineUz: "Kiberxavfsizlik o'rganuvchisi (Junior nomzod)",
  age: 14,
  emails: ["sharifjonovbexruzbek60@gmail.com", "b23520284@gmail.com"],
  githubUrl: "https://github.com/sharifjonovbexruzbek60-cmyk",
  githubUser: "sharifjonovbexruzbek60-cmyk",
  platforms: {
    tryhackme: {
      name: "TryHackMe",
      rank: "Top 15% Platform Rank",
      detailsEn: "40+ completed lab rooms: Linux Fundamentals, Network Services, Web Fundamentals, OWASP Top 10, Nmap.",
      detailsUz: "40 dan ortiq lab xonalari: Linux asoslari, tarmoq xizmatlari, veb asoslari, OWASP Top 10, Nmap."
    },
    hackthebox: {
      name: "Hack The Box",
      handle: "@i00nit",
      statusEn: "Junior learner (@i00nit), working through Starting Point boxes and Academy modules.",
      statusUz: "Boshlang'ich o'rganuvchi (@i00nit), Starting Point mashqlari va Akademiya modullarini o'rganmoqda."
    }
  },
  ambitionEn: "Seeking an entry-level internship or junior role to apply practical lab skills and learn from experienced professionals.",
  ambitionUz: "Boshlang'ich amaliyot orqali shaxsiy lab ko'nikmalarimni rivojlantirish va amaliy tajriba orttirish.",
  summaryEn: "Cybersecurity learner with hands-on practice in TCP/IP networking, Linux (Kali, Ubuntu WSL), Python socket scripting, and core security phases (reconnaissance, scanning, vulnerability checks, lab PoC, and reporting). Top 15% on TryHackMe, active on Hack The Box (@i00nit). Focused on authorized scopes and defensive remediation.",
  summaryUz: "TCP/IP tarmoqlari, Linux (Kali, WSL), Python soket dasturlash va pentesting bosqichlarini (razvedka, skanerlash, zaiflik tahlili, labdagi PoC va hisobot berish) amalda o'rganayotgan yosh nomzod. TryHackMe'da top 15% foydalanuvchilar qatorida, HTB (@i00nit). Faqat ruxsat berilgan shaxsiy laboratoriyalarda tahlil olib boradi.",
  
  skills: [
    {
      categoryEn: "Networking & Transport",
      categoryUz: "Tarmoq va Transport",
      items: ["TCP/IP 3-Way Handshake", "Wireshark Packet Analysis", "Python Sockets (TCP/UDP)", "DNS / HTTP / HTTPS", "Port States & Subnets"]
    },
    {
      categoryEn: "Operating Systems & CLI",
      categoryUz: "Operatsion Tizimlar va CLI",
      items: ["Kali Linux ISO & Tools", "Ubuntu WSL Subsystem", "Bash Scripting", "File Permissions", "Process Inspection"]
    },
    {
      categoryEn: "Web Security",
      categoryUz: "Veb Xavfsizligi",
      items: ["CWE-601 (Open Redirects)", "Blind SQL Injection Logic", "Input Validation", "OWASP Top 10 Basics", "Bug Bounty Lab Work"]
    },
    {
      categoryEn: "Pentesting Methodology",
      categoryUz: "Pentesting Metodologiyasi",
      items: ["Reconnaissance (Passive/Active)", "Port & Service Enumeration", "Lab PoC Validation", "Post-Exploitation Theory", "Responsible Reporting"]
    },
    {
      categoryEn: "Infrastructure & Data Centers",
      categoryUz: "Infratuzilma va Data Center",
      items: ["Data Center Basics (Ma'lumotlar markazi)", "Network Segmentation (DMZ/VLAN)", "Firewall Rules", "Virtualization (VirtualBox/WSL)", "Git"]
    }
  ],

  ethicalPrinciplesEn: [
    "Strict Authorization: Testing conducted solely on personally owned lab hardware or explicitly authorized scopes.",
    "No Production Harm: Never run intrusive scripts on live production systems without signed permission.",
    "Responsible Disclosure: Promptly and responsibly reporting flaws only to system owners with fix steps.",
    "Continuous Learning: Open to feedback, steady improvement, and solid technical foundations."
  ],
  ethicalPrinciplesUz: [
    "Qat'iy ruxsat: Faqat shaxsiy lab, virtual tizimlar yoki aniq ruxsat berilgan doirada tekshirish.",
    "Zarar yetkazmaslik: Ishlab chiqarish tizimlarida ruxsatsiz vositalarni ishlatmaslik.",
    "Mas'uliyatli hisobot: Aniqlangan nuqsonlarni tizim egalariga tuzatish yo'llari bilan xabar berish.",
    "Doimiy o'rganish: Mutaxassislar maslahatiga quloq solish va bilimlarni muntazam oshirish."
  ]
};
