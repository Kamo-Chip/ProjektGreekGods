import { Link } from "react-router-dom";

const Nav = () => {
    return (
        <nav className="navigation">
            <Link to="/home"><div>Routines</div></Link>
            <Link to="/progress"><div>Progress</div></Link>
            <Link to="/settings"><div>Settings</div></Link>
        </nav>
    )
}

export default Nav;