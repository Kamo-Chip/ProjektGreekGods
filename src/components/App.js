import '../App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from "./Register";
import Routines from "./Routines";
import CreateWorkout from './CreateWorkout';
import Login from './Login';
import WorkoutDetailsContainer from './WorkoutDetailsContainer';
import Nav from "./Nav";
import ProgressContainer from "./ProgressContainer";
import Settings from "./Settings";
import Comment from "./Comment";
import ProgressWorkoutTab from './ProgressWorkoutTab';
import WorkoutHistoryDetail from './WorkoutHistoryDetail';

const App = () => {
  return (
          <BrowserRouter>
            <Routes>
                <Route path="/" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/home" element={<Routines/>}/>
                <Route path="/home/:title" element={<WorkoutDetailsContainer/>}/>
                <Route path="/createWorkout" element={<CreateWorkout/>}/>
                <Route path="/progress" element={<ProgressContainer/>}/>
                <Route path="/settings" element={<Settings/>}/>
                <Route path="/comment/:title" element={<Comment/>}/>
                <Route path="/progress/:title" element={<ProgressWorkoutTab/>}/>
                <Route path="/progress/:title/:id" element={<WorkoutHistoryDetail/>}/>
            </Routes>
            <Nav/>
          </BrowserRouter>
  )
}
export default App;
