const EMAILJS_SERVICE_ID  = "service_xxxxxxx";
const EMAILJS_TEMPLATE_ID = "template_xxxxxxx";
const EMAILJS_PUBLIC_KEY  = "xxxxxxxxxxxxxxxxxxxx";
import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

// ─── Section tag ──────────────────────────────────────────────────────────────
function SectionTag({ index, label }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="text-[10px] font-mono tracking-[0.35em] uppercase" style={{ color: "#00FF87" }}>
        {index}
      </span>
      <div className="h-px w-10" style={{ background: "rgba(0,255,135,0.3)" }} />
      <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-white/30">{label}</span>
    </div>
  );
}

// ─── Reveal wrapper ───────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, direction = "up" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: direction === "up" ? 35 : 0,
        x: direction === "left" ? 35 : direction === "right" ? -35 : 0,
      }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ delay, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ─── Input field ──────────────────────────────────────────────────────────────
function InputField({ label, type = "text", placeholder, value, onChange, name, required }) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative flex flex-col gap-2">
      <label className="text-[10px] font-mono tracking-[0.3em] uppercase"
        style={{ color: focused ? "#00FF87" : "rgba(255,255,255,0.3)", transition: "color 0.3s" }}>
        {label} {required && <span style={{ color: "#FF2D78" }}>*</span>}
      </label>
      <div className="relative">
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          required={required}
          className="w-full bg-transparent font-mono text-sm text-white placeholder-white/20 outline-none py-3 px-0 transition-all duration-300"
          style={{ caretColor: "#00FF87" }}
        />
        {/* Animated bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: "rgba(255,255,255,0.08)" }} />
        <motion.div
          className="absolute bottom-0 left-0 h-px"
          style={{ background: "linear-gradient(90deg, #00FF87, #00e5ff)" }}
          animate={{ width: focused ? "100%" : "0%" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

// ─── Textarea field ───────────────────────────────────────────────────────────
function TextareaField({ label, placeholder, value, onChange, name, required }) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative flex flex-col gap-2">
      <label className="text-[10px] font-mono tracking-[0.3em] uppercase"
        style={{ color: focused ? "#00FF87" : "rgba(255,255,255,0.3)", transition: "color 0.3s" }}>
        {label} {required && <span style={{ color: "#FF2D78" }}>*</span>}
      </label>
      <div className="relative">
        <textarea
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          required={required}
          rows={5}
          className="w-full bg-transparent font-mono text-sm text-white placeholder-white/20 outline-none py-3 px-0 resize-none transition-all duration-300"
          style={{ caretColor: "#00FF87" }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: "rgba(255,255,255,0.08)" }} />
        <motion.div
          className="absolute bottom-0 left-0 h-px"
          style={{ background: "linear-gradient(90deg, #00FF87, #00e5ff)" }}
          animate={{ width: focused ? "100%" : "0%" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

// ─── Contact link ─────────────────────────────────────────────────────────────
function ContactLink({ icon, label, value, href, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.a
      ref={ref}
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      initial={{ opacity: 0, x: 20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center gap-4 group py-4"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      whileHover={{ x: 4 }}
    >
      {/* Icon box */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:border-[rgba(0,255,135,0.3)] group-hover:bg-[rgba(0,255,135,0.06)]"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {icon}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-mono tracking-[0.25em] uppercase text-white/25 mb-0.5">{label}</p>
        <p className="text-sm font-mono text-white/60 group-hover:text-white transition-colors duration-300 truncate">
          {value}
        </p>
      </div>

      {/* Arrow */}
      <motion.div
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ color: "#00FF87" }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </motion.a>
  );
}

