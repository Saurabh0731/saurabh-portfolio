import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

// ─── Section tag ──────────────────────────────────────────────────────────────
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

// ─── Reveal wrapper ───────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, direction = "up" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: direction === "up" ? 35 : 0,
        x: direction === "left" ? 35 : direction === "right" ? -35 : 0,
      }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ delay, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ─── Marquee strip ────────────────────────────────────────────────────────────
function MarqueeStrip({ items, reverse = false, speed = 35 }) {
  const duration = items.length * speed;
  const repeated = [...items, ...items, ...items];

  return (
    <div className="relative overflow-hidden w-full">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #050508, transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #050508, transparent)" }} />

      <motion.div
        className="flex gap-4 w-max"
        animate={{ x: reverse ? ["0%", "33.33%"] : ["0%", "-33.33%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        {repeated.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-5 py-2.5 rounded-full flex-shrink-0"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <span className="text-sm">{item.icon}</span>
            <span className="text-xs font-mono tracking-widest uppercase text-white/35 whitespace-nowrap">
              {item.label}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// ─── Stat card ────────────────────────────────────────────────────────────────
function StatCard({ value, label, sub, accent, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-2xl p-7 overflow-hidden group"
      style={{
        background: "rgba(10,10,15,0.6)",
        border: "1px solid rgba(255,255,255,0.06)",
        backdropFilter: "blur(12px)",
      }}
      whileHover={{ y: -3 }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(ellipse at top left, ${accent}10, transparent 65%)` }}
      />
      <div
        className="absolute top-0 left-4 right-4 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}60, transparent)` }}
      />
      <div className="relative z-10">
        <span
          className="font-display font-extrabold leading-none block mb-2"
          style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", color: accent }}
        >
          {value}
        </span>
        <p className="text-white/60 font-mono text-sm font-medium mb-1">{label}</p>
        {sub && <p className="text-white/25 font-mono text-xs">{sub}</p>}
      </div>
    </motion.div>
  );
}

// ─── Main Testimonials section ────────────────────────────────────────────────
export default function Testimonials() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const blobY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  const row1 = [
    { icon: "⚡", label: "Fast Learner" },
    { icon: "🎨", label: "UI Focused" },
    { icon: "🧩", label: "Problem Solver" },
    { icon: "📱", label: "Mobile First" },
    { icon: "♿", label: "Accessible" },
    { icon: "🔥", label: "Passionate" },
    { icon: "🤝", label: "Team Player" },
    { icon: "🚀", label: "Ambitious" },
  ];

  const row2 = [
    { icon: "💻", label: "React" },
    { icon: "🎯", label: "Detail Oriented" },
    { icon: "📦", label: "Bootstrap" },
    { icon: "✨", label: "Clean Code" },
    { icon: "🛠️", label: "Git & GitHub" },
    { icon: "🌐", label: "Responsive Design" },
    { icon: "🎓", label: "MCA Student" },
    { icon: "📐", label: "Figma" },
  ];

  const stats = [
    {
      value: "10+",
      label: "Projects Built",
      sub: "Academic & personal",
      accent: "#00FF87",
      delay: 0.1,
    },
    {
      value: "8.10",
      label: "CGPA — BSc.IT",
      sub: "Abhinav College, 2024",
      accent: "#FF2D78",
      delay: 0.2,
    },
    {
      value: "1",
      label: "Certification",
      sub: "Web Dev — Udemy (Ongoing)",
      accent: "#00e5ff",
      delay: 0.3,
    },
  ];

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative py-16 md:py-24 overflow-hidden"
      style={{ background: "#050508" }}
    >
      {/* Ambient blobs */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 650,
          height: 650,
          top: "0%",
          left: "-15%",
          y: blobY,
          background: "radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 65%)",
          filter: "blur(70px)",
          borderRadius: "50%",
        }}
      />
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 500,
          height: 500,
          bottom: "5%",
          right: "-10%",
          background: "radial-gradient(circle, rgba(0,255,135,0.06) 0%, transparent 65%)",
          filter: "blur(60px)",
          borderRadius: "50%",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-16">

        {/* ── Header ───────────────────────────────────────────────────────── */}
        <div className="flex items-start justify-between mb-10 md:mb-14">
          <div>
            <Reveal delay={0}>
              <SectionTag index="04" label="Testimonials" />
            </Reveal>
            <Reveal delay={0.1}>
              <h2
                className="font-display font-extrabold leading-[1.05]"
                style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
              >
                <span className="text-white">Early days,</span>
                <br />
                <span
                  style={{
                    WebkitTextStroke: "1.5px rgba(0,255,135,0.65)",
                    color: "transparent",
                  }}
                >
                  big ambitions.
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="font-mono text-sm text-white/35 mt-4 max-w-md leading-relaxed">
                I'm at the start of my journey — no client quotes yet, just honest work,
                real projects, and a drive to keep growing. Let the code speak for now.
              </p>
            </Reveal>
          </div>

          {/* Ghost watermark */}
          <Reveal delay={0.1} direction="left">
            <span
              className="font-display font-extrabold leading-none select-none hidden md:block"
              style={{
                fontSize: "clamp(4rem, 9vw, 8rem)",
                WebkitTextStroke: "1px rgba(255,255,255,0.04)",
                color: "transparent",
              }}
            >
              SOON
            </span>
          </Reveal>
        </div>

        {/* ── Proof stats ───────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 md:mb-12">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>

        {/* ── Marquee strips ───────────────────────────────────────────────── */}
        <div className="flex flex-col gap-3 mb-8 md:mb-12">
          <MarqueeStrip items={row1} reverse={false} speed={4} />
          <MarqueeStrip items={row2} reverse={true} speed={4} />
        </div>

        {/* ── Be first card + CTA ───────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 md:mb-12">

          {/* Be the first card */}
          <Reveal delay={0.1}>
            <div
              className="relative rounded-2xl p-8 overflow-hidden flex flex-col justify-between min-h-52 group"
              style={{
                background: "rgba(10,10,15,0.5)",
                border: "1px dashed rgba(0,255,135,0.15)",
              }}
            >
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                style={{ background: "radial-gradient(ellipse at center, rgba(0,255,135,0.05), transparent 70%)" }}
              />
              <div className="relative z-10">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                        stroke="rgba(0,255,135,0.25)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ))}
                </div>
                <p className="font-mono text-sm text-white/20 leading-relaxed italic mb-4">
                  "This spot is reserved for someone who works with Saurabh and wants to share their experience..."
                </p>
              </div>
              <div className="relative z-10 flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(0,255,135,0.07)", border: "1px dashed rgba(0,255,135,0.2)" }}
                >
                  <span className="text-xs" style={{ color: "rgba(0,255,135,0.4)" }}>?</span>
                </div>
                <div>
                  <p className="text-xs font-mono font-medium text-white/20">Your name here</p>
                  <p className="text-[10px] font-mono text-white/15">Future collaborator</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Collaboration CTA card */}
          <Reveal delay={0.2} direction="left">
            <div
              className="relative rounded-2xl p-8 overflow-hidden flex flex-col justify-between min-h-52"
              style={{
                background: "linear-gradient(135deg, rgba(0,255,135,0.07) 0%, rgba(0,229,255,0.04) 100%)",
                border: "1px solid rgba(0,255,135,0.15)",
              }}
            >
              <div
                className="absolute top-0 left-4 right-4 h-px"
                style={{ background: "linear-gradient(90deg, transparent, rgba(0,255,135,0.5), transparent)" }}
              />

              <div>
                <div
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5 text-[10px] font-mono tracking-[0.25em] uppercase"
                  style={{
                    background: "rgba(0,255,135,0.1)",
                    border: "1px solid rgba(0,255,135,0.25)",
                    color: "#00FF87",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00FF87] animate-pulse" />
                  Open to collaborate
                </div>
                <h4 className="font-display font-bold text-white text-xl mb-2">
                  Want to work together?
                </h4>
                <p className="font-mono text-xs text-white/40 leading-relaxed">
                  I'm looking for internships, freelance projects, or open source collaborations.
                  Let's build something worth talking about.
                </p>
              </div>

              <a
                href="#contact"
                className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-mono tracking-[0.2em] uppercase font-bold text-black self-start transition-all duration-300 hover:scale-105 active:scale-95"
                style={{ background: "linear-gradient(135deg, #00FF87, #00e5ff)" }}
              >
                Get In Touch
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </Reveal>
        </div>

        {/* Divider */}
        <Reveal delay={0.1}>
          <div className="mt-8 flex items-center gap-4">
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
            <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-white/15">End of section</span>
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
          </div>
        </Reveal>

      </div>
    </section>
  );
}