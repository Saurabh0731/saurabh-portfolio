import { motion } from "framer-motion";

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const line = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const About = () => {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center py-24 bg-white dark:bg-[#0f172a] text-black dark:text-white"
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-16"
        >
          About Me
        </motion.h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8 text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed"
        >
          <motion.p variants={line}>
            I'm an MCA student specializing in{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent font-semibold">
              Frontend Development
            </span>{" "}
            with a strong passion for building modern, responsive web
            applications.
          </motion.p>

          <motion.p variants={line}>
            I enjoy transforming ideas into{" "}
            <span className="text-indigo-400 font-semibold">
              interactive digital experiences
            </span>{" "}
            using React, JavaScript, and modern UI principles.
          </motion.p>

          <motion.p variants={line}>
            My focus is on creating{" "}
            <span className="text-cyan-400 font-semibold">
              clean architecture
            </span>
            , smooth animations, and user-friendly interfaces that feel
            premium and intuitive.
          </motion.p>

          <motion.p variants={line}>
            I'm currently looking for opportunities as a{" "}
            <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent font-semibold">
              Frontend Developer or Full Stack Intern
            </span>{" "}
            where I can contribute to real-world projects and grow
            alongside experienced teams.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;