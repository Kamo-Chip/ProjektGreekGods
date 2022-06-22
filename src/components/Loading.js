import { useEffect } from "react";
import { useNavigate } from "react-router";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../firebase";
import GodIcon from "../images/god.png";

const Loading = () => {

    const navigate = useNavigate();

    useEffect(() => {
        try{
            persistUser()
        }catch(error){
        }
      }, []);


    const persistUser = async () => {
        const loggedInUser = localStorage.getItem("user");
        const password = localStorage.getItem("password");

        const foundUser = JSON.parse(loggedInUser);

        if(foundUser != null) {
          await signInWithEmailAndPassword(auth, foundUser.email, password)
            .catch(err => {
                console.log(err);
            });
            navigate("/home");
        }else{
            navigate("/register");
        }
    }

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "var(--color-2)",
            height: "100vh",
            width: "100vw",
            position: "absolute",
            zIndex: "15",
        }}>
            <img src={GodIcon} alt="Projekt Greek Gods Logo"/>
            <p style={{color: "#fff"}}>Loading...</p>
        </div>
    )
}

export default Loading;