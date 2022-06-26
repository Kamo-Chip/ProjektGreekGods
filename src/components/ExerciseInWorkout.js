import UpIcon from "../images/up.svg";
import DownIcon from "../images/down.svg";

const ExerciseInWorkout = ({exercise, id, workout, setWorkout}) => {
    const arr = new Array((Number)(exercise.sets));
    for(let i = 0; i < arr.length; i++){
        arr[i] = "";
    }

    return (
        <div className="exercise-container">
            <div className={`exercise-details`}>
                <p style={{width: "40%"}} id={`exercise-name`}>{exercise.name}</p>
                <div id={`${id}exercise-details`} className="exercise-info" style={{
                        width: "60%",
                        justifyContent: "space-between",
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                }}>
                    <div className="sets-input-container" style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                    }}>
                        <span style={{textAlign:"center", margin: "24px 0", width: "40px"}} id="sets-input" type="number">{exercise.sets}</span>
                    </div>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}>
                       <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="var(--color-1)"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M7 14l5-5 5 5H7z"/></svg>
                        <div id={`${exercise.name}reps`} style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            height: "40px",
                            width: "60px",
                            overflowY: "scroll",
                        }}>
                            {arr.map((element, idx) => {
                                return (
                                    <input style={{textAlign:"center", minHeight: "35px", marginBottom: "5px"}} id="reps-input" type="number" required={true} placeholder={`#${idx+1}`}/>
                                )
                            })}
                        </div>
                        <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="var(--color-1)"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M7 10l5 5 5-5H7z"/></svg>
                    </div>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="var(--color-1)"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M7 14l5-5 5 5H7z"/></svg>
                        <div id={`${exercise.name}weights`} style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            height: "40px",
                            width: "60px",
                            overflowY: "scroll",
                        }}>
                            {arr.map((element,idx) => {
                                return (
                                    <input style={{textAlign:"center", minHeight: "35px", marginBottom: "5px"}} id="weight-input" placeholder={`#${idx+1}`} type="number" required={true}/>
                                )
                            })}
                        </div>
                        <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="var(--color-1)"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M7 10l5 5 5-5H7z"/></svg>
                    </div>
                </div>
            </div>
        </div>
 
    )
}

export default ExerciseInWorkout;