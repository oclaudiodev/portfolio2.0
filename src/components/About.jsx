import GlitchText from "./GlitchText";
import { FaGraduationCap, FaBriefcase, FaDatabase } from "react-icons/fa";
import { SiPython } from "react-icons/si";
import { MdSmartToy } from "react-icons/md";
import "./About.css";

const TIMELINE = [
  {
    year: "2025",
    title: "Técnico em Informática",
    place: "Instituto Social Nossa Senhora de Fátima",
    desc: "Desenvolvimento web Full Stack, suporte técnico, redes e infraestrutura. Entrega de 4 projetos reais.",
  },
  {
    year: "2026",
    title: "ADS — Cursando",
    place: "SENAC São Paulo",
    desc: "Análise e Desenvolvimento de Sistemas, aprofundando arquitetura de software e boas práticas.",
  },
  {
    year: "2026",
    title: "Database Design & Foundations — Cursando EAD",
    place: "Oracle Academy",
    desc: "Modelagem de dados, normalização, SQL avançado e design de banco de dados relacional.",
  },
  {
    year: "2026",
    title: "Trilha Python — Cursando EAD",
    place: "SENAC São Paulo",
    desc: "Dominando algoritmos com Python, estruturas de dados e lógica de programação.",
  },
  {
    year: "2026",
    title: "Inteligência Artificial — Cursando EAD",
    place: "SymplaPlay",
    desc: "Automação com Zapier, análise de dados com Power BI e criação de aplicativos com Glide.",
  },
];

const BADGES = [
  { icon: FaGraduationCap, color: "#61dafb", title: "ADS",                    sub: "SENAC São Paulo" },
  { icon: FaDatabase,      color: "#f80000", title: "Database Design",         sub: "Oracle Academy"  },
  { icon: SiPython,        color: "#3776ab", title: "Trilha Python",           sub: "SENAC São Paulo" },
  { icon: MdSmartToy,      color: "#00ffe5", title: "Inteligência Artificial", sub: "SymplaPlay"      },
  { icon: FaBriefcase,     color: "#ff2d78", title: "Disponível para estágio", sub: "São Paulo, SP"   },
];

export default function About() {
  return (
    <section id="about" className="section section--dark">
      <div className="section-inner">
        <div className="section-label">{"// 00"}</div>
        <h2 className="section-title">
          <GlitchText text="SOBRE MIM" />
        </h2>
        <p className="section-sub">Trajetória e motivação</p>

        <div className="about-grid">
          <div className="about-text">
            <p>
              Sou <span className="hl">Cláudio Souza</span>, desenvolvedor
              Full Stack de São Paulo. Comecei minha jornada na tecnologia
              em 2025 pelo Técnico em Informática e desde então não parei
              — já entreguei <span className="hl">4 projetos reais</span>,
              do front-end ao back-end.
            </p>
            <p>
              Tenho experiência com <span className="hl">APIs REST</span>,
              autenticação <span className="hl">JWT</span>, banco de dados
              relacional e interfaces responsivas. Atualmente curso{" "}
              <span className="hl">ADS no SENAC</span> e busco meu primeiro
              estágio para crescer junto com um time.
            </p>
            <p>
              Acredito que bom código é aquele que resolve problemas reais
              — e é isso que me motiva a aprender todos os dias.
            </p>

            <div className="about-badges">
              {BADGES.map((b) => {
                const Icon = b.icon;
                return (
                  <div key={b.title} className="about-badge">
                    <Icon className="badge-icon" style={{ color: b.color }} />
                    <div className="badge-info">
                      <span className="badge-title">{b.title}</span>
                      <span className="badge-sub">{b.sub}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="about-timeline">
            {TIMELINE.map((t, i) => (
              <div key={i} className="timeline-item">
                <div className="timeline-year">{t.year}</div>
                <div className="timeline-dot" />
                <div className="timeline-content">
                  <h4 className="timeline-title">{t.title}</h4>
                  <p className="timeline-place">{t.place}</p>
                  <p className="timeline-desc">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}