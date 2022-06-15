import Workout from "./Workout";
import { db, auth } from "../firebase";
import { getDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Routines = () => {
    const [ workouts, setWorkouts ] = useState([]);
    
    const navigate = useNavigate();

    useEffect(() => {
        getAndSetWorkouts();
    }, []);

    const getAndSetWorkouts = async () => {
        await getDoc(doc(db, auth.currentUser.uid, "routines"))
        .then(docs => {
            setWorkouts(docs.data().workouts);
        })
        .catch(err => console.log(err));
    }

    const goToCreateWorkouts = () => {
        navigate("/createWorkout")
    }
    return (
        <div className="routines">
            <h1 className="page-header">Routine</h1>
            <div className="workouts-container">
                {workouts.map((workout, index) => <Workout key={`workouts-container${index}`}workout={workout}/>)}
            </div>
            <button onClick={goToCreateWorkouts}>Add</button>
        </div>
    )
}

export default Routines;