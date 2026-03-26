import { useEffect, useState } from "react";
import "./Loader.css";

const LINES = [
  "Inicializando sistema...",
  "Carregando módulos...",
  "Compilando portfólio...",
  "Conectando ao servidor...",
  "Pronto.",
];

export default function Loader({ onDone }) {
  const [lineIndex, setLineIndex] = useState(0);
  const [visible, setVisible]     = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setLineIndex((i) => {
        if (i >= LINES.length - 1) {
          clearInterval(interval);
          setTimeout(() => {
            setVisible(false);
            setTimeout(onDone, 600);
          }, 400);
          return i;
        }
        return i + 1;
      });
    }, 400);

    return () => clearInterval(interval);
  }, [onDone]);

  if (!visible) return null;

  return (
    <div className={`loader ${!visible ? "loader--exit" : ""}`}>
      <div className="loader-inner">
        <div className="loader-logo">
          <span className="loader-bracket">[</span>
          <span className="loader-cs">oclaudiodev</span>
          <span className="loader-bracket">]</span>
        </div>

        <div className="loader-bar-wrap">
          <div
            className="loader-bar"
            style={{ width: ((lineIndex + 1) / LINES.length) * 100 + "%" }}
          />
        </div>

        <div className="loader-lines">
          {LINES.slice(0, lineIndex + 1).map((l, i) => (
            <p key={i} className={"loader-line" + (i === lineIndex ? " loader-line--active" : "")}>
              <span className="loader-prefix">{">"}</span> {l}
            </p>
          ))}
        </div>

        <p className="loader-pct">
          {Math.round(((lineIndex + 1) / LINES.length) * 100)}%
        </p>
      </div>
    </div>
  );
}