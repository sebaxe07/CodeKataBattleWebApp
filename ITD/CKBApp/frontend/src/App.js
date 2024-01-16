import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./views/auth/Login";
import { StudentHome } from "./views/student/StudentHome";
import {SignUpSlides} from "./views/auth/UserSignUp";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/student" element={<StudentHome />} />
        <Route path="/signup" element={<SignUpSlides />} />
      </Routes>
    </Router>
    
  );
}

export default App;
