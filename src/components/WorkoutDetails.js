import ExerciseInWorkout from "./ExerciseInWorkout";

const WorkoutDetails = ({workout, setWorkout }) => {
    return (
        <div className="workout-details">
            {workout.exercises.map((exercise, index) => <ExerciseInWorkout setWorkout={setWorkout} workout={workout} exercise={exercise} id={index}/>)}
        </div>
    );
}

export default WorkoutDetails;