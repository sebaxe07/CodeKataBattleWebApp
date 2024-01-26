import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../services/api";
import { Button } from "../../components/common/Button";
import { TextField } from "../../components/common/textfield";
import { Text } from "../../components/common/text";
import { CheckBox } from "../../components/common/CheckBox";
import { ReactComponent as Logo } from "../../assets/images/Logo.svg";
import { ReactComponent as Codekatabattle } from "../../assets/images/codekatabattle.svg";
import { useToast } from "@chakra-ui/react";
import { useFetchUserData } from "../../services/useFetchUserData";
import { ReactSVG } from "react-svg";

import PassHide from "../../assets/icons/passHide.svg";
import PassShow from "../../assets/icons/passShow.svg";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [passwordType, setPasswordType] = useState("password");

  const togglePasswordVisibility = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  const [rememberMe, setRememberMe] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const fetchUserData = useFetchUserData();

  // Username and password are updated every time the user types in the input field
  useEffect(() => {
    console.log("username updated:", username);
  }, [username]);

  useEffect(() => {
    console.log("password updated:", password);
  }, [password]);

  useEffect(() => {
    console.log("rememberMe updated:", rememberMe);
  }, [rememberMe]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      username: username,
      password: password,
    };

    try {
      const response = await axios.post("/auth/token/login/", payload);
      console.log(response.data); // Handle the response as needed
      const data = response.data;
      localStorage.setItem("token", data.auth_token);
      fetchUserData(data.auth_token);
      toast({
        title: "Welcome back!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      // Redirect to home screen
      navigate("/student");
    } catch (error) {
      toast({
        title: "Error logging in. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error("Error Login in user:", error);
    }
  };

  // Login Screen
  return (
    <div className="bg-bgsecondary flex flex-col justify-center items-center h-screen w-screen">
      <Logo />
      <div className="mt-[22px] w-[373px] h-[482px] bg-shadowbox rounded-[36px]">
        <div className="w-[364px] h-[469px] bg-bgprimary rounded-[36px] flex flex-col justify-center items-center space-y-5">
          <Text
            text={["WELCOME", "BACK!"]}
            size="text-[40px]"
            fontColor="text-white"
            fontType="font-black"
          />
          <TextField
            type={"text"}
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className="flex flex-shrink-0 h-[42px] rounded-[14px] bg-white flex-end justify-around items-center pr-2">
            <TextField
              type={passwordType}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={togglePasswordVisibility}>
              {passwordType === "password" ? (
                <ReactSVG src={PassHide} />
              ) : (
                <ReactSVG src={PassShow} />
              )}
            </button>
          </div>

          <CheckBox
            onChange={(e) => setRememberMe(e.target.checked)}
            value={rememberMe}
          />
          <Button name="Login" onClick={handleSubmit} />

          <Text
            text={["Forgot password?"]}
            size="text-[16px]"
            fontColor="text-accentprimary"
            fontType="font-medium"
            className="cursor-pointer hover:text-gray-300"
          />
        </div>
      </div>
      <Text
        text={["I don't have an account"]}
        size="text-[16px]"
        fontColor="text-accentsecondary"
        fontType="font-medium"
        className="cursor-pointer mt-[23px] hover:text-[#E951C5]"
        onClick={() => navigate("/signup")}
      />
      <Codekatabattle className="absolute bottom-[57px] right-[57px]" />
    </div>
  );
};

export default Login;
