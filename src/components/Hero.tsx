import { useState, useEffect, useRef, type ChangeEvent } from 'react';
import {
  ArrowRight,
  Download,
  Mail,
  Github,
  Linkedin,
  Sparkles,
  Atom,
  GitPullRequest,
  Camera,
  Award,
  Bookmark,
  CheckCircle2,
  Copy,
  Check,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';
import sonaliPortrait from '../assets/images/sonali_portrait_1788809528728.jpg';

interface HeroProps {
  onOpenResume: () => void;
  onOpenContact: () => void;
}

export default function Hero({ onOpenResume, onOpenContact }: HeroProps) {
  const roles = [
    'Full-Stack Developer',
    'Google Student Ambassador',
    'Microsoft Learn Ambassador',
    'Research Intern — IIT Bhilai',
    'Software Developer & AI Builder',
  ];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [photoSrc, setPhotoSrc] = useState<string>('/imagesonaliboss.jpeg');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  useEffect(() => {
    const roleInterval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(roleInterval);
  }, [roles.length]);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          setPhotoSrc(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section
      id="home"
      className="relative flex items-center justify-center pt-24 sm:pt-28 lg:pt-28 xl:pt-32 pb-12 sm:pb-16 lg:pb-20 min-h-[calc(100vh-4.5rem)] overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-blue-600/10 blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-cyan-500/10 blur-[150px] pointer-events-none" />

      {/* Cybernetic subtle grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b08_1px,transparent_1px),linear-gradient(to_bottom,#1e293b08_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Subtle radial scrim behind content ensuring maximum text & card legibility over dynamic waves */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_35%_45%,rgba(5,8,20,0.65)_0%,rgba(5,8,20,0.25)_65%,transparent_100%)] pointer-events-none" />

      {/* Expansive Responsive Desktop Container: min(92vw, 1600px) */}
      <div className="w-full max-w-[min(92vw,1600px)] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)] xl:grid-cols-[minmax(0,1.2fr)_minmax(370px,0.8fr)] gap-8 sm:gap-10 lg:gap-12 xl:gap-16 items-center">
          {/* Left Column: Comprehensive Hero Content with Consistent Vertical Rhythm */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-left flex flex-col gap-4 sm:gap-5 lg:gap-5 xl:gap-5.5 w-full"
          >
            {/* Top Identity Tag with Ambassador Status */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/40 text-xs font-mono text-slate-200 shadow-[0_0_15px_rgba(6,182,212,0.18)] backdrop-blur-md self-start">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="font-bold tracking-wider text-white">GSA & MSA</span>
              <span className="text-slate-600">|</span>
              <span className="text-cyan-400 font-semibold">SDE & AI</span>
            </div>

            {/* Main Display Name: Scaled with Clamp Typography */}
            <div className="space-y-1.5 sm:space-y-2">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[clamp(2.75rem,3.8vw,4.5rem)] xl:text-[clamp(3.3rem,4.5vw,5.25rem)] font-heading font-extrabold text-white tracking-tight leading-[1.05]">
                KUMARI{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300">
                  SONALI
                </span>
              </h1>

              {/* Dynamic Rotating Role Reveal */}
              <div className="h-9 sm:h-10 overflow-hidden flex items-center">
                <span className="text-lg sm:text-xl lg:text-2xl font-mono text-cyan-400 mr-2.5 font-semibold select-none">
                  //
                </span>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={roles[currentRoleIndex]}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="text-lg sm:text-xl lg:text-2xl font-display font-bold text-cyan-300 tracking-wide"
                  >
                    {roles[currentRoleIndex]}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Comprehensive, Genuine Professional Bio (Readable max-w-[680px]) */}
            <p className="text-sm sm:text-base text-slate-300 font-sans max-w-[680px] leading-relaxed">
              Third-year Computer Science & Engineering student at{' '}
              <span className="text-white font-semibold">Rungta College of Engineering & Technology</span>{' '}
              (RCET Bhilai, 2024–2028). Proud{' '}
              <span className="text-cyan-300 font-semibold">Google Student Ambassador</span> and{' '}
              <span className="text-blue-300 font-semibold">Microsoft Learn Student Ambassador</span>, as well as Research Intern at{' '}
              <span className="text-violet-300 font-semibold">IIT Bhilai</span>.
              Dedicated to architecting production full-stack web applications, applied AI workflows, and contributing to open-source software.
            </p>

            {/* Verified Leadership & Academic Badges (Left-aligned flex wrap) */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-950/80 border border-blue-500/50 text-xs font-mono text-blue-200 font-semibold shadow-sm hover:border-blue-400 transition-colors">
                <Award className="w-3.5 h-3.5 text-blue-400" />
                <span>Google Student Ambassador</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-950/80 border border-cyan-500/50 text-xs font-mono text-cyan-200 font-semibold shadow-sm hover:border-cyan-400 transition-colors">
                <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                <span>Microsoft Learn Ambassador</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-950/80 border border-violet-500/50 text-xs font-mono text-violet-200 font-semibold shadow-sm hover:border-violet-400 transition-colors">
                <Atom className="w-3.5 h-3.5 text-violet-400" />
                <span>Research Intern — IIT Bhilai</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-xs font-mono text-emerald-200 font-semibold shadow-sm hover:border-emerald-400 transition-colors">
                <GitPullRequest className="w-3.5 h-3.5 text-emerald-400" />
                <span>GSSoC 2026 Contributor</span>
              </div>
            </div>

            {/* Action Buttons & Social Links: Consistent Height & Radius */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-1">
              <a
                href="#projects"
                id="hero-view-projects-btn"
                className="h-11 px-5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs sm:text-sm font-semibold tracking-wider transition-all duration-200 shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] flex items-center gap-2 group cursor-pointer"
              >
                <span>EXPLORE BUILDS</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={onOpenResume}
                id="hero-resume-btn"
                className="h-11 px-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-cyan-400/60 text-slate-200 font-mono text-xs sm:text-sm tracking-wider transition-all duration-200 flex items-center gap-2 shadow-sm cursor-pointer"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>RESUME</span>
              </button>

              <button
                onClick={onOpenContact}
                id="hero-connect-btn"
                className="h-11 px-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-blue-400/60 text-slate-200 font-mono text-xs sm:text-sm tracking-wider transition-all duration-200 flex items-center gap-2 cursor-pointer"
              >
                <Mail className="w-4 h-4 text-blue-400" />
                <span>CONNECT</span>
              </button>

              {/* 1-Click Copy Email Button */}
              <button
                onClick={handleCopyEmail}
                id="hero-copy-email-btn"
                className="h-11 px-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-cyan-400/60 text-slate-200 font-mono text-xs sm:text-sm tracking-wider transition-all duration-200 flex items-center gap-2 cursor-pointer"
                title="Copy email to clipboard"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-300 font-semibold">COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-cyan-400" />
                    <span>COPY EMAIL</span>
                  </>
                )}
              </button>

              {/* Direct GitHub & LinkedIn Links */}
              <div className="flex items-center gap-2">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="h-11 w-11 rounded-xl bg-slate-900/80 border border-slate-700 hover:border-cyan-400/60 text-slate-300 hover:text-white transition-all duration-200 hover:scale-105 shadow-sm flex items-center justify-center cursor-pointer"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="h-11 w-11 rounded-xl bg-slate-900/80 border border-slate-700 hover:border-blue-400/60 text-slate-300 hover:text-white transition-all duration-200 hover:scale-105 shadow-sm flex items-center justify-center cursor-pointer"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* 6. Verified Accomplishments Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 w-full max-w-[680px] pt-1">
              <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800/80 hover:border-cyan-500/40 transition-colors">
                <div className="text-sm sm:text-base font-mono font-bold text-white flex items-center gap-1">
                  <span>GSA & MSA</span>
                </div>
                <div className="text-[10px] sm:text-[11px] text-cyan-400 font-mono tracking-wide uppercase">Ambassador</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800/80 hover:border-blue-500/40 transition-colors">
                <div className="text-sm sm:text-base font-mono font-bold text-white flex items-center gap-1">
                  <span>IIT Bhilai</span>
                </div>
                <div className="text-[10px] sm:text-[11px] text-blue-400 font-mono tracking-wide uppercase">Research Intern</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800/80 hover:border-amber-500/40 transition-colors">
                <div className="text-sm sm:text-base font-mono font-bold text-white flex items-center gap-1">
                  <span>Rank 94</span>
                  <span className="text-amber-400 text-[10px]">All-India</span>
                </div>
                <div className="text-[10px] sm:text-[11px] text-amber-400 font-mono tracking-wide uppercase">GfG Campus Mantri</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800/80 hover:border-emerald-500/40 transition-colors">
                <div className="text-sm sm:text-base font-mono font-bold text-white flex items-center gap-1">
                  <span>B.Tech CSE</span>
                </div>
                <div className="text-[10px] sm:text-[11px] text-emerald-400 font-mono tracking-wide uppercase">RCET (2024–2028)</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Centered Profile Card Column (Natural Grid Alignment) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex items-center justify-center lg:justify-center xl:justify-end relative"
          >
            <div className="relative w-full max-w-[280px] sm:max-w-[310px] md:max-w-[330px] lg:max-w-[340px] xl:max-w-[365px] 2xl:max-w-[380px]">
              {/* Subtle Atmospheric Backlight Glow */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-cyan-500/15 via-blue-600/20 to-indigo-600/15 blur-2xl pointer-events-none -z-10" />

              {/* Hidden File Input for Photo Upload */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                aria-label="Upload personal portrait photo"
              />

              {/* Sleek ID Card Frame */}
              <div className="relative rounded-2xl sm:rounded-3xl bg-[#080E24] border border-slate-700/80 hover:border-cyan-500/50 transition-colors shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden group">
                {/* ID Card Top Header */}
                <div className="px-4 py-2.5 bg-slate-900/95 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                    <span className="text-[11px] font-mono text-emerald-300 font-semibold tracking-wider">
                      AMBASSADOR & SDE
                    </span>
                  </div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    title="Upload or update your photo"
                    className="p-1 px-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-cyan-300 transition-colors text-[10px] flex items-center gap-1.5 font-mono cursor-pointer"
                  >
                    <Camera className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Update</span>
                  </button>
                </div>

                {/* Sized Portrait Image with Clean Frame */}
                <div className="relative aspect-[4/4.3] w-full overflow-hidden bg-slate-950">
                  <img
                    src={photoSrc}
                    alt="Kumari Sonali"
                    className="w-full h-full object-cover object-[center_16%] transition-transform duration-500 group-hover:scale-[1.02]"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.src.endsWith('/img.jpeg')) {
                        target.src = '/img.jpeg';
                      }
                    }}
                  />
                </div>

                {/* ID Card Footer */}
                <div className="p-3.5 sm:p-4 bg-[#080E24] border-t border-slate-800/90 text-left space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading font-bold text-white text-base sm:text-lg tracking-tight flex items-center gap-1.5">
                      <span>Kumari Sonali</span>
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 fill-cyan-400/20" />
                    </h3>
                    <span className="text-xs font-mono text-cyan-300 font-semibold px-2 py-0.5 rounded-md bg-cyan-950/80 border border-cyan-500/40">
                      B.Tech CSE
                    </span>
                  </div>

                  {/* Ambassador Badges */}
                  <div className="flex flex-wrap gap-1.5">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-blue-950/90 border border-blue-500/50 text-[11px] font-mono text-blue-200">
                      <Bookmark className="w-3 h-3 text-blue-400" />
                      Google
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-cyan-950/90 border border-cyan-500/50 text-[11px] font-mono text-cyan-200">
                      <Sparkles className="w-3 h-3 text-cyan-300" />
                      Microsoft
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-violet-950/90 border border-violet-500/50 text-[11px] font-mono text-violet-200">
                      IIT Bhilai
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 font-mono pt-0.5">
                    RCET Bhilai (2024–2028)
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

