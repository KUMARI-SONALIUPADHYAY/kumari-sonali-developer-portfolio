import { useState } from 'react';
import { motion } from 'motion/react';
import {
  X,
  Printer,
  Copy,
  CheckCircle2,
  FileText,
  Mail,
  MapPin,
  Github,
  Linkedin,
  GraduationCap,
  Briefcase,
  Code2,
  Trophy,
  ShieldCheck,
} from 'lucide-react';
import {
  PERSONAL_INFO,
  EDUCATION_DATA,
  EXPERIENCES,
  PROJECTS,
  SKILL_CATEGORIES,
  MILESTONES,
  CERTIFICATIONS,
} from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const resumeText = `
KUMARI SONALI
Email: ${PERSONAL_INFO.email} | Location: ${PERSONAL_INFO.location}
GitHub: ${PERSONAL_INFO.github} | LinkedIn: ${PERSONAL_INFO.linkedin}

EDUCATION
${EDUCATION_DATA.institution} - ${EDUCATION_DATA.degree} (${EDUCATION_DATA.field})
Duration: ${EDUCATION_DATA.duration} | Status: ${EDUCATION_DATA.status}
Core Coursework: ${EDUCATION_DATA.coursework.join(', ')}

EXPERIENCE
${EXPERIENCES.map(
  (e) => `• ${e.role} — ${e.organization} (${e.period})
  ${e.description.join('\n  ')}
  Skills: ${e.skills.join(', ')}`
).join('\n\n')}

PROJECTS
${PROJECTS.map(
  (p) => `• ${p.title} (${p.category})
  ${p.description}
  Technologies: ${p.technologies.join(', ')}`
).join('\n\n')}

ACHIEVEMENTS & HONORS
${MILESTONES.map((m) => `• ${m.title} (${m.year}) - ${m.description}`).join('\n')}

CERTIFICATIONS
${CERTIFICATIONS.map((c) => `• ${c.name} - ${c.issuer} (${c.year})`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      id="resume-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-4xl bg-[#090D1C] border border-cyan-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-left"
      >
        {/* Modal Action Bar */}
        <div className="px-6 py-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-mono text-cyan-300 font-semibold tracking-wider">
              KUMARI_SONALI_RESUME.PDF // DIGITAL VIEWER
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              id="resume-copy-btn"
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono flex items-center gap-1.5 transition-colors"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300">COPIED</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>COPY TEXT</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              id="resume-print-btn"
              className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>PRINT / PDF</span>
            </button>

            <button
              onClick={onClose}
              id="resume-modal-close-btn"
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Resume Content Document */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-8 print:p-0 print:bg-white print:text-black">
          {/* Document Header */}
          <div className="border-b border-slate-800 pb-6">
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
              KUMARI SONALI
            </h1>
            <p className="text-sm font-mono text-cyan-300 mt-1">
              Third-Year Computer Science Engineering Student • Software Developer & AI Enthusiast
            </p>
            <div className="flex flex-wrap gap-4 mt-3 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                {PERSONAL_INFO.email}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                {PERSONAL_INFO.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Github className="w-3.5 h-3.5 text-cyan-400" />
                {PERSONAL_INFO.github.replace('https://', '')}
              </span>
              <span className="flex items-center gap-1.5">
                <Linkedin className="w-3.5 h-3.5 text-cyan-400" />
                {PERSONAL_INFO.linkedin.replace('https://', '')}
              </span>
            </div>
          </div>

          {/* Education */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider pb-1 border-b border-slate-800/80">
              <GraduationCap className="w-4 h-4" />
              <span>EDUCATION</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
              <div>
                <h3 className="font-display font-bold text-base text-slate-100">
                  {EDUCATION_DATA.institution}
                </h3>
                <div className="text-xs font-mono text-cyan-300">
                  {EDUCATION_DATA.degree} — {EDUCATION_DATA.field}
                </div>
              </div>
              <div className="text-xs font-mono text-slate-400 mt-1 sm:mt-0">
                {EDUCATION_DATA.duration} | Bhilai, India
              </div>
            </div>
            <div className="text-xs font-mono text-slate-400">
              Relevant Coursework: {EDUCATION_DATA.coursework.join(' • ')}
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-5">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider pb-1 border-b border-slate-800/80">
              <Briefcase className="w-4 h-4" />
              <span>EXPERIENCE & LEADERSHIP</span>
            </div>
            <div className="space-y-4">
              {EXPERIENCES.map((exp) => (
                <div key={exp.id} className="space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                    <h4 className="font-display font-bold text-sm sm:text-base text-slate-100">
                      {exp.role}{' '}
                      <span className="text-slate-400 font-normal">| {exp.organization}</span>
                    </h4>
                    <span className="text-xs font-mono text-slate-400">{exp.period}</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-300 pl-1">
                    {exp.description.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                  <div className="text-[11px] font-mono text-slate-500 pt-0.5">
                    Skills: {exp.skills.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider pb-1 border-b border-slate-800/80">
              <Code2 className="w-4 h-4" />
              <span>PROJECTS</span>
            </div>
            <div className="space-y-4">
              {PROJECTS.map((proj) => (
                <div key={proj.id} className="space-y-1">
                  <div className="flex items-baseline justify-between">
                    <h4 className="font-display font-bold text-sm sm:text-base text-slate-100">
                      {proj.title}
                    </h4>
                    <span className="text-xs font-mono text-cyan-400">{proj.category}</span>
                  </div>
                  <p className="text-xs text-slate-300">{proj.description}</p>
                  <div className="text-[11px] font-mono text-slate-500">
                    Tech: {proj.technologies.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider pb-1 border-b border-slate-800/80">
              <Trophy className="w-4 h-4" />
              <span>HONORS & MILESTONES</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              {MILESTONES.map((m) => (
                <li key={m.id} className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span>
                    <strong className="text-slate-100 font-semibold">{m.title}</strong> — {m.description}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Certifications */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider pb-1 border-b border-slate-800/80">
              <ShieldCheck className="w-4 h-4" />
              <span>CERTIFICATIONS</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-slate-300">
              {CERTIFICATIONS.map((c) => (
                <div key={c.id} className="p-2 rounded bg-slate-900/60 border border-slate-800">
                  <div className="text-slate-100 font-semibold">{c.name}</div>
                  <div className="text-slate-500 text-[10px] mt-0.5">
                    {c.issuer} • {c.year}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
