import React, { useState } from "react";
import { RegisterContext } from "../contexts/RegisterContext";

export const RegisterProvider = ({ children }) => {
  const [userData, setUserData] = useState({});

  return (
    <RegisterContext.Provider value={{ userData, setUserData }}>
      {children}
    </RegisterContext.Provider>
  );
};
