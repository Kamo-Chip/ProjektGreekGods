import Workout from "./Workout";
import { db, auth } from "../firebase";
import { getDoc, doc, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [ workouts, setWorkouts ] = useState([]);
    
    const navigate = useNavigate();

    useEffect(() => {
        getWorkouts();
    }, []);

    const getWorkouts = async () => {
        await getDoc(doc(db, auth.currentUser.uid, "routines"))
        .then(docs => {
            setWorkouts(docs.data().workouts);
        })
        .catch(err => console.log(err));
    }

    const returnHome = () => {
        navigate("/createWorkout")
    }
    return (
        <div className="home">
            <div className="workouts-container">
                {workouts.map((workout, index) => <Workout workout={workout}/>)}
            </div>
            <button onClick={returnHome}>Add</button>
        </div>
    )
}

export default Home;