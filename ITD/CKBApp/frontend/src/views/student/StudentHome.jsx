import React /*, { useState, useEffect }*/ from "react";
//import axios from "../../services/api";
import Button from "../../components/common/Button";
//import { TextField } from "../../components/common/textfield";
//import { Text } from "../../components/common/text";
import { ReactComponent as Logo } from "../../assets/images/Logo.svg";
import Sidebar from "../../components/utils/Sidebar";

export const StudentHome = () => {
  return (
    <div className="bg-bgsecondary flex flex-col justify-center items-center h-screen w-screen">
      <Sidebar />
      <Logo />
    </div>
  );
};

export default StudentHome;
