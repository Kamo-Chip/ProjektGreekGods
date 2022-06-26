import { useContext, useEffect, useState } from "react";
import { ThemeContext, themes } from "../contexts/theme-context";
import { UnitsContext, units } from "../contexts/units-context";
import LogoutIcon from "../images/logout.svg";
import { updateDoc, doc } from "@firebase/firestore";
import { auth, db } from "../firebase";

const Settings = ({setUnits, setTheme, theme}) => {
    
    const handleUnitsChange = (e) => {
        setUnits(units[e.target.id]);

        updateDoc(doc(db, auth.currentUser.uid, "settings"), {
            units: e.target.id,
        })
    }

    const handleThemeChange = async (e) => {
        setTheme(themes[e.target.id]);

        updateDoc(doc(db, auth.currentUser.uid, "settings"), {
            theme: e.target.id,
        })

        let bgColor = themes[e.target.id].bgColor;
        let color1 = themes[e.target.id].color1;
        let color6 = themes[e.target.id].color6;

        const root = document.querySelector(":root");

        root.style.setProperty("--bg-color", bgColor);
        root.style.setProperty("--color-1", color1);
        root.style.setProperty("--color-6", color6);
        //console.log(theme);
    }
    
    const currentUnits = useContext(UnitsContext);

    useEffect(() => {
        console.log(theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={theme}>
            <div>
                <h1 className="page-header">Settings</h1>
                <div>
                    <div className="settings-item settings-item-no-bottom">
                        <p>Units</p>
                        <div className="settings-item-details">
                            <div className="settings-item-field">
                                <input id="metric" type="radio" name="units" onClick={handleUnitsChange} defaultChecked={currentUnits.distance === "m"}/>
                                <label>Metric</label>
                            </div>
                            <div className="settings-item-field">
                                <input id="imperial" type="radio" name="units" onClick={handleUnitsChange} defaultChecked={currentUnits.distance === "ft"}/>
                                <label>Imperial</label>
                            </div>
                        </div>
                    </div>
                    <div className="settings-item">
                        <p>Theme</p>
                        <div className="settings-item-details">
                            <div className="settings-item-field">
                                <input id="dark" type="radio" name="theme" onClick={handleThemeChange} defaultChecked={theme.color1 === "#fff"}/>
                                <label>Dark</label>
                            </div>
                            <div className="settings-item-field" >
                                <input id="light" type="radio" name="theme" onClick={handleThemeChange} defaultChecked={theme.color1 === "#000"}/>
                                <label>Light</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ThemeContext.Provider>
    );
}

export default Settings;