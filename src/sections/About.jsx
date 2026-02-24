import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import profileImage from "../assets/saurabh.png";

// ─── Section label ────────────────────────────────────────────────────────────
function SectionTag({ index, label }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="text-[10px] font-mono tracking-[0.35em] uppercase" style={{ color: "#00FF87" }}>
        {index}
      </span>
      <div className="h-px w-10" style={{ background: "rgba(0,255,135,0.3)" }} />
      <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-white/30">{label}</span>
    </div>
  );
}

// ─── Animated reveal wrapper ──────────────────────────────────────────────────
function Reveal({ children, delay = 0, direction = "up" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
    },
    visible: { opacity: 1, y: 0, x: 0 },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ delay, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ─── Trait card ───────────────────────────────────────────────────────────────
function TraitCard({ icon, title, desc, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative group p-6 rounded-2xl overflow-hidden cursor-default"
      style={{
        background: "rgba(14,14,20,0.95)",
        border: "1px solid rgba(255,255,255,0.06)",
        backdropFilter: "blur(12px)",
      }}
      whileHover={{ y: -4 }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{ background: "radial-gradient(ellipse at top left, rgba(0,255,135,0.07), transparent 60%)" }}
      />
      {/* Top accent line */}
      <div
        className="absolute top-0 left-4 right-4 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,255,135,0.5), transparent)" }}
      />
      <div className="relative z-10">
        <span className="text-2xl mb-4 block">{icon}</span>
        <h4 className="font-display font-bold text-white text-base mb-2">{title}</h4>
        <p className="text-white/40 font-mono text-xs leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}

// ─── Scramble text on hover ───────────────────────────────────────────────────
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%";
function ScrambleText({ text }) {
  const ref = useRef(null);
  const intervalRef = useRef(null);
  const iterRef = useRef(0);

  const scramble = () => {
    iterRef.current = 0;
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (!ref.current) return;
      ref.current.textContent = text
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (i < iterRef.current) return text[i];
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");
      iterRef.current += 0.6;
      if (iterRef.current >= text.length) {
        ref.current.textContent = text;
        clearInterval(intervalRef.current);
      }
    }, 28);
  };

  return (
    <span
      ref={ref}
      onMouseEnter={scramble}
      className="cursor-default"
      style={{ fontFamily: "inherit" }}
    >
      {text}
    </span>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────
export default function About() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const blobY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  const traits = [
    {
      icon: "⚡",
      title: "Performance First",
      desc: "Obsessed with load times, Core Web Vitals, and buttery-smooth 60fps interactions.",
    },
    {
      icon: "🎨",
      title: "Design Obsessive",
      desc: "Every pixel has intention. I bridge the gap between design vision and production code.",
    },
    {
      icon: "🧩",
      title: "Problem Solver",
      desc: "Complex challenges excite me. I break them into clean, maintainable solutions.",
    },
    {
      icon: "🚀",
      title: "Always Learning",
      desc: "New tools, new patterns, new ideas — I'm constantly pushing my craft forward.",
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-16 md:py-24"
      style={{ background: "#050508" }}
    >
      {/* Ambient blob — parallax */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 700,
          height: 700,
          top: "0%",
          right: "-20%",
          y: blobY,
          background: "radial-gradient(circle, rgba(255,45,120,0.07) 0%, transparent 65%)",
          filter: "blur(60px)",
          borderRadius: "50%",
        }}
      />
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 500,
          height: 500,
          bottom: "0%",
          left: "-10%",
          background: "radial-gradient(circle, rgba(0,255,135,0.06) 0%, transparent 65%)",
          filter: "blur(60px)",
          borderRadius: "50%",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10 lg:px-16">

        {/* ── Top layout: tag + big number ─────────────────────────────────── */}
        <div className="flex items-start justify-between mb-10 md:mb-14">
          <Reveal delay={0}>
            <SectionTag index="01" label="About Me" />
          </Reveal>
          <Reveal delay={0.1} direction="left">
            <span
              className="font-display font-extrabold leading-none select-none hidden md:block"
              style={{
                fontSize: "clamp(6rem, 14vw, 13rem)",
                WebkitTextStroke: "1px rgba(255,255,255,0.05)",
                color: "transparent",
              }}
            >
              ME
            </span>
          </Reveal>
        </div>

        {/* ── Two-column layout ────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-start">

          {/* LEFT — text content */}
          <div>
            {/* Big heading */}
            <Reveal delay={0.1}>
              <h2
                className="font-display font-extrabold leading-[1.05] mb-6"
                style={{ fontSize: "clamp(1.7rem, 4.5vw, 4rem)" }}
              >
                <span className="text-white">I turn ideas into</span>
                <br />
                <span
                  style={{
                    WebkitTextStroke: "1.5px rgba(0,255,135,0.7)",
                    color: "transparent",
                  }}
                >
                  living interfaces.
                </span>
              </h2>
            </Reveal>

            {/* Bio paragraphs */}
            <Reveal delay={0.2}>
              <p className="font-mono text-sm leading-[1.9] text-white/45 mb-5">
                I'm <span className="text-white font-medium">Saurabh</span>, an MCA
                student specialising in Frontend Development with hands-on experience
                building responsive, user-friendly web applications using HTML, CSS,
                JavaScript, Bootstrap, and React.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <p className="font-mono text-sm leading-[1.9] text-white/45 mb-8">
                I also have working knowledge of backend concepts — PHP, Laravel (MVC,
                routing, authentication) and MySQL — giving me a solid understanding
                of how full-stack systems fit together. I care deeply about clean UI,
                performance, and the tiny details that make users smile.
              </p>
            </Reveal>

            {/* Inline highlights */}
            <Reveal delay={0.35}>
              <div className="flex flex-wrap gap-2 mb-8">
                {["HTML5", "CSS3", "JavaScript", "Bootstrap", "React", "Git", "Figma", "WordPress"].map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] font-mono tracking-wider uppercase px-2.5 py-1 rounded-full cursor-default"
                    style={{
                      background: "rgba(0,255,135,0.06)",
                      border: "1px solid rgba(0,255,135,0.2)",
                      color: "rgba(0,255,135,0.8)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Reveal>

            {/* CTA row */}
            <Reveal delay={0.4}>
              <div className="flex items-center gap-6">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-mono tracking-[0.2em] uppercase font-bold text-black transition-all duration-300 hover:scale-105 active:scale-95"
                  style={{ background: "linear-gradient(135deg, #00FF87, #00e5ff)" }}
                >
                  Get In Touch
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <a
                  href="/resume.pdf"
                  download
                  className="text-xs font-mono tracking-[0.2em] uppercase text-white/30 hover:text-white/70 transition-colors duration-300 underline underline-offset-4"
                >
                  Download CV
                </a>
              </div>
            </Reveal>
          </div>

          {/* RIGHT — visual panel */}
          <div className="flex flex-col gap-6">

            {/* Identity card */}
            <Reveal delay={0.2} direction="left">
              <div
                className="relative rounded-2xl p-8 overflow-hidden"
                style={{
                  background: "rgba(14,14,20,0.97)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  backdropFilter: "blur(16px)",
                }}
              >
                {/* Decorative corner */}
                <div
                  className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
                  style={{
                    background: "radial-gradient(circle at top right, rgba(0,255,135,0.1), transparent 70%)",
                  }}
                />
                <div className="absolute top-0 left-4 right-4 h-px"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(0,255,135,0.4), transparent)" }} />

                {/* Avatar placeholder */}
                <div className="flex items-center gap-5 mb-6">
                  <div
                    className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0"
                    style={{
                      border: "1px solid rgba(0,255,135,0.3)",
                      boxShadow: "0 0 16px rgba(0,255,135,0.15)",
                    }}
                  >
                    <img
                      src={profileImage}
                      // src="/src/assets/saurabh.png"
                      alt="Saurabh Pandey"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-display font-bold text-white text-lg leading-tight">
                      <ScrambleText text="Saurabh" />
                    </p>
                    <p className="font-mono text-xs text-white/35 mt-0.5">Frontend Developer</p>
                  </div>
                </div>

                {/* Info rows */}
                {[
                  { label: "Status", value: "Open to work", accent: true },
                  { label: "Location", value: "Bhayander, Mumbai" },
                  { label: "Focus", value: "Frontend / React" },
                  { label: "Education", value: "BSc.IT ✓ | Pursuing MCA" },
                ].map(({ label, value, accent }) => (
                  <div key={label} className="flex items-center justify-between py-3"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <span className="text-xs font-mono tracking-widest uppercase text-white/25">{label}</span>
                    <span
                      className="text-xs font-mono font-medium"
                      style={{ color: accent ? "#00FF87" : "rgba(255,255,255,0.7)" }}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Fun fact strip */}
            <Reveal delay={0.3} direction="left">
              <div
                className="relative rounded-2xl px-6 py-5 overflow-hidden"
                style={{
                  background: "rgba(0,255,135,0.05)",
                  border: "1px solid rgba(0,255,135,0.15)",
                }}
              >
                <div className="flex items-start gap-4">
                  <span className="text-2xl flex-shrink-0 mt-0.5">💡</span>
                  <p className="text-xs font-mono leading-relaxed text-white/50">
                    <span className="text-white/80 font-medium">Fun fact:</span> I once
                    spent 3 hours perfecting a hover animation that lasts 200ms. No
                    regrets — it was worth every millisecond.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ── Traits grid ──────────────────────────────────────────────────── */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {traits.map((t, i) => (
            <TraitCard key={t.title} {...t} delay={i * 0.1} />
          ))}
        </div>

        {/* ── Bottom divider ────────────────────────────────────────────────── */}
        <Reveal delay={0.1}>
          <div className="mt-14 flex items-center gap-4">
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
            <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-white/15">
              End of section
            </span>
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
          </div>
        </Reveal>

      </div>
    </section>
  );
}