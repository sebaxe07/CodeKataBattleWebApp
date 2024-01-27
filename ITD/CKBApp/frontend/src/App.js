import "./App.css";
import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import { Login } from "./views/auth/Login";
import { PasswordReset } from "./views/auth/PasswordReset";
import { PasswordConfirm } from "./views/auth/PasswordConfirm";
import { ActivationPage } from "./views/auth/ActivationPage";
import { StudentHome } from "./views/student/StudentHome";
import { JoinTournament } from "./views/student/joinTournament";
import { ProfileStudents } from "./views/student/ProfileStudents";
import { SignUpSlides } from "./views/auth/UserSignUp";
import Sidebar from "./components/utils/Sidebar";
import { RegisterProvider } from "./services/providers/RegisterProvider";
import { UserProvider } from "./services/providers/UserProvider";
import ProtectedRouteGroup from "./services/ProtectedRouteGroup";

import { LoadingScreen } from "./services/LoadingScreen";

function App() {
  return (
    <ChakraProvider>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/passwordreset" element={<PasswordReset />} />
            <Route path="/activate/:uid/:token/" element={<ActivationPage />} />
            <Route
              path="/newpassword/:uid/:token/"
              element={<PasswordConfirm />}
            />
            <Route
              path="/signup"
              element={
                <RegisterProvider>
                  <SignUpSlides />
                </RegisterProvider>
              }
            />
            <Route element={<ProtectedRouteGroup />}>
              <Route path="/student" element={<Sidebar />}>
                <Route index element={<Navigate to="home" />} />
                <Route path="home" element={<StudentHome />} />
                <Route path="joinTournament" element={<JoinTournament />} />
                <Route path="studentProfile" element={<ProfileStudents />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </UserProvider>
    </ChakraProvider>
  );
}

export default App;
