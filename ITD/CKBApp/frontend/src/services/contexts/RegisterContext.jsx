import React from "react";

export const RegisterContext = React.createContext({
  username: "",
  firstName: "",
  lastName: "",
  eMail: "",
  password: "",
  passwordValid: "",
  school: "",
  githubacc: "",
  avatar: "",
  userType: "",
});
