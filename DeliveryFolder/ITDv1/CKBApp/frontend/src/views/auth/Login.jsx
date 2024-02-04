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
import { UserContext } from "../../services/contexts/UserContext";
import { LoadingScreen } from "../../services/LoadingScreen";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Portal,
} from "@chakra-ui/react";
import { forwardRef } from "react";

import PassHide from "../../assets/icons/passHide.svg";
import PassShow from "../../assets/icons/passShow.svg";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [autoLog, setAutoLog] = useState(false);

  const { activeUser, setActiveUser } = useContext(UserContext);
  const [passwordType, setPasswordType] = useState("password");

  const togglePasswordVisibility = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  const [rememberMe, setRememberMe] = useState(false);
  const toast = useToast();
  const fetchUserData = useFetchUserData();
  const navigate = useNavigate();

  const FocusableText = forwardRef((props, ref) => (
    <button ref={ref} onClick={props.onClick} className={props.className}>
      <Text {...props} />
    </button>
  ));

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      fetchUserData(authToken);
      setAutoLog(true);
      toast({
        title: "Welcome back!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  }, []);

  useEffect(() => {
    // Check if activeUser is not null or undefined
    console.log("Active User:", activeUser);
    if (activeUser && autoLog) {
      // Navigate to the new page
      if (activeUser.user_profile.role === "educator") {
        navigate("/educator");
      } else {
        navigate("/student");
      }
    }
  }, [activeUser, autoLog]);

  async function resendActivationEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailCorrect = emailRegex.test(email);

    if (!isEmailCorrect) {
      toast({
        title: "Please input a valid email",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      setIsLoading(true);

      const response = await axios.post("/auth/users/resend_activation/", {
        email,
      });
      console.log(response.data);
      toast({
        title: "Activation email sent!",
        description: "Please check your email to activate your account.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error resending activation email.",
        description: "Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.error("Error resending activation email:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      username: username,
      password: password,
    };

    setIsLoading(true); // Set loading to true when login starts

    try {
      const response = await axios.post("/auth/token/login/", payload);
      console.log(response.data); // Handle the response as needed
      const data = response.data;
      const authToken = data.auth_token;

      fetchUserData(authToken);

      if (rememberMe) {
        // Save the token in local storage if "Remember Me" is checked
        localStorage.setItem("authToken", authToken);
      }
      setAutoLog(true);
      toast({
        title: "Welcome back!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Unable to log in.",
        description:
          "Please check your credentials and make sure your account is active",
        status: "error",
        duration: 5000,
        isClosable: true,
      });

      console.error("Error Login in user:", error);
    } finally {
      setIsLoading(false); // Set loading to false when login ends
    }
  };

  // Login Screen
  return (
    <div className="bg-bgsecondary flex flex-col justify-center items-center h-screen w-screen">
      {isLoading && <LoadingScreen />}
      {/* Render LoadingScreen when isLoading is true */}
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
          <div className="flex flex-col justify-between w-[100%] -space-y-3">
            <Text
              text={["Forgot password?"]}
              size="text-[16px]"
              fontColor="text-accentprimary"
              fontType="font-medium"
              onClick={() => navigate("/passwordreset")}
              className="cursor-pointer hover:text-gray-300"
            />
            <Popover>
              <PopoverTrigger>
                <FocusableText
                  text={["Resend Activation Email?"]}
                  size="text-[16px]"
                  fontColor="text-accentprimary"
                  fontType="font-medium"
                  className="cursor-pointer hover:text-gray-300"
                />
              </PopoverTrigger>
              <PopoverContent className="relative">
                <PopoverArrow />
                <PopoverHeader>Enter your Email</PopoverHeader>
                <PopoverCloseButton />
                <PopoverBody className="flex flex-col justify-center items-center">
                  <TextField
                    type={"email"}
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Button
                    className="mt-2"
                    name="Send Activation email"
                    onClick={() => resendActivationEmail(email)}
                  />
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </div>
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
