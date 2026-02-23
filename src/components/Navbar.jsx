import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

// Magnetic link component — cursor pulls the underline
function MagneticLink({ label, href, index }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const center = rect.left + rect.width / 2;
    const dist = (e.clientX - center) / (rect.width / 2);
    x.set(dist * 6);
  };

  const handleMouseLeave = () => x.set(0);

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative group text-sm tracking-[0.2em] uppercase font-mono text-white/60 hover:text-white transition-colors duration-300"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index + 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{ x: springX }}
    >
      {label}
      {/* Animated underline */}
      <motion.span
        className="absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full"
        style={{ background: "linear-gradient(90deg, #00FF87, #00e5ff)" }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ width: "100%" }}
      />
      <span
        className="absolute -bottom-0.5 left-0 h-px w-0 bg-gradient-to-r from-[#00FF87] to-[#00e5ff] transition-all duration-300 ease-out group-hover:w-full"
      />
    </motion.a>
  );
}

// Rotating conic-gradient border button
function CTAButton() {
  const angle = useMotionValue(0);

  useEffect(() => {
    let raf;
    let start = null;
    const animate = (ts) => {
      if (!start) start = ts;
      const elapsed = (ts - start) / 1000;
      angle.set((elapsed * 80) % 360);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.8, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Spinning border layer */}
      <motion.div
        className="absolute inset-0 rounded-full p-px"
        style={{
          background: `conic-gradient(from ${angle.get()}deg, #00FF87, #FF2D78, #00e5ff, #00FF87)`,
        }}
      >
        <div className="w-full h-full rounded-full bg-[#050508]" />
      </motion.div>
      {/* Actually spinning border — using CSS animation for perf */}
      <a
        href="#contact"
        className="relative inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs tracking-[0.2em] uppercase font-mono text-white/90 hover:text-white transition-all duration-300 overflow-hidden group"
        style={{
          background: "transparent",
          border: "1px solid transparent",
          backgroundClip: "padding-box",
        }}
      >
        {/* Inner background */}
        <span
          className="absolute inset-px rounded-full bg-[#050508] group-hover:bg-[#0a0f0a] transition-colors duration-300"
          style={{ zIndex: 0 }}
        />
        {/* Glow on hover */}
        <span
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: "radial-gradient(ellipse at center, rgba(0,255,135,0.15), transparent 70%)",
          }}
        />
        <span className="relative z-10 flex items-center gap-2">
          <span
            className="w-1.5 h-1.5 rounded-full bg-[#00FF87] animate-pulse"
          />
          Hire Me
        </span>
      </a>
    </motion.div>
  );
}

// Glitch text for logo
function GlitchLogo() {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const trigger = () => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 300);
    };
    // Trigger glitch on mount
    const t1 = setTimeout(trigger, 500);
    // Random glitch every 4-8 seconds
    const interval = setInterval(() => {
      if (Math.random() > 0.5) trigger();
    }, 5000);
    return () => {
      clearTimeout(t1);
      clearInterval(interval);
    };
  }, []);

  return (
    <motion.a
      href="#home"
      onClick={(e) => { e.preventDefault(); document.getElementById("home")?.scrollIntoView({ behavior: "smooth" }); }}
      className="relative font-mono text-xl font-bold tracking-tight select-none cursor-pointer"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="relative inline-block">
        {/* Base text */}
        <span className="text-white">
          Saur<span style={{ color: "#00FF87" }}>a</span>bh
        </span>

        {/* Glitch layers */}
        <AnimatePresence>
          {glitch && (
            <>
              <motion.span
                className="absolute inset-0 text-[#FF2D78] select-none pointer-events-none"
                style={{ clipPath: "inset(30% 0 40% 0)" }}
                initial={{ x: 0 }}
                animate={{ x: [-3, 4, -2, 3, 0] }}
                transition={{ duration: 0.2, times: [0, 0.25, 0.5, 0.75, 1] }}
                exit={{ opacity: 0 }}
              >
                Saurabh
              </motion.span>
              <motion.span
                className="absolute inset-0 text-[#00e5ff] select-none pointer-events-none"
                style={{ clipPath: "inset(60% 0 10% 0)" }}
                initial={{ x: 0 }}
                animate={{ x: [3, -4, 2, -3, 0] }}
                transition={{ duration: 0.2, times: [0, 0.25, 0.5, 0.75, 1] }}
                exit={{ opacity: 0 }}
              >
                Saurabh
              </motion.span>
            </>
          )}
        </AnimatePresence>

        {/* Cursor blink */}
        <motion.span
          className="ml-0.5 inline-block w-0.5 h-5 align-middle"
          style={{ background: "#00FF87" }}
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "steps(1)" }}
        />
      </span>
    </motion.a>
  );
}

