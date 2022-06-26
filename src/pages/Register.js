import { auth, db } from "../firebase";
import { setDoc, doc, collection } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

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
    return (
        <form onSubmit={handleSubmit} className="frm-register">
            <h1 className="page-header">Create Account</h1>
            <section>
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" onChange={handleChange} value={user.email} required={true}/>
            </section>
            <section>
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" onChange={handleChange} value={user.password} required={true}/>
            </section>
            <button disabled={loading}>{loading ? "Loading..." : "Create account"}</button>
            <Link to="/login"><p style={{textDecoration: "underline", textDecorationColor: "var(--color-6)"}}>Already have an account?</p></Link>
            {error.msg ? <p className="error" style={{width: "fit-content"}}>{error.msg}</p> : null}
        </form>
    )
}

export default Register;