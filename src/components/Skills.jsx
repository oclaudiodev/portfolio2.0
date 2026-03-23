import GlitchText from "./GlitchText";
import skills from "../data/skills";
import "./Skills.css";

export default function Skills() {
  return (
    <section id="skills" className="section section--dark">
      <div className="section-inner">
        <div className="section-label">{"// 01"}</div>
        <h2 className="section-title">
          <GlitchText text="STACK" />
        </h2>
        <p className="section-sub">Tecnologias que utilizo no dia a dia</p>

        <div className="skills-grid">
          {skills.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.name}
                className="skill-card"
                style={{ "--accent": s.color }}
              >
                <Icon className="skill-icon" style={{ color: s.color }} />
                <span className="skill-name">{s.name}</span>
                <div className="skill-glow" />
                <div className="skill-tooltip">{s.name}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}