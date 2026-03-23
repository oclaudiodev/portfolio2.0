import { FaJava, FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaSass, FaGitAlt, FaGithub } from "react-icons/fa";
import { FaPython } from "react-icons/fa";
import { SiJavascript, SiMysql, SiPostman, SiFigma, SiSupabase, SiTypescript } from "react-icons/si";

const skills = [
  { name: "Java",       icon: FaJava,       color: "#f89820" },
  { name: "Python",     icon: FaPython,     color: "#3776ab" },
  { name: "HTML5",      icon: FaHtml5,      color: "#e34c26" },
  { name: "CSS3",       icon: FaCss3Alt,    color: "#264de4" },
  { name: "JavaScript", icon: SiJavascript, color: "#f7df1e" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178c6" },
  { name: "React",      icon: FaReact,      color: "#61dafb" },
  { name: "Node.js",    icon: FaNodeJs,     color: "#68a063" },
  { name: "MySQL",      icon: SiMysql,      color: "#00758f" },
  { name: "SCSS",       icon: FaSass,       color: "#c6538c" },
  { name: "Git",        icon: FaGitAlt,     color: "#f05032" },
  { name: "GitHub",     icon: FaGithub,     color: "#a371f7" },
  { name: "Postman",    icon: SiPostman,    color: "#ff6c37" },
  { name: "Figma",      icon: SiFigma,      color: "#f24e1e" },
  { name: "Supabase",   icon: SiSupabase,   color: "#3ecf8e" },
];

export default skills;