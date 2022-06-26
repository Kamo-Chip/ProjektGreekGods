import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react"
import { Timestamp, updateDoc } from "firebase/firestore";
import formatDate from "../utils/formatDate";
import { MdHelp } from "react-icons/md";
import Help from "./Help";

const ProgressWorkoutTab = () => {
    const [ history, setHistory ] = useState([]);
    const location = useLocation();
    const { title } = useParams();
    const [ helpIsActive, setHelpIsActive ] = useState(false);

    const helpData = {
        text: `<p>Workout with grey background = No change in performance.</p>
         <p>Workout with green background = Increase in performance.</p>
         <p>Workout with red background = Decrease in performance.</p>
         For workout to be considered as improved it's volume must be greater than the first workout's volume and the previous workout's volume`,
        imageSrc: null,
    }

    useEffect(() => {
        setHistory(location.state.keys);
    }, []);

    const displayHelp = () => {
        const helpScreen = document.querySelector(".help");
        helpScreen.style.display = "flex";
        setHelpIsActive(true);
    }

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        }}>
            <Help data={helpData} setIsActive={setHelpIsActive}/>
            <MdHelp onClick={displayHelp} size="30px" style={{
                position: "absolute",
                top: "0",
                left: "0",
                margin: ".5em 0 0 .5em",
            }}/>
            <h1 className="page-header">{`${title} history`}</h1>
            <div style={{display: "flex", flexDirection: "row", padding: "0 1em", justifyContent: "space-between", width: "100%"}}>
                <p className="page-header">Date Completed</p>
                <p className="page-header">&Delta; Volume</p>
            </div>
            <div style={{width: "95vw"}}>
                {history.map(element => {
                    return (
                        <Link to={`/progress/${title}/${element.id}`} state={{element}}>
                            <div className={`workout ${
                                element.hasImproved > 0 ? "improved-workout" 
                                : element.hasImproved === 0 ? "no-progress-workout"
                                : "lost-progress-workout"}`}>
                            <p>{(formatDate(new Timestamp(element.dateCompleted.seconds, element.dateCompleted.nanoseconds).toDate()))}</p>
                            {element.hasOwnProperty("improvedBy") ? <p>{element.hasImproved > 0 ? "+" : null}{((Number)(element.improvedBy)).toFixed(2)}%</p>
                            : !element.hasImproved ? <p>+0.00%</p> : null}
                            </div>
                        </Link>
                    )
                }) }
            </div>
        </div>
    )
}

export default ProgressWorkoutTab;