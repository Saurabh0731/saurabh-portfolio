import { FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#0f172a] text-white py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">

        <p className="text-sm text-slate-500 tracking-wide">
          © {new Date().getFullYear()} Saurabh Pandey · Built with React & Tailwind
        </p>

        <div className="flex gap-6">
          <a
            href="https://www.linkedin.com/in/saurabh-pandey-webdev/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-white transition"
          >
            <FaLinkedin size={18} />
          </a>

          <a
            href="https://github.com/Saurabh0731"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-white transition"
          >
            <FaGithub size={18} />
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;