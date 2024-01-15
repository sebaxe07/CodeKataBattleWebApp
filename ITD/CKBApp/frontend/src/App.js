import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./views/auth/Login";
import { StudentHome } from "./views/student/StudentHome";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/student" element={<StudentHome />} />
      </Routes>
    </Router>
  );
}

export default App;
