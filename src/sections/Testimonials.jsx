import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Project Teammate",
    role: "Backend Developer",
    text: "Saurabh delivered a clean, responsive frontend for our RE-BOOK project. His attention to UI detail and smooth user experience improved the entire platform.",
  },
  {
    name: "College Faculty",
    role: "Professor",
    text: "Saurabh consistently demonstrates strong frontend fundamentals and a keen eye for user experience. His projects show practical understanding of real-world applications.",
  },
  {
    name: "Peer Developer",
    role: "Frontend Collaborator",
    text: "Working with Saurabh was seamless. His structured code and component design made collaboration easy and efficient.",
  },
];

const Testimonials = () => {
  return (
    <section
      id="testimonials"
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
          Testimonials
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="backdrop-blur-xl bg-white/5 border border-white/10 
              rounded-2xl p-8 text-left hover:scale-105 transition-all duration-300"
            >
              <p className="text-slate-300 mb-6 leading-relaxed">
                “{item.text}”
              </p>

              <div>
                <p className="font-semibold text-indigo-400">
                  {item.name}
                </p>
                <p className="text-sm text-slate-400">
                  {item.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;