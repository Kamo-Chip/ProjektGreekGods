import React from "react";

export const units = {
    metric: {
        distance: "m",
        weight: "kg",
    },
    imperial: {
        distance: "ft",
        weight: "lbs",
    }
}

export const UnitsContext = React.createContext(units.metric);