import { Link } from "react-router-dom";

const Workout = ({ workout }) => {

    return (
        <Link to={`/home/${workout.title}`}>
            <div className="workout">
                <p>{workout.title}</p>
                <small>{workout.day}</small>
            </div>
        </Link>
    )
}

export default Workout;