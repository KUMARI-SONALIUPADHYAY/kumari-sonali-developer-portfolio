import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Trophy,
  Award,
  Sparkles,
  Cpu,
  GitPullRequest,
  Star,
  Rocket,
  CheckCircle2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MILESTONES } from '../data/portfolioData';
import ScrambleText from './ScrambleText';

export default function Achievements() {
  const [celebratedId, setCelebratedId] = useState<string | null>(null);

  const triggerCelebration = (id: string) => {
    setCelebratedId(id);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#22d3ee', '#38bdf8', '#818cf8', '#fbbf24'],
    });
    setTimeout(() => setCelebratedId(null), 2000);
  };

  const getMilestoneIcon = (id: string) => {
    switch (id) {
      case 'gfg-rank':
        return Trophy;
      case 'google-ambassador-badge':
        return Sparkles;
      case 'ms-ambassador-badge':
        return Cpu;
      case 'gssoc-badge':
        return GitPullRequest;
      case 'gfg-scripter':
        return Star;
      case 'bharatiya-antariksh':
        return Rocket;
      default:
        return Award;
    }
  };

  const topMilestone = MILESTONES[0]; // GFG Rank 94
  const otherMilestones = MILESTONES.slice(1);

  return (
    <section id="achievements" className="py-24 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-amber-600/5 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[450px] h-[450px] rounded-full bg-blue-600/5 blur-[140px] pointer-events-none" />

      <div className="w-full max-w-[94vw] 2xl:max-w-[1640px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 relative z-10 text-left">
        {/* Section Header */}
        <div className="mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white tracking-tight flex items-center gap-3">
            <span className="text-blue-500 font-normal select-none">—</span>
            <ScrambleText text="Milestones //" />
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-400 font-sans max-w-2xl">
            Verified national rankings, competitive technical awards, ambassador appointments, and hackathon milestones.
          </p>
        </div>

        {/* Featured Banner: National Rank 94 - GeeksforGeeks Campus Mantri */}
        {topMilestone && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onClick={() => triggerCelebration(topMilestone.id)}
            className="mb-8 p-6 sm:p-8 rounded-3xl bg-[#090F24]/90 border-2 border-amber-500/50 hover:border-amber-400 transition-all duration-300 shadow-[0_0_35px_rgba(251,191,36,0.15)] group cursor-pointer relative overflow-hidden text-left"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-amber-500/10 via-transparent to-transparent pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-400/40 text-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.25)] shrink-0 group-hover:scale-105 transition-transform">
                  <Trophy className="w-8 h-8" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-[11px] font-mono text-amber-300 font-bold">
                      {topMilestone.rankHighlight}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {topMilestone.organization} • {topMilestone.year}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white mt-1.5 group-hover:text-amber-300 transition-colors">
                    {topMilestone.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-300 font-sans max-w-3xl leading-relaxed">
                    {topMilestone.description}
                  </p>
                </div>
              </div>

              <div className="shrink-0 flex md:flex-col items-end justify-between md:justify-center gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800">
                <div className="text-right">
                  <div className="text-2xl sm:text-3xl font-mono font-extrabold text-amber-400">
                    AIR #94
                  </div>
                  <div className="text-[10px] font-mono text-slate-400">
                    2,000+ Campus Mantris
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Other Genuine Milestones Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {otherMilestones.map((milestone, index) => {
            const Icon = getMilestoneIcon(milestone.id);

            return (
              <motion.div
                key={milestone.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                onClick={() => triggerCelebration(milestone.id)}
                className="p-6 rounded-2xl bg-[#080E21]/90 border border-slate-800 hover:border-slate-700 transition-all duration-300 group cursor-pointer flex flex-col justify-between text-left shadow-lg"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-blue-400 group-hover:text-cyan-300 group-hover:scale-105 transition-all">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-mono text-slate-400">
                      {milestone.year}
                    </span>
                  </div>

                  {milestone.rankHighlight && (
                    <div className="inline-block px-2 py-0.5 rounded bg-blue-950/60 border border-blue-500/30 text-[10px] font-mono text-cyan-300 font-semibold">
                      {milestone.rankHighlight}
                    </div>
                  )}

                  <h4 className="font-display font-bold text-base text-white group-hover:text-cyan-300 transition-colors">
                    {milestone.title}
                  </h4>

                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    {milestone.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>{milestone.organization}</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Verified</span>
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
