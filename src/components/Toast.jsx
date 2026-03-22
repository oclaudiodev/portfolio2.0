import { useEffect } from "react";
import "./Toast.css";

export default function Toast({ message, type = "success", visible, onClose }) {
  useEffect(() => {
    if (visible) {
      const t = setTimeout(onClose, 4000);
      return () => clearTimeout(t);
    }
  }, [visible, onClose]);

  return (
    <div className={"toast" + (visible ? " toast--visible" : "") + ` toast--${type}`}>
      <div className="toast-bar" />
      <div className="toast-icon">
        {type === "success" && (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
        {type === "error" && (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        )}
      </div>
      <div className="toast-content">
        <p className="toast-title">{message}</p>
        <p className="toast-sub">
          {type === "success" ? "Gmail abrirá em instantes" : "Tente novamente"}
        </p>
      </div>
      <button className="toast-close" onClick={onClose}>✕</button>
    </div>
  );
}