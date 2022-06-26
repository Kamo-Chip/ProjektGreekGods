import { signInWithEmailAndPassword } from "firebase/auth";
import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import { GrView, GrFormViewHide } from "react-icons/gr";

const Login = () => {   
    const [ user, setUser ] = useState({
        email: "",
        password: "",
    });

    const [ passHidden, setPassHidden ] = useState(true);

    const navigate = useNavigate();

    const [ details, setDetails ] = useState({
        loading: false,
    });

    const [error, setError ] = useState(null)
    
    useEffect(() => {

    }, [details]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setDetails({...details, loading: true});
        
        try{
            await signInWithEmailAndPassword(auth, user.email, user.password);
            
            localStorage.setItem("user", JSON.stringify(auth.currentUser));
            localStorage.setItem("password", user.password);

            navigate("/home");
        }catch(err){
            setDetails({...details, error: err.message});
            setError(err.message);
            setDetails({...details, loading: false});
            localStorage.setItem("user", null);
            localStorage.setItem("password", null);
        }
    }

    const handleChange = (e) => {
        e.preventDefault();

        setUser({...user, [e.target.name]: e.target.value});
    }

    let count = 0;
    const togglePassword = () => {
        const passwordField = document.querySelector("#password");
        if(count % 2 === 0){
            passwordField.type = "text";
            setPassHidden(false);
        }else{
            passwordField.type = "password";
            setPassHidden(true);
        }
        count++;
    }

    return (
        <form className="frm-login" onSubmit={handleSubmit}>
            <h1 className="page-header">Sign in</h1>
            <section>
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" onChange={handleChange} value={user.email} required={true}/>
            </section>
            <section>
            <label htmlFor="password">Password:</label>
                <div style={{display: "flex"}}>
                    <input id="password" type="password" name="password" onChange={handleChange} value={user.password} required={true}/>
                    {passHidden ? 
                        <GrFormViewHide onClick={togglePassword} size="3rem" style={{
                            // marginLeft: "1em",
                            // marginTop: ".5em"
                        }}/>
                        :
                        <GrView onClick={togglePassword} size="2.5rem" style={{
                            // marginLeft: "1em",
                            // marginTop: ".5em"
                        }}/>
                    }
                </div>
            </section>
            <button disabled={details.loading}>{details.loading ? "Loading..." : "Sign in"}</button>
            <Link to="/register"><p style={{textDecoration: "underline", textDecorationColor: "var(--color-6)"}}>Don't have an account?</p></Link>
            { error ? <p className="error">{error}</p> : null}
        </form>
    )
}

export default Login;
