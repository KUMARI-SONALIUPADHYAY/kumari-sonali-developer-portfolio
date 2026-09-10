import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ExternalLink,
  Github,
  MapPin,
  AlertTriangle,
  QrCode,
  Heart,
  ShieldCheck,
  ShieldAlert,
  Search,
  MessageCircle,
  CheckCircle2,
  Layers,
  Sparkles,
  Info,
  Building2,
  Calendar,
} from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { ProjectData } from '../types';
import ScrambleText from './ScrambleText';

/* =========================================================================
   MINI PRODUCT SHOWCASE 1: CIVICWATCH AI (Map + Hazard UI)
   ========================================================================= */
function CivicWatchPreview() {
  const [selectedIncident, setSelectedIncident] = useState(0);

  const incidents = [
    {
      title: 'Pothole & Road Cavity',
      severity: 'HIGH RISK',
      severityColor: 'text-rose-400 border-rose-500/40 bg-rose-950/40',
      coords: '21.1938° N, 81.3509° E',
      location: 'Sector 6 Outer Ring, Bhilai',
      confidence: '95.8%',
      status: 'VERIFIED & QUEUED',
    },
    {
      title: 'Monsoon Waterlogging',
      severity: 'MODERATE',
      severityColor: 'text-amber-400 border-amber-500/40 bg-amber-950/40',
      coords: '21.2144° N, 81.3280° E',
      location: 'Underpass North Corridor',
      confidence: '92.4%',
      status: 'DISPATCHED',
    },
  ];

  const current = incidents[selectedIncident];

  return (
    <div className="w-full rounded-2xl bg-[#040817] border border-cyan-500/30 p-4 font-mono text-left shadow-inner">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-[11px] text-cyan-300 font-semibold tracking-wider">
            CIVICWATCH // INCIDENT DISPATCH MAP
          </span>
        </div>
        <span className="text-[10px] text-slate-400">GPS TELEMETRY ACTIVE</span>
      </div>

      {/* Simulated Map View with Hazard Markers */}
      <div className="relative my-3 h-36 rounded-xl bg-[#020510] border border-slate-800 overflow-hidden p-3 flex flex-col justify-between">
        {/* Grid lines overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-30 pointer-events-none" />

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900/90 border border-slate-700 text-[10px] text-slate-300">
            <MapPin className="w-3 h-3 text-cyan-400" />
            <span>{current.coords}</span>
          </div>
          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${current.severityColor}`}>
            {current.severity}
          </span>
        </div>

        {/* Center hazard pin alert */}
        <div className="relative z-10 self-center border border-cyan-400/80 bg-cyan-500/10 px-3.5 py-2 rounded-xl flex items-center gap-2.5 backdrop-blur-sm">
          <AlertTriangle className="w-4 h-4 text-amber-300 animate-bounce" />
          <div>
            <div className="text-[11px] text-white font-bold">{current.title}</div>
            <div className="text-[9px] text-cyan-300 font-mono">
              AI Vision Confidence: {current.confidence}
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between text-[10px] text-slate-400">
          <span>{current.location}</span>
          <span className="text-emerald-400 font-semibold">{current.status}</span>
        </div>
      </div>

      {/* Incident Switcher */}
      <div className="flex gap-2 pt-1">
        {incidents.map((inc, i) => (
          <button
            key={inc.title}
            onClick={() => setSelectedIncident(i)}
            className={`flex-1 py-1 px-2 rounded text-[10px] border transition-colors ${
              selectedIncident === i
                ? 'bg-cyan-950/70 border-cyan-400/50 text-cyan-200 font-bold'
                : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            Report #{i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

/* =========================================================================
   MINI PRODUCT SHOWCASE 2: SMART HEALTH QR (Emergency QR + Doctor Dashboard)
   ========================================================================= */
function SmartHealthPreview() {
  const [activeView, setActiveView] = useState<'qr' | 'triage'>('qr');

  return (
    <div className="w-full rounded-2xl bg-[#050A1C] border border-blue-500/30 p-4 font-mono text-left shadow-inner">
      {/* Top Header with Hackathon Badge */}
      <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Heart className="w-3.5 h-3.5 text-rose-400" />
          <span className="text-[11px] text-blue-300 font-semibold tracking-wider">
            SMART HEALTH QR // TRIAGE PORTAL
          </span>
        </div>
        <span className="px-2 py-0.5 rounded bg-blue-950/60 border border-blue-500/40 text-[9px] text-blue-300 font-semibold">
          PRAYATNA 3.0
        </span>
      </div>

      <div className="my-3 min-h-[144px] rounded-xl bg-[#020510] border border-slate-800 p-3.5 flex items-center justify-between gap-4">
        {activeView === 'qr' ? (
          <>
            {/* Visual QR Code Representation */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-white p-2 flex flex-col justify-between shrink-0 shadow-lg border border-slate-300">
              <div className="flex justify-between">
                <div className="w-5 h-5 bg-black rounded-sm flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-white" />
                </div>
                <div className="w-5 h-5 bg-black rounded-sm flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-white" />
                </div>
              </div>
              <div className="flex justify-center">
                <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
              </div>
              <div className="flex justify-between">
                <div className="w-5 h-5 bg-black rounded-sm flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-white" />
                </div>
                <div className="grid grid-cols-2 gap-0.5 w-5 h-5">
                  <span className="bg-black" />
                  <span className="bg-white" />
                  <span className="bg-white" />
                  <span className="bg-black" />
                </div>
              </div>
            </div>

            {/* Quick Details beside QR */}
            <div className="space-y-1.5 text-[11px] flex-1">
              <div className="text-white font-bold text-xs flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Patient Emergency Token</span>
              </div>
              <div className="text-slate-400">Scan to retrieve vital records instantly.</div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800 space-y-1 text-[10px]">
                <div className="flex justify-between">
                  <span className="text-slate-400">Blood Group:</span>
                  <span className="text-rose-300 font-bold">O Positive (O+)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Allergies:</span>
                  <span className="text-amber-300">Penicillin, Peanuts</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Doctor Triage Dashboard View */
          <div className="w-full space-y-2 text-[11px]">
            <div className="flex items-center justify-between pb-1 border-b border-slate-800">
              <span className="text-cyan-300 font-bold">Authenticated Doctor View</span>
              <span className="text-emerald-400 text-[10px]">Access Logged</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <div className="text-slate-400">Emergency Contact:</div>
                <div className="text-white font-bold mt-0.5">+91 9827X-XXXXX (Kin)</div>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <div className="text-slate-400">Pre-existing:</div>
                <div className="text-white font-bold mt-0.5">Type 1 Diabetes</div>
              </div>
            </div>
            <div className="p-1.5 rounded bg-blue-950/40 border border-blue-500/30 text-[9px] text-blue-300 flex items-center gap-1.5">
              <Info className="w-3 h-3 text-blue-400 shrink-0" />
              <span>Session encrypted. Doctor credentials verified via token.</span>
            </div>
          </div>
        )}
      </div>

      {/* View Switcher Tabs */}
      <div className="flex gap-2 pt-1">
        <button
          onClick={() => setActiveView('qr')}
          className={`flex-1 py-1 px-2 rounded text-[10px] border transition-colors ${
            activeView === 'qr'
              ? 'bg-blue-950/70 border-blue-400/50 text-blue-200 font-bold'
              : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          Patient QR View
        </button>
        <button
          onClick={() => setActiveView('triage')}
          className={`flex-1 py-1 px-2 rounded text-[10px] border transition-colors ${
            activeView === 'triage'
              ? 'bg-blue-950/70 border-blue-400/50 text-blue-200 font-bold'
              : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          Doctor Triage View
        </button>
      </div>
    </div>
  );
}

/* =========================================================================
   MINI PRODUCT SHOWCASE 3: VERITAS X (Risk Analysis UI & Scoring)
   ========================================================================= */
function VeritasXPreview() {
  const [selectedVector, setSelectedVector] = useState<'url' | 'message'>('url');

  return (
    <div className="w-full rounded-2xl bg-[#0A081D] border border-violet-500/30 p-4 font-mono text-left shadow-inner">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-3.5 h-3.5 text-violet-400" />
          <span className="text-[11px] text-violet-300 font-semibold tracking-wider">
            VERITAS X // THREAT DETECTION ENGINE
          </span>
        </div>
        <span className="text-[10px] text-slate-400">MULTIMODAL AI</span>
      </div>

      <div className="my-3 min-h-[144px] rounded-xl bg-[#03020E] border border-slate-800 p-3.5 space-y-2.5">
        {selectedVector === 'url' ? (
          <>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-400">PAYLOAD: https://bank-verify-portal.top/login</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-950/60 border border-rose-500/50 text-rose-400">
                DANGER (PHISHING)
              </span>
            </div>

            {/* Risk Gauge */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px]">
                <span className="text-slate-400">Calculated Risk Score:</span>
                <span className="text-rose-400 font-bold">88 / 100</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-500 to-rose-500 w-[88%]" />
              </div>
            </div>

            {/* Explainable Signals */}
            <div className="p-2 rounded bg-slate-900/90 border border-slate-800 space-y-1 text-[10px]">
              <div className="text-slate-300 font-semibold flex items-center gap-1">
                <AlertTriangle className="w-3 h-3 text-amber-400" />
                <span>Signals Detected:</span>
              </div>
              <div className="text-slate-400 pl-4 space-y-0.5">
                <div>• Homograph domain spoofing target: legitimate banking portal</div>
                <div>• Recently registered domain (&lt; 48 hours old)</div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-400">PAYLOAD: "Your account is suspended. Click to claim ₹50,000"</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950/60 border border-amber-500/50 text-amber-400">
                SUSPICIOUS (FRAUD)
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[10px]">
                <span className="text-slate-400">Calculated Risk Score:</span>
                <span className="text-amber-400 font-bold">74 / 100</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-500 to-amber-500 w-[74%]" />
              </div>
            </div>

            <div className="p-2 rounded bg-slate-900/90 border border-slate-800 space-y-1 text-[10px]">
              <div className="text-slate-300 font-semibold flex items-center gap-1">
                <AlertTriangle className="w-3 h-3 text-amber-400" />
                <span>Signals Detected:</span>
              </div>
              <div className="text-slate-400 pl-4 space-y-0.5">
                <div>• Artificial urgency manipulation keyword: "Suspended"</div>
                <div>• Unrealistic financial incentive lure detected</div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Vector Switcher Tabs */}
      <div className="flex gap-2 pt-1">
        <button
          onClick={() => setSelectedVector('url')}
          className={`flex-1 py-1 px-2 rounded text-[10px] border transition-colors ${
            selectedVector === 'url'
              ? 'bg-violet-950/70 border-violet-400/50 text-violet-200 font-bold'
              : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          URL Analysis Sample
        </button>
        <button
          onClick={() => setSelectedVector('message')}
          className={`flex-1 py-1 px-2 rounded text-[10px] border transition-colors ${
            selectedVector === 'message'
              ? 'bg-violet-950/70 border-violet-400/50 text-violet-200 font-bold'
              : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          SMS / Text Sample
        </button>
      </div>
    </div>
  );
}

/* =========================================================================
   MINI PRODUCT SHOWCASE 4: PARISIMAN HEALTHCARE (Commercial Corporate UI)
   ========================================================================= */
function ParisimanPreview() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'instruments' | 'diagnostics'>('all');

  const products = [
    { name: 'Precision Surgical Forceps Set', cat: 'instruments', code: 'PS-401', stock: 'In Stock' },
    { name: 'Digital Diagnostic Monitor Pro', cat: 'diagnostics', code: 'DD-880', stock: 'Certified' },
    { name: 'Sterile Disposables Pack 100x', cat: 'instruments', code: 'SD-109', stock: 'Bulk Ready' },
  ];

  const filtered =
    activeCategory === 'all' ? products : products.filter((p) => p.cat === activeCategory);

  return (
    <div className="w-full rounded-2xl bg-[#041215] border border-emerald-500/30 p-4 font-mono text-left shadow-inner">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Building2 className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-[11px] text-emerald-300 font-semibold tracking-wider">
            PARISIMAN HEALTHCARE // CORPORATE PORTAL
          </span>
        </div>
        <span className="px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/40 text-[9px] text-emerald-300 font-semibold">
          LIVE ON VERCEL
        </span>
      </div>

      <div className="my-3 min-h-[144px] rounded-xl bg-[#02090B] border border-slate-800 p-3 space-y-2">
        {/* Mock Search Bar & WhatsApp CTA */}
        <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-800/80">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-[10px] text-slate-300 flex-1">
            <Search className="w-3 h-3 text-slate-400" />
            <span className="text-slate-400">Search medical catalogue...</span>
          </div>
          <div className="flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold">
            <MessageCircle className="w-3 h-3 text-emerald-400" />
            <span>WhatsApp Enquiry</span>
          </div>
        </div>

        {/* Product Items List */}
        <div className="space-y-1.5">
          {filtered.map((prod) => (
            <div
              key={prod.name}
              className="p-2 rounded-lg bg-slate-900/70 border border-slate-800 flex items-center justify-between text-[11px]"
            >
              <div>
                <div className="text-white font-bold text-[11px]">{prod.name}</div>
                <div className="text-slate-500 text-[9px]">SKU: {prod.code} • Medical Grade</div>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-[9px] font-bold">
                {prod.stock}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex gap-2 pt-1">
        <button
          onClick={() => setActiveCategory('all')}
          className={`flex-1 py-1 px-2 rounded text-[10px] border transition-colors ${
            activeCategory === 'all'
              ? 'bg-emerald-950/70 border-emerald-400/50 text-emerald-200 font-bold'
              : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          All Products
        </button>
        <button
          onClick={() => setActiveCategory('instruments')}
          className={`flex-1 py-1 px-2 rounded text-[10px] border transition-colors ${
            activeCategory === 'instruments'
              ? 'bg-emerald-950/70 border-emerald-400/50 text-emerald-200 font-bold'
              : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          Instruments
        </button>
        <button
          onClick={() => setActiveCategory('diagnostics')}
          className={`flex-1 py-1 px-2 rounded text-[10px] border transition-colors ${
            activeCategory === 'diagnostics'
              ? 'bg-emerald-950/70 border-emerald-400/50 text-emerald-200 font-bold'
              : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          Diagnostics
        </button>
      </div>
    </div>
  );
}

/* =========================================================================
   MAIN PROJECTS COMPONENT
   ========================================================================= */
export default function Projects() {
  const renderPreview = (type: ProjectData['type']) => {
    switch (type) {
      case 'civicwatch':
        return <CivicWatchPreview />;
      case 'smarthealth':
        return <SmartHealthPreview />;
      case 'veritas':
        return <VeritasXPreview />;
      case 'parisiman':
        return <ParisimanPreview />;
    }
  };

  const project1 = PROJECTS[0]; // CivicWatch AI
  const project2 = PROJECTS[1]; // Smart Health QR
  const project3 = PROJECTS[2]; // VERITAS X
  const project4 = PROJECTS[3]; // Parisiman Healthcare

  return (
    <section id="projects" className="py-24 lg:py-28 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-0 w-[550px] h-[550px] rounded-full bg-blue-600/5 blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[550px] h-[550px] rounded-full bg-cyan-600/5 blur-[180px] pointer-events-none" />

      <div className="w-full max-w-[94vw] 2xl:max-w-[1640px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 relative z-10 text-left">
        {/* Section Header */}
        <div className="mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white tracking-tight flex items-center gap-3">
            <span className="text-blue-500 font-normal select-none">—</span>
            <ScrambleText text="Selected Builds //" />
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-400 font-sans max-w-3xl">
            Real production systems and intelligent platforms built with modern web architectures, applied AI models, and cloud infrastructure.
          </p>
        </div>

        <div className="space-y-10 lg:space-y-12">
          {/* =========================================================================
              PROJECT 1: CIVICWATCH AI — LARGE FEATURED SHOWCASE
              ========================================================================= */}
          {project1 && (
            <motion.div
              key={project1.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              whileHover={{
                y: -6,
                transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
              }}
              className="relative group p-7 sm:p-9 lg:p-10 rounded-3xl bg-[#080E21]/90 border border-slate-800/90 hover:border-cyan-400/50 transition-colors duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_55px_-10px_rgba(6,182,212,0.22),0_0_35px_rgba(59,130,246,0.14)] overflow-hidden"
            >
              <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-cyan-500/0 group-hover:bg-cyan-500/10 blur-[110px] transition-all duration-500 pointer-events-none" />
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/0 to-transparent group-hover:via-cyan-400/70 transition-all duration-500 pointer-events-none" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left Column (7 cols): Details */}
                <div className="lg:col-span-7 space-y-4 sm:space-y-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3.5 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-xs font-mono text-cyan-300 font-semibold shadow-[0_0_12px_rgba(6,182,212,0.15)]">
                      FEATURED SHOWCASE • 01
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {project1.category}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white group-hover:text-cyan-100 transition-colors leading-tight">
                    {project1.title}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
                    {project1.longDescription || project1.description}
                  </p>

                  {/* Core Capabilities */}
                  <div className="space-y-2 pt-1">
                    <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                      Core Capabilities
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {project1.capabilities.map((cap) => (
                        <div key={cap} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300 font-sans">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {project1.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* CTAs */}
                  <div className="pt-3 flex flex-wrap items-center gap-3.5">
                    <a
                      href={project1.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs sm:text-sm font-semibold tracking-wider transition-colors flex items-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                    >
                      <span>LIVE DEMO</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={project1.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-500 text-slate-200 font-mono text-xs sm:text-sm font-semibold tracking-wider transition-colors flex items-center gap-2"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>SOURCE CODE</span>
                    </a>
                  </div>
                </div>

                {/* Right Column (5 cols): Interactive Telemetry Map Simulator */}
                <div className="lg:col-span-5">
                  {renderPreview(project1.type)}
                </div>
              </div>
            </motion.div>
          )}

          {/* =========================================================================
              PROJECTS 2 & 3: WIDE 2-COLUMN RESPONSIVE SHOWCASE GRID
              ========================================================================= */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-10">
            {/* Project 2: Smart Health QR */}
            {project2 && (
              <motion.div
                key={project2.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                whileHover={{
                  y: -6,
                  transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
                }}
                className="relative group p-7 sm:p-8 rounded-3xl bg-[#080E21]/90 border border-slate-800/90 hover:border-blue-400/50 transition-colors duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_55px_-10px_rgba(59,130,246,0.22)] overflow-hidden flex flex-col justify-between"
              >
                <div className="absolute -top-28 -right-28 w-80 h-80 rounded-full bg-blue-500/0 group-hover:bg-blue-500/10 blur-[100px] transition-all duration-500 pointer-events-none" />
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-400/0 to-transparent group-hover:via-blue-400/70 transition-all duration-500 pointer-events-none" />

                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-xs font-mono text-blue-300 font-semibold">
                      PROJECT 02
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {project2.category}
                    </span>
                    {project2.hackathonContext && (
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-[10px] font-mono text-amber-300 font-semibold">
                        Prayatna 3.0 Hackathon
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-white group-hover:text-blue-200 transition-colors leading-tight">
                    {project2.title}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
                    {project2.description}
                  </p>

                  {/* Interactive QR / Triage Simulator */}
                  <div className="py-2">
                    {renderPreview(project2.type)}
                  </div>

                  {/* Capabilities */}
                  <div className="space-y-1.5 pt-1">
                    <div className="text-[11px] font-mono text-blue-400 uppercase tracking-wider font-semibold">
                      Key Highlights
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {project2.capabilities.slice(0, 4).map((cap) => (
                        <div key={cap} className="flex items-start gap-1.5 text-xs text-slate-300 font-sans">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                          <span>{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project2.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTAs */}
                <div className="pt-6 flex flex-wrap items-center gap-3">
                  <a
                    href={project2.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-semibold tracking-wider transition-colors flex items-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                  >
                    <span>LIVE DEMO</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={project2.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-500 text-slate-200 font-mono text-xs font-semibold tracking-wider transition-colors flex items-center gap-2"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>SOURCE CODE</span>
                  </a>
                </div>
              </motion.div>
            )}

            {/* Project 3: VERITAS X */}
            {project3 && (
              <motion.div
                key={project3.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                whileHover={{
                  y: -6,
                  transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
                }}
                className="relative group p-7 sm:p-8 rounded-3xl bg-[#080E21]/90 border border-slate-800/90 hover:border-violet-400/50 transition-colors duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_55px_-10px_rgba(167,139,250,0.22)] overflow-hidden flex flex-col justify-between"
              >
                <div className="absolute -top-28 -right-28 w-80 h-80 rounded-full bg-violet-500/0 group-hover:bg-violet-500/10 blur-[100px] transition-all duration-500 pointer-events-none" />
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-violet-400/0 to-transparent group-hover:via-violet-400/70 transition-all duration-500 pointer-events-none" />

                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-violet-500/15 border border-violet-400/30 text-xs font-mono text-violet-300 font-semibold">
                      PROJECT 03
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {project3.category}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-white group-hover:text-violet-200 transition-colors leading-tight">
                    {project3.title}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
                    {project3.description}
                  </p>

                  {/* Status Note */}
                  {project3.statusNote && (
                    <div className="p-3 rounded-xl bg-violet-950/40 border border-violet-500/30 text-xs font-mono text-violet-200 flex items-start gap-2">
                      <Info className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                      <span>{project3.statusNote}</span>
                    </div>
                  )}

                  {/* Interactive Veritas Scanner Simulator */}
                  <div className="py-2">
                    {renderPreview(project3.type)}
                  </div>

                  {/* Capabilities */}
                  <div className="space-y-1.5 pt-1">
                    <div className="text-[11px] font-mono text-violet-400 uppercase tracking-wider font-semibold">
                      Detection Capabilities
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {project3.capabilities.slice(0, 4).map((cap) => (
                        <div key={cap} className="flex items-start gap-1.5 text-xs text-slate-300 font-sans">
                          <CheckCircle2 className="w-3.5 h-3.5 text-violet-400 shrink-0 mt-0.5" />
                          <span>{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project3.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTAs */}
                <div className="pt-6 flex flex-wrap items-center gap-3">
                  <a
                    href={project3.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-mono text-xs font-semibold tracking-wider transition-colors flex items-center gap-2 shadow-[0_0_20px_rgba(147,51,234,0.4)]"
                  >
                    <span>LIVE DEMO</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={project3.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-500 text-slate-200 font-mono text-xs font-semibold tracking-wider transition-colors flex items-center gap-2"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>SOURCE CODE</span>
                  </a>
                </div>
              </motion.div>
            )}
          </div>

          {/* =========================================================================
              PROJECT 4: PARISIMAN HEALTHCARE — FULL-WIDTH ENTERPRISE SHOWCASE
              ========================================================================= */}
          {project4 && (
            <motion.div
              key={project4.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              whileHover={{
                y: -6,
                transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
              }}
              className="relative group p-7 sm:p-9 lg:p-10 rounded-3xl bg-[#080E21]/90 border border-slate-800/90 hover:border-emerald-400/50 transition-colors duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_55px_-10px_rgba(16,185,129,0.22)] overflow-hidden"
            >
              <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-emerald-500/0 group-hover:bg-emerald-500/10 blur-[110px] transition-all duration-500 pointer-events-none" />
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/0 to-transparent group-hover:via-emerald-400/70 transition-all duration-500 pointer-events-none" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left Column (7 cols): Enterprise Features */}
                <div className="lg:col-span-7 space-y-4 sm:space-y-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-xs font-mono text-emerald-300 font-semibold">
                      PRODUCTION COMMERCIAL BUILD • 04
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {project4.category}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white group-hover:text-emerald-100 transition-colors leading-tight">
                    {project4.title}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
                    {project4.longDescription || project4.description}
                  </p>

                  {/* Core Capabilities */}
                  <div className="space-y-2 pt-1">
                    <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider font-semibold">
                      Production Highlights
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {project4.capabilities.map((cap) => (
                        <div key={cap} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300 font-sans">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {project4.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* CTAs */}
                  <div className="pt-3 flex flex-wrap items-center gap-3.5">
                    <a
                      href={project4.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs sm:text-sm font-semibold tracking-wider transition-colors flex items-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                    >
                      <span>LIVE DEPLOYED SITE</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={project4.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-500 text-slate-200 font-mono text-xs sm:text-sm font-semibold tracking-wider transition-colors flex items-center gap-2"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>SOURCE CODE</span>
                    </a>
                  </div>
                </div>

                {/* Right Column (5 cols): Interactive Medical Catalogue Simulator */}
                <div className="lg:col-span-5">
                  {renderPreview(project4.type)}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
