import { useState, createContext, useEffect, useContext } from "react";

import * as SecureStore from "expo-secure-store";

const context = createContext();

export const ThemeContextProvider = (props) => {
  const [theme, setTheme] = useState(SecureStore.getItem("theme" || "light-theme"));

  const toggleTheme = () => {
    if (theme === "dark-theme") {
      setTheme("light-theme");
    } else {
      setTheme("dark-theme");
    }
  };

  useEffect(() => {
    SecureStore.setItem("theme", theme);
  }, [theme]);

  return <context.Provider value={{ toggleTheme, theme }}>{props.children}</context.Provider>;
};

const useToggleTheme = () => {
  return useContext(context);
};

export default useToggleTheme;
