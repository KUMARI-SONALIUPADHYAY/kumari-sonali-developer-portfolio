import { ArrowUp } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800/80 bg-[#04060F] py-12 relative z-10 text-left">
      <div className="w-full max-w-[94vw] 2xl:max-w-[1640px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/60">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-lg text-white">
                {PERSONAL_INFO.name}
              </span>
              <span className="text-slate-500">|</span>
              <span className="text-xs font-mono text-cyan-300">
                SOFTWARE DEVELOPER & AI ENTHUSIAST
              </span>
            </div>
            <p className="text-xs text-slate-400 font-sans mt-1">
              Built with modern React, TypeScript, Tailwind CSS and Motion.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              id="footer-back-to-top-btn"
              className="p-2.5 px-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-cyan-300 hover:border-cyan-400 transition-colors flex items-center gap-1.5 text-xs font-mono"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 gap-3">
          <div>
            © {new Date().getFullYear()} {PERSONAL_INFO.name}. All verified portfolio information.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>BHILAI, CHHATTISGARH, INDIA</span>
            <span>•</span>
            <span>RCET CSE (2024–2028)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
