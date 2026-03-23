import { useState, useRef } from "react";
import { createPortal } from "react-dom";
import "./ProjectCard.css";

export default function ProjectCard({ id, title, tag, desc, video, poster, github, color }) {
  const cardRef = useRef(null);
  const modalRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [imgLoaded,  setImgLoaded]  = useState(false);

  const handleEnter = () => { setHovered(true); cardRef.current?.play(); };
  const handleLeave = () => {
    setHovered(false);
    if (cardRef.current) { cardRef.current.pause(); cardRef.current.currentTime = 0; }
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setModalOpen(false);
    if (modalRef.current) { modalRef.current.pause(); modalRef.current.currentTime = 0; }
  };

  return (
    <>
      <div
        className={"project-card" + (hovered ? " project-card--hovered" : "")}
        style={{ "--c": color }}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        <div className="pc-top-bar">
          <span className="pc-dot" /><span className="pc-dot" /><span className="pc-dot" />
          <span className="pc-id">{"PROJECT_" + String(id).padStart(2, "0")}</span>
        </div>

        <div className="pc-media" onClick={openModal}>
          {/* SKELETON */}
          {!imgLoaded && <div className="pc-skeleton" />}

          <video
            ref={cardRef}
            src={video}
            poster={poster}
            muted
            loop
            preload="none"
            playsInline
            onLoadedData={() => setImgLoaded(true)}
            style={{ opacity: imgLoaded ? 1 : 0, transition: "opacity 0.3s" }}
          />

          <div className="pc-media-overlay">
            <span className="pc-play-hint">HOVER TO PREVIEW</span>
          </div>
          <div className="pc-expand-hint">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/>
              <line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
            </svg>
            EXPANDIR
          </div>
        </div>

        <div className="pc-body">
          <div className="pc-tag">{tag}</div>
          <h3 className="pc-title">{title}</h3>
          <p className="pc-desc">{desc}</p>
          <div className="pc-footer">
            <a href={github} target="_blank" rel="noopener noreferrer" className="pc-link">
              VER CÓDIGO
            </a>
            <div className="pc-corner" />
          </div>
        </div>
      </div>

      {modalOpen && createPortal(
        <div className="video-modal-backdrop" onClick={closeModal}>
          <div className="video-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-top-bar">
              <span className="pc-dot" /><span className="pc-dot" /><span className="pc-dot" />
              <span className="modal-title">{title}</span>
              <button className="modal-close" onClick={closeModal}>✕</button>
            </div>
            <video
              ref={modalRef}
              src={video}
              poster={poster}
              controls
              autoPlay
              playsInline
              className="modal-video"
            />
          </div>
        </div>,
        document.body
      )}
    </>
  );
}