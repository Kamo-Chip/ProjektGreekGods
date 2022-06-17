import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react"
import { Timestamp, updateDoc } from "firebase/firestore";
import formatDate from "../utils/formatDate";

const ProgressWorkoutTab = () => {
    const [ history, setHistory ] = useState([]);
    const location = useLocation();
    const { title } = useParams();

    useEffect(() => {
        setHistory(location.state.keys);
    }, []);

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        }}>
            <h1 className="page-header">{`${title} history`}</h1>
            <div style={{
                width: "95vw",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1em",
            }}>
                <div style={{display: "flex"}}>
                <div className="key-item" style={{backgroundColor: "rgb(58, 173, 58)"}}></div>
                <span style={{paddingLeft: ".2em"}}>Performance +</span>
                </div>
                <div style={{display: "flex"}}>
                <div className="key-item" style={{backgroundColor: "var(--color-4)"}}></div>
                <span style={{paddingLeft: ".2em"}}>Performance -</span>
                </div>
                <div style={{display: "flex"}}>
                <div className="key-item" style={{backgroundColor: "#969696"}}></div>
                <span style={{paddingLeft: ".2em"}}>No change</span>
                </div>
            </div>
            <div style={{width: "95vw"}}>
                {history.map(element => {
                    return (
                        <Link to={`/progress/${title}/${element.id}`} state={{element}}>
                            <div className={`workout ${
                                element.hasImproved > 0 ? "improved-workout" 
                                : element.hasImproved === 0 ? "no-progress-workout"
                                : "lost-progress-workout"}`}>
                            {(formatDate(new Timestamp(element.dateCompleted.seconds, element.dateCompleted.nanoseconds).toDate()))}
                            </div>
                        </Link>
                    )
                }) }
            </div>
        </div>
    )
}

export default ProgressWorkoutTab;