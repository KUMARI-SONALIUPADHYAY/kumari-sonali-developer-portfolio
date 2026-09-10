import { useState, type FormEvent } from 'react';
import { motion } from 'motion/react';
import {
  Send,
  Mail,
  Linkedin,
  Github,
  MapPin,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '../data/portfolioData';
import ScrambleText from './ScrambleText';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

const handleSendMessage = async (e: FormEvent) => {
  e.preventDefault();

  if (!formData.name || !formData.email || !formData.message) return;

  setIsSending(true);

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to send message");
    }

    setIsSending(false);
    setSent(true);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
    });
  } catch (error) {
    console.error("Message error:", error);
    setIsSending(false);
    alert("Sorry, your message could not be sent. Please try again.");
  }
};

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-blue-600/5 blur-[170px] pointer-events-none" />

      <div className="w-full max-w-[94vw] 2xl:max-w-[1640px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 relative z-10 text-left">
        {/* Section Header */}
        <div className="mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white tracking-tight flex items-center gap-3">
            <span className="text-blue-500 font-normal select-none">—</span>
            <ScrambleText text="LET'S CONNECT" />
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 font-sans max-w-2xl leading-relaxed">
            Open to software engineering, AI, full-stack and research opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Direct Contact Details & Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-4"
          >
            {/* Email Card with Copy Feature */}
            <div className="p-6 rounded-2xl bg-[#080E21]/90 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold">
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>EMAIL ADDRESS</span>
              </div>
              <div className="text-sm sm:text-base font-mono font-medium text-white break-all">
                {PERSONAL_INFO.email}
              </div>
              <button
                onClick={handleCopyEmail}
                className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-slate-300 hover:text-white flex items-center justify-center gap-2 transition-colors"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Email Copied to Clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Email Address</span>
                  </>
                )}
              </button>
            </div>

            {/* Location Card */}
            <div className="p-6 rounded-2xl bg-[#080E21]/90 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-blue-400 font-semibold">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span>LOCATION</span>
              </div>
              <div className="text-sm font-sans font-medium text-white">
                {PERSONAL_INFO.location}
              </div>
              <p className="text-xs text-slate-400 font-sans">
                Open to remote internships, on-site opportunities, and research collaborations.
              </p>
            </div>

            {/* Social & Professional Links */}
            <div className="p-6 rounded-2xl bg-[#080E21]/90 border border-slate-800 space-y-3">
              <div className="text-xs font-mono text-slate-400 font-semibold">
                PROFESSIONAL PROFILES
              </div>
              <div className="flex flex-col gap-2">
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/50 flex items-center justify-between text-xs font-mono text-slate-200 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4 text-blue-400" />
                    <span>LinkedIn // kumari-sonali-38a94a317</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>

                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-600 flex items-center justify-between text-xs font-mono text-slate-200 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Github className="w-4 h-4 text-slate-300" />
                    <span>GitHub // KUMARI-SONALIUPADHYAY</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Clean Professional Message Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7 rounded-2xl bg-[#080E21]/90 border border-slate-800 p-6 sm:p-8 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
          >
            {sent ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-blue-600/20 border border-blue-500 text-blue-400 flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-heading font-bold text-white">
                  Message Sent Successfully!
                </h3>
                <p className="text-sm text-slate-300 max-w-md">
                  Thank you, <span className="text-blue-400 font-semibold">{formData.name}</span>. Your message has been received. I will respond to your email as soon as possible.
                </p>
                <button
                  onClick={() => {
                    setSent(false);
                    setFormData({ name: '', email: '', subject: '', message: '' });
                  }}
                  className="mt-4 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-mono font-medium text-slate-300 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-mono font-medium text-slate-300 mb-1.5">
                      Your Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-mono font-medium text-slate-300 mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="Internship / Collaboration / Project Inquiry"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-mono font-medium text-slate-300 mb-1.5">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Hello Sonali, I would like to discuss..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs sm:text-sm font-semibold tracking-wider transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.4)] disabled:opacity-50 cursor-pointer"
                >
                  {isSending ? (
                    <span>Sending Message...</span>
                  ) : (
                    <>
                      <span>SEND MESSAGE</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
