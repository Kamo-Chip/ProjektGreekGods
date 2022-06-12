import { auth, db } from "../firebase";
import { setDoc, doc, collection } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
    const [ user, setUser ] = useState({
        email: "",
        password: "",
        id: "",
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const result = await createUserWithEmailAndPassword(auth, user.email, user.password)

            await setDoc(doc(db, result.user.uid, "routines"), {
                workouts: [],
            });

            navigate("/home");
        }catch(error){
            console.log(error);
        }
    }

    const handleChange = (e) => {
        e.preventDefault();

        setUser({...user, [e.target.name]: e.target.value});
    }
    return (
        <form onSubmit={handleSubmit} className="frm-register">
            <h2>Create Account</h2>
            <section>
                <label htmlFor="email"></label>
                <input type="email" name="email" onChange={handleChange} value={user.email}/>
            </section>
            <section>
                <label htmlFor="password"></label>
                <input type="password" name="password" onChange={handleChange} value={user.password}/>
            </section>
            <button>Create Account</button>
            <Link to="/login"><p>Already have an account?</p></Link>
        </form>
    )
}

export default Register;