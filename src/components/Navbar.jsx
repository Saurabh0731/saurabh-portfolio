import { useEffect, useState } from "react";

const sections = ["about", "skills", "projects", "contact"];

const Navbar = () => {
  const [active, setActive] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      let current = "";
      sections.forEach((id) => {
        const section = document.getElementById(id);
        if (section) {
          const sectionTop = section.offsetTop - 100;
          if (window.scrollY >= sectionTop) {
            current = id;
          }
        }
      });
      setActive(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed w-full z-50 bg-transparent backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">
          Saurabh<span className="text-indigo-500">.</span>
        </h1>

        <div className="hidden md:flex gap-8 text-sm font-medium">
          {sections.map((sec) => (
            <a
              key={sec}
              href={`#${sec}`}
              className={`relative capitalize transition ${
                active === sec
                  ? "text-indigo-400"
                  : "text-white hover:text-indigo-400"
              }`}
            >
              {sec}
              {active === sec && (
                <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-indigo-400 rounded-full"></span>
              )}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;