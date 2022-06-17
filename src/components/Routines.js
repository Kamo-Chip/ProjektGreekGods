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

    let count = 0; 
    const onEditClick = () => {
        const workouts = document.querySelectorAll(".workout-container");
        const deleteBtn = document.querySelectorAll(".btn-delete-workout");

        if(count % 2 === 0){
            deleteBtn.forEach(element => {
                element.style.display = "flex";
            });

            workouts.forEach(element => {
                element.style.gridTemplateColumns = "2rem auto"
            });
        }else{
            deleteBtn.forEach(element => {
                element.style.display = "none";
            });

            workouts.forEach(element => {
                element.style.gridTemplateColumns = "auto"
            });
        }
        count++;
    }

    const updateRoutines = (newRoutine) => {
        setWorkouts(newRoutine);
    }

    return (
        <div className="routines">
            <h1 className="page-header">Routine</h1>
            <h2 onClick={onEditClick} className="btn-edit title-header">Edit</h2>
            <div className="workouts-container">
                {workouts.map((workout, index) => <Workout workouts={workouts} setWorkouts={updateRoutines} key={`workouts-container${index}`}workout={workout}/>)}
            </div>
            <button onClick={goToCreateWorkouts}>Add</button>
        </div>
    )
}

export default Routines;