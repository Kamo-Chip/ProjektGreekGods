import '../App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from "./Register";
import Home from "./Home";
import CreateWorkout from './CreateWorkout';
import Login from './Login';
import WorkoutDetails from './WorkoutDetails';

const App = () => {
  return (
      <div>
          <BrowserRouter>
            <Routes>
                <Route path="/" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/home/:title" element={<WorkoutDetails/>}/>
                <Route path="/createWorkout" element={<CreateWorkout/>}/>
            </Routes>
          </BrowserRouter>
      </div>
  )
}
export default App;
