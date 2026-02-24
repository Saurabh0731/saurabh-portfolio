import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ─── Reveal wrapper ───────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, direction = "up" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: direction === "up" ? 25 : 0,
        x: direction === "left" ? 25 : direction === "right" ? -25 : 0,
      }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ─── Glitch logo (reused from Navbar) ────────────────────────────────────────
function FooterLogo() {
  return (
    <a
      href="#home"
      onClick={(e) => {
        e.preventDefault();
        document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
      }}
      className="relative font-mono text-2xl font-bold tracking-tight select-none cursor-pointer inline-block"
    >
      <span className="text-white">
        Saur<span style={{ color: "#00FF87" }}>a</span>bh
      </span>
      <motion.span
        className="inline-block w-0.5 h-6 ml-0.5 align-middle rounded-sm"
        style={{ background: "#00FF87" }}
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "steps(1)" }}
      />
    </a>
  );
}

// ─── Social icon link ─────────────────────────────────────────────────────────
function SocialLink({ href, label, icon }) {
  return (
    <motion.a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      aria-label={label}
      className="w-10 h-10 rounded-xl flex items-center justify-center group transition-all duration-300"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
      whileHover={{
        y: -3,
        borderColor: "rgba(0,255,135,0.35)",
        backgroundColor: "rgba(0,255,135,0.06)",
      }}
      whileTap={{ scale: 0.93 }}
    >
      {icon}
    </motion.a>
  );
}

// ─── Nav link ─────────────────────────────────────────────────────────────────
function FooterNavLink({ label, href }) {
  return (
    <a
      href={href}
      className="text-xs font-mono tracking-[0.2em] uppercase text-white/30 hover:text-white/70 transition-colors duration-300 relative group"
    >
      {label}
      <span
        className="absolute -bottom-0.5 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
        style={{ background: "#00FF87" }}
      />
    </a>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
export default function Footer() {
  const year = new Date().getFullYear();

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ];

  const socials = [
    {
      label: "GitHub",
      href: "https://github.com/Saurabh0731",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,0.5)">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      ),
    },
    {
      label: "Email",
      href: "mailto:saurabhpandey0731@gmail.com",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M22 6l-10 7L2 6" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      label: "Phone",
      href: "tel:+919140468101",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ];

  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: "#050508" }}
    >
      {/* Top separator */}
      <div
        className="w-full h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,255,135,0.2) 30%, rgba(0,229,255,0.15) 70%, transparent)" }}
      />

      {/* Ambient glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: 600,
          height: 300,
          background: "radial-gradient(ellipse at center bottom, rgba(0,255,135,0.06), transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-16 pt-10 pb-6">

        {/* ── Big CTA headline ─────────────────────────────────────────────── */}
        <Reveal delay={0}>
          <div className="text-center mb-8">
            <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-white/20 mb-4">
              Ready to collaborate?
            </p>
            <h2
              className="font-display font-extrabold leading-tight mb-6"
              style={{ fontSize: "clamp(2rem, 6vw, 5rem)" }}
            >
              <span className="text-white">Let's make something </span>
              <span
                style={{
                  WebkitTextStroke: "1.5px rgba(0,255,135,0.6)",
                  color: "transparent",
                }}
              >
                worth remembering.
              </span>
            </h2>
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-mono tracking-[0.2em] uppercase font-bold text-black overflow-hidden relative group"
              style={{ background: "linear-gradient(135deg, #00FF87, #00e5ff)" }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              {/* Shine sweep */}
              <span
                className="absolute top-0 -left-full w-full h-full group-hover:left-full transition-all duration-700"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
                  transform: "skewX(-15deg)",
                }}
              />
              <span className="relative z-10 flex items-center gap-2">
                Start a Conversation
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </motion.a>
          </div>
        </Reveal>

        {/* ── Divider ───────────────────────────────────────────────────────── */}
        <div className="h-px mb-6"
          style={{ background: "rgba(255,255,255,0.06)" }} />

        {/* ── Middle row: logo + nav + socials ─────────────────────────────── */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10 mb-6">

          {/* Logo + tagline */}
          <Reveal delay={0.1}>
            <div className="flex flex-col items-center md:items-start gap-3">
              <FooterLogo />
              <p className="text-xs font-mono text-white/25 max-w-[200px] text-center md:text-left leading-relaxed">
                Frontend Developer based in Bhayander, India.
              </p>
            </div>
          </Reveal>

          {/* Nav links */}
          <Reveal delay={0.15}>
            <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3">
              {navLinks.map((link) => (
                <FooterNavLink key={link.href} {...link} />
              ))}
            </nav>
          </Reveal>

          {/* Socials */}
          <Reveal delay={0.2} direction="left">
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <SocialLink key={s.label} {...s} />
              ))}
            </div>
          </Reveal>
        </div>

        {/* ── Bottom row ───────────────────────────────────────────────────── */}
        <div className="h-px mb-8" style={{ background: "rgba(255,255,255,0.05)" }} />

        <Reveal delay={0.25}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[11px] font-mono text-white/20 text-center sm:text-left">
              © {year} Saurabh Pandey. Built with{" "}
              <span style={{ color: "rgba(0,255,135,0.5)" }}>React</span> &{" "}
              <span style={{ color: "rgba(0,229,255,0.5)" }}>Framer Motion</span>.
            </p>

            <div className="flex items-center gap-2">
              <motion.div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "#00FF87" }}
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-[11px] font-mono text-white/20">
                Open to work — India
              </span>
            </div>
          </div>
        </Reveal>

      </div>
    </footer>
  );
}