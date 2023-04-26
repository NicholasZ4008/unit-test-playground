import { Button } from "antd";
import { useThemeContext } from "contexts/ThemeContext";
import React from "react";
import { TOGGLE_THEME } from "utils/constants";

export default function ThemeButton() {
  const { setState: setThemeState } = useThemeContext();

  return (
    <Button
      type="primary"
      onClick={() => setThemeState({ type: TOGGLE_THEME })}
      className="bg-blue-500 dark:bg-sky-700 dark:border-sky-700">
        
      Toggle Dark Mode
    </Button>
  );
}
