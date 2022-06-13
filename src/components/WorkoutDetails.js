import { useParams, Link, navigate } from "react-router-dom";
import { db, auth } from "../firebase";
import { getDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Comment from "./Comment";

const WorkoutDetails = () => {
    const { title } = useParams();
    const [ workout, setWorkout ] = useState({});
    const [ performance, setPerformance ] = useState([])

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

    const findExercise = (exercise, name) => {
        exercise.forEach((element, index) => {
            if(element.name === name) {
                return index;
            }
        });
    }

    return (
        <div className="workout-details">
            {workout.title && 
            <>
                <h1 className="page-header">{workout.title}</h1>
                {workout.exercises.map((exercise, index) => <ExerciseInWorkout exercise={exercise} id={index}/>)}
            </>
            }
            {/* <Link to={`/comment/${workout.title}`}><button>Complete</button></Link> */}
            <button onClick={handleSubmit}>Complete</button>
            <Comment workout={workout}/>
        </div>
    )
}

const ExerciseInWorkout = ({exercise, id}) => {
    //make placeholder look like normal input
    return (
        <div id={`${id}exercise-details`} className={`exercise-details`}>
            <p id={`exercise-name`}>{exercise.name}</p>
            <input id="sets-input" type="text" placeholder={exercise.sets}/>
            <p>x</p>
            <input id="reps-input" type="text" placeholder={exercise.reps}/>
            <input id="weight-input" type="number"/>
        </div>
    )
}
export default WorkoutDetails;