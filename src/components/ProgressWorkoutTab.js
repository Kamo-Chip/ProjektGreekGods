import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react"
import { Timestamp } from "firebase/firestore";

const ProgressWorkoutTab = () => {
    const [ history, setHistory ] = useState([]);
    const location = useLocation();
    const { title } = useParams();

    useEffect(() => {
        setHistory(location.state.keys);
    }, [history]);

    const formatDate = (date) => {
        const dateTokens = date.toString().split(" ");

        const day = dateTokens[2];
        const month = dateTokens[1];
        
        return `Completed on: ${day} ${month}`;
    }

    const getVolume = () => {
        //weight * reps * sets
    }

    return (
        <div>
            <h1 className="page-header">{`${title} history`}</h1>
            {history.map(element => {
                return (
                    <Link to={`/progress/${title}/${element.id}`} state={{element}}>
                        <div className="workout">
                        {(formatDate(new Timestamp(element.dateCompleted.seconds, element.dateCompleted.nanoseconds).toDate()))}
                        </div>
                    </Link>
                )
            }) }
        </div>
    )
}

export default ProgressWorkoutTab;