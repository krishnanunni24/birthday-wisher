import { Navigate, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import LandingPage from "./pages/LandingPage";
import BirthdayInfo from "./pages/BirthdayInfo";
import MoreInfo from "./pages/MoreInfo";
import MoreDetails from "./pages/MoreDetails";
import Lyrics from "./pages/Lyrics";
import SongReady from "./pages/SongReady";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useReducer } from "react";
import { formDataReducer, initialState } from "./context/reducer";
import { FormDataContext } from "./context/context";
function App() {
  const [formData, dispatch] = useReducer(formDataReducer, initialState);


  return (
    <>
        <FormDataContext.Provider value={{ formData, dispatch }}>

    <ToastContainer/>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register page={1}/>} />
        <Route path="/birthday-info" element={<BirthdayInfo page={2} />} />
        <Route path="/more-info" element={<MoreInfo page={3}/>} />
        <Route path="/more-details" element={<MoreDetails page={4}/>} />
        <Route path="/lyrics" element={<Lyrics page={5}/>} />
        <Route path="/ready" element={<SongReady page={6}/>}/>
      </Routes>
      </FormDataContext.Provider>

    </>
  );
}

export default App;
