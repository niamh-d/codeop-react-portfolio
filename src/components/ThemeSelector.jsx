import { useEffect } from "react";

import { useProjects } from "../contexts/ProjectsContext";

import styles from "./ThemeSelector.module.css";

export default function ThemeSelector() {
  const { dispatch, isDark } = useProjects();

  const handleDarkMode = () => dispatch({ type: "toggleDark" });

  useEffect(
    function () {
      const selectedTheme = isDark ? "forest" : "nord";

      document.documentElement.setAttribute("data-theme", selectedTheme);
    },
    [isDark]
  );

  return (
    <button onClick={handleDarkMode} className={styles["theme-selector"]}>
      {isDark ? "Make it bright 💡" : "I embrace the dark 🖤"}
    </button>
  );
}
