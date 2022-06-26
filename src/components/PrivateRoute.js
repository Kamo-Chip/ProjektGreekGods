import { Outlet, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import Loading from "../pages/Loading";

const PrivateRoute = () => {
    const navigate = useNavigate();

    return (
        auth.currentUser ? <Outlet/> : <Loading/>
    )
}

export default PrivateRoute;