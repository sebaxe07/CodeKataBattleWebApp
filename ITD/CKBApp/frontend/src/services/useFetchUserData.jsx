import React, { useContext, useEffect } from "react";
import axios from "./api";
import { UserContext } from "./contexts/UserContext";

/**
 * Custom hook to fetch and update user data based on the provided authentication token.
 *
 * @returns {Function} fetchUserData - Async function to fetch user data and update the UserContext.
 */
export function useFetchUserData() {
  // Access UserContext to get and set user data.
  const { activeUser, setActiveUser } = useContext(UserContext);

  /**
   * Async function to fetch user data using the provided authentication token.
   *
   * @param {string} authToken - Authentication token for making API requests.
   */
  return async function fetchUserData(authToken) {
    try {
      // Fetch user profile data from the "/ums/profile/" endpoint.
      const response = await axios.get("/ums/profile/", {
        headers: { Authorization: `Token ${authToken}` },
      });
      const userData = response.data;

      let roleprofile = null;

      try {
        // Based on the user's role (educator or student), fetch additional role-specific profile data.
        if (userData.user_profile.role === "educator") {
          const ProfileResponse = await axios.get(
            `/ums/educator-profile/${userData.user_profile.id}/`,
            {
              headers: { Authorization: `Token ${authToken}` },
            }
          );
          roleprofile = ProfileResponse.data;
          console.log(ProfileResponse.data);
        } else {
          const ProfileResponse = await axios.get(
            `/ums/student-profile/${userData.user_profile.id}/`,
            {
              headers: { Authorization: `Token ${authToken}` },
            }
          );
          roleprofile = ProfileResponse.data;
          console.log(ProfileResponse.data);
        }
      } catch (error) {
        console.error("Error getting profile: ", error);
        return;
      }

      // Structure user data with the required fields and update the active user.
      const userWithToken = {
        authToken: authToken,
        id: userData.id,
        roleid: roleprofile.id,
        username: userData.username,
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        user_profile: {
          id: userData.user_profile.id,
          role: userData.user_profile.role,
          school: userData.user_profile.school,
          github_username: userData.user_profile.github_username,
          profile_icon: userData.user_profile.profile_icon,
        },
      };
      console.log("User data with token:", userWithToken);

      // Update the active user in the UserContext and store in local storage.
      setActiveUser(userWithToken);
      localStorage.setItem("user", JSON.stringify(userWithToken));
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
}
