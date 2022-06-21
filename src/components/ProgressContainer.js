import { getDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useState, useEffect } from "react";
import Progress from "./Progress";

const ProgressContainer = () => {
    const [ workoutHistory, setWorkoutHistory ] = useState([]);

    useEffect(() => {
        getAndSetWorkoutHistory();
    }, []);

    const getAndSetWorkoutHistory = async () => {
        const data = await getDoc(doc(db, auth.currentUser.uid, "routines"))
        .catch(err => console.log(err));

        setWorkoutHistory(data.data().workoutHistory);
    }

    return (
        <Progress workoutHistory={workoutHistory} setWorkoutHistory={setWorkoutHistory}/>
    )
}

export default ProgressContainer;