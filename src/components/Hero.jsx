import { useEffect, useRef, useState } from "react";
import GlitchText from "./GlitchText";
import Particles  from "./Particles";
import "./Hero.css";

const STATS = [
  { n: 9,  suffix: "",  label: "Projetos"    },
  { n: 10, suffix: "+", label: "Tecnologias" },
  { n: 1,  suffix: "+", label: "Anos"        },
];

const ROLES = [
  "Desenvolvedor Full Stack",
  "Back-end Developer",
  "React Developer",
  "Node.js Developer",
];

function Counter({ to, suffix = "", duration = 1000 }) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    const startTime = performance.now();
    const update = (now) => {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(eased * to));
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }, [to, duration]);

  return <>{val}{suffix}</>;
}

export default function Hero() {
  const [typed,      setTyped]      = useState("");
  const [deleting,   setDeleting]   = useState(false);
  const [roleIndex,  setRoleIndex]  = useState(0);
  const [counted,    setCounted]    = useState(false);
  const [ready,      setReady]      = useState(false);
  const statsRef                    = useRef(null);

  // ready para animações
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 100);
    return () => clearTimeout(t);
  }, []);

  // efeito de digitação alternando roles
  useEffect(() => {
    const current = ROLES[roleIndex];
    let timeout;

    if (!deleting && typed.length < current.length) {
      timeout = setTimeout(() => setTyped(current.slice(0, typed.length + 1)), 80);
    } else if (!deleting && typed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && typed.length > 0) {
      timeout = setTimeout(() => setTyped(current.slice(0, typed.length - 1)), 40);
    } else if (deleting && typed.length === 0) {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % ROLES.length);
    }

    return () => clearTimeout(timeout);
  }, [typed, deleting, roleIndex]);

  // contador animado
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted) {
          setTimeout(() => setCounted(true), 800);
        }
      },
      { threshold: 0.8 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [counted]);

  const cx = (base) => base + " animate" + (ready ? " ready" : "");

  return (
    <section id="hero" className="hero">
      <Particles />

      <div className="hero-inner">

        <div className="hero-left">
          <div className={cx("hero-badge")} style={{ animationDelay: "0.1s" }}>
            <span className="badge-ping" />
            AVAILABLE FOR HIRE
          </div>

          <h1 className={cx("hero-title")} style={{ animationDelay: "0.3s" }}>
            <span className="title-line1">Olá, eu sou</span>
            <br />
            <GlitchText text="Claudio Souza" className="title-name" />
          </h1>

          <p className={cx("hero-role")} style={{ animationDelay: "0.5s" }}>
            <span className="role-cursor">{">"}</span>{" "}
            <span className="role-typed">{typed}</span>
            <span className="cursor-blink">_</span>
          </p>

          <p className={cx("hero-desc")} style={{ animationDelay: "0.7s" }}>
            Técnico em Informática com ADS em andamento no{" "}
            <span className="hl">SENAC</span>. Experiência em{" "}
            <span className="hl">APIs REST</span>,{" "}
            <span className="hl">JWT</span>, banco de dados e interfaces
            responsivas. Disponível para estágio.
          </p>

          <div className={cx("hero-btns")} style={{ animationDelay: "0.9s" }}>
            <a href="#projects" className="btn-neon">VER PROJETOS</a>
            <a
              href="/JoséClaudio_curriculo.pdf"
              download="JoséClaudio_curriculo.pdf"
              className="btn-cv"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              BAIXAR CV
            </a>
          </div>

          <div
            className={cx("hero-stats")}
            style={{ animationDelay: "1.1s" }}
            ref={statsRef}
          >
            {STATS.map(({ n, suffix, label }) => (
              <div key={label} className="stat">
                <span className="stat-n">
                  {counted ? <Counter to={n} suffix={suffix} /> : "0" + suffix}
                </span>
                <span className="stat-l">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-right">
          <div className="photo-hexagon">
            <div className="hex-border" />
            <div className="hex-inner">
              <img
                src="/claudin.png"
                alt="Cláudio Souza"
                onLoad={(e) => {
                  e.target.style.display = "block";
                  e.target.nextSibling.style.display = "none";
                }}
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <div className="hex-fallback">CS</div>
            </div>
            <div className="hex-ring hex-ring--1" />
            <div className="hex-ring hex-ring--2" />
            <div className="scan-beam" />
          </div>

          <div className="floating-tag tag-tl">
            <span className="tag-dot" />
            FULL STACK DEV
          </div>
          <div className="floating-tag tag-br">SÃO PAULO, BR</div>
        </div>

      </div>

      <div className="hero-scroll-hint">
        <span>SCROLL</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}