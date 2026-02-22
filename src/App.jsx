import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import Timeline from "./sections/Timeline";
import Testimonials from "./sections/Testimonials";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Timeline />
      <Testimonials />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}

export default App;