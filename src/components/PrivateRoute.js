import { Outlet, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import Login from "./Login";

const PrivateRoute = () => {
    const navigate = useNavigate();

    return (
        auth.currentUser ? <Outlet/> : <Login/>
    )
}

export default PrivateRoute;