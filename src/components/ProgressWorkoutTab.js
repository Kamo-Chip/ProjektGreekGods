import { useLocation, useParams } from "react-router-dom";

const ProgressWorkoutTab = (props) => {
    //Add props to link
    const {title} = useParams();

    const stateValue = useLocation().state;

    console.log(stateValue)
    return (
        <div>
            <p>Progress tab</p>
        </div>
    )
}

export default ProgressWorkoutTab;