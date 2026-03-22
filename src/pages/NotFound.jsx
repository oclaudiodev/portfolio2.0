import { useEffect, useState } from "react";
import GlitchText from "../components/GlitchText";
import "./NotFound.css";

export default function NotFound() {
  const [typed, setTyped] = useState("");
  const full = "PÁGINA NÃO ENCONTRADA";

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      setTyped(full.slice(0, i));
      i++;
      if (i > full.length) clearInterval(t);
    }, 60);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="not-found">
      <div className="nf-bg">
        <div className="grid-lines" />
        <div className="scanlines" />
        <div className="vignette" />
      </div>

      <div className="nf-inner">
        <div className="nf-code">
          <GlitchText text="404" className="nf-404" />
        </div>

        <p className="nf-role">
          <span className="nf-cursor">{">"}</span>{" "}
          <span className="nf-typed">{typed}</span>
          <span className="nf-blink">_</span>
        </p>

        <p className="nf-desc">
          O arquivo que você procura não existe ou foi movido.<br />
          Verifique o caminho e tente novamente.
        </p>

        <div className="nf-terminal">
          <div className="nf-terminal-bar">
            <span className="pc-dot" style={{ background: "#ff2d78" }} />
            <span className="pc-dot" style={{ background: "#ffe600" }} />
            <span className="pc-dot" style={{ background: "#00ffe5" }} />
            <span className="nf-terminal-title">error.log</span>
          </div>
          <div className="nf-terminal-body">
            <p><span className="nf-err">ERROR</span> 404: Route not found</p>
            <p><span className="nf-warn">WARN</span> Redirecting to home...</p>
            <p><span className="nf-ok">OK</span> Press the button below</p>
          </div>
        </div>

        <a href="/" className="btn-neon nf-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          VOLTAR PARA HOME
        </a>
      </div>
    </div>
  );
}