import { useNavigate } from "react-router-dom";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase";

const Comment = ({workout}) => {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        workout.comment = document.querySelector(".comment").value;
        workout.dateCompleted = new Date();

        const data = await getDoc(doc(db, auth.currentUser.uid, "routines"))
        .catch(err => console.log(err));

        let workoutHistory = data.data().workoutHistory;

        workoutHistory.push(workout);

        updateDoc(doc(db, auth.currentUser.uid, "routines"), {
            workoutHistory: workoutHistory,
        });

        navigate("/home");
    }

    return (
        <form className="comment-container" onSubmit={handleSubmit} style={{display: "none"}}>
            <h1>Post workout comment</h1>
            <textarea className="comment"/>
            <button>Done</button>
        </form>
    );
}

export default Comment;