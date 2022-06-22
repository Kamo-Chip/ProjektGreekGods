import React from "react";

export const themes = {
    light: {
        bgColor: "#F5F5F5F5",
        color1: "#000",
        color2: "#BD9B16",
        color4: "#CF6679",
        color5: "#FCC200",
        color6: "#397dd6",
    },
    dark: {
        bgColor: "#101010",
        color1: "#fff",
        color6: "#002F63"
    }
}

export const ThemeContext = React.createContext(themes.light);