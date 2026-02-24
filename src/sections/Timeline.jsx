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

// ─── Single timeline item ─────────────────────────────────────────────────────
function TimelineItem({ item, index, isLast }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className="relative grid grid-cols-[1fr_auto_1fr] gap-0 items-start">

      {/* Left content */}
      <div className={`pb-12 ${isLeft ? "pr-10" : ""}`}>
        {isLeft && (
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-end"
          >
            <TimelineCard item={item} align="right" />
          </motion.div>
        )}
      </div>

      {/* Center spine */}
      <div className="flex flex-col items-center relative">
        {/* Dot */}
        <motion.div
          className="relative z-10 flex-shrink-0"
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="w-4 h-4 rounded-full border-2 flex items-center justify-center"
            style={{
              borderColor: item.accent,
              background: "#050508",
              boxShadow: `0 0 12px ${item.accent}60`,
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: item.accent }} />
          </div>
        </motion.div>

        {/* Connecting line */}
        {!isLast && (
          <motion.div
            className="w-px flex-1 mt-2"
            style={{ background: "rgba(255,255,255,0.07)", minHeight: "60px" }}
            initial={{ scaleY: 0, originY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
        )}
      </div>

      {/* Right content */}
      <div className={`pb-12 ${!isLeft ? "pl-10" : ""}`}>
        {!isLeft && (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <TimelineCard item={item} align="left" />
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ─── Timeline card ────────────────────────────────────────────────────────────
function TimelineCard({ item, align }) {
  return (
    <div
      className={`relative rounded-2xl p-5 w-full group overflow-hidden ${align === "right" ? "ml-auto" : ""}`}
      style={{
        background: "rgba(15,15,22,0.95)",
        border: "1px solid rgba(255,255,255,0.09)",
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{ background: `radial-gradient(ellipse at ${align === "right" ? "top right" : "top left"}, ${item.accent}10, transparent 65%)` }}
      />
      {/* Top accent */}
      <div
        className="absolute top-0 left-4 right-4 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${item.accent}60, transparent)` }}
      />

      {/* Type badge */}
      <div className="flex items-center gap-2 mb-4">
        <span
          className="text-[10px] font-mono tracking-[0.25em] uppercase px-2.5 py-1 rounded-full"
          style={{
            background: `${item.accent}12`,
            border: `1px solid ${item.accent}30`,
            color: item.accent,
          }}
        >
          {item.type}
        </span>
        <span className="text-[10px] font-mono text-white/25 tracking-widest">{item.period}</span>
      </div>

      {/* Title */}
      <h3 className="font-display font-bold text-white text-base leading-snug mb-1">
        {item.title}
      </h3>
      <p className="font-mono text-xs mb-3" style={{ color: `${item.accent}90` }}>
        {item.institution}
      </p>

      {/* Description */}
      {item.description && (
        <p className="font-mono text-xs text-white/35 leading-relaxed mb-4">
          {item.description}
        </p>
      )}

      {/* Tags */}
      {item.tags && (
        <div className="flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono px-2 py-0.5 rounded-full"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                color: "rgba(255,255,255,0.35)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Score badge */}
      {item.score && (
        <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg"
          style={{ background: `${item.accent}0d`, border: `1px solid ${item.accent}20` }}>
          <span className="text-xs font-display font-bold" style={{ color: item.accent }}>
            {item.score}
          </span>
          <span className="text-[10px] font-mono text-white/30">CGPA</span>
        </div>
      )}
    </div>
  );
}

// ─── Mobile timeline (stacked) ────────────────────────────────────────────────
function MobileTimelineItem({ item, index, isLast }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative pl-8"
    >
      {/* Vertical line */}
      {!isLast && (
        <div
          className="absolute left-[7px] top-4 bottom-0 w-px"
          style={{ background: "rgba(255,255,255,0.07)" }}
        />
      )}
      {/* Dot */}
      <div
        className="absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 flex items-center justify-center"
        style={{
          borderColor: item.accent,
          background: "#050508",
          boxShadow: `0 0 10px ${item.accent}50`,
        }}
      >
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: item.accent }} />
      </div>

      <div className="pb-10">
        <TimelineCard item={item} align="left" />
      </div>
    </motion.div>
  );
}

// ─── Main Timeline section ────────────────────────────────────────────────────
export default function Timeline() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const blobY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  const items = [
    {
      type: "Education",
      period: "2021 – 2024",
      title: "Bachelor of Science in Information Technology",
      institution: "Abhinav College, Mumbai",
      description: "Built a strong foundation in programming, databases, web development, and software engineering principles.",
      tags: ["HTML", "CSS", "JavaScript", "PHP", "MySQL", "Java"],
      score: "8.10",
      accent: "#00FF87",
    },
    {
      type: "Project",
      period: "2023",
      title: "RE-BOOK — Textbook Resale Platform",
      institution: "College Group Project",
      description: "Built the complete responsive frontend UI for a book resale platform using Laravel, Bootstrap, and JavaScript.",
      tags: ["Laravel", "Bootstrap", "PHP", "MySQL", "JavaScript"],
      accent: "#FF2D78",
    },
    {
      type: "Education",
      period: "2025 – 2027",
      title: "Master of Computer Applications (MCA)",
      institution: "VIVA School of MCA, Mumbai",
      description: "Deepening expertise in full-stack development, algorithms, and software architecture. Currently pursuing.",
      tags: ["React", "Advanced JS", "System Design", "Tailwind"],
      accent: "#00e5ff",
    },
    {
      type: "Certification",
      period: "2024 – Present",
      title: "Web Application Development",
      institution: "Udemy — Hitesh Choudhary",
      description: "Ongoing course covering modern web application development practices and technologies.",
      tags: ["Web Dev", "Ongoing"],
      accent: "#FF2D78",
    },
  ];

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="relative py-16 md:py-24 overflow-hidden"
      style={{ background: "#050508" }}
    >
      {/* Ambient blobs */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 600,
          height: 600,
          top: "10%",
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
              <SectionTag index="03" label="Timeline" />
            </Reveal>
            <Reveal delay={0.1}>
              <h2
                className="font-display font-extrabold leading-[1.05]"
                style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
              >
                <span className="text-white">My journey</span>
                <br />
                <span
                  style={{
                    WebkitTextStroke: "1.5px rgba(0,255,135,0.65)",
                    color: "transparent",
                  }}
                >
                  so far.
                </span>
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.1} direction="left">
            <span
              className="font-display font-extrabold leading-none select-none hidden md:block"
              style={{
                fontSize: "clamp(4rem, 10vw, 9rem)",
                WebkitTextStroke: "1px rgba(255,255,255,0.04)",
                color: "transparent",
              }}
            >
              PATH
            </span>
          </Reveal>
        </div>

        {/* ── Desktop timeline (alternating) ───────────────────────────────── */}
        <div className="hidden md:block max-w-4xl mx-auto">
          {items.map((item, i) => (
            <TimelineItem key={i} item={item} index={i} isLast={i === items.length - 1} />
          ))}
        </div>

        {/* ── Mobile timeline (stacked) ────────────────────────────────────── */}
        <div className="md:hidden">
          {items.map((item, i) => (
            <MobileTimelineItem key={i} item={item} index={i} isLast={i === items.length - 1} />
          ))}
        </div>

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