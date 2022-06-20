import { signInWithEmailAndPassword } from "firebase/auth";
import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {   
    const [ user, setUser ] = useState({
        email: "",
        password: "",
    });


    const navigate = useNavigate();

    const [ details, setDetails ] = useState({
        loading: false,
    });

    const [error, setError ] = useState(null)

    // useEffect(() => {
    //     navigate("/login");
    // },[])
    useEffect(() => {

    }, [details]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setDetails({...details, loading: true});
        
        try{
            console.log(user);
            await signInWithEmailAndPassword(auth, user.email, user.password);
    
            navigate("/home");
        }catch(err){
            setDetails({...details, error: err.message});
            setError(err.message);
            setDetails({...details, loading: false});
        }
    }

    const handleChange = (e) => {
        e.preventDefault();

        setUser({...user, [e.target.name]: e.target.value});
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
                <input type="password" name="password" onChange={handleChange} value={user.password} required={true}/>
            </section>
            <button disabled={details.loading}>{details.loading ? "Loading..." : "Sign in"}</button>
            <Link to="/"><p style={{color: "#fff"}}>Don't have an account?</p></Link>
            { error ? <p className="error">{error}</p> : null}
        </form>
    )
}

export default Login;