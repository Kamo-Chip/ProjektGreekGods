import { useLocation, useParams } from "react-router";
import { useState, useEffect, useContext } from "react";
import formatDate from "../utils/formatDate";
import { Timestamp } from "@firebase/firestore";
import { getElementError } from "@testing-library/react";
import { UnitsContext } from "../contexts/units-context";
import convertWeight from "../utils/convertWeight";

const WorkoutHistoryDetail = () => {
    const location = useLocation();
    const [ workout, setWorkout ] = useState(location.state.element);

    useEffect(() => {
        setWorkout(location.state.element);
    }, [workout]);

    const units = useContext(UnitsContext);

    const sumArray = (array) => {
        let sum = 0;
        array.forEach(element => {
            sum += (Number)(element);
        });

        return sum
    }
    
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            paddingBottom: "1em"
        }}>
            <h1 className="page-header">Workout Recap</h1>
            <small style={{alignSelf:"center", textAlign: "center", margin: "0em"}}>{`Completed on: ${formatDate(new Timestamp(workout.dateCompleted.seconds, workout.dateCompleted.nanoseconds).toDate())}`}</small>
            <p style={{alignSelf: "center", marginBottom: "0em", textAlign:"center"}}>&Sigma; {`volume: ${units.weight === "kg" ? workout.volume : convertWeight(workout.volume)} ${units.weight}`}</p>
            <div style={{
                textAlign: "center"
            }}>
                <h2 className="page-header" style={{textAlign: "left", paddingLeft: ".8em"}}>Comment</h2>
                <textarea value={workout.comment} readOnly style={{width: "90%", height: "60px", fontSize: "1rem"}}/>
            </div>
            <h2 className="page-header" style={{textAlign: "left", paddingLeft: ".8em", marginBottom: "0"}}>Performance</h2>
            <div style={{paddingLeft: "1.3em", paddingRight: ".8em"}}> 
                <div className="title-header" style={{
                    display: "flex",
                    flexDirection: "row",
                }}>
                    <p style={{
                        width: "35%",
                    }}>Exercise</p>
                    <div style={{
                      width: "65%",
                      justifyContent: "space-between",
                      display: "grid",
                      gridTemplateColumns: "repeat(4, 1fr)",
                    
                    }}>
                        <p style={{textAlign: "center"}}>Sets</p>
                        <p style={{textAlign: "center"}}>Reps</p>
                        <p style={{textAlign: "center"}}>Weight</p>
                        <p style={{textAlign: "center"}}>Vol.({units.weight})</p>
                    </div>
                </div>
                {workout.exercises && workout.exercises.map(element => {
                    return(
                        <div className="exercise-details" style={{
                            justifyContent: "space-between",
                            borderBottom: "solid var(--color-6) 2px",
                        }}>
                            <p style={{
                                width: "35%"
                            }}>{element.name}</p>
                            <div style={{
                                // display: "flex",
                                // flexDirection: "row",
                                width: "65%",
                                justifyContent: "space-between",
                                display: "grid",
                                gridTemplateColumns: "repeat(4, 1fr)",
                                // width: "65%",
                                // justifyContent: "center",
                             
                            }}>
                                <p style={{textAlign: "center"}}>{element.sets}</p>
                                <div>
                                    {element.reps.map(elm => {
                                        return (
                                            <p style={{textAlign: "center"}}>{elm}</p>
                                        )
                                    })}
                                </div>
                                <div>
                                    {element.weights.map(elm => {
                                        return (
                                            <p style={{textAlign: "center"}}>{elm}</p>
                                        )
                                    })}
                                </div>
                                <p style={{textAlign: "center"}}>{units.weight === "kg" ? element.volume : convertWeight(element.volume)}</p>
                            </div>
                        </div>
                        )
                    })}
            </div>
            <div style={{display: "flex", flexDirection: "column"}}>
                <h2 className="page-header" style={{textAlign: "left", paddingLeft: ".8em"}}>Progress Pic</h2>
                <img style={{width: "90%", alignSelf: "center"}} src={workout.progressPic} alt="Pic not provided"/>
            </div>


        </div>
    )
}

export default WorkoutHistoryDetail;