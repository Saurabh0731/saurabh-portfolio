import { motion } from "framer-motion";

const timelineData = [
  {
    title: "Master of Computer Applications (MCA)",
    place: "VIVA School of MCA",
    date: "2025 – 2027 (Pursuing)",
    description:
      "Specializing in frontend development and modern web technologies.",
  },
  {
    title: "Bachelor of Science in Information Technology",
    place: "Abhinav College",
    date: "2021 – 2024",
    description:
      "Graduated with CGPA: 8.10/10. Built strong foundation in programming and web development.",
  },
  {
    title: "RE-BOOK – Textbook Resale Platform",
    place: "College Group Project",
    date: "2024",
    description:
      "Developed complete responsive frontend UI using Laravel, MySQL, and Bootstrap.",
  },
];

const Timeline = () => {
  return (
    <section
      id="timeline"
      className="min-h-screen flex items-center py-24 bg-[#0f172a] text-white"
    >
      <div className="max-w-5xl mx-auto px-6 w-full">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-20"
        >
          Experience & Education
        </motion.h2>

        <div className="relative border-l border-white/20">
          {timelineData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="mb-16 ml-8"
            >
              <div className="absolute -left-3 w-6 h-6 bg-indigo-500 rounded-full border-4 border-[#0f172a]" />

              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-2">
                  {item.title}
                </h3>

                <p className="text-indigo-400 text-sm mb-2">
                  {item.place}
                </p>

                <p className="text-slate-400 text-sm mb-4">
                  {item.date}
                </p>

                <p className="text-slate-300">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;