// Mobile menu
function MobileMenu({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          {/* Panel */}
          <motion.div
            className="fixed top-0 right-0 z-50 h-full w-72 flex flex-col p-8"
            style={{
              background: "rgba(5, 5, 8, 0.97)",
              borderLeft: "1px solid rgba(0,255,135,0.15)",
            }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 35 }}
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="self-end mb-12 text-white/40 hover:text-white transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M2 2L18 18M18 2L2 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            {/* Links */}
            <nav className="flex flex-col gap-6">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="text-3xl font-mono font-bold text-white/20 hover:text-white transition-colors duration-200 relative group"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                >
                  <span className="text-xs font-mono text-[#00FF87] mr-2 align-middle opacity-60">
                    0{i + 1}
                  </span>
                  {link.label}
                </motion.a>
              ))}
            </nav>

            {/* Bottom bar */}
            <motion.div
              className="mt-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <a
                href="#contact"
                onClick={onClose}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-xs tracking-[0.2em] uppercase font-mono text-black font-bold"
                style={{ background: "linear-gradient(135deg, #00FF87, #00e5ff)" }}
              >
                Hire Me
              </a>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Top accent line — animated gradient */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 h-px pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, #00FF87 30%, #FF2D78 60%, transparent)",
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Navbar */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-40"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Glass background */}
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundColor: scrolled ? "rgba(5,5,8,0.85)" : "rgba(5,5,8,0)",
            backdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
          }}
          transition={{ duration: 0.4 }}
        />

        {/* Bottom border — only visible when scrolled */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(0,255,135,0.3), transparent)",
          }}
          animate={{ opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Content */}
        <div className="relative flex items-center justify-between px-6 md:px-10 lg:px-16 h-16 md:h-18">
          {/* Logo */}
          <GlitchLogo />

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link, i) => (
              <div key={link.href} className="relative">
                <MagneticLink label={link.label} href={link.href} index={i} />
                {/* Active dot */}
                <AnimatePresence>
                  {activeSection === link.href.slice(1) && (
                    <motion.span
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#00FF87]"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                    />
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <CTAButton />
            </div>

            {/* Mobile hamburger */}
            <motion.button
              className="md:hidden relative w-8 h-6 flex flex-col justify-between group"
              onClick={() => setMobileOpen(true)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              aria-label="Open menu"
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="block h-px bg-white/70 group-hover:bg-white transition-colors"
                  style={{ width: i === 1 ? "60%" : "100%" }}
                />
              ))}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* Spacer */}
      <div className="h-16 md:h-18" />

      {/* Global styles injected here for font import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Mono:wght@300;400;500&display=swap');
        
        :root {
          --accent-green: #00FF87;
          --accent-pink: #FF2D78;
          --accent-cyan: #00e5ff;
          --bg-void: #050508;
          --bg-surface: #0a0a0f;
          --text-primary: #f0f0f0;
          --text-muted: rgba(240,240,240,0.45);
          --font-display: 'Syne', sans-serif;
          --font-mono: 'DM Mono', monospace;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          background: var(--bg-void);
          color: var(--text-primary);
          font-family: var(--font-mono);
          -webkit-font-smoothing: antialiased;
        }

        * {
          box-sizing: border-box;
        }

        ::-webkit-scrollbar {
          width: 3px;
        }

        ::-webkit-scrollbar-track {
          background: var(--bg-void);
        }

        ::-webkit-scrollbar-thumb {
          background: var(--accent-green);
          border-radius: 2px;
        }

        ::selection {
          background: rgba(0, 255, 135, 0.25);
          color: white;
        }

        .font-display {
          font-family: var(--font-display);
        }

        .font-mono {
          font-family: var(--font-mono);
        }
      `}</style>
    </>
  );
}