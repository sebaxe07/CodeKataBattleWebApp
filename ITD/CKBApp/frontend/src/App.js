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
import { SignUpSlides } from "./views/auth/UserSignUp";
import Sidebar from "./components/utils/Sidebar";
import { RegisterProvider } from "./services/providers/RegisterProvider";
import { UserProvider } from "./services/providers/UserProvider";
import ProtectedRouteGroup from "./services/ProtectedRouteGroup";

import { StudentHome } from "./views/student/StudentHome";
import { ProfileStudents } from "./views/student/ProfileStudents";
import { BattleDetails } from "./views/student/BattleDetails";

import { EducatorHome } from "./views/educator/EducatorHome";
import { ManageTournament } from "./views/educator/Tournament/manageTournament";
import { CreateTournament } from "./views/educator/Tournament/createTournament";
import { ManageBattle } from "./views/educator/Battle/manageBattle";
import { CreateBattle } from "./views/educator/Battle/createBattle";
import { EditTournament } from "./views/educator/Tournament/editTournament";
import { EditBattle } from "./views/educator/Battle/editBattle";
import { ProfileEducator } from "./views/educator/ProfileEducator";
import { JoinTournament } from "./views/student/joinTournament";

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
                <Route path="profile" element={<ProfileStudents />} />
                <Route path="battle/:id" element={<BattleDetails />} />
                <Route path="*" element={<Navigate to="home" />} />
              </Route>
              <Route path="/educator" element={<Sidebar />}>
                <Route index element={<Navigate to="home" />} />
                <Route path="home" element={<EducatorHome />} />
                <Route path="profile" element={<ProfileEducator />} />
                <Route path="tournament">
                  <Route index element={<Navigate to="home" />} />
                  <Route path="manage/:id">
                    <Route index element={<ManageTournament />} />
                    <Route path="edit" element={<EditTournament />} />
                  </Route>
                  <Route path="create" element={<CreateTournament />} />
                  <Route path=":id/battle">
                    <Route index element={<Navigate to="home" />} />
                    <Route path="manage/:bid">
                      <Route index element={<ManageBattle />} />
                      <Route path="edit" element={<EditBattle />} />
                    </Route>
                    <Route path="create" element={<CreateBattle />} />
                  </Route>
                </Route>
                <Route path="*" element={<Navigate to="home" />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </UserProvider>
    </ChakraProvider>
  );
}

export default App;
