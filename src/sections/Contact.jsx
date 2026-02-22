import { motion } from "framer-motion";
import { Mail, Copy, Check } from "lucide-react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { useState } from "react";

const Contact = () => {
  const [copied, setCopied] = useState(false);
  const email = "saurabhpandey0731@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen flex items-center py-24 bg-white dark:bg-[#0f172a] text-black dark:text-white
      before:absolute before:inset-0
      before:bg-[radial-gradient(circle_at_50%_20%,rgba(99,102,241,0.08),transparent_60%)]
      before:pointer-events-none"
    >
      <div className="max-w-4xl mx-auto px-6 text-center w-full">

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-semibold mb-16"
        >
          Let's Work Together
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="backdrop-blur-md bg-white/5 border border-white/10 
          rounded-3xl p-12 flex flex-col items-center gap-8"
        >
          <p className="text-slate-400 text-lg max-w-xl">
            I'm open to internships, freelance projects, and frontend roles.
            Feel free to reach out or connect with me.
          </p>

          {/* Email Button */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-3 px-8 py-4 rounded-xl
            bg-indigo-600 hover:bg-indigo-500 active:scale-95
            transition-all duration-300"
          >
            <Mail size={18} />
            {email}
            {copied ? <Check size={18} /> : <Copy size={18} />}
          </button>

          {/* Social Icons */}
          <div className="flex gap-8 mt-6">

            {/* LinkedIn */}
            <div className="relative group">
              <a
                href="https://www.linkedin.com/in/saurabh-pandey-webdev/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 flex items-center justify-center
                rounded-2xl bg-white/10 border border-white/10
                hover:border-white/30 hover:bg-white/15
                hover:-translate-y-1 transition-all duration-300"
              >
                <FaLinkedin className="text-xl text-slate-300 group-hover:text-white transition duration-300" />
              </a>

              <span
                className="absolute -top-10 left-1/2 -translate-x-1/2
                px-3 py-1 text-sm rounded-lg
                bg-white/10 backdrop-blur-md border border-white/20
                opacity-0 group-hover:opacity-100
                translate-y-2 group-hover:-translate-y-1
                transition-all duration-300 whitespace-nowrap"
              >
                LinkedIn
              </span>
            </div>

            {/* GitHub */}
            <div className="relative group">
              <a
                href="https://github.com/Saurabh0731"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 flex items-center justify-center
                rounded-2xl bg-white/10 border border-white/10
                hover:border-white/30 hover:bg-white/15
                hover:-translate-y-1 transition-all duration-300"
              >
                <FaGithub className="text-xl text-slate-300 group-hover:text-white transition duration-300" />
              </a>

              <span
                className="absolute -top-10 left-1/2 -translate-x-1/2
                px-3 py-1 text-sm rounded-lg
                bg-white/10 backdrop-blur-md border border-white/20
                opacity-0 group-hover:opacity-100
                translate-y-2 group-hover:-translate-y-1
                transition-all duration-300 whitespace-nowrap"
              >
                GitHub
              </span>
            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default Contact;