import { Link, Navigate, useNavigate } from "react-router-dom";
import { db, auth } from "../firebase";
import { updateDoc, doc } from "firebase/firestore";
import DeleteIcon from "../images/delete.svg";
import { MdEdit } from "react-icons/md";
import { TiDelete } from "react-icons/ti";

const Workout = ({ workouts, workout, setWorkouts }) => {
    const deleteWorkout = (e) => {
        let newWorkouts = [];

        workouts.forEach(element => {
            if(element.title !== e.target.id){
                newWorkouts.push(element);
            }
        });

        setWorkouts(newWorkouts);
        updateDoc(doc(db, auth.currentUser.uid, "routines"), {
            workouts: newWorkouts,
        })
        .catch(err => console.log(err));
    }

    return (
        <div className="workout-container">
            <TiDelete 
                size="28px" 
                onClick={deleteWorkout} 
                id={workout.title} 
                className="btn-delete-workout"
                style={{display:"none", marginBottom: "1em"}}
            />
            <div className="workout">
                <Link to={`/home/${workout.title}`} style={{width: "90%"}}>
                    <div>
                        <h2 className="title">{workout.title}</h2>
                        <small>{workout.day}</small>
                    </div>
                </Link>
                <div style={{width: "10%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <Link to={`/editWorkout/${workout.title}`} state={workout}>
                        <MdEdit size="1.5rem"/>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Workout;