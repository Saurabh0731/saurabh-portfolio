import { motion } from "framer-motion";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaGitAlt,
  FaLaravel,
  FaBootstrap,
} from "react-icons/fa";
import { SiTailwindcss } from "react-icons/si";

const skills = [
  { icon: <FaHtml5 />, name: "HTML5", color: "text-orange-500" },
  { icon: <FaCss3Alt />, name: "CSS3", color: "text-blue-500" },
  { icon: <FaJs />, name: "JavaScript", color: "text-yellow-400" },
  { icon: <FaReact />, name: "React", color: "text-cyan-400" },
  { icon: <SiTailwindcss />, name: "Tailwind", color: "text-sky-400" },
  { icon: <FaBootstrap />, name: "Bootstrap", color: "text-purple-500" },
  { icon: <FaGitAlt />, name: "Git", color: "text-red-500" },
  { icon: <FaLaravel />, name: "Laravel", color: "text-red-600" },
];

const Skills = () => {
  return (
    <section
      id="skills"
      className="min-h-screen flex items-center py-24 bg-[#0f172a] text-white"
    >
      <div className="max-w-6xl mx-auto px-6 w-full text-center">

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-16"
        >
          Tech Stack
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.1 }}
              className="relative group"
            >
              <div
                className="flex flex-col items-center justify-center gap-4 
                p-8 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10
                transition-all duration-300 group-hover:border-indigo-500"
              >
                <div
                  className={`text-5xl ${skill.color} transition-transform duration-300 group-hover:rotate-6`}
                >
                  {skill.icon}
                </div>

                <p className="text-lg font-medium text-slate-300 group-hover:text-white">
                  {skill.name}
                </p>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-indigo-500/10 blur-xl opacity-0 group-hover:opacity-100 transition duration-300 -z-10"></div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;