import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {   
    const [ user, setUser ] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, user.email, user.password)
        .catch(err => console.log(err));

        navigate("/home");
    }

    const handleChange = (e) => {
        e.preventDefault();

        setUser({...user, [e.target.name]: e.target.value});
    }
    return (
        <form onSubmit={handleSubmit}>
            <h2>Sign in</h2>
            <section>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" onChange={handleChange} value={user.email}/>
            </section>
            <section>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" onChange={handleChange} value={user.password}/>
            </section>
            <button>Sign in</button>
        </form>
    )
}

export default Login;