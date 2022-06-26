import { useParams } from "react-router-dom";
import { db, auth } from "../firebase";
import { getDoc, doc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import Comment from "./Comment";
import WorkoutDetails from "./WorkoutDetails";
import { UnitsContext } from "../contexts/units-context";
import { MdHelp } from "react-icons/md";
import Help from "./Help";
import HelpImage from "../images/scrollHelp.png";

const WorkoutDetailsContainer = () => {
    const { title } = useParams();
    const [ workout, setWorkout ] = useState({});
    const [ helpIsActive, setHelpIsActive ] = useState(false);

    const units = useContext(UnitsContext);
    const helpData = {
        text: "Enter the reps and weight per set. Scroll after entering each set's data",
        imageSrc: HelpImage,
    }

    useEffect(() => {
        getWorkout();
    }, []);

    const getWorkout = async () => {
        const result = await getDoc(doc(db, auth.currentUser.uid, "routines"))
        let workouts = [...result.data().workouts];

        workouts.forEach(element => {
            if(element.title === title) {
                setWorkout(element);
                return;
            }
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        for(let i = 0; i < workout.exercises.length; i++){
            let repsArray = Array.from(document.getElementById(`${workout.exercises[i].name}reps`).children);
            let repValues = [];
            repsArray.forEach(element => {
                repValues.push((Number)(element.value));
            });

            workout.exercises[i].reps = repValues
        }

        for(let i = 0; i < workout.exercises.length; i++){
            let weightsArray = Array.from(document.getElementById(`${workout.exercises[i].name}weights`).children);
            let weightValues = [];
            weightsArray.forEach(element => {
                weightValues.push((Number)(element.value));
            });

            workout.exercises[i].weights = weightValues;
        }

        if(detailsMissing()){
            window.alert("Details are missing");
            return;
        }

        const commentContainer = document.querySelector(".comment-container");
        commentContainer.style.display = "flex";

        document.querySelector(".workout-details-container").style.display = "none"
    }

    const updateExercises = (newExercises) => {
        setWorkout(newExercises);
    }

    const displayHelp = () => {
        const helpScreen = document.querySelector(".help");
        helpScreen.style.display = "flex";
        setHelpIsActive(true);
    }

    const detailsMissing = () => {
       let isDetailMissing = false;
        workout.exercises.forEach(element => {
            if(element.weights.indexOf(0) >= 0 || element.reps.indexOf(0) >= 0){
                isDetailMissing = true;
            }
        });

        return isDetailMissing;
    }

    return (
        <>
        <Help data={helpData} setIsActive={setHelpIsActive}/>
        <div className="workout-details-container">
            <MdHelp onClick={displayHelp} size="30px" style={{
                    position: "fixed",
                    top: "0",
                    left: "0",
                    margin: ".5em 0 0 .5em"
                }}
            />
              <h1 className="page-header">{workout.title}</h1>
              <div style={{
                  display: "flex"
              }}>
                  <p className="title-header" style={{
                      width: "40%",
                  }}>Exercise</p>
                  <div style={{
                        width: "60%",
                        justifyContent: "space-between",
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        textAlign: "center"
                  }}>
                    <p className="title-header" >Sets</p>
                    <p className="title-header">Reps</p>
                    <p className="title-header">{`Weight(${units.weight})`}</p>
                  </div>
              </div>
            {workout.title && 
                <WorkoutDetails setWorkout={updateExercises} workout={workout}/>
            }
            <button onClick={handleSubmit} disabled={helpIsActive}>Complete</button>
            
        </div>
        <Comment workout={workout}/>
        </>
    )
}

export default WorkoutDetailsContainer;