import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Terminal,
  Cloud,
  Code2,
  Brain,
  Sparkles,
  Layers,
  Database,
  Cpu,
  CheckCircle2,
  Search,
} from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import ScrambleText from './ScrambleText';

export default function Skills() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'programming':
        return Terminal;
      case 'web':
        return Code2;
      case 'ai-data':
        return Brain;
      case 'databases-cloud':
        return Database;
      default:
        return Layers;
    }
  };

  const getCategoryAccent = (id: string) => {
    switch (id) {
      case 'programming':
        return {
          border: 'border-blue-500/30 hover:border-blue-400',
          badge: 'bg-blue-950/60 border-blue-500/40 text-blue-300',
          iconColor: 'text-blue-400',
        };
      case 'web':
        return {
          border: 'border-cyan-500/30 hover:border-cyan-400',
          badge: 'bg-cyan-950/60 border-cyan-500/40 text-cyan-300',
          iconColor: 'text-cyan-400',
        };
      case 'ai-data':
        return {
          border: 'border-violet-500/30 hover:border-violet-400',
          badge: 'bg-violet-950/60 border-violet-500/40 text-violet-300',
          iconColor: 'text-violet-400',
        };
      case 'databases-cloud':
        return {
          border: 'border-emerald-500/30 hover:border-emerald-400',
          badge: 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300',
          iconColor: 'text-emerald-400',
        };
      default:
        return {
          border: 'border-slate-800 hover:border-slate-700',
          badge: 'bg-slate-900 border-slate-800 text-slate-300',
          iconColor: 'text-slate-400',
        };
    }
  };

  const visibleCategories =
    selectedCategoryId === 'all'
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((c) => c.id === selectedCategoryId);

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Ambient background lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-600/5 blur-[160px] pointer-events-none" />

      <div className="w-full max-w-[94vw] 2xl:max-w-[1640px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 relative z-10 text-left">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white tracking-tight flex items-center gap-3">
            <span className="text-blue-500 font-normal select-none">—</span>
            <ScrambleText text="Technical Skills" />
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-400 font-sans max-w-2xl">
            Core technologies and tools utilized across software development, AI workflows, and cloud platforms.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2.5 mb-10">
          <button
            onClick={() => setSelectedCategoryId('all')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
              selectedCategoryId === 'all'
                ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]'
                : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
            }`}
          >
            All Categories ({SKILL_CATEGORIES.reduce((acc, c) => acc + c.skills.length, 0)})
          </button>
          {SKILL_CATEGORIES.map((cat) => {
            const Icon = getCategoryIcon(cat.id);
            const isSelected = selectedCategoryId === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategoryId(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]'
                    : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {visibleCategories.map((cat, index) => {
            const Icon = getCategoryIcon(cat.id);
            const accent = getCategoryAccent(cat.id);

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className={`p-6 sm:p-7 rounded-3xl bg-[#080E21]/90 border ${accent.border} transition-all duration-300 shadow-[0_4px_25px_rgba(0,0,0,0.3)] space-y-4`}
              >
                {/* Category Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                  <div className="flex items-center gap-2.5">
                    <span className={`p-2 rounded-xl bg-slate-900 border border-slate-800 ${accent.iconColor}`}>
                      <Icon className="w-4 h-4" />
                    </span>
                    <div>
                      <h3 className="font-display font-bold text-lg text-white">
                        {cat.name}
                      </h3>
                      <p className="text-xs text-slate-400 font-sans">
                        {cat.description}
                      </p>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-mono font-semibold border ${accent.badge}`}>
                    {cat.skills.length} Skills
                  </span>
                </div>

                {/* Skills Constellation (Chips with interactive hover) */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {cat.skills.map((skill) => {
                    const isHovered = hoveredSkill === skill;
                    return (
                      <div
                        key={skill}
                        onMouseEnter={() => setHoveredSkill(skill)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-mono font-medium transition-all duration-200 cursor-default flex items-center gap-1.5 ${
                          isHovered
                            ? 'bg-blue-600/30 border-blue-400 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)] scale-105'
                            : 'bg-slate-900/90 border border-slate-800/90 text-slate-200 hover:border-slate-700'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 opacity-80" />
                        <span>{skill}</span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
