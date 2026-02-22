import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Download, Check } from "lucide-react";

const Hero = () => {
  const buttonRef = useRef(null);
  const [downloaded, setDownloaded] = useState(false);

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

  const fireConfetti = async () => {
    const confetti = (await import("canvas-confetti")).default;
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const handleClick = () => {
    setDownloaded(true);
    fireConfetti();
    setTimeout(() => setDownloaded(false), 2000);
  };

  return (
    <section className="min-h-screen flex items-center bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 text-white">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center w-full">

        {/* LEFT CONTENT */}
        <div className="text-center md:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent">
              Saurabh Pandey
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl mb-8 text-white/90"
          >
            Frontend Developer & MCA Student
          </motion.p>

          <div className="flex gap-6 flex-wrap justify-center md:justify-start">

            <a
              href="#projects"
              className="px-8 py-4 border border-white/40 rounded-xl 
              hover:bg-white/20 transition-all duration-300"
            >
              View My Work
            </a>

            <a
              ref={buttonRef}
              href="/resume.pdf"
              download
              onClick={handleClick}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="flex items-center gap-3 px-8 py-4 rounded-xl font-semibold 
              bg-white text-indigo-600 transition-all duration-300"
            >
              {downloaded ? <Check size={20} /> : <Download size={20} />}
              {downloaded ? "Downloaded!" : "Download Resume"}
            </a>

          </div>
        </div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative flex justify-center"
        >
          <div className="absolute w-72 h-72 bg-indigo-500/30 rounded-full blur-3xl"></div>

          <img
            src="/profile.webp"
            alt="Saurabh Pandey"
            className="relative w-72 h-72 object-cover rounded-3xl border border-white/20 shadow-2xl"
            loading="lazy"
          />
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;