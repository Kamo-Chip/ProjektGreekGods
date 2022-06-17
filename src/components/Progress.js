import { Link } from "react-router-dom";

const Progress = ({ workoutHistory }) => {
    const groupedWorkoutHistory = {};

    const getTitles = () => {
        let titles = [];
        workoutHistory.forEach(element => {
            if(!titles.includes(element.title)){
                titles.push(element.title);
            }
        });
        return titles;
    }

    const titles = getTitles();

    const getWorkoutByTitle = (title) => {
        let workouts = [];

        workoutHistory.forEach(element => {
            if(element.title === title){
                workouts.push(element)
            }
        });

        return workouts;
    }

    const groupWorkouts = () => {

        titles.forEach(element => {
            groupedWorkoutHistory[element] = getWorkoutByTitle(element)
        })
    }

    groupWorkouts();

    return (
        <div className="progress">
            <div className="workouts-container">
                <h1 className="page-header">Workout History</h1>
                { workoutHistory.length === 0 && <p style={{textAlign: "center"}}>Past workout data will be show here</p> }
                {Object.keys(groupedWorkoutHistory).map(element => {
                    return (
                        <Link to={`/progress/${element}`} state={{keys: Object.values(groupedWorkoutHistory[element])}}>
                            <div className="workout">
                                <p>{element}</p>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default Progress;