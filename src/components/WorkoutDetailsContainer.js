import { useParams, Link, navigate } from "react-router-dom";
import { db, auth } from "../firebase";
import { getDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Comment from "./Comment";
import ExerciseInWorkout from "./ExerciseInWorkout";
import WorkoutDetails from "./WorkoutDetails";

const WorkoutDetailsContainer = () => {
    const { title } = useParams();
    const [ workout, setWorkout ] = useState({});

    useEffect(() => {
        getWorkout();
    }, []);

    const getWorkout = async () => {
        const result = await getDoc(doc(db, auth.currentUser.uid, "routines"))
        let workouts = [...result.data().workouts];

        workouts.forEach(element => {
            if(element.title === title) {
                setWorkout(element)
                return;
            }
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const exerciseDetails = Array.from(document.querySelectorAll(".exercise-details"));
        
        for(let i = 0; i < exerciseDetails.length; i++){
            workout.exercises[i].reps = exerciseDetails[i].children[3].value;
            workout.exercises[i].sets = exerciseDetails[i].children[1].value;
            workout.exercises[i].weight = exerciseDetails[i].children[4].value;
        }

        const commentContainer = document.querySelector(".comment-container");
        commentContainer.style.display = "flex";
    }

    return (
        <div className="workout-details">
              <h1 className="page-header">{workout.title}</h1>
            {workout.title && 
                <WorkoutDetails workout={workout}/>
            }
            <button onClick={handleSubmit}>Complete</button>
            <Comment workout={workout}/>
        </div>
    )
}

export default WorkoutDetailsContainer;