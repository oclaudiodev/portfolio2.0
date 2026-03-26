import { useState } from "react";
import { createPortal } from "react-dom";
import GlitchText from "./GlitchText";
import { FaLinkedin, FaGithub, FaWhatsapp } from "react-icons/fa";
import Toast from "./Toast";
import "./Contact.css";


const SOCIALS = [
  { label: "LinkedIn", icon: FaLinkedin, href: "https://www.linkedin.com/in/josé-claudio/" },
  { label: "GitHub",   icon: FaGithub,   href: "https://github.com/oclaudiodev" },
  { label: "WhatsApp", icon: FaWhatsapp, href: "https://wa.me/5511951008673?text=Olá%2C+vi+seu+portfólio+e+gostaria+de+conversar!" },
];

const INFO = [
  { label: "LOCALIZAÇÃO", value: "São Paulo, Brasil" },
  { label: "EMAIL",       value: "7claudiosouza@gmail.com" },
];

export default function Contact() {
  const [form, setForm]     = useState({ name: "", email: "", msg: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | sent
  const [toast, setToast] = useState({ visible: false, type: "success" });

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
  e.preventDefault();
  setStatus("loading");

  setTimeout(() => {
    const subject = encodeURIComponent(`Contato via Portfólio — ${form.name}`);
    const body    = encodeURIComponent(
      `Olá Claudio,\n\nMeu nome é ${form.name} (${form.email}).\n\n${form.msg}`
    );
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=7claudiosouza@gmail.com&su=${subject}&body=${body}`,
      "_blank"
    );
    setStatus("sent");
    setToast({ visible: true, type: "success" });
    setForm({ name: "", email: "", msg: "" });
    setTimeout(() => setStatus("idle"), 4000);
  }, 1500);
};

  return (
    <section id="contact" className="section section--dark">
      <div className="section-inner">
        <div className="section-label">{"// 03"}</div>
        <h2 className="section-title">
          <GlitchText text="CONTATO" />
        </h2>
        <p className="section-sub">Vamos construir algo juntos?</p>

        <div className="contact-grid">

          {/* FORM */}
          <div className="contact-form-wrap">
            <div className="form-terminal-bar">
              <span className="t-dot t-dot--r" />
              <span className="t-dot t-dot--y" />
              <span className="t-dot t-dot--g" />
              <span className="t-title">send_message.exe</span>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              {[
                { name: "name",  type: "text",  label: "NOME",     placeholder: "Seu nome"          },
                { name: "email", type: "email", label: "EMAIL",    placeholder: "seu@email.com"     },
              ].map((f) => (
                <div key={f.name} className="field">
                  <label className="field-label">{">"} {f.label}</label>
                  <input
                    name={f.name}
                    type={f.type}
                    value={form[f.name]}
                    onChange={handleChange}
                    required
                    placeholder={f.placeholder}
                    className="field-input"
                  />
                </div>
              ))}

              <div className="field">
                <label className="field-label">{">"} MENSAGEM</label>
                <textarea
                  name="msg"
                  value={form.msg}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Olá Claudio, gostaria de..."
                  className="field-input field-textarea"
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading" || status === "sent"}
                className={"btn-submit" + (status === "sent" ? " btn-submit--sent" : "")}
              >
                {status === "loading" && <span className="btn-spinner" />}
                {status === "idle"    && "ENVIAR MENSAGEM"}
                {status === "loading" && "ENVIANDO..."}
                {status === "sent"    && "✓ MENSAGEM ENVIADA"}
              </button>
            </form>
          </div>

          {/* INFO */}
          <div className="contact-info">
            {INFO.map((i) => (
              <div key={i.label} className="info-block">
                <p className="info-label">{i.label}</p>
                <p className="info-value">{i.value}</p>
              </div>
            ))}

            <div className="info-block">
              <p className="info-label">STATUS</p>
              <p className="info-value info-value--available">
                <span className="ping" />
                Disponível para oportunidades
              </p>
            </div>

            <div className="socials">
              {SOCIALS.map((s) => {
                const Icon = s.icon;
                return (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="social-card">
                    <Icon className="social-icon" />
                    <span className="social-label">{s.label}</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </a>
                );
              })}
            </div>
          </div>

        </div>
      </div>
      {createPortal(
  <Toast
    message="MENSAGEM ENVIADA!"
    type={toast.type}
    visible={toast.visible}
    onClose={() => setToast((t) => ({ ...t, visible: false }))}
  />,
  document.body
)}
    </section>
  );
}