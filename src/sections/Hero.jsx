import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";

// ─── Animated canvas dot-grid that reacts to mouse ───────────────────────────
function ParticleGrid() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width, height, dots;
    const SPACING = 38;
    const INFLUENCE_RADIUS = 160;
    const DOT_BASE = 1.2;
    const DOT_MAX = 3.5;

    const resize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      dots = [];
      for (let x = 0; x < width; x += SPACING) {
        for (let y = 0; y < height; y += SPACING) {
          dots.push({ x, y, ox: x, oy: y, vx: 0, vy: 0 });
        }
      }
    };

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      dots.forEach((d) => {
        const dx = d.x - mx;
        const dy = d.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - dist / INFLUENCE_RADIUS);

        // Spring back to origin
        d.vx += (d.ox - d.x) * 0.08;
        d.vy += (d.oy - d.y) * 0.08;

        // Repel from mouse
        if (dist < INFLUENCE_RADIUS && dist > 0) {
          const force = (influence * influence) * 18;
          d.vx += (dx / dist) * force;
          d.vy += (dy / dist) * force;
        }

        d.vx *= 0.78;
        d.vy *= 0.78;
        d.x += d.vx;
        d.y += d.vy;

        const r = DOT_BASE + influence * (DOT_MAX - DOT_BASE);
        const alpha = 0.12 + influence * 0.55;

        ctx.beginPath();
        ctx.arc(d.x, d.y, r, 0, Math.PI * 2);

        if (influence > 0.05) {
          // Glowing dots near cursor
          const grd = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, r * 2.5);
          grd.addColorStop(0, `rgba(0,255,135,${alpha})`);
          grd.addColorStop(1, `rgba(0,229,255,0)`);
          ctx.fillStyle = grd;
        } else {
          ctx.fillStyle = `rgba(255,255,255,${0.1 + influence * 0.2})`;
        }
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.9 }}
    />
  );
}

// ─── Spring glow orb that follows cursor ─────────────────────────────────────
function CursorGlow() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const move = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <motion.div
      className="fixed pointer-events-none z-0 rounded-full"
      style={{
        width: 600,
        height: 600,
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        background:
          "radial-gradient(circle, rgba(0,255,135,0.07) 0%, rgba(0,229,255,0.04) 40%, transparent 70%)",
      }}
    />
  );
}

// ─── Typewriter role cycler ───────────────────────────────────────────────────
const ROLES = [
  "Frontend Developer",
  "React Specialist",
  "UI/UX Engineer",
  "Creative Coder",
  "Performance Nerd",
];

function RoleCycler() {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState("typing"); // typing | pause | erasing

  useEffect(() => {
    const current = ROLES[index];
    let timeout;

    if (phase === "typing") {
      if (displayed.length < current.length) {
        timeout = setTimeout(
          () => setDisplayed(current.slice(0, displayed.length + 1)),
          55 + Math.random() * 30
        );
      } else {
        timeout = setTimeout(() => setPhase("pause"), 1800);
      }
    } else if (phase === "pause") {
      timeout = setTimeout(() => setPhase("erasing"), 300);
    } else if (phase === "erasing") {
      if (displayed.length > 0) {
        timeout = setTimeout(
          () => setDisplayed(displayed.slice(0, -1)),
          28
        );
      } else {
        setIndex((i) => (i + 1) % ROLES.length);
        setPhase("typing");
      }
    }

    return () => clearTimeout(timeout);
  }, [displayed, phase, index]);

  return (
    <span className="inline-flex items-center">
      <span style={{ color: "#00FF87" }} className="font-mono">
        {displayed}
      </span>
      <motion.span
        className="inline-block w-0.5 h-6 md:h-8 ml-0.5 rounded-sm"
        style={{ background: "#00FF87" }}
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse", ease: "steps(1)" }}
      />
    </span>
  );
}

