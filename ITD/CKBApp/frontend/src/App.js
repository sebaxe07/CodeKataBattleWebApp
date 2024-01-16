import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Login } from "./views/auth/Login";
import { StudentHome } from "./views/student/StudentHome";
import { SignUpSlides } from "./views/auth/UserSignUp";
import Sidebar from "./components/utils/Sidebar";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUpSlides />} />
        <Route path="/student" element={<Sidebar />}>
          <Route index element={<Navigate to="home" />} />
          <Route path="home" element={<StudentHome />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
