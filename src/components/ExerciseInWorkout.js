import { db, auth } from "../firebase";
import { updateDoc, doc, getDoc } from "@firebase/firestore";
import { useEffect } from "react";

const ExerciseInWorkout = ({exercise, id, workout, setWorkout}) => {

    const deleteExercise = async (e) => {
        let newExercises = [];
        workout.exercises.forEach(element => {
            if(element.name !== e.target.id){
                newExercises.push(element);
            }
        });
        setWorkout({...workout, exercises: newExercises});

        workout.exercises = newExercises;

        const data = await getDoc(doc(db, auth.currentUser.uid, "routines"))
        const workouts = data.data().workouts;

        workouts[getIndexOfWorkout(workouts)] = workout;
   
        updateDoc(doc(db, auth.currentUser.uid, "routines"), {
            workouts: workouts,
        })
        .catch(err => console.log(err));
    }

    const getIndexOfWorkout = (workouts) => {
        let index = -1;
        workouts.forEach((element, idx) => {
            if(element.title === workouts[idx].title){
                index = idx;
            }
        });
        return index;
    }

    return (
        <div className="exercise-container">
            <span id={exercise.name} onClick={deleteExercise} style={{display: "none"}} className="btn-delete-exercise">x</span>
            <div className={`exercise-details`}>
                <p style={{width: "50%", paddingLeft: "2em"}} id={`exercise-name`}>{exercise.name}</p>
                <div id={`${id}exercise-details`} className="exercise-info" style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "50%",
                    justifyContent: "space-between",
                    paddingRight: "2em"
                }}>
                    <input style={{textAlign:"center"}} id="sets-input" type="number" placeholder={exercise.sets} required={true}/>
                    <p style={{
                        marginTop: ".5em"
                    }}>x</p>
                    <input style={{textAlign:"center"}} id="reps-input" type="number" placeholder={exercise.reps} required={true}/>
                    <input style={{textAlign:"center"}} id="weight-input" type="number" required={true}/>
                </div>
            </div>
        </div>
 
    )
}

export default ExerciseInWorkout;