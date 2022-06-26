const workoutExists = (workouts, workout) => {
    let exists = false;
    workouts.forEach(element => {
        if(element.title === workout.title){
            exists = true;
        }
    });

    return exists;
}

export default workoutExists;