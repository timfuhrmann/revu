import React, { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../../css/GlobalStyle";
import { dark, light } from "../../css/theme";

type Theme = "light" | "dark" | null;

export interface CustomThemeContextData {
    theme: Theme;
    toggleTheme: () => void;
}

const CustomThemeContext = createContext<CustomThemeContextData>({} as CustomThemeContextData);

const STORAGE_THEME = "color-theme";

export const CustomThemeProvider: React.FC = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(null);
    const activeTheme = theme === "light" ? light : dark;

    useEffect(() => {
        const value = localStorage.getItem(STORAGE_THEME);

        if ("light" === value || "dark" === value) {
            setTheme(value);
        } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
            setTheme("dark");
        }
    }, []);

    useEffect(() => {
        if (!theme) {
            return;
        }

        localStorage.setItem(STORAGE_THEME, theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevState => {
            if ("light" === prevState) {
                return "dark";
            } else {
                return "light";
            }
        });
    };

    return (
        <CustomThemeContext.Provider value={{ theme, toggleTheme }}>
            <ThemeProvider theme={activeTheme}>
                <GlobalStyle />
                {children}
            </ThemeProvider>
        </CustomThemeContext.Provider>
    );
};

export const useCustomTheme = () => useContext(CustomThemeContext);