// ─── Magnetic CTA button ──────────────────────────────────────────────────────
function MagneticButton({ children, href, variant = "primary", className = "" }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 25 });
  const springY = useSpring(y, { stiffness: 200, damping: 25 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.25);
    y.set((e.clientY - cy) * 0.25);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={`relative inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-sm font-mono tracking-widest uppercase font-medium overflow-hidden group ${className}`}
      whileTap={{ scale: 0.96 }}
    >
      {variant === "primary" ? (
        <>
          <span
            className="absolute inset-0 transition-opacity duration-300"
            style={{ background: "linear-gradient(135deg, #00FF87 0%, #00e5ff 100%)" }}
          />
          <span
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: "linear-gradient(135deg, #00e5ff 0%, #00FF87 100%)" }}
          />
          {/* Shine sweep */}
          <span
            className="absolute top-0 left-[-100%] w-full h-full group-hover:left-[100%] transition-all duration-700"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
              skewX: "-15deg",
            }}
          />
          <span className="relative z-10 text-black font-bold">{children}</span>
        </>
      ) : (
        <>
          <span
            className="absolute inset-0 rounded-full border border-white/20 group-hover:border-white/50 transition-colors duration-300"
          />
          <span
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"
            style={{ background: "rgba(255,255,255,0.05)" }}
          />
          <span className="relative z-10 text-white/70 group-hover:text-white transition-colors duration-300">
            {children}
          </span>
        </>
      )}
    </motion.a>
  );
}

// ─── Stat counter ─────────────────────────────────────────────────────────────
function StatItem({ value, label, delay }) {
  return (
    <motion.div
      className="flex flex-col gap-1"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <span
        className="text-3xl md:text-4xl font-display font-extrabold leading-none"
        style={{ color: "#00FF87" }}
      >
        {value}
      </span>
      <span className="text-xs font-mono tracking-[0.2em] uppercase text-white/40">
        {label}
      </span>
    </motion.div>
  );
}

// ─── Noise texture overlay ────────────────────────────────────────────────────
function NoiseOverlay() {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-10 opacity-[0.025]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "128px 128px",
      }}
    />
  );
}

// ─── Scroll indicator ─────────────────────────────────────────────────────────
function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.2, duration: 0.8 }}
    >
      <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-white/25">
        Scroll
      </span>
      <div className="relative w-px h-12 overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
        <motion.div
          className="absolute top-0 left-0 w-full"
          style={{ background: "linear-gradient(180deg, #00FF87, transparent)", height: "50%" }}
          animate={{ y: ["0%", "200%"] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}

// ─── Big ambient background orbs ─────────────────────────────────────────────
function AmbientOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Top-right green bloom */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 700,
          height: 700,
          top: "-20%",
          right: "-15%",
          background: "radial-gradient(circle, rgba(0,255,135,0.08) 0%, transparent 65%)",
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Bottom-left pink bloom */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 600,
          height: 600,
          bottom: "-20%",
          left: "-10%",
          background: "radial-gradient(circle, rgba(255,45,120,0.07) 0%, transparent 65%)",
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />
      {/* Center cyan accent */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 400,
          height: 400,
          top: "40%",
          left: "50%",
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle, rgba(0,229,255,0.04) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />
    </div>
  );
}

