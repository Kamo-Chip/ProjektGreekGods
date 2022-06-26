import { auth, db } from "../firebase";
import { setDoc, doc, collection } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GrView, GrFormViewHide } from "react-icons/gr";

const Register = () => {
    const [ user, setUser ] = useState({
        email: "",
        password: "",
        id: "",
    });

    const [ error, setError ] = useState({
        msg: null,
    });

    const [ loading, setLoading ] = useState(false);

    const [ passHidden, setPassHidden ] = useState(true);

    useEffect(() => {

    }, [loading])

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError({...error, msg: null});
        setLoading(true);

        try{
            const result = await createUserWithEmailAndPassword(auth, user.email, user.password)

            await setDoc(doc(db, result.user.uid, "routines"), {
                workouts: [],
                workoutHistory: [],
            });
            
            await setDoc(doc(db, result.user.uid, "settings"), {
                theme: "dark",
                units: "metric",
            });

            localStorage.setItem("user", JSON.stringify(result.user));
            localStorage.setItem("password", user.password);
            navigate("/home");
        }catch(err){
            setLoading(false);
            setError({...error, msg: err.message});
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
        <form onSubmit={handleSubmit} className="frm-register">
            <h1 className="page-header">Create Account</h1>
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
            <button disabled={loading}>{loading ? "Loading..." : "Create account"}</button>
            <Link to="/login"><p style={{textDecoration: "underline", textDecorationColor: "var(--color-6)"}}>Already have an account?</p></Link>
            {error.msg ? <p className="error" style={{width: "fit-content"}}>{error.msg}</p> : null}
        </form>
    )
}

export default Register;