import { motion } from 'motion/react';
import {
  Calendar,
  MapPin,
  Sparkles,
  Cpu,
  Atom,
  GitPullRequest,
  Code,
  Award,
  Users,
} from 'lucide-react';
import { EXPERIENCES } from '../data/portfolioData';
import ScrambleText from './ScrambleText';

export default function Experience() {
  const getExperienceIcon = (id: string) => {
    switch (id) {
      case 'iit-bhilai':
        return Atom;
      case 'google-ambassador':
        return Sparkles;
      case 'mlsa':
        return Cpu;
      case 'gfg-mantri':
        return Award;
      case 'gssoc-2026':
        return GitPullRequest;
      case 'infinity-coders':
        return Users;
      default:
        return Code;
    }
  };

  const getOrgColor = (id: string) => {
    switch (id) {
      case 'iit-bhilai':
        return 'text-violet-400';
      case 'google-ambassador':
        return 'text-cyan-400';
      case 'mlsa':
        return 'text-blue-400';
      case 'gfg-mantri':
        return 'text-amber-400';
      case 'gssoc-2026':
        return 'text-emerald-400';
      case 'infinity-coders':
        return 'text-indigo-400';
      default:
        return 'text-blue-400';
    }
  };

  const getNodeColor = (id: string) => {
    switch (id) {
      case 'iit-bhilai':
        return 'bg-violet-500 border-violet-400 shadow-[0_0_15px_rgba(167,139,250,0.6)]';
      case 'google-ambassador':
        return 'bg-cyan-500 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.6)]';
      case 'mlsa':
        return 'bg-blue-500 border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.6)]';
      case 'gfg-mantri':
        return 'bg-amber-500 border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.6)]';
      case 'gssoc-2026':
        return 'bg-emerald-500 border-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.6)]';
      case 'infinity-coders':
        return 'bg-indigo-500 border-indigo-400 shadow-[0_0_15px_rgba(129,140,248,0.6)]';
      default:
        return 'bg-blue-500 border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.6)]';
    }
  };

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full bg-blue-600/5 blur-[160px] pointer-events-none" />

      <div className="w-full max-w-[94vw] 2xl:max-w-[1640px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 relative z-10 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Sticky Section Header & Overview Card */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white tracking-tight flex items-center gap-3">
                <span className="text-blue-500 font-normal select-none">—</span>
                <ScrambleText text="Experience" />
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-400 font-sans leading-relaxed">
                Verified leadership, open-source engineering, and institutional research appointments across premier academic and tech organizations.
              </p>
            </motion.div>

            {/* Overview Summary Box */}
            <div className="p-6 rounded-2xl bg-[#080E21]/90 border border-slate-800 space-y-4">
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                APPOINTMENTS SUMMARY
              </div>
              <div className="grid grid-cols-2 gap-3 text-left">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-xl sm:text-2xl font-mono font-bold text-white">06</div>
                  <div className="text-[11px] font-mono text-slate-400 mt-0.5">Verified Roles</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-xl sm:text-2xl font-mono font-bold text-cyan-300">IIT + MNC</div>
                  <div className="text-[11px] font-mono text-slate-400 mt-0.5">Premier Orgs</div>
                </div>
              </div>
              <div className="text-xs text-slate-400 font-sans leading-relaxed pt-1">
                Spanning research internship at IIT Bhilai, student ambassador appointments from Google & Microsoft, and national community evangelism.
              </div>
            </div>
          </div>

          {/* Right Column: Continuous Vertical Timeline Track */}
          <div className="lg:col-span-8">
            <div className="relative pl-6 sm:pl-10 border-l-2 border-slate-800/90 ml-2 sm:ml-4 space-y-10">
              {EXPERIENCES.map((exp, index) => {
                const Icon = getExperienceIcon(exp.id);
                const orgColor = getOrgColor(exp.id);
                const nodeStyle = getNodeColor(exp.id);

                return (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    className="relative group"
                  >
                    {/* Timeline node */}
                    <div
                      className={`absolute -left-[31px] sm:-left-[47px] top-1.5 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 ${nodeStyle} group-hover:scale-125 transition-transform duration-200`}
                    />

                    {/* Experience Card Container */}
                    <div className="p-6 sm:p-7 rounded-2xl bg-[#080E21]/90 border border-slate-800 hover:border-slate-700 transition-all duration-300 shadow-[0_4px_25px_rgba(0,0,0,0.3)] space-y-4">
                      {/* Top Bar: Role, Org, Period */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800/80">
                        <div>
                          <div className="flex items-center gap-2">
                            <Icon className={`w-4 h-4 ${orgColor}`} />
                            <h3 className="font-display font-bold text-lg sm:text-xl text-white">
                              {exp.role}
                            </h3>
                            {exp.highlightBadge && (
                              <span className="px-2 py-0.5 rounded-full bg-blue-500/15 border border-blue-400/30 text-[10px] font-mono text-cyan-300 font-semibold">
                                {exp.highlightBadge}
                              </span>
                            )}
                          </div>
                          <div className={`text-sm font-sans font-medium mt-0.5 ${orgColor}`}>
                            {exp.organization}
                          </div>
                        </div>

                        <div className="flex items-center gap-3 text-xs font-mono text-slate-400 shrink-0">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-slate-500" />
                            <span>{exp.period}</span>
                          </div>
                          {exp.location && (
                            <div className="flex items-center gap-1 hidden sm:flex">
                              <MapPin className="w-3.5 h-3.5 text-slate-500" />
                              <span>{exp.location}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Bullet Descriptions */}
                      <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                        {exp.description.map((point, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2">
                            <span className="text-blue-400 font-bold select-none mt-0.5">•</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Skill Badges */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {exp.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2.5 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[10px] sm:text-[11px] font-mono text-slate-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
