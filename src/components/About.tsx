import { motion } from 'motion/react';
import {
  GraduationCap,
  MapPin,
  Calendar,
  Layers,
  Brain,
  Cloud,
  Code,
  CheckCircle2,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import { EDUCATION_DATA, PERSONAL_INFO } from '../data/portfolioData';
import ScrambleText from './ScrambleText';

export default function About() {
  const focusAreas = [
    {
      title: 'Full-Stack Development',
      desc: 'Building modern responsive web architectures, API integrations, and robust client-side experiences.',
      icon: Code,
      accent: 'text-cyan-400 border-cyan-500/30 bg-cyan-950/30',
    },
    {
      title: 'Artificial Intelligence',
      desc: 'Developing practical AI-powered solutions, hazard evaluation algorithms, and generative models.',
      icon: Brain,
      accent: 'text-blue-400 border-blue-500/30 bg-blue-950/30',
    },
    {
      title: 'Data Analytics',
      desc: 'Applying exploratory data analysis, statistical modeling, and Python scripting to real-world datasets.',
      icon: Layers,
      accent: 'text-violet-400 border-violet-500/30 bg-violet-950/30',
    },
    {
      title: 'Cloud Technologies & DSA',
      desc: 'Exploring cloud infrastructure, Google Cloud Platform, Microsoft Azure, and data structures.',
      icon: Cloud,
      accent: 'text-emerald-400 border-emerald-500/30 bg-emerald-950/30',
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-blue-600/5 blur-[150px] pointer-events-none" />

      <div className="w-full max-w-[94vw] 2xl:max-w-[1640px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 relative z-10 text-left">
        {/* Section Header */}
        <div className="mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white tracking-tight flex items-center gap-3">
            <span className="text-blue-500 font-normal select-none">—</span>
            <ScrambleText text="About Me" />
          </h2>
          <p className="mt-2 text-sm text-slate-400 font-sans max-w-xl">
            Third-year Computer Science Engineering student bridging academic foundations with practical software engineering.
          </p>
        </div>

        {/* Two-Column Personal & Academic Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Personal Narrative & Core Focus */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="p-7 sm:p-8 rounded-3xl bg-[#080E22]/90 border border-slate-800 shadow-xl space-y-5">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold tracking-wider">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>PROFILE INTRODUCTION</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white leading-snug">
                Building practical software, intelligent systems, and data-driven solutions.
              </h3>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                I am a third-year Computer Science and Engineering student at{' '}
                <span className="text-white font-semibold">Rungta College of Engineering & Technology</span>{' '}
                (2024–2028), located in <span className="text-cyan-300 font-semibold">Bhilai, Chhattisgarh, India</span>.
              </p>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                My work centers on developing reliable full-stack applications, exploring applied machine learning and data analytics, and participating actively in open source and technical communities. As a Research Intern at{' '}
                <span className="text-violet-300 font-semibold">IIT Bhilai</span> and a student ambassador for both{' '}
                <span className="text-cyan-300 font-semibold">Google</span> and{' '}
                <span className="text-blue-300 font-semibold">Microsoft Learn</span>, I enjoy turning algorithmic concepts into usable software tools that solve real problems.
              </p>

              {/* Focus Areas Grid */}
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {focusAreas.map((area) => {
                  const Icon = area.icon;
                  return (
                    <div
                      key={area.title}
                      className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/40 transition-colors"
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className={`p-1.5 rounded-lg border ${area.accent}`}>
                          <Icon className="w-3.5 h-3.5" />
                        </span>
                        <h4 className="text-xs font-mono font-bold text-slate-200">
                          {area.title}
                        </h4>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        {area.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Factual Academic Foundation Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="p-7 rounded-3xl bg-[#070D1E]/90 border border-blue-500/25 shadow-xl space-y-5 relative overflow-hidden">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-400/30 text-blue-400">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-cyan-400">ACADEMIC FOUNDATION</div>
                  <h4 className="font-display font-bold text-white text-base sm:text-lg">
                    {EDUCATION_DATA.institution}
                  </h4>
                </div>
              </div>

              <div className="space-y-3 text-xs font-mono">
                <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Degree</span>
                  <span className="text-slate-200 font-semibold">{EDUCATION_DATA.degree}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Branch</span>
                  <span className="text-cyan-300 font-semibold">{EDUCATION_DATA.field}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Duration</span>
                  <span className="text-slate-200">{EDUCATION_DATA.duration}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Location</span>
                  <span className="text-slate-200">{EDUCATION_DATA.location}</span>
                </div>
              </div>

              {/* Real Semester Performance from Resume (Exact SPI values) */}
              <div className="pt-2">
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2.5 flex items-center justify-between">
                  <span>Semester Performance (SPI)</span>
                  <span className="text-emerald-400 font-semibold">Verified Resume Data</span>
                </div>
                <div className="grid grid-cols-3 gap-2.5">
                  {EDUCATION_DATA.semesters.map((sem) => (
                    <div
                      key={sem.sem}
                      className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center"
                    >
                      <div className="text-[10px] font-mono text-slate-400">{sem.sem}</div>
                      <div className="text-base font-mono font-bold text-cyan-300 mt-0.5">
                        {sem.spi}
                      </div>
                      <div className="text-[9px] font-mono text-slate-500">SPI</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Core Coursework */}
              <div className="pt-2">
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
                  Key Coursework
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {EDUCATION_DATA.coursework.map((course) => (
                    <span
                      key={course}
                      className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
