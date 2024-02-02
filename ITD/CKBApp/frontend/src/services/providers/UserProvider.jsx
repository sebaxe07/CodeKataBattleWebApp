import React, { useState, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { LoadingScreen } from "../LoadingScreen";

export const UserProvider = ({ children }) => {
  const [activeUser, setActiveUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      setActiveUser(JSON.parse(data));
    }
    setIsLoading(false); // Set loading to false after user data is retrieved
  }, []);

  useEffect(() => {
    if (activeUser) {
      // Only call localStorage.setItem if activeUser is not null
      localStorage.setItem("user", JSON.stringify(activeUser));
    }
  }, [activeUser]);

  return (
    <UserContext.Provider value={{ activeUser, setActiveUser, isLoading }}>
      {isLoading ? <LoadingScreen /> : children}
    </UserContext.Provider>
  );
};
