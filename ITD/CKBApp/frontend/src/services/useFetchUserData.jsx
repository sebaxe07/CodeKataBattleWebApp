import { useContext } from "react";
import axios from "./api";
import { UserContext } from "./contexts/UserContext";

export function useFetchUserData() {
  const { setActiveUser } = useContext(UserContext);

  return async function fetchUserData(authToken) {
    try {
      const response = await axios.get("/ums/profile/", {
        headers: { Authorization: `Token ${authToken}` },
      });
      const userData = response.data;
      localStorage.setItem("user", JSON.stringify(userData)); // save user data in local storage
      setActiveUser(userData); // save user data in context

      console.log("User data:", userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
}
