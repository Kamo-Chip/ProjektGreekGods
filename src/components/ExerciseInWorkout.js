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

export default ExerciseInWorkout;