import { useState, useEffect } from "react";
import Loader       from "./components/Loader";
import CustomCursor from "./components/CustomCursor";
import CyberBg      from "./components/CyberBg";
import Nav          from "./components/Nav";
import Hero         from "./components/Hero";
import About        from "./components/About";
import Skills       from "./components/Skills";
import Projects     from "./components/Projects";
import Contact      from "./components/Contact";
import Footer       from "./components/Footer";
import ThemeToggle  from "./components/ThemeToggle";
import ScrollToTop  from "./components/ScrollToTop";
import "./styles/global.css";

function App({ dark, toggleTheme }) {
  const [active, setActive] = useState("hero");
  const [presenting, setPresenting] = useState(false);

useEffect(() => {
  const handleKey = (e) => {
    if (e.key === "F9") setPresenting((p) => !p);
  };
  window.addEventListener("keydown", handleKey);
  return () => window.removeEventListener("keydown", handleKey);
}, []);

  useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setActive(e.target.id);
          e.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1, rootMargin: "-60px 0px -10% 0px" }
  );
  document.querySelectorAll("section[id]").forEach((s) => observer.observe(s));
  return () => observer.disconnect();
}, []);

  return (
    <div className={presenting ? "presenting" : ""}>
      <CustomCursor />
      <CyberBg />
      {!presenting && (
        <Nav active={active} extra={
          <>
            <button
              className="btn-present"
              onClick={() => setPresenting(true)}
              title="Modo apresentação (F9)"
            >
              ▶
            </button>
            <ThemeToggle dark={dark} onToggle={toggleTheme} />
          </>
        }/>
      )}
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      {!presenting && <Footer />}
      {!presenting && <ScrollToTop />}
      {presenting && (
        <button className="btn-exit-present" onClick={() => setPresenting(false)}>
          ✕ SAIR DO MODO APRESENTAÇÃO
        </button>
      )}
    </div>
  );
}

export default function Portfolio() {
  const [dark,    setDark]    = useState(true);
  const [loading, setLoading] = useState(true);

  const toggleTheme = () => {
    setDark((d) => {
      document.body.classList.toggle("light", d);
      return !d;
    });
  };

  return (
    <>
      {loading && <Loader onDone={() => setLoading(false)} />}
      {!loading && <App dark={dark} toggleTheme={toggleTheme} />}
    </>
  );
}