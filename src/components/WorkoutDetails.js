import ExerciseInWorkout from "./ExerciseInWorkout";

const WorkoutDetails = ({workout}) => {
    return (
        <div>
            {workout.exercises.map((exercise, index) => <ExerciseInWorkout exercise={exercise} id={index}/>)}
        </div>
    );
}

export default WorkoutDetails;