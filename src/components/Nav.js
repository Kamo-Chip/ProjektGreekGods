import { Link } from "react-router-dom";
import RoutineIcon from "../images/routines.svg";
import ProgressIcon from "../images/progress.svg";
import SettingsIcon from "../images/settings.svg";

const Nav = () => {
    return (
        <nav className="navigation">
            <Link to="/home">
                <div>
                    <img src={RoutineIcon} alt="Routines"/>
                    <p>Routine</p>
                </div>
            </Link>
            <Link to="/progress">
                <div>
                    <img src={ProgressIcon} alt="Progress"/>
                    <p>Progress</p>
                </div>
            </Link>
            <Link to="/settings">
                <div>
                    <img src={SettingsIcon} alt="Settings"/>
                    <p>Settings</p>
                </div>
            </Link>
        </nav>
    )
}

export default Nav;