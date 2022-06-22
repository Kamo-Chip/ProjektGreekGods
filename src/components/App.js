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
import PrivateRoute from "./PrivateRoute";
import { auth, db} from "../firebase";
import { useState, useEffect } from 'react';
import { UnitsContext, units } from '../contexts/units-context';
import { ThemeContext, themes } from '../contexts//theme-context';
import Loading from './Loading';
import { getDoc, doc } from 'firebase/firestore';

const App = () => {
  const [ unit, setUnit ] = useState();

  const [ theme, setTheme ] = useState(themes.light);

  const setUnits = (newUnits) => {
    setUnit(newUnits)
  }

  const setThemes = (newUnits) => {
    setTheme(newUnits)
  }

  const setSettings = async () => {
    let settings = {theme: themes.light, units: units.metric};
    let user = localStorage.getItem("user");
    const loggedInUser = JSON.parse(user);

    if(loggedInUser != null){  
      await getDoc(doc(db, loggedInUser.uid, "settings"))
      .then(result => {
        let data = result.data();
        settings.theme = themes[data.theme];
        settings.units = units[data.units];
      })
      .catch(err => console.log(err));
    }

    setTheme(settings.theme);
    setUnit(settings.units);
  }

  useEffect(()=> {
    setSettings();
    let bgColor = theme.bgColor;
    let color1 = theme.color1;
    let color6 = theme.color6;

    const root = document.querySelector(":root");

    root.style.setProperty("--bg-color", bgColor);
    root.style.setProperty("--color-1", color1);
    root.style.setProperty("--color-6", color6);
  }, [theme]);

  return (
    <UnitsContext.Provider value={unit}>
          <BrowserRouter>
            <Routes>
                <Route path="/" element={<Loading/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route element={<PrivateRoute/>}>
                  <Route path="/home" element={<Routines/>}/>
                  <Route path="/home/:title" element={<WorkoutDetailsContainer/>}/>
                  <Route path="/createWorkout" element={<CreateWorkout/>}/>
                  <Route path="/progress" element={<ProgressContainer/>}/>
                  <Route path="/settings" element={<Settings setUnits={setUnits} setTheme={setThemes} theme={theme}/>}/>
                  <Route path="/comment/:title" element={<Comment/>}/>
                  <Route path="/progress/:title" element={<ProgressWorkoutTab/>}/>
                  <Route path="/progress/:title/:id" element={<WorkoutHistoryDetail/>}/>
                </Route>
            </Routes>
            <Nav/>
          </BrowserRouter>
    </UnitsContext.Provider>
  )
}
export default App;
