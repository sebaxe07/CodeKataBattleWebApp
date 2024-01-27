import React from "react";

export const UserContext = React.createContext({
  authToken: "",
  id: "",
  username: "",
  first_name: "",
  last_name: "",
  email: "",
  user_profile: {
    role: "",
    school: "",
    github_username: "",
    profile_icon: "",
  },
});
