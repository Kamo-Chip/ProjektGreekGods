import { useLocation, useParams } from "react-router";
import { useState, useEffect } from "react";
import formatDate from "../utils/formatDate";
import { Timestamp } from "@firebase/firestore";

const WorkoutHistoryDetail = () => {
    const location = useLocation();
    const [ workout, setWorkout ] = useState(location.state.element);

    useEffect(() => {
        setWorkout(location.state.element);
    }, [workout]);

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
        }}>
            {console.log(workout)}
            <h1 className="page-header">Workout Recap</h1>
            <small style={{alignSelf:"center"}}>{`${formatDate(new Timestamp(workout.dateCompleted.seconds, workout.dateCompleted.nanoseconds).toDate())}`}</small>
            <div style={{
                paddingLeft: ".8em"
            }}>
                <h2>Comment</h2>
                <p>{workout.comment}</p>
            </div>
            <div style={{paddingLeft: ".8em", paddingRight: ".8em"}}>
                <h2>Performance</h2>
                <div className="title-header" style={{
                    display: "flex",
                    flexDirection: "row",
                    // width: "100vw",

                }}>
                    <p style={{
                        width: "58%",
                    }}>Exercise</p>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "42%"
                    }}>
                        <p>Sets</p>
                        <p style={{
                            marginLeft: "1.5em"
                        }}>Reps</p>
                        <p>Wt</p>
                    </div>
                </div>
                {workout.exercises && workout.exercises.map(element => {
                    return(
                        <div className="exercise-details" style={{
                            justifyContent: "space-between"
                        }}>
                            <p style={{
                                width: "60%"
                            }}>{element.name}</p>
                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                                width: "40%",
                                justifyContent: "space-between",
                                paddingRight: "0.8em",
                            }}>
                                <p>{element.sets}</p>
                                <p>x</p>
                                <p>{element.reps}</p>
                                <p>{element.weight}</p>
                            </div>
                        </div>
                        )
                    })}
            </div>
            <div style={{paddingLeft: ".8em"}}>
                <h2>Progress Pic</h2>
                <img style={{width: "400px"}} src={workout.progressPic} alt="Pic not provided"/>
            </div>


        </div>
    )
}

export default WorkoutHistoryDetail;