import { createContext, useContext } from "react";

export interface ThemeState {
  state: ThemeStateProps,
  setState: any,
  handlers: any,
}

export interface ThemeStateProps {
  bgColor: string,
  color: string,
  theme: string,
  paragraphColor: string,
}

const ThemeContext = createContext({} as ThemeState);

// the hook to grab the theme state or setter for state
export const useThemeContext = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useThemeContext must be used within a context");
  return ctx;
};

export const ThemeProvider = ({ state, setState, handlers, children }: any) => {
  return (
    <ThemeContext.Provider value={{ state, setState, handlers }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
