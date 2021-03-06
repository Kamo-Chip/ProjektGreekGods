import { useNavigate } from "react-router-dom";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db, auth, storage } from "../firebase";
import Attachment from "../images/attachment.svg";
import { useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { useEffect } from "react";

const Comment = ({workout}) => {
    const navigate = useNavigate();
    const [ progressPic, setProgressPic ] = useState(null);
    let [ srcImg, setImg ] = useState(null);

    const [ loading, setLoading ] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = await getDoc(doc(db, auth.currentUser.uid, "routines"))
        .catch(err => console.log(err));

        let workoutHistory = data.data().workoutHistory;

        workout.comment = document.querySelector(".comment").value;
        workout.dateCompleted = new Date();
        workout.id = `workout${workoutHistory.length}`
        
        setVolume();

        const imgRef = ref(storage, `images/${auth.currentUser.uid}/progressPic${workoutHistory.length}`);
        
        const snap = await uploadBytes(imgRef, srcImg);

        const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
        
        workout.progressPic = dlUrl;

        if(workoutHistory.length){
            compareVolumes(workout, workoutHistory);
        }else{
            workout.hasImproved = 0;
        }
    
        workoutHistory.push(workout);

        updateDoc(doc(db, auth.currentUser.uid, "routines"), {
            workoutHistory: workoutHistory,
        });

        navigate("/home");
    }

    const setVolume = () => {
        let volume = 0;
        for(let i = 0; i < workout.exercises.length; i++){
            let sumOfReps = 0;
            let sumOfWeights = 0;

            workout.exercises[i].reps.forEach((element) => {
                sumOfReps += (Number)(element);
            });
          
            workout.exercises[i].weights.forEach((element) => {
                sumOfWeights += (Number)(element);
            });
       
            workout.exercises[i].volume = sumOfReps * workout.exercises[i].sets * sumOfWeights;
            volume += sumOfReps * workout.exercises[i].sets * sumOfWeights;
        }
        workout.volume = volume;
        console.log(workout)
    }

    const getWorkoutByTitle = (title, history) => {
        let workouts = [];

        history.forEach(element => {
            if(element.title === title){
                workouts.push(element)
            }
        });

        return workouts;
    }

    const compareVolumes = (workout, history) => {
        let toCompare = 0;
        let groupedWorkoutHistory = {};

        for(let i = 0; i < history.length; i++){
            groupedWorkoutHistory[history[i].title] = getWorkoutByTitle(history[i].title, history);
        }
   
        const workouts = groupedWorkoutHistory[workout.title];

        if(workouts === undefined){
            workout.hasImproved = 0;
            return;
        }

        toCompare = workouts[0].volume;
        //must always be greater than first volume inorder to be improved
        for(let i = 0; i < workouts.length; i++){
            toCompare = workouts[i].volume;
            if(workout.volume > toCompare && workout.volume > workouts[0].volume){
                workout.hasImproved = 1;
                workout.improvedBy = ((workout.volume - toCompare) / toCompare) * 100;
            }else if(workout.volume === toCompare){
                workout.hasImproved = 0;
                workout.improvedBy = 0;
            }else{
                workout.hasImproved = -1;
                workout.improvedBy = ((workout.volume - toCompare) / toCompare) * 100;
            }
        }
    }

    const handleMediaChange = (e) => {
        setProgressPic(URL.createObjectURL(e.target.files[0]));
        setImg(e.target.files[0]);
    }

    return (
        <form className="comment-container" onSubmit={handleSubmit} style={{display: "none"}}>
            <h1 className="page-header">Post-Workout Comment</h1>
            <textarea className="comment" required={true}/>
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "1em 0",
                width: "100%",
                justifyContent: "space-between"
                }}>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "50%",
                    justifyContent: "space-between"
                }}>
                    <label htmlFor="progress-pic"><img src={Attachment} alt="attachment"/></label>
                    <input onChange={handleMediaChange} name="progress-pic" id="progress-pic" type="file" multiple accept="image/*" style={{
                        display: "none",
                    }}/>
                    <p style={{textAlign: "center", marginTop: "0", fontWeight: "bold"}}>Upload progress pic</p>
                </div>
                {progressPic ? <img style={{
                    width: "300px",
                }} src={progressPic} alt="progress pic" required={true}/>
                : null}
            </div>
            <button disabled={loading} style={{marginBottom: "1em"}}>{loading ? "Loading..." : "Done"}</button>
        </form>
    );
}

export default Comment;