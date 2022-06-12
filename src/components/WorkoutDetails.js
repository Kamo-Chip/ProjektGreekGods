import { useParams, Link } from "react-router-dom";
import { db, auth } from "../firebase";
import { getDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";

const WorkoutDetails = () => {
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

    return (
        <div className="workout-details">
            {workout.title && 
            <>
                <h1 className="page-header">{workout.title}</h1>
                {workout.exercises.map((exercise) => <ExerciseInWorkout exercise={exercise}/>)}
            </>
            }
            <Link to={`/comment/${workout.title}`}><button>Complete</button></Link>
        </div>
    )
}

const ExerciseInWorkout = ({exercise}) => {
    return (
        <div className="exercise-details">
            <p>{exercise.name}</p>
            <p>{exercise.sets}</p>
            <p>x</p>
            <p>{exercise.reps}</p>
        </div>
    )
}
export default WorkoutDetails;