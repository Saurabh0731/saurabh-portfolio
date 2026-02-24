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

// ─── Animated skill bar ───────────────────────────────────────────────────────
function SkillBar({ name, level, color = "#00FF87", delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      className="group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Label row */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-mono tracking-widest uppercase text-white/60 group-hover:text-white transition-colors duration-300">
          {name}
        </span>
        <motion.span
          className="text-[10px] font-mono"
          style={{ color }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: delay + 0.4 }}
        >
          {level}%
        </motion.span>
      </div>

      {/* Track */}
      <div
        className="relative h-px w-full overflow-hidden rounded-full"
        style={{ background: "rgba(255,255,255,0.07)" }}
      >
        {/* Fill */}
        <motion.div
          className="absolute top-0 left-0 h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}99)` }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ delay: delay + 0.2, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* Glow dot at end */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
          style={{
            background: color,
            boxShadow: `0 0 8px ${color}`,
            marginLeft: "-3px",
          }}
          initial={{ left: 0, opacity: 0 }}
          animate={inView ? { left: `${level}%`, opacity: hovered ? 1 : 0.6 } : {}}
          transition={{ delay: delay + 0.2, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </motion.div>
  );
}

// ─── Skill category card ──────────────────────────────────────────────────────
function CategoryCard({ category, skills, accent, icon, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [active, setActive] = useState(null);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-2xl p-7 overflow-hidden group"
      style={{
        background: "rgba(10,10,15,0.6)",
        border: "1px solid rgba(255,255,255,0.06)",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at top left, ${accent}12, transparent 60%)` }}
      />
      {/* Top border accent */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}60, transparent)` }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ delay: delay + 0.3, duration: 0.8 }}
      />

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <span
          className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
          style={{ background: `${accent}18`, border: `1px solid ${accent}30` }}
        >
          {icon}
        </span>
        <div>
          <h3 className="font-display font-bold text-white text-sm">{category}</h3>
          <p className="text-[10px] font-mono tracking-widest uppercase mt-0.5"
            style={{ color: `${accent}80` }}>
            {skills.length} skills
          </p>
        </div>
      </div>

      {/* Skill bars */}
      <div className="flex flex-col gap-5">
        {skills.map((skill, i) => (
          <SkillBar
            key={skill.name}
            name={skill.name}
            level={skill.level}
            color={accent}
            delay={delay + 0.15 * i}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ─── Floating tool badge ──────────────────────────────────────────────────────
function ToolBadge({ name, icon, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center gap-2 group cursor-default"
      whileHover={{ y: -4 }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:border-white/20"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <span className="group-hover:scale-110 transition-transform duration-300 inline-flex items-center justify-center">
          {icon}
        </span>
      </div>
      <span className="text-[10px] font-mono tracking-widest uppercase text-white/30 group-hover:text-white/60 transition-colors duration-300">
        {name}
      </span>
    </motion.div>
  );
}

// ─── Main Skills section ──────────────────────────────────────────────────────
export default function Skills() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const blobY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  const categories = [
    {
      category: "Frontend",
      icon: "🎨",
      accent: "#00FF87",
      delay: 0.1,
      skills: [
        { name: "HTML5", level: 90 },
        { name: "CSS3", level: 85 },
        { name: "JavaScript", level: 78 },
        { name: "React", level: 72 },
        { name: "Bootstrap", level: 80 },
      ],
    },
    {
      category: "Backend (Working Knowledge)",
      icon: "⚙️",
      accent: "#FF2D78",
      delay: 0.2,
      skills: [
        { name: "PHP", level: 55 },
        { name: "Laravel", level: 50 },
        { name: "MySQL", level: 48 },
      ],
    },
  ];

  const tools = [
    {
      name: "Git",
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="#F05032">
          <path d="M23.546 10.93L13.067.452a1.55 1.55 0 0 0-2.188 0L8.708 2.627l2.76 2.76a1.838 1.838 0 0 1 2.327 2.341l2.658 2.66a1.838 1.838 0 1 1-1.102 1.036l-2.48-2.48v6.511a1.84 1.84 0 1 1-1.51-.062V9.147a1.836 1.836 0 0 1-.999-2.415L7.617 3.982.454 11.144a1.55 1.55 0 0 0 0 2.189l10.48 10.478a1.55 1.55 0 0 0 2.189 0l10.423-10.422a1.55 1.55 0 0 0 0-2.458z"/>
        </svg>
      ),
    },
    {
      name: "GitHub",
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="white">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
        </svg>
      ),
    },
    {
      name: "Figma",
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22">
          <path d="M8 24c2.208 0 4-1.792 4-4v-4H8c-2.208 0-4 1.792-4 4s1.792 4 4 4z" fill="#0ACF83"/>
          <path d="M4 12c0-2.208 1.792-4 4-4h4v8H8c-2.208 0-4-1.792-4-4z" fill="#A259FF"/>
          <path d="M4 4c0-2.208 1.792-4 4-4h4v8H8C5.792 8 4 6.208 4 4z" fill="#F24E1E"/>
          <path d="M12 0h4c2.208 0 4 1.792 4 4s-1.792 4-4 4h-4V0z" fill="#FF7262"/>
          <path d="M20 12c0 2.208-1.792 4-4 4s-4-1.792-4-4 1.792-4 4-4 4 1.792 4 4z" fill="#1ABCFE"/>
        </svg>
      ),
    },
    {
      name: "WordPress",
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="#21759B">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zM1.26 12c0-1.79.386-3.49 1.075-5.019L7.1 21.217A10.747 10.747 0 0 1 1.26 12zm10.74 10.74a10.73 10.73 0 0 1-3.057-.445l3.245-9.431 3.324 9.104a.956.956 0 0 0 .072.14 10.74 10.74 0 0 1-3.584.632zm1.484-15.928c.647-.034 1.23-.102 1.23-.102.579-.069.511-.919-.069-.887 0 0-1.741.137-2.866.137-1.057 0-2.832-.137-2.832-.137-.58-.032-.648.852-.069.887 0 0 .549.068 1.128.102l1.676 4.591-2.354 7.062L6.044 6.812c.648-.034 1.23-.102 1.23-.102.58-.069.512-.919-.068-.887 0 0-1.741.137-2.866.137a10.856 10.856 0 0 1-.293-.007A10.746 10.746 0 0 1 12 1.26c2.814 0 5.381 1.077 7.302 2.838a4.816 4.816 0 0 0-.077-.003c-1.057 0-1.808.92-1.808 1.908 0 .886.511 1.635 1.056 2.52.41.716.887 1.635.887 2.963 0 .92-.353 1.987-.818 3.472l-1.072 3.58-3.886-11.566zm3.552 14.104L20.35 9.43c.442-1.107.59-1.993.59-2.779 0-.286-.019-.551-.053-.801A10.746 10.746 0 0 1 22.74 12c0 3.633-1.803 6.843-4.564 8.764-.032-.049-.059-.1-.08-.154z"/>
        </svg>
      ),
    },
    {
      name: "VS Code",
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22">
          <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z" fill="#007ACC"/>
        </svg>
      ),
    },
  ];

  return (
    <section
      id="skills"
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
          top: "-10%",
          left: "-15%",
          y: blobY,
          background: "radial-gradient(circle, rgba(0,255,135,0.07) 0%, transparent 65%)",
          filter: "blur(60px)",
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
          background: "radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 65%)",
          filter: "blur(60px)",
          borderRadius: "50%",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-16">

        {/* ── Header ───────────────────────────────────────────────────────── */}
        <div className="flex items-start justify-between mb-10 md:mb-14">
          <div>
            <Reveal delay={0}>
              <SectionTag index="02" label="Skills" />
            </Reveal>
            <Reveal delay={0.1}>
              <h2
                className="font-display font-extrabold leading-[1.05]"
                style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
              >
                <span className="text-white">What I</span>
                <br />
                <span
                  style={{
                    WebkitTextStroke: "1.5px rgba(0,255,135,0.65)",
                    color: "transparent",
                  }}
                >
                  work with.
                </span>
              </h2>
            </Reveal>
          </div>

          {/* Ghost watermark */}
          <Reveal delay={0.1} direction="left">
            <span
              className="font-display font-extrabold leading-none select-none hidden md:block"
              style={{
                fontSize: "clamp(5rem, 12vw, 11rem)",
                WebkitTextStroke: "1px rgba(255,255,255,0.04)",
                color: "transparent",
              }}
            >
              SKILLS
            </span>
          </Reveal>
        </div>

        {/* ── Category cards ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 md:mb-12">
          {categories.map((cat) => (
            <CategoryCard key={cat.category} {...cat} />
          ))}
        </div>

        {/* ── Currently Learning strip ────────────────────────────────────── */}
        <Reveal delay={0.1}>
          <div
            className="relative rounded-2xl px-8 py-6 mb-16 overflow-hidden"
            style={{
              background: "rgba(0,229,255,0.04)",
              border: "1px solid rgba(0,229,255,0.12)",
            }}
          >
            <div className="absolute top-0 left-4 right-4 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(0,229,255,0.4), transparent)" }} />
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-3 flex-shrink-0">
                <motion.div
                  className="w-2 h-2 rounded-full"
                  style={{ background: "#00e5ff" }}
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="text-xs font-mono tracking-[0.25em] uppercase" style={{ color: "#00e5ff" }}>
                  Currently Learning
                </span>
              </div>
              <div className="w-px h-6 hidden sm:block" style={{ background: "rgba(255,255,255,0.08)" }} />
              <div className="flex flex-wrap gap-3">
                {["Tailwind CSS", "Framer Motion", "Web Application Dev (Udemy)"].map((item, i) => (
                  <span
                    key={item}
                    className="text-[11px] font-mono px-3 py-1 rounded-full"
                    style={{
                      background: "rgba(0,229,255,0.08)",
                      border: "1px solid rgba(0,229,255,0.2)",
                      color: "rgba(0,229,255,0.8)",
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── Tools ───────────────────────────────────────────────────────── */}
        <Reveal delay={0.1}>
          <div className="mb-8">
            <p className="text-[10px] font-mono tracking-[0.35em] uppercase text-white/25 mb-6">
              Tools & Environment
            </p>
            <div className="flex flex-wrap gap-8">
              {tools.map((tool, i) => (
                <ToolBadge key={tool.name} {...tool} delay={0.05 * i} />
              ))}
            </div>
          </div>
        </Reveal>

        {/* ── Bottom note ──────────────────────────────────────────────────── */}
        <Reveal delay={0.2}>
          <div
            className="mt-16 flex items-center gap-4 rounded-xl px-6 py-4"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <span className="text-base flex-shrink-0">📌</span>
            <p className="text-xs font-mono leading-relaxed text-white/30">
              Skill levels reflect honest self-assessment — not inflated numbers.
              I'd rather show you my work than sell you percentages.
              {" "}
              <a href="#projects" className="underline underline-offset-4 transition-colors duration-300 hover:text-white/60"
                style={{ color: "rgba(0,255,135,0.6)" }}>
                See my projects →
              </a>
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