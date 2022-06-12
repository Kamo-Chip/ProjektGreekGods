import { useParams } from "react-router-dom";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { concat } from "lodash";

const Comment = () => {
    const { title } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();

        //Must add time and comment to workout history. Goodluck bruh
        await getDoc(doc(db, auth.currentUser.uid, "routines"))
        .then(data => {
            let workouts = [...data.data().workouts];
       
            const workout = (findWorkout(workouts, title));
            workout.time = "today";

            updateDoc(doc(db, auth.currentUser.uid, "routines"), {
                workoutHistory: workout,
            })
        }) 
        .catch(err => console.log(err));
    }

    const findWorkout = (workouts, title) => {
        for(let i = 0; i < workouts.length; i++){
            if(workouts[i].title === title){
                return workouts[i];
            }
        }
       return null;
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Post workout comment</h1>
            <textarea/>
            <button>Done</button>
        </form>
    );
}

export default Comment;