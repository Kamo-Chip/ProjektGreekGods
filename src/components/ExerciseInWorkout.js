import UpIcon from "../images/up.svg";
import DownIcon from "../images/down.svg";

const ExerciseInWorkout = ({exercise, id, workout, setWorkout}) => {
    const arr = new Array((Number)(exercise.sets));
    for(let i = 0; i < arr.length; i++){
        arr[i] = "";
    }
    // const deleteExercise = async (e) => {
    //     let newExercises = [];
    //     workout.exercises.forEach(element => {
    //         if(element.name !== e.target.id){
    //             newExercises.push(element);
    //         }
    //     });
    //     setWorkout({...workout, exercises: newExercises});

    //     workout.exercises = newExercises;

    //     const data = await getDoc(doc(db, auth.currentUser.uid, "routines"))
    //     const workouts = data.data().workouts;

    //     workouts[getIndexOfWorkout(workouts)] = workout;
   
    //     updateDoc(doc(db, auth.currentUser.uid, "routines"), {
    //         workouts: workouts,
    //     })
    //     .catch(err => console.log(err));
    // }

    // const getIndexOfWorkout = (workouts) => {
    //     let index = -1;
    //     workouts.forEach((element, idx) => {
    //         if(element.title === workouts[idx].title){
    //             index = idx;
    //         }
    //     });
    //     return index;
    // }

    return (
        <div className="exercise-container">
            <div className={`exercise-details`}>
                <p style={{width: "50%"}} id={`exercise-name`}>{exercise.name}</p>
                <div id={`${id}exercise-details`} className="exercise-info" style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "50%",
                    justifyContent: "space-between",
                    paddingRight: "1em",
                    alignItems: "center",
                }}>
                    <div className="sets-input-container" style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                    }}>
                        <span style={{textAlign:"center", margin: "24px 0", width: "40px"}} id="sets-input" type="number">{exercise.sets}</span>
                    </div>
                    <p style={{
                        marginTop: "1em"
                    }}>x</p>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}>
                        <img src={UpIcon} alt="Up"/>
                        <div id={`${exercise.name}reps`} style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            height: "35px",
                            width: "60px",
                            overflowY: "scroll",
                        }}>
                            {arr.map(element => {
                                return (
                                    <input style={{textAlign:"center", minHeight: "35px", marginBottom: "5px"}} id="reps-input" type="number" required={true}/>
                                )
                            })}
                        </div>
                        <img src={DownIcon} alt="Down"/>
                    </div>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}>
                        <img src={UpIcon} alt="Up"/>
                        <div id={`${exercise.name}weights`} style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            height: "35px",
                            width: "40px",
                            overflowY: "scroll",
                        }}>
                            {arr.map(element => {
                                return (
                                    <input style={{textAlign:"center", minHeight: "35px", marginBottom: "20px"}} id="weight-input" type="number" required={true}/>
                                )
                            })}
                        </div>
                        <img src={DownIcon} alt="Down"/>
                    </div>
                </div>
            </div>
        </div>
 
    )
}

export default ExerciseInWorkout;