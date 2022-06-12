import '../App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from "./Register";
import Home from "./Home";
import CreateWorkout from './CreateWorkout';
import Login from './Login';
import WorkoutDetails from './WorkoutDetails';
import Nav from "./Nav";
import Progress from "./Progress";
import Settings from "./Settings";
import Comment from "./Comment";

const App = () => {
  return (
          <BrowserRouter>
            <Routes>
                <Route path="/" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/home/:title" element={<WorkoutDetails/>}/>
                <Route path="/createWorkout" element={<CreateWorkout/>}/>
                <Route path="/progress" element={<Progress/>}/>
                <Route path="/settings" element={<Settings/>}/>
                <Route path="/comment/:title" element={<Comment/>}/>
            </Routes>
            <Nav/>
          </BrowserRouter>
  )
}
export default App;
