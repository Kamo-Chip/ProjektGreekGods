import { Link } from "react-router-dom";
import { db, auth } from "../firebase";
import { updateDoc, doc } from "@firebase/firestore";
import { MdHelp } from "react-icons/md";

const Progress = ({ workoutHistory, setWorkoutHistory }) => {

    const groupedWorkoutHistory = {};

    const getTitles = () => {
        let titles = [];
        workoutHistory.forEach(element => {
            if(!titles.includes(element.title)){
                titles.push(element.title);
            }
        });
        return titles;
    }

    const titles = getTitles();

    const getWorkoutByTitle = (title) => {
        let workouts = [];

        workoutHistory.forEach(element => {
            if(element.title === title){
                workouts.push(element)
            }
        });

        return workouts;
    }

    const groupWorkouts = () => {

        titles.forEach(element => {
            groupedWorkoutHistory[element] = getWorkoutByTitle(element)
        })
    }

    const clearHistory = async () => {
        setWorkoutHistory([]);
        await updateDoc(doc(db, auth.currentUser.uid, "routines"), {
            workoutHistory: [],
        })
        .catch(err => console.log(err));

        //delete images related to user
    }

    groupWorkouts();

    return (
        <div className="progress">
            <div className="workouts-container">
                <h1 className="page-header">Progress</h1>
                <h2 className="page-header" style={{position: "absolute", top: "0", right: "0", marginTop: ".5em", marginRight: ".5em"}} onClick={clearHistory}>Clear</h2>
                { workoutHistory.length === 0 && <p style={{textAlign: "center"}}>Past workout data will be show here</p> }
                {Object.keys(groupedWorkoutHistory).map(element => {
                    return (
                        <Link to={`/progress/${element}`} state={{keys: Object.values(groupedWorkoutHistory[element])}}>
                            <div className="workout">
                                <p>{element}</p>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default Progress;