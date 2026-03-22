import GlitchText from "./GlitchText";
import ProjectCard from "./ProjectCard";
import projects from "../data/projects";
import "./Projects.css";

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="section-inner">
        <div className="section-label">{"// 02"}</div>
        <h2 className="section-title">
          <GlitchText text="PROJETOS" />
        </h2>
        <p className="section-sub">Hover nos cards para preview em vídeo</p>

        <div className="projects-grid">
          {projects.map((p) => (
            <ProjectCard key={p.id} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
}