// ─── Main Hero ────────────────────────────────────────────────────────────────
export default function Hero() {
  const heroRef = useRef(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 25 });

  // Parallax transforms for depth layers
  const bgX = useTransform(springX, [0, 1], [-18, 18]);
  const bgY = useTransform(springY, [0, 1], [-12, 12]);
  const midX = useTransform(springX, [0, 1], [-10, 10]);
  const midY = useTransform(springY, [0, 1], [-6, 6]);

  const handleMouseMove = useCallback((e) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }, []);

  // Staggered entrance — sequenced delays
  const seq = {
    tag:    { delay: 0.2 },
    h1a:    { delay: 0.5 },
    h1b:    { delay: 0.7 },
    role:   { delay: 0.95 },
    desc:   { delay: 1.15 },
    ctas:   { delay: 1.35 },
    stats:  { delay: 1.55 },
    side:   { delay: 1.8 },
  };

  const fadeUp = (delay) => ({
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section
      id="home"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full flex items-center overflow-hidden"
      style={{ background: "#050508" }}
    >
      {/* Layer 0 — Noise */}
      <NoiseOverlay />

      {/* Layer 1 — Ambient orbs (parallax deep) */}
      <motion.div
        className="absolute inset-0"
        style={{ x: bgX, y: bgY }}
      >
        <AmbientOrbs />
      </motion.div>

      {/* Layer 2 — Dot grid canvas */}
      <motion.div
        className="absolute inset-0"
        style={{ x: midX, y: midY }}
      >
        <ParticleGrid />
      </motion.div>

      {/* Layer 3 — Cursor glow */}
      <CursorGlow />

      {/* Layer 4 — Horizontal rule accents */}
      <div
        className="absolute left-0 right-0 pointer-events-none"
        style={{ top: "50%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(0,255,135,0.06) 30%, rgba(0,255,135,0.06) 70%, transparent)" }}
      />

      {/* Vertical side label — left */}
      <motion.div
        className="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4 z-20"
        {...fadeUp(seq.side.delay)}
      >
        <div className="w-px h-16" style={{ background: "linear-gradient(180deg, transparent, rgba(0,255,135,0.4))" }} />
        <span
          className="text-[10px] font-mono tracking-[0.4em] uppercase text-white/25"
          style={{ writingMode: "vertical-rl" }}
        >
          Portfolio 2025
        </span>
        <div className="w-px h-16" style={{ background: "linear-gradient(180deg, rgba(0,255,135,0.4), transparent)" }} />
      </motion.div>

      {/* Vertical side label — right */}
      <motion.div
        className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4 z-20"
        {...fadeUp(seq.side.delay)}
      >
        <div className="w-px h-16" style={{ background: "linear-gradient(180deg, transparent, rgba(255,45,120,0.3))" }} />
        <span
          className="text-[10px] font-mono tracking-[0.4em] uppercase text-white/25"
          style={{ writingMode: "vertical-rl" }}
        >
          Frontend Engineer
        </span>
        <div className="w-px h-16" style={{ background: "linear-gradient(180deg, rgba(255,45,120,0.3), transparent)" }} />
      </motion.div>

      {/* ── Main content ───────────────────────────────────────────────────── */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-16 pt-24 pb-32">
        <div className="max-w-4xl">

          {/* Tag line */}
          <motion.div
            className="flex items-center gap-3 mb-8"
            {...fadeUp(seq.tag.delay)}
          >
            <span
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono tracking-[0.3em] uppercase border"
              style={{
                borderColor: "rgba(0,255,135,0.25)",
                color: "#00FF87",
                background: "rgba(0,255,135,0.06)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF87] animate-pulse" />
              Available for work
            </span>
            <div className="h-px flex-1 max-w-[80px]" style={{ background: "rgba(255,255,255,0.1)" }} />
          </motion.div>

          {/* Hero headline — broken into two lines for editorial feel */}
          <div className="overflow-hidden mb-2">
            <motion.h1
              className="font-display font-extrabold leading-[0.9] text-white"
              style={{ fontSize: "clamp(3.5rem, 9vw, 8rem)" }}
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: seq.h1a.delay, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            >
              Crafting
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-6">
            <motion.h1
              className="font-display font-extrabold leading-[0.9] relative"
              style={{ fontSize: "clamp(3.5rem, 9vw, 8rem)" }}
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: seq.h1b.delay, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Outlined / stroked text effect for "Digital" */}
              <span
                className="font-display font-extrabold"
                style={{
                  WebkitTextStroke: "2px rgba(0,255,135,0.7)",
                  color: "transparent",
                  marginRight: "0.25em",
                }}
              >
                Digital
              </span>
              <span
                style={{
                  background: "linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.6) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Experiences
              </span>
            </motion.h1>
          </div>

          {/* Role typewriter */}
          <motion.div
            className="flex items-center gap-3 mb-8"
            {...fadeUp(seq.role.delay)}
          >
            <span className="text-white/30 font-mono text-sm tracking-widest">{"// "}</span>
            <span className="text-lg md:text-xl font-mono font-light">
              <RoleCycler />
            </span>
          </motion.div>

          {/* Description */}
          <motion.p
            className="text-white/45 font-mono text-sm md:text-base leading-relaxed max-w-lg mb-10"
            style={{ letterSpacing: "0.02em" }}
            {...fadeUp(seq.desc.delay)}
          >
            Hi, I'm{" "}
            <span className="text-white font-medium">Saurabh</span>. I build fast,
            accessible, and visually obsessive web experiences. From pixel-perfect UIs
            to seamless interactions — I care deeply about every detail.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap items-center gap-4 mb-16"
            {...fadeUp(seq.ctas.delay)}
          >
            <MagneticButton href="#projects" variant="primary">
              View My Work
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="ml-1">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </MagneticButton>
            <MagneticButton href="#contact" variant="ghost">
              Let's Talk
            </MagneticButton>
            <a
              href="/resume.pdf"
              download
              className="flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-white/35 hover:text-white/70 transition-colors duration-300 group ml-2"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 1v7M3 5l3 3 3-3M1 11h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="group-hover:underline underline-offset-4">Resume</span>
            </a>
          </motion.div>

          {/* Stats */}
          <div className="flex flex-wrap items-center gap-8 md:gap-12">
            <StatItem value="10+" label="Projects Built" delay={seq.stats.delay} />
            <div className="w-px h-10 hidden sm:block" style={{ background: "rgba(255,255,255,0.08)" }} />
            <StatItem value="15+" label="Technologies Learned" delay={seq.stats.delay + 0.1} />
            <div className="w-px h-10 hidden sm:block" style={{ background: "rgba(255,255,255,0.08)" }} />
            <StatItem value="5+" label="Open Source Contributions" delay={seq.stats.delay + 0.2} />
          </div>
        </div>
      </div>

      {/* ── Floating card — top right editorial element ───────────────────── */}
      <motion.div
        className="absolute top-1/4 right-8 lg:right-24 z-20 hidden md:block"
        initial={{ opacity: 0, x: 40, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 1.6, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{ x: useTransform(springX, [0, 1], [8, -8]) }}
      >
        <motion.div
          className="relative rounded-2xl p-5 w-48"
          style={{
            background: "rgba(10,10,15,0.7)",
            border: "1px solid rgba(255,255,255,0.07)",
            backdropFilter: "blur(16px)",
            boxShadow: "0 0 40px rgba(0,255,135,0.06), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Top accent */}
          <div className="absolute top-0 left-4 right-4 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(0,255,135,0.5), transparent)" }} />
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-[#00FF87] animate-pulse" />
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/40">Status</span>
          </div>
          <p className="text-white text-sm font-mono font-medium leading-snug">
            Open to new <span style={{ color: "#00FF87" }}>opportunities</span>
          </p>
          <p className="text-white/30 text-[10px] font-mono mt-1">Remote / Hybrid</p>
        </motion.div>
      </motion.div>

      {/* ── Tech pill strip ───────────────────────────────────────────────── */}
      <motion.div
        className="absolute bottom-16 right-8 lg:right-16 z-20 hidden lg:flex flex-col gap-2"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.9, duration: 0.7 }}
      >
        {["React", "TypeScript", "Next.js", "Framer"].map((tech, i) => (
          <motion.span
            key={tech}
            className="text-[10px] font-mono tracking-[0.15em] uppercase px-3 py-1 rounded-full"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              color: "rgba(255,255,255,0.35)",
            }}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.9 + i * 0.08 }}
            whileHover={{
              borderColor: "rgba(0,255,135,0.4)",
              color: "#00FF87",
              background: "rgba(0,255,135,0.06)",
            }}
          >
            {tech}
          </motion.span>
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <ScrollIndicator />

      {/* Bottom gradient fade into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-10"
        style={{ background: "linear-gradient(to bottom, transparent, #050508)" }}
      />
    </section>
  );
}