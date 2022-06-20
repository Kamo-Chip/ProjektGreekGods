import { useLocation, useParams } from "react-router";
import { useState, useEffect, useContext } from "react";
import formatDate from "../utils/formatDate";
import { Timestamp } from "@firebase/firestore";
import { getElementError } from "@testing-library/react";
import { UnitsContext } from "./units-context";

const WorkoutHistoryDetail = () => {
    const location = useLocation();
    const [ workout, setWorkout ] = useState(location.state.element);

    useEffect(() => {
        setWorkout(location.state.element);
    }, [workout]);

    const units = useContext(UnitsContext);

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            paddingBottom: "1em"
        }}>
            <h1 className="page-header">Workout Recap</h1>
            <small style={{alignSelf:"center"}}>{`Completed on: ${formatDate(new Timestamp(workout.dateCompleted.seconds, workout.dateCompleted.nanoseconds).toDate())}`}</small>
            <small style={{alignSelf: "center", marginTop: "1em"}}>{`Volume: ${workout.volume} ${units.weight}`}</small>
            <div style={{
                paddingLeft: ".8em"
            }}>
                <h2 className="page-header">Comment</h2>
                <p>{workout.comment}</p>
            </div>
            <div style={{paddingLeft: ".8em", paddingRight: ".8em"}}>
                <h2 className="page-header">Performance</h2>
                <div className="title-header" style={{
                    display: "flex",
                    flexDirection: "row",
                    // width: "100vw",

                }}>
                    <p style={{
                        width: "40%",
                    }}>Exercise</p>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "60%"
                    }}>
                        <p>Sets</p>
                        <p style={{
                            marginLeft: "1em"
                        }}>Reps</p>
                        <p>Wt ({units.weight})</p>
                        <p>Vol. ({units.weight})</p>
                    </div>
                </div>
                {workout.exercises && workout.exercises.map(element => {
                    return(
                        <div className="exercise-details" style={{
                            justifyContent: "space-between"
                        }}>
                            <p style={{
                                width: "35%"
                            }}>{element.name}</p>
                            <div style={{
                                // display: "flex",
                                // flexDirection: "row",
                                // width: "50%",
                                // justifyContent: "space-between",
                                display: "grid",
                                gridTemplateColumns: "1fr 10px repeat(3, 1fr)",
                                width: "65%",
                                justifyContent: "center",
                             
                            }}>
                                <p style={{textAlign: "center"}}>{element.sets}</p>
                                <p style={{textAlign: "center"}}>x</p>
                                <p style={{textAlign: "center"}}>{element.reps}</p>
                                <p style={{textAlign: "center"}}>{element.weight}</p>
                                <p style={{textAlign: "center"}}>{element.volume}</p>
                            </div>
                        </div>
                        )
                    })}
            </div>
            <div style={{display: "flex", flexDirection: "column"}}>
                <h2 className="page-header" style={{paddingLeft: ".8em"}}>Progress Pic</h2>
                <img style={{width: "90%", alignSelf: "center"}} src={workout.progressPic} alt="Pic not provided"/>
            </div>


        </div>
    )
}

export default WorkoutHistoryDetail;