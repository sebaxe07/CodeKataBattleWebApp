import React, { useContext, useEffect } from "react";
import axios from "./api";
import { UserContext } from "./contexts/UserContext";

export function useFetchUserData() {
  const { activeUser, setActiveUser } = useContext(UserContext);

  return async function fetchUserData(authToken) {
    try {
      const response = await axios.get("/ums/profile/", {
        headers: { Authorization: `Token ${authToken}` },
      });
      const userData = response.data;
      const userWithToken = {
        authToken: authToken,
        id: userData.id,
        username: userData.username,
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        user_profile: {
          role: userData.user_profile.role,
          school: userData.user_profile.school,
          github_username: userData.user_profile.github_username,
          profile_icon: userData.user_profile.profile_icon,
        },
      };
      console.log("User data with token:", userWithToken);

      setActiveUser(userWithToken);
      localStorage.setItem("user", JSON.stringify(userWithToken));
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
}
