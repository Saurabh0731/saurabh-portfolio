import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// ─── Soft blob background — CSS keyframes (no JS RAF = smoother scroll) ───────
function BlobBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute rounded-full" style={{
        width: "min(700px,80vw)", height: "min(700px,80vw)",
        top: "-20%", right: "-15%",
        background: "radial-gradient(circle, rgba(0,255,135,0.11) 0%, rgba(0,255,135,0.03) 50%, transparent 70%)",
        filter: "blur(40px)",
        animation: "blob1 12s ease-in-out infinite",
      }} />
      <div className="absolute rounded-full" style={{
        width: "min(600px,70vw)", height: "min(600px,70vw)",
        bottom: "-15%", left: "-10%",
        background: "radial-gradient(circle, rgba(255,45,120,0.09) 0%, transparent 65%)",
        filter: "blur(50px)",
        animation: "blob2 14s ease-in-out infinite",
      }} />
      <div className="absolute rounded-full hidden md:block" style={{
        width: 400, height: 400,
        top: "35%", left: "8%",
        background: "radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 65%)",
        filter: "blur(60px)",
        animation: "blob3 10s ease-in-out infinite",
      }} />
      <style>{`
        @keyframes blob1{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(20px,-15px) scale(1.08)}}
        @keyframes blob2{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-15px,20px) scale(1.1)}}
        @keyframes blob3{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(10px,-25px) scale(1.15)}}
      `}</style>
    </div>
  );
}

// ─── Cursor glow — desktop only ───────────────────────────────────────────────
function CursorGlow() {
  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const sx = useSpring(x, { stiffness: 50, damping: 22 });
  const sy = useSpring(y, { stiffness: 50, damping: 22 });

  useEffect(() => {
    if (window.innerWidth < 768) return;
    const move = (e) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <motion.div
      className="fixed pointer-events-none z-0 rounded-full hidden md:block"
      style={{
        width: 400, height: 400,
        x: sx, y: sy,
        translateX: "-50%", translateY: "-50%",
        background: "radial-gradient(circle, rgba(0,255,135,0.055) 0%, transparent 70%)",
      }}
    />
  );
}

// ─── Typewriter ───────────────────────────────────────────────────────────────
const ROLES = ["Frontend Developer", "React Enthusiast", "UI/UX Engineer", "Creative Coder"];

function RoleCycler() {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState("typing");

  useEffect(() => {
    const cur = ROLES[idx];
    let t;
    if (phase === "typing") {
      if (text.length < cur.length) t = setTimeout(() => setText(cur.slice(0, text.length + 1)), 60 + Math.random() * 25);
      else t = setTimeout(() => setPhase("pause"), 1800);
    } else if (phase === "pause") {
      t = setTimeout(() => setPhase("erasing"), 300);
    } else {
      if (text.length > 0) t = setTimeout(() => setText(text.slice(0, -1)), 28);
      else { setIdx((i) => (i + 1) % ROLES.length); setPhase("typing"); }
    }
    return () => clearTimeout(t);
  }, [text, phase, idx]);

  return (
    <span className="inline-flex items-center">
      <span style={{ color: "#00FF87" }}>{text}</span>
      <motion.span
        className="inline-block w-0.5 h-5 ml-0.5 rounded-sm align-middle"
        style={{ background: "#00FF87" }}
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse", ease: "steps(1)" }}
      />
    </span>
  );
}

// ─── CTA Button ───────────────────────────────────────────────────────────────
function CTABtn({ children, href, primary }) {
  return (
    <a
      href={href}
      className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono tracking-widest uppercase font-bold overflow-hidden group active:scale-95 transition-transform duration-150"
    >
      {primary ? (
        <>
          <span className="absolute inset-0" style={{ background: "linear-gradient(135deg,#00FF87,#00e5ff)" }} />
          <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: "linear-gradient(135deg,#00e5ff,#00FF87)" }} />
          <span className="relative z-10 text-black flex items-center gap-2">{children}</span>
        </>
      ) : (
        <>
          <span className="absolute inset-0 rounded-full border border-white/20 group-hover:border-white/40 transition-colors duration-300" />
          <span className="relative z-10 text-white/60 group-hover:text-white transition-colors duration-300 flex items-center gap-2">{children}</span>
        </>
      )}
    </a>
  );
}

