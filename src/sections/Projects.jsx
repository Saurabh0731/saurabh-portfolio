import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";

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

// ─── Tech tag ─────────────────────────────────────────────────────────────────
function TechTag({ name }) {
  return (
    <span
      className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-full"
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
        color: "rgba(255,255,255,0.5)",
      }}
    >
      {name}
    </span>
  );
}

// ─── Featured project card (large) ───────────────────────────────────────────
function FeaturedCard({ project, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState(false);
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden group"
      style={{
        background: "rgba(10,10,15,0.7)",
        border: "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Top border glow */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px z-10"
        style={{
          background: `linear-gradient(90deg, transparent, ${project.accent}80, transparent)`,
        }}
        animate={{ opacity: hovered ? 1 : 0.4 }}
        transition={{ duration: 0.4 }}
      />

      {/* Hover corner glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl"
        style={{
          background: `radial-gradient(ellipse at ${isEven ? "top left" : "top right"}, ${project.accent}10, transparent 55%)`,
        }}
      />

      {/* Visual panel */}
      <div
        className={`relative overflow-hidden min-h-64 lg:min-h-80 ${isEven ? "lg:order-1" : "lg:order-2"}`}
        style={{
          background: `linear-gradient(135deg, ${project.accent}0a 0%, rgba(0,0,0,0) 100%)`,
        }}
      >
        {/* Grid pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />

        {/* Browser mockup — real screenshot or skeleton fallback */}
        <div
          className="absolute inset-6 rounded-xl overflow-hidden"
          style={{
            background: "rgba(5,5,8,0.9)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${project.accent}15`,
          }}
        >
          {/* Browser chrome */}
          <div className="flex items-center gap-1.5 px-3 py-2.5 border-b border-white/5 flex-shrink-0">
            <div className="w-2 h-2 rounded-full bg-[#FF5F57]" />
            <div className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
            <div className="w-2 h-2 rounded-full bg-[#28CA41]" />
            <div
              className="flex-1 mx-3 h-4 rounded-full flex items-center px-3"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <span className="text-[8px] font-mono text-white/20 truncate">{project.url}</span>
            </div>
          </div>

          {/* Real screenshot */}
          {project.image ? (
            <div className="relative w-full h-full overflow-hidden">
              <motion.img
                src={project.image}
                alt={`${project.title} screenshot`}
                className="w-full h-full object-cover object-top"
                animate={{ scale: hovered ? 1.04 : 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
              {/* Subtle gradient overlay at bottom */}
              <div
                className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
                style={{ background: "linear-gradient(to top, rgba(5,5,8,0.6), transparent)" }}
              />
            </div>
          ) : (
            /* Skeleton fallback */
            <div className="p-4 flex flex-col gap-2">
              <div className="flex items-center justify-between mb-2">
                <div className="h-3 w-16 rounded-full" style={{ background: `${project.accent}40` }} />
                <div className="flex gap-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-2.5 w-8 rounded-full" style={{ background: "rgba(255,255,255,0.07)" }} />
                  ))}
                </div>
              </div>
              <div className="h-16 rounded-lg mb-2"
                style={{ background: `linear-gradient(135deg, ${project.accent}15, rgba(255,255,255,0.03))` }} />
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-10 rounded-lg" style={{ background: "rgba(255,255,255,0.04)" }} />
                ))}
              </div>
              <div className="h-2 w-3/4 rounded-full mt-1" style={{ background: "rgba(255,255,255,0.06)" }} />
              <div className="h-2 w-1/2 rounded-full" style={{ background: "rgba(255,255,255,0.04)" }} />
            </div>
          )}
        </div>

        {/* Project number watermark */}
        <div
          className="absolute bottom-4 right-6 font-display font-extrabold select-none pointer-events-none"
          style={{
            fontSize: "5rem",
            lineHeight: 1,
            WebkitTextStroke: `1px ${project.accent}20`,
            color: "transparent",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>

      {/* Content panel */}
      <div className={`flex flex-col justify-center p-8 lg:p-10 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
        {/* Status badge */}
        <div className="flex items-center gap-2 mb-5">
          <span
            className="text-[10px] font-mono tracking-[0.25em] uppercase px-2.5 py-1 rounded-full"
            style={{
              background: `${project.accent}12`,
              border: `1px solid ${project.accent}30`,
              color: project.accent,
            }}
          >
            {project.type}
          </span>
          {project.group && (
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/25">
              Group Project
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          className="font-display font-extrabold text-white mb-1 leading-tight"
          style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}
        >
          {project.title}
        </h3>
        <p className="font-mono text-sm mb-4" style={{ color: project.accent }}>
          {project.subtitle}
        </p>

        {/* Description */}
        <p className="font-mono text-xs leading-[1.9] text-white/40 mb-6">
          {project.description}
        </p>

        {/* Bullet highlights */}
        <ul className="flex flex-col gap-2 mb-8">
          {project.highlights.map((point) => (
            <li key={point} className="flex items-start gap-2.5">
              <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: project.accent }} />
              <span className="text-xs font-mono text-white/45 leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.stack.map((t) => <TechTag key={t} name={t} />)}
        </div>

        {/* Links */}
        <div className="flex items-center gap-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase px-5 py-2.5 rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                background: `${project.accent}15`,
                border: `1px solid ${project.accent}35`,
                color: project.accent,
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
              View Code
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-white/35 hover:text-white/70 transition-colors duration-300"
            >
              Live Demo
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                <path d="M2 10L10 2M10 2H5M10 2v5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Coming soon card ─────────────────────────────────────────────────────────
function ComingSoonCard({ delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-2xl p-8 flex flex-col items-center justify-center text-center overflow-hidden min-h-48"
      style={{
        background: "rgba(10,10,15,0.5)",
        border: "1px dashed rgba(255,255,255,0.08)",
      }}
    >
      {/* Animated dots */}
      <div className="flex items-center gap-2 mb-4">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "rgba(0,255,135,0.4)" }}
            animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>
      <p className="text-xs font-mono tracking-[0.3em] uppercase text-white/20 mb-1">More projects</p>
      <p className="text-xs font-mono text-white/15">Currently building...</p>
    </motion.div>
  );
}

// ─── Main Projects section ────────────────────────────────────────────────────
export default function Projects() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const blobY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  const projects = [
    {
      title: "RE-BOOK",
      subtitle: "Textbook Resale Platform",
      type: "Web App",
      group: true,
      accent: "#00FF87",
      url: "rebook.app/listings",
      image: "/images/rebook-preview.png", // ← drop your screenshot here
      github: "https://github.com/Saurabh0731",
      live: null,
      description:
        "A full-featured textbook resale platform built for college students to buy and sell second-hand books. Focused on responsive UI, clean UX flows, and seamless form interactions.",
      highlights: [
        "Built complete responsive frontend UI for book listing, forms & dashboard",
        "Implemented client-side form validation and dynamic UI interactions",
        "Collaborated with backend developer — understood API & data flow integration",
        "Mobile-first responsive design with clean UI/UX structure",
      ],
      stack: ["Laravel 10", "PHP", "MySQL", "Bootstrap", "JavaScript"],
    },
  ];

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-16 md:py-24 overflow-hidden"
      style={{ background: "#050508" }}
    >
      {/* Ambient blobs */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 700,
          height: 700,
          top: "10%",
          right: "-20%",
          y: blobY,
          background: "radial-gradient(circle, rgba(0,255,135,0.07) 0%, transparent 65%)",
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
          left: "-10%",
          background: "radial-gradient(circle, rgba(255,45,120,0.06) 0%, transparent 65%)",
          filter: "blur(60px)",
          borderRadius: "50%",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-16">

        {/* ── Header ───────────────────────────────────────────────────────── */}
        <div className="flex items-start justify-between mb-10 md:mb-14">
          <div>
            <Reveal delay={0}>
              <SectionTag index="03" label="Projects" />
            </Reveal>
            <Reveal delay={0.1}>
              <h2
                className="font-display font-extrabold leading-[1.05]"
                style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
              >
                <span className="text-white">Things I've</span>
                <br />
                <span
                  style={{
                    WebkitTextStroke: "1.5px rgba(0,255,135,0.65)",
                    color: "transparent",
                  }}
                >
                  actually built.
                </span>
              </h2>
            </Reveal>
          </div>

          {/* Ghost watermark */}
          <Reveal delay={0.1} direction="left">
            <span
              className="font-display font-extrabold leading-none select-none hidden md:block"
              style={{
                fontSize: "clamp(4rem, 10vw, 9rem)",
                WebkitTextStroke: "1px rgba(255,255,255,0.04)",
                color: "transparent",
              }}
            >
              WORK
            </span>
          </Reveal>
        </div>

        {/* ── GitHub CTA strip ─────────────────────────────────────────────── */}
        <Reveal delay={0.1}>
          <div className="flex items-center justify-between flex-wrap gap-4 mb-12 px-6 py-4 rounded-xl"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <div className="flex items-center gap-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,0.4)">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
              <span className="text-xs font-mono text-white/30">More projects & experiments on GitHub</span>
            </div>
            <a
              href="https://github.com/Saurabh0731"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono tracking-widest uppercase flex items-center gap-2 transition-colors duration-300 hover:text-white/70"
              style={{ color: "rgba(0,255,135,0.7)" }}
            >
              github.com/Saurabh0731
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                <path d="M2 10L10 2M10 2H5M10 2v5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </Reveal>

        {/* ── Project cards ─────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-8 mb-8">
          {projects.map((project, i) => (
            <FeaturedCard key={project.title} project={project} index={i} />
          ))}
        </div>

        {/* Coming soon card */}
        <div className="mb-16">
          <ComingSoonCard delay={0.1} />
        </div>

        {/* ── Bottom note ──────────────────────────────────────────────────── */}
        <Reveal delay={0.1}>
          <div
            className="flex items-start gap-4 rounded-xl px-6 py-4"
            style={{
              background: "rgba(0,255,135,0.03)",
              border: "1px solid rgba(0,255,135,0.1)",
            }}
          >
            <span className="text-base flex-shrink-0 mt-0.5">💡</span>
            <p className="text-xs font-mono leading-relaxed text-white/30">
              I'm actively working on more personal projects as I grow my skills. Each one is a chance to experiment, break things, and learn something new.
            </p>
          </div>
        </Reveal>

        {/* Divider */}
        <Reveal delay={0.1}>
          <div className="mt-12 flex items-center gap-4">
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
            <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-white/15">End of section</span>
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
          </div>
        </Reveal>

      </div>
    </section>
  );
}