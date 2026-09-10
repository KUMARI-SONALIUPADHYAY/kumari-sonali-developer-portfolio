import { useEffect, useRef, useState } from 'react';
import { Palette, Waves, Grid, Sparkles, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type BgTheme = 'aurora' | 'cyber' | 'cosmos';

interface ThemeOption {
  id: BgTheme;
  name: string;
  icon: typeof Waves;
  desc: string;
  badge: string;
}

const THEMES: ThemeOption[] = [
  {
    id: 'aurora',
    name: 'Aurora Waves',
    icon: Waves,
    desc: 'Harmonic glowing sine ribbons & floating embers',
    badge: 'NEW & VIBRANT',
  },
  {
    id: 'cyber',
    name: 'Cyber Horizon',
    icon: Grid,
    desc: '3D perspective matrix grid & digital nodes',
    badge: 'FUTURISTIC',
  },
  {
    id: 'cosmos',
    name: 'Deep Cosmos',
    icon: Sparkles,
    desc: 'Twinkling stardust & shooting stars',
    badge: 'CALM',
  },
];

export default function BackgroundStars() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [currentTheme, setCurrentTheme] = useState<BgTheme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio_bg_theme') as BgTheme;
      if (saved && ['aurora', 'cyber', 'cosmos'].includes(saved)) {
        return saved;
      }
    }
    return 'aurora'; // New vibrant default!
  });

  const [menuOpen, setMenuOpen] = useState(false);
  const themeRef = useRef<BgTheme>(currentTheme);

  useEffect(() => {
    themeRef.current = currentTheme;
    localStorage.setItem('portfolio_bg_theme', currentTheme);
  }, [currentTheme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse tracking with lerp smoothing
    const mouse = {
      x: width * 0.5,
      y: height * 0.4,
      targetX: width * 0.5,
      targetY: height * 0.4,
      active: false,
    };

    // ============================================
    // 1. AURORA WAVES ASSETS
    // ============================================
    interface Ember {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      baseAlpha: number;
      color: string;
    }

    const emberColors = ['#38bdf8', '#818cf8', '#c084fc', '#34d399', '#f472b6'];
    const embers: Ember[] = [];
    const emberCount = Math.min(Math.floor((width * height) / 18000), 55);

    for (let i = 0; i < emberCount; i++) {
      const baseAlpha = Math.random() * 0.55 + 0.25;
      embers.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -(Math.random() * 0.6 + 0.2),
        size: Math.random() * 2.2 + 0.8,
        alpha: baseAlpha,
        baseAlpha,
        color: emberColors[Math.floor(Math.random() * emberColors.length)],
      });
    }

    // ============================================
    // 2. CYBER HORIZON ASSETS
    // ============================================
    let cyberGridOffset = 0;
    interface CyberParticle {
      x: number;
      y: number;
      z: number;
      speed: number;
      char: string;
      color: string;
      alpha: number;
    }

    const cyberChars = ['0', '1', '{', '}', '</>', 'λ', '✦', '||', '=>', '::'];
    const cyberParticles: CyberParticle[] = [];
    for (let i = 0; i < 28; i++) {
      cyberParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.5 + 0.2,
        char: cyberChars[Math.floor(Math.random() * cyberChars.length)],
        color: Math.random() > 0.4 ? '#38bdf8' : '#818cf8',
        alpha: Math.random() * 0.4 + 0.2,
      });
    }

    // ============================================
    // 3. COSMOS ASSETS
    // ============================================
    interface Star {
      x: number;
      y: number;
      z: number;
      size: number;
      alpha: number;
      twinkleSpeed: number;
      color: string;
    }

    interface Meteor {
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      alpha: number;
    }

    const cosmosStars: Star[] = [];
    const cosmosStarCount = Math.min(Math.floor((width * height) / 9000), 120);
    const starColorList = ['#ffffff', '#bae6fd', '#e0e7ff', '#fbcfe8', '#a7f3d0'];

    for (let i = 0; i < cosmosStarCount; i++) {
      const z = Math.random() * 0.8 + 0.2;
      cosmosStars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z,
        size: z * 1.8 + 0.4,
        alpha: Math.random() * 0.7 + 0.2,
        twinkleSpeed: Math.random() * 1.8 + 0.8,
        color: starColorList[Math.floor(Math.random() * starColorList.length)],
      });
    }

    const meteors: Meteor[] = [];
    let meteorTimer = 180;

    // Window Events
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    let time = 0;

    // ============================================
    // MAIN CANVAS RENDER LOOP
    // ============================================
    const render = () => {
      time += 0.01;

      // Smooth mouse follow
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      ctx.clearRect(0, 0, width, height);

      const activeTheme = themeRef.current;

      // ----------------------------------------------------
      // MODE 1: AURORA WAVES (Vibrant, Fluid, Modern)
      // ----------------------------------------------------
      if (activeTheme === 'aurora') {
        // Deep background glow orbs
        const g1X = width * 0.3 + Math.sin(time * 0.5) * 100;
        const g1Y = height * 0.35 + Math.cos(time * 0.4) * 80;
        const orb1 = ctx.createRadialGradient(g1X, g1Y, 10, g1X, g1Y, width * 0.5);
        orb1.addColorStop(0, 'rgba(6, 182, 212, 0.12)'); // Cyan
        orb1.addColorStop(0.5, 'rgba(59, 130, 246, 0.06)'); // Blue
        orb1.addColorStop(1, 'transparent');
        ctx.fillStyle = orb1;
        ctx.fillRect(0, 0, width, height);

        const g2X = width * 0.75 - Math.cos(time * 0.45) * 120;
        const g2Y = height * 0.6 + Math.sin(time * 0.6) * 90;
        const orb2 = ctx.createRadialGradient(g2X, g2Y, 10, g2X, g2Y, width * 0.48);
        orb2.addColorStop(0, 'rgba(168, 85, 247, 0.10)'); // Violet
        orb2.addColorStop(0.5, 'rgba(236, 72, 153, 0.04)'); // Pink
        orb2.addColorStop(1, 'transparent');
        ctx.fillStyle = orb2;
        ctx.fillRect(0, 0, width, height);

        // Interactive mouse spotlight halo
        if (mouse.active) {
          const mouseGlow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 280);
          mouseGlow.addColorStop(0, 'rgba(56, 189, 248, 0.14)');
          mouseGlow.addColorStop(0.6, 'rgba(129, 140, 248, 0.04)');
          mouseGlow.addColorStop(1, 'transparent');
          ctx.fillStyle = mouseGlow;
          ctx.fillRect(0, 0, width, height);
        }

        // Draw Layered Aurora Ribbons
        const waveConfigs = [
          {
            baseY: height * 0.62,
            amp1: 55,
            amp2: 30,
            freq1: 0.0022,
            freq2: 0.0035,
            speed: 0.7,
            offset: 0,
            fillGrad: [
              { stop: 0, color: 'rgba(37, 99, 235, 0.14)' },
              { stop: 0.5, color: 'rgba(79, 70, 229, 0.08)' },
              { stop: 1, color: 'transparent' },
            ],
            stroke: 'rgba(96, 165, 250, 0.35)',
            strokeWidth: 1.5,
          },
          {
            baseY: height * 0.72,
            amp1: 65,
            amp2: 40,
            freq1: 0.0018,
            freq2: 0.0028,
            speed: 0.9,
            offset: 2.5,
            fillGrad: [
              { stop: 0, color: 'rgba(6, 182, 212, 0.16)' },
              { stop: 0.5, color: 'rgba(14, 165, 233, 0.09)' },
              { stop: 1, color: 'transparent' },
            ],
            stroke: 'rgba(56, 189, 248, 0.45)',
            strokeWidth: 2,
          },
          {
            baseY: height * 0.82,
            amp1: 75,
            amp2: 45,
            freq1: 0.0015,
            freq2: 0.0024,
            speed: 0.6,
            offset: 4.2,
            fillGrad: [
              { stop: 0, color: 'rgba(168, 85, 247, 0.13)' },
              { stop: 0.6, color: 'rgba(192, 132, 252, 0.06)' },
              { stop: 1, color: 'transparent' },
            ],
            stroke: 'rgba(192, 132, 252, 0.4)',
            strokeWidth: 1.5,
          },
          {
            baseY: height * 0.88,
            amp1: 50,
            amp2: 35,
            freq1: 0.0025,
            freq2: 0.004,
            speed: 1.1,
            offset: 1.2,
            fillGrad: [
              { stop: 0, color: 'rgba(52, 211, 153, 0.12)' },
              { stop: 0.5, color: 'rgba(6, 182, 212, 0.05)' },
              { stop: 1, color: 'transparent' },
            ],
            stroke: 'rgba(52, 211, 153, 0.38)',
            strokeWidth: 1.2,
          },
        ];

        const step = 20;

        waveConfigs.forEach((wc) => {
          const t = time * wc.speed + wc.offset;
          ctx.beginPath();
          ctx.moveTo(0, height);

          // Calculate wave points
          const points: { x: number; y: number }[] = [];
          for (let x = 0; x <= width + step; x += step) {
            // Interactive mouse gentle ripple on wave
            let mouseInfluence = 0;
            if (mouse.active) {
              const distToMouse = Math.abs(x - mouse.x);
              if (distToMouse < 220) {
                mouseInfluence = Math.cos((distToMouse / 220) * (Math.PI / 2)) * 30 * Math.sin(time * 3);
              }
            }

            const y =
              wc.baseY +
              Math.sin(x * wc.freq1 + t) * wc.amp1 +
              Math.cos(x * wc.freq2 - t * 0.8) * wc.amp2 +
              mouseInfluence;

            points.push({ x, y });
            ctx.lineTo(x, y);
          }

          ctx.lineTo(width, height);
          ctx.closePath();

          // Create vertical gradient
          const grad = ctx.createLinearGradient(0, wc.baseY - wc.amp1, 0, height);
          wc.fillGrad.forEach((fg) => grad.addColorStop(fg.stop, fg.color));
          ctx.fillStyle = grad;
          ctx.fill();

          // Luminous crest line
          ctx.save();
          ctx.strokeStyle = wc.stroke;
          ctx.lineWidth = wc.strokeWidth;
          ctx.beginPath();
          for (let i = 0; i < points.length; i++) {
            if (i === 0) ctx.moveTo(points[i].x, points[i].y);
            else ctx.lineTo(points[i].x, points[i].y);
          }
          ctx.stroke();
          ctx.restore();
        });

        // Floating Glowing Embers
        for (let i = 0; i < embers.length; i++) {
          const emb = embers[i];
          emb.x += emb.vx;
          emb.y += emb.vy;

          if (emb.y < -20) {
            emb.y = height + 20;
            emb.x = Math.random() * width;
          }
          if (emb.x < 0) emb.x = width;
          if (emb.x > width) emb.x = 0;

          // Mouse push
          if (mouse.active) {
            const dx = emb.x - mouse.x;
            const dy = emb.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 140 && dist > 0) {
              const force = (1 - dist / 140) * 1.5;
              emb.x += (dx / dist) * force;
              emb.y += (dy / dist) * force;
            }
          }

          const pulse = Math.sin(time * 2 + i) * 0.2;
          const alpha = Math.max(0.1, Math.min(1, emb.baseAlpha + pulse));

          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.fillStyle = emb.color;
          ctx.beginPath();
          ctx.arc(emb.x, emb.y, emb.size, 0, Math.PI * 2);
          ctx.fill();

          // Ember glow halo
          ctx.fillStyle = emb.color;
          ctx.globalAlpha = alpha * 0.3;
          ctx.beginPath();
          ctx.arc(emb.x, emb.y, emb.size * 2.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      // ----------------------------------------------------
      // MODE 2: CYBER HORIZON (3D Grid & Matrix Horizon)
      // ----------------------------------------------------
      else if (activeTheme === 'cyber') {
        // Horizon line position
        const horizonY = height * 0.52;

        // Ambient cyber glow at horizon
        const hGlow = ctx.createRadialGradient(
          width * 0.5,
          horizonY,
          20,
          width * 0.5,
          horizonY,
          width * 0.6
        );
        hGlow.addColorStop(0, 'rgba(6, 182, 212, 0.22)');
        hGlow.addColorStop(0.4, 'rgba(59, 130, 246, 0.09)');
        hGlow.addColorStop(1, 'transparent');
        ctx.fillStyle = hGlow;
        ctx.fillRect(0, 0, width, height);

        // Cyber Horizon Neon Beam
        ctx.save();
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.7)';
        ctx.lineWidth = 1.8;
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 14;
        ctx.beginPath();
        ctx.moveTo(0, horizonY);
        ctx.lineTo(width, horizonY);
        ctx.stroke();
        ctx.restore();

        // 3D Perspective Lines (Vanishing toward center horizon)
        const perspectiveCenter = width * 0.5 + (mouse.x - width * 0.5) * 0.08;
        const lineCount = 26;
        for (let i = -lineCount; i <= lineCount; i++) {
          const xBottom = perspectiveCenter + i * (width / 16);
          ctx.save();
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.18)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(perspectiveCenter + i * 4, horizonY);
          ctx.lineTo(xBottom, height);
          ctx.stroke();
          ctx.restore();
        }

        // Horizontal Moving Grid Lines (exponential spacing)
        cyberGridOffset = (cyberGridOffset + 0.005) % 1;
        const horizontalLines = 16;
        for (let i = 0; i < horizontalLines; i++) {
          const progress = (i + cyberGridOffset) / horizontalLines;
          const y = horizonY + Math.pow(progress, 2.2) * (height - horizonY);
          const alpha = progress * 0.45;

          ctx.save();
          ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
          ctx.lineWidth = 1 + progress * 0.8;
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
          ctx.restore();
        }

        // Floating digital cyber code particles
        ctx.font = '12px "JetBrains Mono", monospace';
        for (let i = 0; i < cyberParticles.length; i++) {
          const cp = cyberParticles[i];
          cp.y -= cp.speed;
          if (cp.y < 0) cp.y = height;

          ctx.save();
          ctx.fillStyle = cp.color;
          ctx.globalAlpha = cp.alpha;
          ctx.fillText(cp.char, cp.x, cp.y);
          ctx.restore();
        }
      }

      // ----------------------------------------------------
      // MODE 3: DEEP COSMOS (Stars & Shooting Meteors)
      // ----------------------------------------------------
      else if (activeTheme === 'cosmos') {
        // Subtle cosmic dust clouds
        const neb1 = ctx.createRadialGradient(width * 0.25, height * 0.3, 10, width * 0.25, height * 0.3, width * 0.45);
        neb1.addColorStop(0, 'rgba(129, 140, 248, 0.09)');
        neb1.addColorStop(1, 'transparent');
        ctx.fillStyle = neb1;
        ctx.fillRect(0, 0, width, height);

        const neb2 = ctx.createRadialGradient(width * 0.75, height * 0.7, 10, width * 0.75, height * 0.7, width * 0.4);
        neb2.addColorStop(0, 'rgba(6, 182, 212, 0.08)');
        neb2.addColorStop(1, 'transparent');
        ctx.fillStyle = neb2;
        ctx.fillRect(0, 0, width, height);

        // Render Stars
        for (let i = 0; i < cosmosStars.length; i++) {
          const s = cosmosStars[i];
          s.y -= s.z * 0.06;
          if (s.y < 0) s.y = height;

          const twinkle = Math.sin(time * s.twinkleSpeed + i) * 0.35;
          const alpha = Math.max(0.15, Math.min(1, s.alpha + twinkle));

          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.fillStyle = s.color;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
          ctx.fill();

          if (s.z > 0.75 && twinkle > 0.15) {
            ctx.strokeStyle = s.color;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(s.x - s.size * 2, s.y);
            ctx.lineTo(s.x + s.size * 2, s.y);
            ctx.moveTo(s.x, s.y - s.size * 2);
            ctx.lineTo(s.x, s.y + s.size * 2);
            ctx.stroke();
          }
          ctx.restore();
        }

        // Shooting Meteors
        meteorTimer--;
        if (meteorTimer <= 0) {
          meteors.push({
            x: Math.random() * (width * 0.8) + width * 0.1,
            y: Math.random() * (height * 0.35),
            length: Math.random() * 80 + 50,
            speed: Math.random() * 6 + 7,
            angle: (Math.random() * 20 + 25) * (Math.PI / 180),
            alpha: 1,
          });
          meteorTimer = Math.floor(Math.random() * 180 + 120);
        }

        for (let i = meteors.length - 1; i >= 0; i--) {
          const m = meteors[i];
          m.x += Math.cos(m.angle) * m.speed;
          m.y += Math.sin(m.angle) * m.speed;
          m.alpha -= 0.015;

          if (m.alpha <= 0 || m.x > width + 100 || m.y > height + 100) {
            meteors.splice(i, 1);
            continue;
          }

          const tailX = m.x - Math.cos(m.angle) * m.length;
          const tailY = m.y - Math.sin(m.angle) * m.length;

          const grad = ctx.createLinearGradient(tailX, tailY, m.x, m.y);
          grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
          grad.addColorStop(1, `rgba(56, 189, 248, ${m.alpha})`);

          ctx.save();
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(m.x, m.y);
          ctx.stroke();
          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const activeThemeObj = THEMES.find((t) => t.id === currentTheme) || THEMES[0];
  const ActiveIcon = activeThemeObj.icon;

  return (
    <>
      {/* Dynamic Animated Canvas Layer */}
      <canvas
        ref={canvasRef}
        id="portfolio-dynamic-background"
        className="fixed inset-0 pointer-events-none z-0"
        style={{ opacity: 0.82 }}
      />

      {/* Floating Theme Selector Pill in Bottom-Left Corner */}
      <div className="fixed bottom-6 left-6 z-40">
        <div className="relative">
          {/* Main Toggle Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            id="bg-theme-selector-btn"
            title="Change background style"
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#080E24]/90 hover:bg-[#0E1738] border border-slate-700/80 hover:border-cyan-400/60 text-slate-200 hover:text-cyan-300 shadow-[0_8px_25px_rgba(0,0,0,0.5)] transition-all duration-200 text-xs font-mono tracking-wider backdrop-blur-md cursor-pointer group"
          >
            <ActiveIcon className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline font-medium">{activeThemeObj.name}</span>
            <span className="sm:hidden font-medium">Theme</span>
            <Palette className="w-3 h-3 text-slate-400 group-hover:text-cyan-300 ml-0.5" />
          </button>

          {/* Theme Switcher Popover Menu */}
          <AnimatePresence>
            {menuOpen && (
              <>
                {/* Backdrop Click Dismiss */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setMenuOpen(false)}
                />

                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="absolute bottom-12 left-0 z-20 w-72 p-2 rounded-2xl bg-[#080E24]/95 border border-slate-700/90 shadow-[0_12px_40px_rgba(0,0,0,0.7)] backdrop-blur-xl space-y-1.5"
                >
                  <div className="px-3 py-2 border-b border-slate-800/80 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-400 tracking-wider uppercase font-semibold">
                      Background Style
                    </span>
                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/60">
                      Interactive
                    </span>
                  </div>

                  {THEMES.map((theme) => {
                    const IconComp = theme.icon;
                    const isSelected = currentTheme === theme.id;
                    return (
                      <button
                        key={theme.id}
                        onClick={() => {
                          setCurrentTheme(theme.id);
                          setMenuOpen(false);
                        }}
                        className={`w-full text-left p-2.5 rounded-xl transition-all duration-150 flex items-start gap-3 cursor-pointer ${
                          isSelected
                            ? 'bg-cyan-950/40 border border-cyan-500/40 text-white'
                            : 'hover:bg-slate-800/50 border border-transparent text-slate-300'
                        }`}
                      >
                        <div
                          className={`p-2 rounded-lg mt-0.5 ${
                            isSelected
                              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          <IconComp className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold tracking-wide">
                              {theme.name}
                            </span>
                            {isSelected ? (
                              <Check className="w-3.5 h-3.5 text-cyan-400" />
                            ) : (
                              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                                {theme.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">
                            {theme.desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
