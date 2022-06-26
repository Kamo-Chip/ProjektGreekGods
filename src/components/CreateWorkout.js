import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db, auth } from "../firebase";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import AddIcon from "../images/add.svg";
import { TiDelete } from "react-icons/ti";
import workoutExists from "../utils/workoutExists";

const CreateWorkout = () => {

    const location = useLocation();
    const workoutToEdit = location.state;

    let title = "";
    let day = "";
    let exercises = [];

    if(workoutToEdit){
        title = workoutToEdit.title;
        day = workoutToEdit.day;
        exercises = [...workoutToEdit.exercises];
    }

    const [ workout, setWorkout ] = useState({
        title: title,
        day: day,
        exercises: [...exercises],
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

    const getIndexOfWorkout = (workouts) => {
        let idx = -1;
        workouts.forEach((element, index) => {
            if(element.title === workout.title){
                idx = index;
            }
        });

        return idx;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if(workout.exercises.length === 0){
            window.alert("Enter exercises");
            setLoading(false);
            return;
        }

        const data = await getDoc(doc(db, auth.currentUser.uid, "routines"))
        .catch(err => console.log(err));
    
        let workouts = data.data().workouts;

        if(workoutExists(workouts, workout) && !workoutToEdit){
            window.alert(`One name cannot be used for multiple workouts. Try ${workout.title} 2`);
            setLoading(false);
            return
        }else if(workoutExists(workouts, workout)){
            let index = getIndexOfWorkout(workouts);
            workouts[index] = workout;
        }else{
            workouts.push(workout);
        }
        
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

    const deleteExercise = (e) => {
        let src = "";
        let exercises = [...workout.exercises];
        let newExercises = [];

        if(e.target.id !== ""){
            src = e.target.id;
        }else{
            src =e.target.parentElement.id;
        }

        exercises.forEach(exercise => {
            if(exercise.name !== src){
                newExercises.push(exercise);
            }
        });

        setWorkout({...workout, exercises: newExercises});
    }

    return (
        <>
            <h1 className="page-header">{workoutToEdit ? "Edit Workout" : "Create Workout"}</h1>
            <form onSubmit={handleSubmit} className="frm-create-workout">
                <section>
                    <label htmlFor="title">Title</label>
                    <input 
                        type="text" 
                        name="title" 
                        placeholder="Legs" 
                        onChange={handleChange} 
                        value={workout.title} 
                        required={true}
                        readOnly={workoutToEdit}
                    />
                </section>
                <section>
                    <label htmlFor="day">Day</label>
                    <input 
                        type="text" 
                        name="day" 
                        placeholder="Tuesday" 
                        onChange={handleChange} 
                        value={workout.day} 
                        required={true}
                        readOnly={workoutToEdit}
                    />
                </section>
                <section className="add-exercise-container" style={{width: "100%"}}>
                    
                    <p style={{marginTop: "0"}}>Exercises</p>
                   
                    <div className="exercise-container">
                        {workout.exercises.map((exercise, index) => 
                            <div style={{display: "flex", width: "100%", justifyContent: "space-between"}}>
                                <Exercise 
                                    handleExerciseChange={handleExerciseChange} 
                                    setWorkout={setWorkout} 
                                    id={index}
                                    exercise={exercise}
                                    />
                                <TiDelete id={exercise.name} size="24px" style={{width: "24px", height: "24px"}} onClick={deleteExercise}/>
                             </div>
                            )}
                        <img src={AddIcon} onClick={addExercise} className="add" alt="Add"/>
                    </div>
                    
                </section>
                <button disabled={loading}>{loading ? "Loading..." : workoutToEdit ? "Done" : "Create"}</button>
            </form>
        </>
    )
}

const Exercise = ({ id, handleExerciseChange, exercise }) => {
    return (
        <div id={id} className="exercise">
            <input 
                onChange={handleExerciseChange} 
                className="exercise-name" 
                name="name" 
                type="text" 
                placeholder="Name of exercise"
                value={exercise ? exercise.name : null}
                required={true}
                style={{width: "80%"}}
            />
            <input 
                onChange={handleExerciseChange} 
                type="number" 
                name="sets" 
                placeholder="sets" 
                value={exercise ? exercise.sets : null}
                required={true}
                style={{width: "15%"}}
            />
        </div>
    )
}

export default CreateWorkout;