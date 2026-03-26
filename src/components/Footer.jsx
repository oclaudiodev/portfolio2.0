import GlitchText from "./GlitchText";
import VisitCounter from "./VisitCounter";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="cyber-footer">
      <div className="footer-inner">
        <div className="footer-logo">
          <span className="logo-bracket">[</span>
          <GlitchText text="oclaudiodev" />
          <span className="logo-bracket">]</span>
        </div>

        <VisitCounter />

        <p className="footer-copy">
          © {new Date().getFullYear()} José Claudio
        </p>

        <p className="footer-made">Made with React ⚛</p>
      </div>
    </footer>
  );
}