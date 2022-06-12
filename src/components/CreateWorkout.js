import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase";
import { updateDoc, doc, getDoc } from "firebase/firestore";

const CreateWorkout = () => {
    const [ workout, setWorkout ] = useState({
        title: "",
        day: "",
        exercises: [],
    });

    const navigate = useNavigate();

    const addExercise = (e) => {
        e.preventDefault();

       setWorkout({...workout, exercises: workout.exercises.concat({})})
    }

    const handleExerciseChange = (e) => {
        e.preventDefault();

        let updatedExercises = [...workout.exercises];

        updatedExercises[e.target.parentElement.id][e.target.name] = e.target.value;

        setWorkout({...workout, exercises: updatedExercises});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = await getDoc(doc(db, auth.currentUser.uid, "routines"))
        .catch(err => console.log(err));
    
        let workouts = data.data().workouts;
        workouts.push(workout);
        
    
        await updateDoc(doc(db, auth.currentUser.uid, "routines"), {
            workouts: workouts,
            
        })
        .catch(err => console.log(err));

        navigate("/home");
    }

    const handleChange = (e) => {
        e.preventDefault();

        setWorkout({...workout, [e.target.name]: e.target.value})
    }

    return (
        <>
            <h1 className="page-header">Enter workout details</h1>
            <form className="frm-create-workout">
                <section>
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" placeholder="Enter workout name e.g)Push" onChange={handleChange} value={workout.title}/>
                </section>
                <section>
                    <label htmlFor="day">Day</label>
                    <input type="text" name="day" placeholder="Monday" onChange={handleChange} value={workout.day}/>
                </section>
                <section>
                    <p>Enter exercises</p>
                    <div className="exercise-container">
                        {workout.exercises.map((excercise, index) => <Exercise handleExerciseChange={handleExerciseChange} setWorkout={setWorkout} id={index}/>)}
                    </div>
                    <button onClick={addExercise}>Add exercise</button>
                </section>
                <button onClick={handleSubmit}>Create Workout</button>
            </form>
        </>
    )
}

const Exercise = ({ setWorkout, id, handleExerciseChange }) => {
    return (
        <div id={id} className="exercise">
            <input onChange={handleExerciseChange} className="exercise-name" name="name" type="text" placeholder="Name of exercise"/>
            <input onChange={handleExerciseChange} type="number" name="sets" placeholder="sets"/>
            <input onChange={handleExerciseChange} type="number" name="reps" placeholder="reps"/>
        </div>
    )
}

export default CreateWorkout;