import { useParams } from "react-router-dom";
import { db, auth } from "../firebase";
import { getDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";

const WorkoutDetails = () => {
    const { title } = useParams();
    const [ workout, setWorkout ] = useState({});

    useEffect(() => {
        getWorkout();
    }, []);

    const getWorkout = async () => {
        const result = await getDoc(doc(db, auth.currentUser.uid, "routines"))
        let workouts = [...result.data().workouts];

        workouts.forEach(wrkout => {
            if(wrkout.title === title) {
                setWorkout(wrkout);
                return;
            }
        });
    }

    return (
        <div>
            {console.log(workout)}
            <p>{workout.title}</p>
            {/* {workout.exercises.map((exercise) => {
                return (
                    <p>exercise</p>
                )
            })} */}
        </div>
    )
}

export default WorkoutDetails;