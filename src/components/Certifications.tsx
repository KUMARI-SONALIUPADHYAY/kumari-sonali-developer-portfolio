import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Award,
  CheckCircle2,
  X,
  ExternalLink,
  ShieldCheck,
  Building,
  Sparkles,
} from 'lucide-react';
import { CERTIFICATIONS } from '../data/portfolioData';
import { CertificationData } from '../types';
import ScrambleText from './ScrambleText';

export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState<CertificationData | null>(null);

  const getIssuerBadge = (issuer: string) => {
    if (issuer.includes('Microsoft')) {
      return 'bg-blue-950/60 border-blue-500/40 text-blue-300';
    }
    if (issuer.includes('Oracle')) {
      return 'bg-rose-950/60 border-rose-500/40 text-rose-300';
    }
    if (issuer.includes('Forage') || issuer.includes('Deloitte') || issuer.includes('Commonwealth') || issuer.includes('Walmart')) {
      return 'bg-cyan-950/60 border-cyan-500/40 text-cyan-300';
    }
    if (issuer.includes('J.P. Morgan')) {
      return 'bg-amber-950/60 border-amber-500/40 text-amber-300';
    }
    return 'bg-slate-900 border-slate-700 text-slate-300';
  };

  return (
    <section id="certifications" className="py-24 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-0 w-96 h-96 rounded-full bg-blue-600/5 blur-[160px] pointer-events-none" />

      <div className="w-full max-w-[94vw] 2xl:max-w-[1640px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 relative z-10 text-left">
        {/* Section Header */}
        <div className="mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white tracking-tight flex items-center gap-3">
            <span className="text-blue-500 font-normal select-none">—</span>
            <ScrambleText text="Certifications //" />
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-400 font-sans max-w-2xl">
            Verified credentials and job simulations across artificial intelligence, cloud infrastructure, and software engineering.
          </p>
        </div>

        {/* 11 Certifications Premium Grid (up to 4-columns on xl screens) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {CERTIFICATIONS.map((cert, index) => {
            const badgeClass = getIssuerBadge(cert.issuer);

            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                onClick={() => setSelectedCert(cert)}
                className="p-5 sm:p-6 rounded-2xl bg-[#080E21]/90 border border-slate-800 hover:border-cyan-500/50 hover:-translate-y-1.5 hover:shadow-[0_12px_35px_-8px_rgba(6,182,212,0.22)] transition-all duration-300 group cursor-pointer flex flex-col justify-between shadow-lg relative overflow-hidden"
              >
                {/* Subtle card top accent shimmer */}
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-500/0 to-transparent group-hover:via-cyan-400 transition-all duration-500" />
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono px-2.5 py-1 rounded-md border font-semibold ${badgeClass}`}>
                      {cert.issuer}
                    </span>
                    {cert.year && (
                      <span className="text-[11px] font-mono text-slate-400">{cert.year}</span>
                    )}
                  </div>

                  <h3 className="font-display font-bold text-sm sm:text-base text-white group-hover:text-cyan-300 transition-colors leading-snug">
                    {cert.name}
                  </h3>

                  {/* Skills/Competencies */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {cert.skills.map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-300"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Verified</span>
                  </span>
                  <span className="text-cyan-400 group-hover:underline flex items-center gap-1">
                    <span>View Details</span>
                    <span>→</span>
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Detail Modal on Click */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-2xl bg-[#0A1026] border border-blue-500/40 p-6 sm:p-7 space-y-5 text-left shadow-2xl"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-mono text-cyan-300 font-semibold tracking-wider">
                    CERTIFICATION DETAILS
                  </span>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div>
                <span className="text-xs font-mono text-blue-400 font-semibold">
                  {selectedCert.issuer}
                </span>
                <h3 className="text-xl font-display font-bold text-white mt-1">
                  {selectedCert.name}
                </h3>
                {selectedCert.year && (
                  <div className="text-xs font-mono text-slate-400 mt-1">
                    Issued / Verified: {selectedCert.year}
                  </div>
                )}
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs font-mono">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">STATUS:</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>VERIFIED PROFILE RECORD</span>
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">ISSUING ENTITY:</span>
                  <span className="text-slate-200 font-medium">{selectedCert.issuer}</span>
                </div>
              </div>

              <div>
                <div className="text-xs font-mono text-slate-400 mb-2">
                  COMPETENCIES & FOCUS DOMAINS:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end">
                <button
                  onClick={() => setSelectedCert(null)}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold transition-colors"
                >
                  Close View
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
