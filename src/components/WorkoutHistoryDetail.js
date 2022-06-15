import { useLocation, useParams } from "react-router";
import { useState, useEffect } from "react";

const WorkoutHistoryDetail = () => {
    const [ workout, setWorkout ] = useState({});
    const location = useLocation();

    useEffect(() => {
        setWorkout(location.state.element);
    }, [workout]);

    return (
        <div>
            <p>{workout.comment}</p>
            {workout.exercises && workout.exercises.map(element => {
                return(
                    <div className="exercise-details">
                        <p>{element.name}</p>
                        <p>{element.sets}</p>
                        <p>x</p>
                        <p>{element.reps}</p>
                        <p>{element.weight}</p>
                    </div>
                    )
                })}
        </div>
    )
}

export default WorkoutHistoryDetail;