import { useRef, useState } from "react";
import GlitchText from "./GlitchText";
import ProjectCard from "./ProjectCard";
import projects from "../data/projects";
import "./Projects.css";

export default function Projects() {
  const trackRef  = useRef(null);
  const startX    = useRef(0);
  const scrollLeft = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  const onTouchStart = (e) => {
    startX.current    = e.touches[0].clientX;
    scrollLeft.current = trackRef.current.scrollLeft;
  };

  const onTouchMove = (e) => {
    const dx = e.touches[0].clientX - startX.current;
    trackRef.current.scrollLeft = scrollLeft.current - dx;
  };

  const onMouseDown = (e) => {
    setIsDragging(true);
    startX.current     = e.clientX;
    scrollLeft.current  = trackRef.current.scrollLeft;
    trackRef.current.style.cursor = "grabbing";
  };

  const onMouseMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - startX.current;
    trackRef.current.scrollLeft = scrollLeft.current - dx;
  };

  const onMouseUp = () => {
    setIsDragging(false);
    trackRef.current.style.cursor = "grab";
  };

  return (
    <section id="projects" className="section">
      <div className="section-inner">
        <div className="section-label">{"// 02"}</div>
        <h2 className="section-title">
          <GlitchText text="PROJETOS" />
        </h2>
        <p className="section-sub">Hover nos cards para preview em vídeo</p>

        {/* DESKTOP */}
        <div className="projects-grid">
          {projects.map((p) => (
            <ProjectCard key={p.id} {...p} />
          ))}
        </div>

        {/* MOBILE CAROUSEL */}
        <div
          ref={trackRef}
          className="projects-carousel"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          {projects.map((p) => (
            <div key={p.id} className="carousel-item">
              <ProjectCard {...p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}