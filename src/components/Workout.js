import { Link } from "react-router-dom";
import { db, auth } from "../firebase";
import { updateDoc, doc } from "firebase/firestore";
import DeleteIcon from "../images/delete.svg";

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
            <img src={DeleteIcon} alt={"x"} onClick={deleteWorkout} id={workout.title} className="btn-delete-workout" style={{display:"none"}}/>
            <Link to={`/home/${workout.title}`}>
                <div className="workout">
                    <h2 className="title">{workout.title}</h2>
                    <small>{workout.day}</small>
                </div>
            </Link>
        </div>
    )
}

export default Workout;