// ─── Main Contact section ─────────────────────────────────────────────────────
export default function Contact() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const blobY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleChange = (e) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    // Simulate send — replace with your preferred email service (EmailJS, Formspree, etc.)
    await new Promise((r) => setTimeout(r, 1500));
    setStatus("sent");
  };

  const contacts = [
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#00FF87" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22 6l-10 7L2 6" stroke="#00FF87" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      label: "Email",
      value: "saurabhpandey0731@gmail.com",
      href: "mailto:saurabhpandey0731@gmail.com",
      delay: 0.1,
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="white" opacity="0.7">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
        </svg>
      ),
      label: "GitHub",
      value: "github.com/Saurabh0731",
      href: "https://github.com/Saurabh0731",
      delay: 0.2,
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      label: "Phone",
      value: "+91-9140468101",
      href: "tel:+919140468101",
      delay: 0.3,
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-16 md:py-24 overflow-hidden"
      style={{ background: "#050508" }}
    >
      {/* Ambient blobs */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 700,
          height: 700,
          bottom: "-20%",
          right: "-15%",
          y: blobY,
          background: "radial-gradient(circle, rgba(0,255,135,0.08) 0%, transparent 65%)",
          filter: "blur(70px)",
          borderRadius: "50%",
        }}
      />
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 500,
          height: 500,
          top: "10%",
          left: "-10%",
          background: "radial-gradient(circle, rgba(255,45,120,0.06) 0%, transparent 65%)",
          filter: "blur(60px)",
          borderRadius: "50%",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-16">

        {/* ── Header ───────────────────────────────────────────────────────── */}
        <div className="flex items-start justify-between mb-10 md:mb-14">
          <div>
            <Reveal delay={0}>
              <SectionTag index="05" label="Contact" />
            </Reveal>
            <Reveal delay={0.1}>
              <h2
                className="font-display font-extrabold leading-[1.05]"
                style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
              >
                <span className="text-white">Let's build</span>
                <br />
                <span
                  style={{
                    WebkitTextStroke: "1.5px rgba(0,255,135,0.65)",
                    color: "transparent",
                  }}
                >
                  something great.
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="font-mono text-sm text-white/35 mt-4 max-w-sm leading-relaxed">
                Whether it's an internship, freelance gig, or just a hello — my inbox is open.
              </p>
            </Reveal>
          </div>

          {/* Ghost watermark */}
          <Reveal delay={0.1} direction="left">
            <span
              className="font-display font-extrabold leading-none select-none hidden md:block"
              style={{
                fontSize: "clamp(4rem, 9vw, 8rem)",
                WebkitTextStroke: "1px rgba(255,255,255,0.04)",
                color: "transparent",
              }}
            >
              HI.
            </span>
          </Reveal>
        </div>

        {/* ── Two-column layout ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* LEFT — contact form */}
          <Reveal delay={0.1}>
            <div
              className="relative rounded-2xl p-8 md:p-10 overflow-hidden"
              style={{
                background: "rgba(10,10,15,0.7)",
                border: "1px solid rgba(255,255,255,0.07)",
                backdropFilter: "blur(12px)",
              }}
            >
              {/* Top accent */}
              <div className="absolute top-0 left-4 right-4 h-px"
                style={{ background: "linear-gradient(90deg, transparent, rgba(0,255,135,0.4), transparent)" }} />

              {status === "sent" ? (
                /* Success state */
                <motion.div
                  className="flex flex-col items-center justify-center text-center py-12"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                    style={{ background: "rgba(0,255,135,0.1)", border: "1px solid rgba(0,255,135,0.3)" }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17l-5-5" stroke="#00FF87" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.div>
                  <h3 className="font-display font-bold text-white text-xl mb-2">Message Sent!</h3>
                  <p className="font-mono text-sm text-white/40 mb-6">I'll get back to you as soon as possible.</p>
                  <button
                    onClick={() => { setStatus("idle"); setFormData({ name: "", email: "", subject: "", message: "" }); }}
                    className="text-xs font-mono tracking-widest uppercase text-white/30 hover:text-white/60 transition-colors underline underline-offset-4"
                  >
                    Send another
                  </button>
                </motion.div>
              ) : (
                /* Form */
                <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <InputField
                      label="Your Name"
                      name="name"
                      placeholder="Saurabh Pandey"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    <InputField
                      label="Email Address"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <InputField
                    label="Subject"
                    name="subject"
                    placeholder="Internship opportunity / Project collab / Just saying hi"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                  <TextareaField
                    label="Message"
                    name="message"
                    placeholder="Tell me about the opportunity, project, or just drop a hello..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={status === "sending"}
                    className="relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-sm font-mono tracking-[0.2em] uppercase font-bold overflow-hidden group self-start"
                    whileHover={{ scale: status === "sending" ? 1 : 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span className="absolute inset-0 transition-all duration-300"
                      style={{ background: "linear-gradient(135deg, #00FF87, #00e5ff)" }} />
                    <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: "linear-gradient(135deg, #00e5ff, #00FF87)" }} />
                    {/* Shine */}
                    <span className="absolute top-0 -left-full w-full h-full group-hover:left-full transition-all duration-700"
                      style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)", transform: "skewX(-15deg)" }} />
                    <span className="relative z-10 text-black flex items-center gap-2">
                      {status === "sending" ? (
                        <>
                          <motion.span
                            className="w-4 h-4 rounded-full border-2 border-black/30 border-t-black"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                            <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </>
                      )}
                    </span>
                  </motion.button>
                </form>
              )}
            </div>
          </Reveal>

          {/* RIGHT — contact info + socials */}
          <div className="flex flex-col justify-between gap-10">

            {/* Contact links */}
            <Reveal delay={0.2} direction="left">
              <div>
                <p className="text-[10px] font-mono tracking-[0.35em] uppercase text-white/25 mb-2">
                  Reach me directly
                </p>
                <div className="flex flex-col">
                  {contacts.map((c) => (
                    <ContactLink key={c.label} {...c} />
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Availability card */}
            <Reveal delay={0.3} direction="left">
              <div
                className="relative rounded-2xl p-7 overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, rgba(0,255,135,0.07) 0%, rgba(0,229,255,0.03) 100%)",
                  border: "1px solid rgba(0,255,135,0.15)",
                }}
              >
                <div className="absolute top-0 left-4 right-4 h-px"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(0,255,135,0.5), transparent)" }} />

                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ background: "#00FF87" }}
                    animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                  />
                  <span className="text-xs font-mono tracking-[0.25em] uppercase" style={{ color: "#00FF87" }}>
                    Currently available
                  </span>
                </div>

                <p className="font-mono text-xs text-white/40 leading-relaxed mb-5">
                  Actively looking for{" "}
                  <span className="text-white/70">internships</span> and{" "}
                  <span className="text-white/70">frontend roles</span>.
                  Open to remote, hybrid, or on-site opportunities across India.
                </p>

                <div className="flex flex-wrap gap-2">
                  {["Internship", "Fresher Role", "Remote OK", "Hybrid OK"].map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono tracking-widest uppercase px-3 py-1 rounded-full"
                      style={{
                        background: "rgba(0,255,135,0.08)",
                        border: "1px solid rgba(0,255,135,0.2)",
                        color: "rgba(0,255,135,0.7)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Response time note */}
            <Reveal delay={0.4} direction="left">
              <p className="text-[11px] font-mono text-white/20 leading-relaxed">
                ⏱ Typical response time:{" "}
                <span className="text-white/40">within 24 hours</span>
              </p>
            </Reveal>
          </div>
        </div>

        {/* ── Bottom divider ────────────────────────────────────────────────── */}
        <Reveal delay={0.1}>
          <div className="mt-14 flex items-center gap-4">
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
            <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-white/15">End of section</span>
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
          </div>
        </Reveal>

      </div>
    </section>
  );
}