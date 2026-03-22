import { useState } from "react";
import GlitchText from "./GlitchText";
import "./Nav.css";

const NAV_LINKS = ["hero", "about", "skills", "projects", "contact"];

export default function Nav({ active, extra }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className="cyber-nav">
        <div className="nav-logo">
          <span className="logo-bracket">[</span>
          <GlitchText text="C.SOUZA" />
          <span className="logo-bracket">]</span>
        </div>

        <ul className="nav-links">
          {NAV_LINKS.map((l) => (
            <li key={l}>
              <a href={"#" + l} className={"nav-link" + (active === l ? " nav-link--active" : "")}>
                <span className="nav-link-prefix">{"// "}</span>
                {l.toUpperCase()}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-right">
          {extra}
          <a href="https://github.com/oclaudiodev" target="_blank" rel="noopener noreferrer" className="nav-gh">
            GitHub
          </a>
          <button className={"hamburger" + (menuOpen ? " hamburger--open" : "")} onClick={() => setMenuOpen((o) => !o)} aria-label="Menu">
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div className={"mobile-menu" + (menuOpen ? " mobile-menu--open" : "")}>
        <ul className="mobile-links">
          {NAV_LINKS.map((l) => (
            <li key={l}>
              <a href={"#" + l} className={"mobile-link" + (active === l ? " mobile-link--active" : "")} onClick={closeMenu}>
                <span className="mobile-link-prefix">{"// "}</span>
                {l.toUpperCase()}
              </a>
            </li>
          ))}
        </ul>
        <div className="mobile-menu-footer">
          <a href="https://github.com/oclaudiodev" target="_blank" rel="noopener noreferrer" className="nav-gh">
            GitHub
          </a>
        </div>
      </div>

      {menuOpen && <div className="mobile-backdrop" onClick={closeMenu} />}
    </>
  );
}