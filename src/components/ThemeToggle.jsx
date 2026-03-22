import { MdLightMode, MdDarkMode } from "react-icons/md";
import "./ThemeToggle.css";

export default function ThemeToggle({ dark, onToggle }) {
  return (
    <button className="theme-toggle" onClick={onToggle} title="Alternar tema">
      {dark ? <MdLightMode size={18} /> : <MdDarkMode size={18} />}
    </button>
  );
}