import React from "react";

export const themes = {
    light: {
        bgColor: "#F5F5F5F5",
        color1: "#000",
        color2: "#BD9B16",
        color4: "#CF6679",
        color5: "#FCC200",
        color6: "#CFB197",
    },
    dark: {
        bgColor: "#121212",
        color1: "#fff",
        color6: "#8a7867"
    }
}

export const ThemeContext = React.createContext(themes.light);