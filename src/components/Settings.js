import { useContext } from "react";
import { units, UnitsContext } from "./units-context";

const Settings = ({setUnits}) => {
    
    const handleUnitsChange = (e) => {
        setUnits(units[e.target.id]);
    }

    return (
        <div>
            <h1 className="page-header">Settings</h1>
            <div>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    margin: "0 1em",
                    borderTop: "solid var(--color-6) 3px",
                    borderBottom: "solid var(--color-6) 3px"
                }}>
                    <p>Units</p>
                    <div style={{
                        width: "45%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        }}>
                        <div>
                            <input id="metric" type="radio" name="units" onClick={handleUnitsChange}/>
                            <label>Metric</label>
                        </div>
                        <div>
                            <input id="imperial" type="radio" name="units" onClick={handleUnitsChange}/>
                            <label>Imperial</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;