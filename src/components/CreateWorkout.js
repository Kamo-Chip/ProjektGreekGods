import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import AddIcon from "../images/add.svg";

const CreateWorkout = () => {
    const [ workout, setWorkout ] = useState({
        title: "",
        day: "",
        exercises: [],
    });

    const [ loading, setLoading ] = useState(false);

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
        setLoading(true);
        const data = await getDoc(doc(db, auth.currentUser.uid, "routines"))
        .catch(err => console.log(err));
    
        let workouts = data.data().workouts;

        workouts.push(workout);
        
        await updateDoc(doc(db, auth.currentUser.uid, "routines"), {
            workouts: workouts,
            
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
        });

        navigate("/home");
    }

    const handleChange = (e) => {
        e.preventDefault();

        setWorkout({...workout, [e.target.name]: e.target.value})
    }

    return (
        <>
            <h1 className="page-header">Create Workout</h1>
            <form onSubmit={handleSubmit} className="frm-create-workout">
                <section>
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" placeholder="Legs" onChange={handleChange} value={workout.title} required={true}/>
                </section>
                <section>
                    <label htmlFor="day">Day</label>
                    <input type="text" name="day" placeholder="Tuesday" onChange={handleChange} value={workout.day} required={true}/>
                </section>
                <section className="add-exercise-container">
                    
                    <p style={{marginTop: "0"}}>Exercises</p>
                   
                    <div className="exercise-container">
                        {workout.exercises.map((excercise, index) => <Exercise handleExerciseChange={handleExerciseChange} setWorkout={setWorkout} id={index}/>)}
                        <img src={AddIcon} onClick={addExercise} className="add" alt="Add"/>
                    </div>
                    
                </section>
                <button disabled={loading}>{loading ? "Loading..." : "Create"}</button>
            </form>
        </>
    )
}

const Exercise = ({ id, handleExerciseChange }) => {
    return (
        <div id={id} className="exercise">
            <input onChange={handleExerciseChange} className="exercise-name" name="name" type="text" placeholder="Name of exercise" required={true}/>
            <input onChange={handleExerciseChange} type="number" name="sets" placeholder="sets" required={true}/>
            {/* <input onChange={handleExerciseChange} type="number" name="reps" placeholder="reps" required={true}/> */}
        </div>
    )
}

export default CreateWorkout;