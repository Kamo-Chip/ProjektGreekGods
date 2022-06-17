import { Outlet } from "react-router-dom";
import { auth } from "../firebase";
import Login from "./Login";

const PrivateRoute = () => {
    return (
        auth.currentUser ? <Outlet/> : <Login/>
    )
}

export default PrivateRoute;