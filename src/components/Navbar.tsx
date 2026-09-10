import { useState, useEffect } from 'react';
import { Menu, X, Download, Mail, Check, Copy } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  onOpenResume: () => void;
  onOpenContact?: () => void;
}

export default function Navbar({ onOpenResume, onOpenContact }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const navItems = [
    { label: 'HOME', href: '#home' },
    { label: 'ABOUT', href: '#about' },
    { label: 'EXPERIENCE', href: '#experience' },
    { label: 'PROJECTS', href: '#projects' },
    { label: 'SKILLS', href: '#skills' },
    { label: 'ACHIEVEMENTS', href: '#achievements' },
    { label: 'CERTIFICATIONS', href: '#certifications' },
    { label: 'CONTACT', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Calculate scroll progress percentage
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100)));
      }

      const sections = navItems.map((item) => item.href.substring(1));
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-[#050814]/90 backdrop-blur-xl border-b border-blue-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.6)]'
          : 'py-5 bg-transparent border-b border-white/5'
      }`}
    >
      {/* Dynamic Scroll Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-slate-800/30 overflow-hidden pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-400 shadow-[0_0_12px_#38bdf8] transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      <div className="w-full max-w-[94vw] 2xl:max-w-[1640px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 flex items-center justify-between">
        {/* Brand identity: Kumari Sonali / KS */}
        <a
          href="#home"
          id="navbar-brand-link"
          className="group flex items-center gap-2.5 text-left focus:outline-none"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-500 border border-blue-400 flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.4)] group-hover:scale-105 transition-transform">
            <span className="text-white font-mono font-bold text-xs tracking-wider">
              {PERSONAL_INFO.mark}
            </span>
          </div>
          <span className="font-heading font-bold text-base sm:text-lg tracking-tight text-white group-hover:text-cyan-300 transition-colors">
            {PERSONAL_INFO.name}
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav id="desktop-nav-menu" className="hidden lg:flex items-center gap-3.5 xl:gap-5">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.label}
                href={item.href}
                id={`nav-link-${item.href.substring(1)}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className={`relative py-1 text-xs font-mono font-medium tracking-wider transition-colors duration-200 ${
                  isActive
                    ? 'text-cyan-300 font-bold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          {/* Quick Copy Email Button */}
          <button
            onClick={handleCopyEmail}
            id="nav-copy-email-btn"
            title="Copy email address"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-400/50 text-slate-300 hover:text-cyan-300 text-xs font-mono tracking-wider transition-colors shadow-sm cursor-pointer"
          >
            {copiedEmail ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">COPIED</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400" />
                <span className="hidden lg:inline">COPY EMAIL</span>
                <span className="lg:hidden">EMAIL</span>
              </>
            )}
          </button>

          {/* Resume Trigger Button */}
          <button
            onClick={onOpenResume}
            id="nav-resume-btn"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-cyan-300 text-xs font-mono font-medium tracking-wider transition-colors shadow-sm cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>RESUME</span>
          </button>

          {/* Contact Trigger Button */}
          {onOpenContact && (
            <button
              onClick={onOpenContact}
              id="nav-contact-btn"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-mono font-medium tracking-wider transition-colors cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5 text-blue-400" />
              <span>LET'S CONNECT</span>
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            id="nav-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white xl:hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-[#070B1B]/95 backdrop-blur-2xl border-b border-blue-500/20 px-6 py-5 shadow-2xl"
          >
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className="px-3 py-2 rounded-lg text-sm font-mono text-slate-300 hover:text-cyan-300 hover:bg-slate-900/60 transition-colors text-left"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenResume();
                  }}
                  className="w-full py-2.5 rounded-lg bg-blue-600 text-white font-mono text-xs font-bold flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>VIEW RESUME</span>
                </button>
                {onOpenContact && (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenContact();
                    }}
                    className="w-full py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 font-mono text-xs font-bold flex items-center justify-center gap-2"
                  >
                    <Mail className="w-4 h-4 text-blue-400" />
                    <span>LET'S CONNECT</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
