import "./App.css";
import React, { useState, useEffect } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import { Login } from "./views/auth/Login";
import { StudentHome } from "./views/student/StudentHome";
import { SignUpSlides } from "./views/auth/UserSignUp";
import Sidebar from "./components/utils/Sidebar";
import { RegisterProvider } from "./services/providers/RegisterProvider";
import { UserContext } from "./services/contexts/UserContext";

function App() {
  const [ActiveUser, setActiveUser] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      setActiveUser(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(ActiveUser));
  }, [ActiveUser]);

  return (
    <ChakraProvider>
      <UserContext.Provider value={{ ActiveUser, setActiveUser }}>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/signup"
              element={
                <RegisterProvider>
                  <SignUpSlides />
                </RegisterProvider>
              }
            />
            <Route path="/student" element={<Sidebar />}>
              <Route index element={<Navigate to="home" />} />
              <Route path="home" element={<StudentHome />} />
            </Route>
          </Routes>
        </Router>
      </UserContext.Provider>
    </ChakraProvider>
  );
}

export default App;
