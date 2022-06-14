import '../App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from "./Register";
import Home from "./Home";
import CreateWorkout from './CreateWorkout';
import Login from './Login';
import WorkoutDetails from './WorkoutDetails';
import Nav from "./Nav";
import ProgressContainer from "./ProgressContainer";
import Settings from "./Settings";
import Comment from "./Comment";
import ProgressWorkoutTab from './ProgressWorkoutTab';

const App = () => {
  return (
          <BrowserRouter>
            <Routes>
                <Route path="/" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/home/:title" element={<WorkoutDetails/>}/>
                <Route path="/createWorkout" element={<CreateWorkout/>}/>
                <Route path="/progress" element={<ProgressContainer/>}/>
                <Route path="/settings" element={<Settings/>}/>
                <Route path="/comment/:title" element={<Comment/>}/>
                <Route path="/progress/:title" element={<ProgressWorkoutTab/>}/>
            </Routes>
            <Nav/>
          </BrowserRouter>
  )
}
export default App;
