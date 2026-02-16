import React, { useState, useEffect } from "react";
import { motion, useSpring } from "framer-motion";

function Contact() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState("");

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", mouseMove);
    return () => window.removeEventListener("mousemove", mouseMove);
  }, []);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorX = useSpring(mousePosition.x, springConfig);
  const cursorY = useSpring(mousePosition.y, springConfig);

  const cursorVariants = {
    default: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
    },
    hover: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      scale: 2.5,
    },
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === "email") {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus("sending");
    
    // Simulate form submission
    setTimeout(() => {
      setFormStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setFormStatus(""), 3000);
    }, 1000);
  };

  return (
    <>
      {/* Custom Magnetic Cursor */}
      <motion.div
        style={{
          position: "fixed",
          width: "16px",
          height: "16px",
          borderRadius: "50%",
          backgroundColor: "#0066FF",
          pointerEvents: "none",
          zIndex: 10000,
          mixBlendMode: cursorVariant === "hover" ? "difference" : "normal",
        }}
        variants={cursorVariants}
        animate={cursorVariant}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
          mass: 0.5,
        }}
      />

      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#FAFAFA",
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
          cursor: "none",
        }}
      >
        {/* Hero Section */}
        <section
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            padding: "100px 40px 80px",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Availability Badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                backgroundColor: "#F0FDF4",
                border: "1px solid #86EFAC",
                borderRadius: "6px",
                fontSize: "13px",
                fontWeight: "600",
                color: "#15803D",
                marginBottom: "32px",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: "#22C55E",
                }}
              />
              Open to opportunities
            </div>

            {/* Headline */}
            <h1
              style={{
                fontSize: "64px",
                fontWeight: "400",
                lineHeight: "1.1",
                letterSpacing: "0.02em",
                color: "#0A0A0A",
                marginBottom: "24px",
                fontFamily: "'Pacifico', cursive",
              }}
            >
              Let's Connect
            </h1>

            {/* Professional Positioning */}
            <p
              style={{
                fontSize: "20px",
                lineHeight: "1.5",
                color: "#666",
                marginBottom: "48px",
                maxWidth: "700px",
              }}
            >
              AI Engineer & Full-Stack Developer building production-grade systems with
              focus on scalability and real-world impact.
            </p>
          </motion.div>
        </section>

        {/* Main Content Grid */}
        <section
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            padding: "0 40px 120px",
            display: "grid",
            gridTemplateColumns: "1fr 1.5fr",
            gap: "60px",
          }}
        >
          {/* Left Column - Contact Info */}
          <div>
            {/* Direct Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ marginBottom: "60px" }}
            >
              <h2
                style={{
                  fontSize: "32px",
                  fontWeight: "400",
                  letterSpacing: "0.02em",
                  color: "#0A0A0A",
                  marginBottom: "32px",
                  fontFamily: "'Pacifico', cursive",
                }}
              >
                Contact Info
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {/* Email */}
                <div
                  style={{
                    padding: "24px",
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E5E5E5",
                    borderRadius: "16px",
                  }}
                  onMouseEnter={() => setCursorVariant("hover")}
                  onMouseLeave={() => setCursorVariant("default")}
                >
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#999",
                      marginBottom: "8px",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Email
                  </div>
                  <a
                    href="mailto:g.sivasatyasaibhagavan@gmail.com"
                    style={{
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#0A0A0A",
                      textDecoration: "none",
                      wordBreak: "break-all",
                      display: "block",
                      marginBottom: "12px",
                    }}
                  >
                    g.sivasatyasaibhagavan@gmail.com
                  </a>
                  <motion.button
                    whileHover={{ backgroundColor: "#F5F5F5" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      copyToClipboard("g.sivasatyasaibhagavan@gmail.com", "email")
                    }
                    onMouseEnter={() => setCursorVariant("hover")}
                    onMouseLeave={() => setCursorVariant("default")}
                    style={{
                      padding: "8px 16px",
                      backgroundColor: copiedEmail ? "#F0FDF4" : "transparent",
                      border: "1px solid #E5E5E5",
                      borderRadius: "8px",
                      fontSize: "13px",
                      fontWeight: "600",
                      color: copiedEmail ? "#15803D" : "#666",
                      cursor: "none",
                      transition: "all 0.2s",
                    }}
                  >
                    {copiedEmail ? "✓ Copied" : "Copy"}
                  </motion.button>
                </div>

                {/* Phone */}
                <div
                  style={{
                    padding: "24px",
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E5E5E5",
                    borderRadius: "16px",
                  }}
                  onMouseEnter={() => setCursorVariant("hover")}
                  onMouseLeave={() => setCursorVariant("default")}
                >
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#999",
                      marginBottom: "8px",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Phone
                  </div>
                  <a
                    href="tel:+917569205626"
                    style={{
                      fontSize: "16px",
                      fontWeight: "500",
                      color: "#0A0A0A",
                      textDecoration: "none",
                      display: "block",
                      marginBottom: "12px",
                    }}
                  >
                    +91 75692 05626
                  </a>
                  <motion.button
                    whileHover={{ backgroundColor: "#F5F5F5" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => copyToClipboard("+917569205626", "phone")}
                    onMouseEnter={() => setCursorVariant("hover")}
                    onMouseLeave={() => setCursorVariant("default")}
                    style={{
                      padding: "8px 16px",
                      backgroundColor: copiedPhone ? "#F0FDF4" : "transparent",
                      border: "1px solid #E5E5E5",
                      borderRadius: "8px",
                      fontSize: "13px",
                      fontWeight: "600",
                      color: copiedPhone ? "#15803D" : "#666",
                      cursor: "none",
                      transition: "all 0.2s",
                    }}
                  >
                    {copiedPhone ? "✓ Copied" : "Copy"}
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Professional Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{ marginBottom: "60px" }}
            >
              <h2
                style={{
                  fontSize: "32px",
                  fontWeight: "400",
                  letterSpacing: "0.02em",
                  color: "#0A0A0A",
                  marginBottom: "32px",
                  fontFamily: "'Pacifico', cursive",
                }}
              >
                Find Me Online
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {/* GitHub */}
                <a
                  href="https://github.com/bhagavan444"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: "20px",
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E5E5E5",
                    borderRadius: "16px",
                    textDecoration: "none",
                    transition: "all 0.2s",
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                  }}
                  onMouseEnter={(e) => {
                    setCursorVariant("hover");
                    e.currentTarget.style.borderColor = "#0A0A0A";
                  }}
                  onMouseLeave={(e) => {
                    setCursorVariant("default");
                    e.currentTarget.style.borderColor = "#E5E5E5";
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                      fill="#0A0A0A"
                    />
                  </svg>
                  <div>
                    <div
                      style={{
                        fontSize: "15px",
                        fontWeight: "600",
                        color: "#0A0A0A",
                        marginBottom: "2px",
                      }}
                    >
                      GitHub
                    </div>
                    <div style={{ fontSize: "13px", color: "#666" }}>@bhagavan444</div>
                  </div>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com/in/bhagavan444"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: "20px",
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E5E5E5",
                    borderRadius: "16px",
                    textDecoration: "none",
                    transition: "all 0.2s",
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                  }}
                  onMouseEnter={(e) => {
                    setCursorVariant("hover");
                    e.currentTarget.style.borderColor = "#0A0A0A";
                  }}
                  onMouseLeave={(e) => {
                    setCursorVariant("default");
                    e.currentTarget.style.borderColor = "#E5E5E5";
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                      fill="#0A0A0A"
                    />
                  </svg>
                  <div>
                    <div
                      style={{
                        fontSize: "15px",
                        fontWeight: "600",
                        color: "#0A0A0A",
                        marginBottom: "2px",
                      }}
                    >
                      LinkedIn
                    </div>
                    <div style={{ fontSize: "13px", color: "#666" }}>@bhagavan444</div>
                  </div>
                </a>
              </div>
            </motion.div>

            {/* Areas of Expertise */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2
                style={{
                  fontSize: "32px",
                  fontWeight: "400",
                  letterSpacing: "0.02em",
                  color: "#0A0A0A",
                  marginBottom: "24px",
                  fontFamily: "'Pacifico', cursive",
                }}
              >
                Expertise
              </h2>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                {[
                  "AI & ML",
                  "Full-Stack",
                  "Python",
                  "React",
                  "NLP",
                  "System Design",
                ].map((skill, i) => (
                  <span
                    key={i}
                    style={{
                      padding: "8px 16px",
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #E5E5E5",
                      borderRadius: "8px",
                      fontSize: "13px",
                      fontWeight: "500",
                      color: "#0A0A0A",
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div
              style={{
                padding: "48px",
                backgroundColor: "#FFFFFF",
                border: "1px solid #E5E5E5",
                borderRadius: "24px",
              }}
            >
              <h2
                style={{
                  fontSize: "40px",
                  fontWeight: "400",
                  letterSpacing: "0.02em",
                  color: "#0A0A0A",
                  marginBottom: "16px",
                  fontFamily: "'Pacifico', cursive",
                }}
              >
                Send a Message
              </h2>
              <p
                style={{
                  fontSize: "15px",
                  color: "#666",
                  marginBottom: "40px",
                  lineHeight: "1.6",
                }}
              >
                Have a project in mind or want to discuss opportunities? Drop me a message
                and I'll get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit}>
                {/* Name Field */}
                <div style={{ marginBottom: "24px" }}>
                  <label
                    htmlFor="name"
                    style={{
                      display: "block",
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "#0A0A0A",
                      marginBottom: "8px",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    onMouseEnter={() => setCursorVariant("hover")}
                    onMouseLeave={() => setCursorVariant("default")}
                    style={{
                      width: "100%",
                      padding: "14px 18px",
                      fontSize: "15px",
                      border: "1px solid #E5E5E5",
                      borderRadius: "12px",
                      outline: "none",
                      transition: "all 0.2s",
                      fontFamily: "'Inter', sans-serif",
                      cursor: "none",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#0066FF";
                      e.target.style.boxShadow = "0 0 0 3px rgba(0, 102, 255, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#E5E5E5";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>

                {/* Email Field */}
                <div style={{ marginBottom: "24px" }}>
                  <label
                    htmlFor="email"
                    style={{
                      display: "block",
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "#0A0A0A",
                      marginBottom: "8px",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    onMouseEnter={() => setCursorVariant("hover")}
                    onMouseLeave={() => setCursorVariant("default")}
                    style={{
                      width: "100%",
                      padding: "14px 18px",
                      fontSize: "15px",
                      border: "1px solid #E5E5E5",
                      borderRadius: "12px",
                      outline: "none",
                      transition: "all 0.2s",
                      fontFamily: "'Inter', sans-serif",
                      cursor: "none",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#0066FF";
                      e.target.style.boxShadow = "0 0 0 3px rgba(0, 102, 255, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#E5E5E5";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>

                {/* Subject Field */}
                <div style={{ marginBottom: "24px" }}>
                  <label
                    htmlFor="subject"
                    style={{
                      display: "block",
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "#0A0A0A",
                      marginBottom: "8px",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    onMouseEnter={() => setCursorVariant("hover")}
                    onMouseLeave={() => setCursorVariant("default")}
                    style={{
                      width: "100%",
                      padding: "14px 18px",
                      fontSize: "15px",
                      border: "1px solid #E5E5E5",
                      borderRadius: "12px",
                      outline: "none",
                      transition: "all 0.2s",
                      fontFamily: "'Inter', sans-serif",
                      cursor: "none",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#0066FF";
                      e.target.style.boxShadow = "0 0 0 3px rgba(0, 102, 255, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#E5E5E5";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>

                {/* Message Field */}
                <div style={{ marginBottom: "32px" }}>
                  <label
                    htmlFor="message"
                    style={{
                      display: "block",
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "#0A0A0A",
                      marginBottom: "8px",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="6"
                    onMouseEnter={() => setCursorVariant("hover")}
                    onMouseLeave={() => setCursorVariant("default")}
                    style={{
                      width: "100%",
                      padding: "14px 18px",
                      fontSize: "15px",
                      border: "1px solid #E5E5E5",
                      borderRadius: "12px",
                      outline: "none",
                      transition: "all 0.2s",
                      fontFamily: "'Inter', sans-serif",
                      resize: "vertical",
                      cursor: "none",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#0066FF";
                      e.target.style.boxShadow = "0 0 0 3px rgba(0, 102, 255, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#E5E5E5";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onMouseEnter={() => setCursorVariant("hover")}
                  onMouseLeave={() => setCursorVariant("default")}
                  disabled={formStatus === "sending"}
                  style={{
                    width: "100%",
                    padding: "16px",
                    backgroundColor: formStatus === "success" ? "#22C55E" : "#0066FF",
                    color: "#FFFFFF",
                    fontSize: "15px",
                    fontWeight: "600",
                    border: "none",
                    borderRadius: "12px",
                    cursor: "none",
                    transition: "all 0.3s",
                    opacity: formStatus === "sending" ? 0.7 : 1,
                  }}
                >
                  {formStatus === "sending"
                    ? "Sending..."
                    : formStatus === "success"
                    ? "✓ Message Sent!"
                    : "Send Message"}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer
          style={{
            borderTop: "1px solid #E5E5E5",
            padding: "40px",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: "13px", color: "#999" }}>
            © {new Date().getFullYear()} G S S S Bhagavan
          </p>
        </footer>

        {/* Global Styles */}
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');

          * {
            cursor: none !important;
            box-sizing: border-box;
          }

          @media (max-width: 768px) {
            * {
              cursor: auto !important;
            }
          }
        `}</style>
      </div>
    </>
  );
}

export default Contact;