// ─── Stat ─────────────────────────────────────────────────────────────────────
function Stat({ value, label, delay }) {
  return (
    <motion.div className="flex flex-col gap-0.5"
      initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
      <span className="text-xl sm:text-2xl md:text-3xl font-display font-extrabold leading-none" style={{ color: "#00FF87" }}>
        {value}
      </span>
      <span className="text-[10px] font-mono tracking-[0.12em] uppercase text-white/35 leading-tight max-w-[80px]">
        {label}
      </span>
    </motion.div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export default function Hero() {
  const f = (delay) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section id="home" className="relative w-full flex items-center overflow-hidden md:min-h-screen" style={{ background: "#050508" }}>
      <BlobBackground />
      <CursorGlow />

      {/* Noise */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px",
        }} />

      {/* Side labels — xl only */}
      <motion.div className="absolute left-5 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-3 z-20" {...f(1.75)}>
        <div className="w-px h-12" style={{ background: "linear-gradient(180deg,transparent,rgba(0,255,135,0.35))" }} />
        <span className="text-[9px] font-mono tracking-[0.4em] uppercase text-white/20" style={{ writingMode: "vertical-rl" }}>Portfolio 2025</span>
        <div className="w-px h-12" style={{ background: "linear-gradient(180deg,rgba(0,255,135,0.35),transparent)" }} />
      </motion.div>
      <motion.div className="absolute right-5 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-3 z-20" {...f(1.75)}>
        <div className="w-px h-12" style={{ background: "linear-gradient(180deg,transparent,rgba(255,45,120,0.25))" }} />
        <span className="text-[9px] font-mono tracking-[0.4em] uppercase text-white/20" style={{ writingMode: "vertical-rl" }}>Frontend Engineer</span>
        <div className="w-px h-12" style={{ background: "linear-gradient(180deg,rgba(255,45,120,0.25),transparent)" }} />
      </motion.div>

      {/* ── Content ────────────────────────────────────────────────────────── */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-5 sm:px-8 lg:px-14 pt-24 pb-10 sm:pt-28 sm:pb-16 md:pt-24 md:pb-20">

        {/* Badge */}
        <motion.div className="flex items-center gap-3 mb-5" {...f(0.2)}>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono tracking-[0.25em] uppercase border"
            style={{ borderColor: "rgba(0,255,135,0.25)", color: "#00FF87", background: "rgba(0,255,135,0.06)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF87] animate-pulse" />
            Open to opportunities
          </span>
        </motion.div>

        {/* Headline — 3 separate lines, nothing overflows */}
        <div className="overflow-hidden mb-0.5">
          <motion.h1
            className="font-display font-extrabold leading-[0.92] text-white"
            style={{ fontSize: "clamp(2rem, 6vw, 7.5rem)" }}
            initial={{ y: 90, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.38, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            Crafting
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-0.5">
          <motion.h1
            className="font-display font-extrabold leading-[0.92]"
            style={{ fontSize: "clamp(2rem, 6vw, 7.5rem)" }}
            initial={{ y: 90, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span style={{ WebkitTextStroke: "2px rgba(0,255,135,0.65)", color: "transparent" }}>
              Digital
            </span>
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-4 sm:mb-5">
          <motion.h1
            className="font-display font-extrabold leading-[0.92]"
            style={{ fontSize: "clamp(2rem, 6vw, 7.5rem)" }}
            initial={{ y: 90, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.62, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span style={{
              background: "linear-gradient(135deg,#fff 0%,rgba(255,255,255,0.55) 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              Experiences
            </span>
          </motion.h1>
        </div>

        {/* Role */}
        <motion.div className="flex items-center gap-2 mb-4 sm:mb-5" {...f(0.85)}>
          <span className="text-white/25 font-mono text-xs sm:text-sm">{"// "}</span>
          <span className="text-sm sm:text-base md:text-lg font-mono font-light"><RoleCycler /></span>
        </motion.div>

        {/* Description */}
        <motion.p className="font-mono text-xs sm:text-sm leading-relaxed text-white/40 max-w-sm sm:max-w-md mb-6 sm:mb-8" {...f(1.0)}>
          Hi, I'm <span className="text-white font-medium">Saurabh</span> — a passionate frontend developer building
          fast, accessible, and visually obsessive web experiences. Fresh and ready to build.
        </motion.p>

        {/* CTAs */}
        <motion.div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-8 sm:mb-10" {...f(1.15)}>
          <CTABtn href="#projects" primary>
            View My Work
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6h8M6.5 2.5l3.5 3.5-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </CTABtn>
          <CTABtn href="#contact">Let's Talk</CTABtn>
          <a href="/resume.pdf" download
            className="flex items-center gap-1.5 text-[11px] font-mono tracking-[0.15em] uppercase text-white/30 hover:text-white/60 transition-colors duration-300 ml-1">
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <path d="M6 1v7M3 5l3 3 3-3M1 11h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Resume
          </a>
        </motion.div>

        {/* Stats */}
        <div className="flex flex-wrap items-end gap-5 sm:gap-8 md:gap-10">
          <Stat value="10+" label="Projects Built" delay={1.35} />
          <div className="w-px h-7 hidden sm:block" style={{ background: "rgba(255,255,255,0.08)" }} />
          <Stat value="15+" label="Technologies" delay={1.45} />
          <div className="w-px h-7 hidden sm:block" style={{ background: "rgba(255,255,255,0.08)" }} />
          <Stat value="5+" label="Open Source" delay={1.55} />
        </div>
      </div>

      {/* Floating card — md+ */}
      <motion.div className="absolute top-1/4 right-5 lg:right-14 z-20 hidden md:block"
        initial={{ opacity: 0, x: 25, y: 10 }} animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 1.55, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
        <motion.div
          className="relative rounded-2xl p-4 w-40"
          style={{ background: "rgba(10,10,15,0.85)", border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(16px)" }}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute top-0 left-3 right-3 h-px"
            style={{ background: "linear-gradient(90deg,transparent,rgba(0,255,135,0.5),transparent)" }} />
          <div className="flex items-center gap-1.5 mb-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00FF87] animate-pulse" />
            <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-white/30">Status</span>
          </div>
          <p className="text-white text-xs font-mono font-medium leading-snug">
            Open to new <span style={{ color: "#00FF87" }}>opportunities</span>
          </p>
          <p className="text-white/25 text-[10px] font-mono mt-0.5">Remote / Hybrid</p>
        </motion.div>
      </motion.div>

      {/* Tech pills — lg+ */}
      <motion.div className="absolute bottom-12 right-5 lg:right-12 z-20 hidden lg:flex flex-col gap-1.5"
        initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.85, duration: 0.6 }}>
        {["React", "JavaScript", "Bootstrap", "Figma"].map((t, i) => (
          <motion.span key={t}
            className="text-[10px] font-mono tracking-[0.12em] uppercase px-3 py-1 rounded-full cursor-default"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.3)" }}
            initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.85 + i * 0.06 }}
            whileHover={{ borderColor: "rgba(0,255,135,0.35)", color: "#00FF87" }}
          >{t}</motion.span>
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div className="absolute bottom-4 md:bottom-5 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1.5 z-20"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.1, duration: 0.8 }}>
        <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-white/20">Scroll</span>
        <div className="relative w-px h-7 overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
          <motion.div className="absolute top-0 left-0 w-full h-1/2"
            style={{ background: "linear-gradient(180deg,#00FF87,transparent)" }}
            animate={{ y: ["0%", "200%"] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }} />
        </div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-10"
        style={{ background: "linear-gradient(to bottom, transparent, #050508)" }} />
    </section>
  );
}