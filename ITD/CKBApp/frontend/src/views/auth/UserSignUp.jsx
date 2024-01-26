import React, { useState, useEffect, useContext } from "react";
import { ReactComponent as Logo } from "../../assets/images/Logo.svg";
import { Button } from "../../components/common/Button";
import { ReactComponent as Codekatabattle } from "../../assets/images/codekatabattle.svg";
import UserType from "../../components/auth/authUser/UserType";
import SignupForm from "../../components/auth/authUser/SignupForm";
import NameUser from "../../components/auth/authUser/NickUser";
import SchoolName from "../../components/auth/authUser/SchoolUser";
import GithubAcc from "../../components/auth/authUser/GithubUser";
import AvatarSelec from "../../components/auth/authUser/AvatarUser";
import { RegisterContext } from "../../services/contexts/RegisterContext";
import { Slide } from "react-awesome-reveal";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useFetchUserData } from "../../services/useFetchUserData";

import axios from "../../services/api";

export const SignUpSlides = () => {
  const [slide, setSlide] = useState(0);
  const registerContext = useContext(RegisterContext);
  const toast = useToast();
  const navigate = useNavigate();
  const fetchUserData = useFetchUserData();

  const showToast = (title) => {
    toast({
      title,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };

  function closeAll() {
    toast.closeAll();
  }

  const validateSignupForm = () => {
    closeAll();
    const { password, passwordValid, eMail, firstName, lastName } =
      registerContext.userData;

    // Check if passwords are equal
    const arePasswordsEqual = password === passwordValid;

    const isPasswordInputted = password !== undefined && password !== "";

    // Check if email is correct. This is a simple check and might not cover all cases.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailCorrect = emailRegex.test(eMail);

    // Check if first and last name are inputted
    const isFirstNameInputted = firstName !== undefined && firstName !== "";
    const isLastNameInputted = lastName !== undefined && lastName !== "";

    // Set error messages if needed
    const conditions = [
      { isValid: isFirstNameInputted, message: "Please input your first name" },
      { isValid: isLastNameInputted, message: "Please input your last name" },
      { isValid: isEmailCorrect, message: "Email is not correct" },
      { isValid: isPasswordInputted, message: "Please input a password" },
      { isValid: arePasswordsEqual, message: "Passwords do not match" },
    ];

    conditions.forEach(({ isValid, message }) => {
      if (!isValid) {
        showToast(message);
      }
    });

    // Return true if all conditions are met
    return (
      isPasswordInputted &&
      arePasswordsEqual &&
      isEmailCorrect &&
      isFirstNameInputted &&
      isLastNameInputted
    );
  };

  function isValidGitHubUsername(username) {
    const regex =
      /^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}[a-zA-Z0-9]$/;
    return regex.test(username);
  }

  function isValidUsername(username) {
    const regex =
      /^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}[a-zA-Z0-9]$/;
    return regex.test(username);
  }

  const screens = [
    {
      component: <UserType />,
      buttonAction: () => setSlide(1),
      validate: () => registerContext.userData.userType !== undefined,
    },
    {
      component: <SignupForm />,
      buttonAction: () => setSlide(2),
      validate: validateSignupForm,
    },
    {
      component: <NameUser />,
      buttonAction: () => setSlide(3),
      validate: () =>
        registerContext.userData.username !== undefined &&
        registerContext.userData.username !== "" &&
        isValidUsername(registerContext.userData.username),
    },
    {
      component: <SchoolName />,
      buttonAction: () => setSlide(4),
      validate: () =>
        registerContext.userData.school !== undefined &&
        registerContext.userData.school !== "",
    },
    {
      component: <GithubAcc />,
      buttonAction: () => setSlide(5),
      validate: () =>
        registerContext.userData.githubacc !== undefined &&
        registerContext.userData.githubacc !== "" &&
        isValidGitHubUsername(registerContext.userData.githubacc),
    },
    {
      component: <AvatarSelec />,
      buttonAction: () => setSlide(6),
      validate: () => registerContext.userData.avatar !== undefined,
    },
  ];

  const handleSubmit = async (event) => {
    if (event) {
      event.preventDefault();
    }

    const {
      eMail,
      firstName,
      lastName,
      githubacc,
      password,
      school,
      userType,
      username,
      avatar,
    } = registerContext.userData;

    const payload = {
      username: username,
      email: eMail,
      password: password,
      first_name: firstName,
      last_name: lastName,
      user_profile: {
        role: userType,
        school: school,
        profile_icon: avatar,
        github_username: githubacc,
      },
    };

    try {
      const response = await axios.post("/ums/register/", payload);
      console.log(response.data);

      handleLogin();
    } catch (error) {
      console.error("Error Registering user:", error);
      showToast("That dind't work, please try again. Error Registering user");
    }
  };

  const handleLogin = async (event) => {
    if (event) {
      event.preventDefault();
    }

    const { password, username } = registerContext.userData;

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
        title: "Welcome to Codekata Battle! You are now registered.",
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

  const handleNextClick = () => {
    if (slide < screens.length) {
      if (screens[slide].validate()) {
        if (slide === screens.length - 1) {
          console.log("submit");
          console.log(registerContext.userData);
          handleSubmit();
          return;
        }
        screens[slide].buttonAction();
        console.log(registerContext);
      } else {
        console.log(registerContext);

        switch (slide) {
          case 0:
            showToast("Please select your role");
            break;
          case 2:
            showToast("Invalid username");
            break;
          case 3:
            showToast("Please enter your school");
            break;
          case 4:
            showToast("Invalid github account");
            break;
          case 5:
            showToast("Please select an avatar");
            break;
        }
      }
    }
  };
  const handleBackClick = () => {
    if (slide > 0) {
      setSlide(slide - 1);
    }
  };

  // Login Screen
  return (
    <div className="bg-bgsecondary flex flex-col justify-center items-center h-screen w-screen">
      <Logo />
      <div className="mt-[22px] w-[770px] h-[526px] bg-shadowbox rounded-[36px]">
        <div className="w-[759px] h-[520px] bg-bgprimary rounded-[36px] flex flex-col justify-center items-center space-y-5">
          <div className="flex m-10 h-[350px] items-center justify-center">
            <Slide direction="right">{screens[slide].component}</Slide>
          </div>
          <div className="flex m-20 w-[650px]  justify-end">
            <div>
              {/* <Button name="Back" onClick={() => handleBackClick()} /> */}
            </div>
            <div>
              <Button name="Next" onClick={() => handleNextClick()} />
            </div>
          </div>
        </div>
      </div>
      <div>
        <Codekatabattle className="absolute bottom-[57px] right-[57px]" />
      </div>
    </div>
  );
};

export default SignUpSlides;
