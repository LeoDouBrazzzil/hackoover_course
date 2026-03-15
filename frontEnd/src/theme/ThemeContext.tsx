import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type ColorTheme = "light" | "dark";

interface ThemeContextValue {
    colorTheme: ColorTheme;
    setColorTheme: (t: ColorTheme) => void;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
    colorTheme: "light",
    setColorTheme: () => {},
    toggleTheme: () => {},
});

const STORAGE_KEY = "hackoover_theme";

export function ColorThemeProvider({ children }: { children: ReactNode }) {
    const [colorTheme, setColorThemeState] = useState<ColorTheme>(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === "dark" || stored === "light") return stored;
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    });

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", colorTheme);
        localStorage.setItem(STORAGE_KEY, colorTheme);
    }, [colorTheme]);

    const setColorTheme = (t: ColorTheme) => setColorThemeState(t);
    const toggleTheme   = () => setColorThemeState(p => p === "light" ? "dark" : "light");

    return (
        <ThemeContext.Provider value={{ colorTheme, setColorTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useColorTheme = () => useContext(ThemeContext);
