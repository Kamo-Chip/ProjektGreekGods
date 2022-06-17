import { useParams } from "react-router-dom";
import { db, auth } from "../firebase";
import { getDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Comment from "./Comment";
import WorkoutDetails from "./WorkoutDetails";

const WorkoutDetailsContainer = () => {
    const { title } = useParams();
    const [ workout, setWorkout ] = useState({});

    useEffect(() => {
        getWorkout();
    }, []);

    const getWorkout = async () => {
        const result = await getDoc(doc(db, auth.currentUser.uid, "routines"))
        let workouts = [...result.data().workouts];

        workouts.forEach(element => {
            if(element.title === title) {
                setWorkout(element)
                return;
            }
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const exerciseDetails = Array.from(document.querySelectorAll(".exercise-info"));
        
        for(let i = 0; i < exerciseDetails.length; i++){
            workout.exercises[i].reps = exerciseDetails[i].children[2].value;
            workout.exercises[i].sets = exerciseDetails[i].children[0].value;
            workout.exercises[i].weight = exerciseDetails[i].children[3].value;
        }

        const commentContainer = document.querySelector(".comment-container");
        commentContainer.style.display = "flex";

        document.querySelector(".workout-details-container").style.display = "none"
    }

    let count = 0;
    const onEditClick = () => {
        const exercises = document.querySelectorAll(".exercise-container");
        const deleteBtns = document.querySelectorAll(".btn-delete-exercise");

        if(count % 2 !== 0){
            exercises.forEach(element => {
                element.style.gridTemplateColumns = "auto"; 
            });

            deleteBtns.forEach(element => {
                element.style.display = "none";
            });
        }else{
            exercises.forEach(element => {
                element.style.gridTemplateColumns = "10px auto"; 
            });

            deleteBtns.forEach(element => {
                element.style.display = "flex";
            });
        }
        count++;
    }

    const updateExercises = (newExercises) => {
        setWorkout(newExercises);
    }

    return (
        <>
        <div className="workout-details-container">
              <h1 className="page-header">{workout.title}</h1>
              <div className="title-header" style={{
                  display: "flex"
              }}>
                  <p style={{
                      width: "50%",
                      paddingLeft: "2rem",
                  }}>Exercise</p>
                  <div style={{
                      width: "50%",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingRight: "1.5em",
                  }}>
                    <p>Sets</p>
                    <p style={{paddingLeft: "2em"}}>Reps</p>
                    <p>Weight</p>
                  </div>
              </div>
            {workout.title && 
                <WorkoutDetails setWorkout={updateExercises} workout={workout}/>
            }
            <button onClick={handleSubmit}>Complete</button>
            
        </div>
        <Comment workout={workout}/>
        </>
    )
}

export default WorkoutDetailsContainer;