import { motion } from "framer-motion";
import { useRef } from "react";

const MagneticButton = ({ href, text, primary }) => {
  const buttonRef = useRef(null);

  const handleMouseMove = (e) => {
    const btn = buttonRef.current;
    const rect = btn.getBoundingClientRect();

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  };

  const handleMouseLeave = () => {
    const btn = buttonRef.current;
    btn.style.transform = `translate(0px, 0px)`;
  };

  return (
    <a
      ref={buttonRef}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden px-6 py-3 rounded-xl font-medium 
      transition-all duration-300 ease-out group backdrop-blur-lg
      ${
        primary
          ? "bg-indigo-600/80 hover:bg-indigo-500 text-white"
          : "border border-white/20 hover:border-indigo-400 text-white"
      }`}
    >
      <span
        className="absolute inset-0 -translate-x-full 
        bg-gradient-to-r from-transparent via-white/40 to-transparent 
        group-hover:translate-x-full transition-transform 
        duration-700 ease-in-out"
      />
      <span className="relative z-10">{text}</span>
    </a>
  );
};

const Projects = () => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 8;
    const rotateY = ((x - centerX) / centerX) * -8;

    card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.03)
    `;

    card.style.background = `
      radial-gradient(circle at ${x}px ${y}px,
      rgba(255,255,255,0.15),
      rgba(255,255,255,0.05) 40%,
      rgba(15,23,42,0.9) 70%)
    `;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    card.style.transform = `
      perspective(1000px)
      rotateX(0deg)
      rotateY(0deg)
      scale(1)
    `;

    card.style.background = "rgba(30, 41, 59, 0.6)";
  };

  return (
    <section
  id="projects"
  className="min-h-screen flex items-center py-24 bg-[#0f172a] text-white"
>
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-12"
        >
          Projects
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 4,
              repeat: window.innerWidth > 768 ? Infinity : 0,
              ease: "easeInOut",
            }}
            className="w-full max-w-2xl"
          >
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative p-10 rounded-2xl 
              backdrop-blur-xl bg-white/5 
              border border-white/10 
              transition-all duration-200 ease-out"
            >
              <h3 className="text-2xl font-semibold mb-4">
                RE-BOOK – Textbook Resale Platform
              </h3>

              <p className="text-slate-300 mb-6">
                A responsive textbook resale platform built using
                Laravel, PHP, MySQL, and Bootstrap.
              </p>

              <div className="flex justify-center gap-4 flex-wrap mb-6">
                {["Laravel", "PHP", "MySQL", "Bootstrap"].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-sm bg-indigo-600/20 
                    text-indigo-400 rounded-full border border-indigo-500/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex justify-center gap-6">
                <MagneticButton href="#" primary text="GitHub" />
                <MagneticButton href="#" text="Live Demo" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;