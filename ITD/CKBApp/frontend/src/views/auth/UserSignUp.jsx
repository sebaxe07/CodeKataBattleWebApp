import React, { useState, useEffect, useContext } from "react";
import { ReactComponent as Logo } from "../../assets/images/Logo.svg";
import { useNavigate } from "react-router-dom";
import { Text } from "../../components/common/text";
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
import { useFetchUserData } from "../../services/useFetchUserData";
import { LoadingScreen } from "../../services/LoadingScreen";

import {
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
} from "@chakra-ui/react";
import {
  ChakraProvider,
  ColorModeProvider,
  extendTheme,
} from "@chakra-ui/react";

import axios from "../../services/api";

const colorSchemes = [
  {
    background: "bg-bgsecondary",
    menu: "bg-bgprimary",
    shadow: "bg-shadowbox",
    stepper: "colorStudent",
  },
  {
    background: "bg-[#19362D]",
    menu: "bg-bgeducator",
    shadow: "bg-[#265F4C]",
    stepper: "colorEducator",
  },
];

const customTheme = extendTheme({
  colors: {
    colorStudent: {
      500: "#BAAFFF",
    },
    colorEducator: {
      500: "#B4FFE6",
    },
  },
});

export const SignUpSlides = () => {
  const [slide, setSlide] = useState(0);
  const registerContext = useContext(RegisterContext);
  const toast = useToast();
  const navigate = useNavigate();
  const fetchUserData = useFetchUserData();
  const [isLoading, setIsLoading] = useState(false);

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

  const [colorScheme, setColorScheme] = useState(colorSchemes[0]);
  const [slideDirection, setDirection] = useState("right");

  useEffect(() => {
    setColorScheme(colorScheme[0]);
    setColorScheme(
      colorSchemes[registerContext.userData.userType == "educator" ? 1 : 0]
    );
  }, [registerContext]);

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
      component: (
        <UserType
          context={
            registerContext.userData.userType == "educator" ? "SENSEI" : ""
          }
        />
      ),
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
    setIsLoading(true);
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

      // Send activation email
      await axios.post("/auth/users/resend_activation/", { email: eMail });
      toast({
        title: "User registered successfully, please login",
        description: "Please check your email to confirm your account",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/");
    } catch (error) {
      console.error("Error Registering user:", error);

      // Display an error message
      let errorMessage = null;
      if (error.response && error.response.data) {
        const errors = error.response.data;
        if (typeof errors === "string") {
          // If errors is a stringified JSON, parse it
          try {
            const parsedErrors = JSON.parse(errors);
            if (
              parsedErrors.user_profile &&
              parsedErrors.user_profile.github_username
            ) {
              errorMessage = parsedErrors.user_profile.github_username[0];
            } else {
              errorMessage = errors;
            }
          } catch (e) {
            errorMessage = errors;
          }
        } else if (errors.user_profile && errors.user_profile.github_username) {
          errorMessage = errors.user_profile.github_username[0];
        } else {
          for (const key in errors) {
            if (errors[key] instanceof Array) {
              errorMessage = errors[key].join(" ");
            } else {
              errorMessage = errors[key];
            }
          }
        }
      }
      if (typeof errorMessage === "object") {
        errorMessage = JSON.stringify(errorMessage);
      }
      toast({
        title: "Error Creating account! Please try again.",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextClick = () => {
    setDirection("right");
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
    setDirection("left");
    if (slide > 0) {
      setSlide(slide - 1);
    }
  };

  const { activeStep, setActiveStep } = useSteps({
    index: slide,
    count: screens.length,
  });

  // Login Screen
  return (
    <div
      className={`${colorScheme.background} transition-colors duration-1000 flex flex-col justify-center items-center h-screen w-screen`}
    >
      {isLoading && <LoadingScreen />}
      <Logo />
      <div
        className={`mt-[22px] w-[770px] h-[526px] ${colorScheme.shadow} transition-colors duration-1000 rounded-[36px]`}
      >
        <div
          className={`w-[760px] h-[520px] ${colorScheme.menu} transition-colors duration-1000 rounded-[36px] flex flex-col justify-center items-center space-y-5`}
        >
          <div className="flex h-[430px] w-full items-center justify-center overflow-hidden">
            <Slide key={slide} direction={slideDirection}>
              {screens[slide].component}
            </Slide>
          </div>
          <div className="flex-row  flex w-full justify-around ">
            <div className="flex flex-row items-center text-white">
              <ChakraProvider theme={customTheme}>
                <ColorModeProvider options={{ useSystemColorMode: true }}>
                  <Stepper
                    size="sm"
                    colorScheme={colorScheme.stepper}
                    index={slide}
                  >
                    {screens.map((index) => (
                      <Step key={index}>
                        <StepIndicator>
                          {slide == index ? (
                            <StepStatus
                              active={<StepNumber />}
                              incomplete={<StepNumber />}
                            />
                          ) : (
                            <StepStatus
                              complete={<StepIcon />}
                              incomplete={<StepNumber />}
                              active={<StepNumber />}
                            />
                          )}
                        </StepIndicator>
                      </Step>
                    ))}
                  </Stepper>
                </ColorModeProvider>
              </ChakraProvider>
            </div>
            {slide > 0 ? (
              <Button
                name="Back"
                backg={"bg-[#BAAFFF]"}
                onClick={() => handleBackClick()}
              />
            ) : null}
            <Button name="Next" onClick={() => handleNextClick()} />
          </div>
        </div>
      </div>
      <div>
        <Text
          text={["I already have an account"]}
          size="text-[16px]"
          fontColor="text-accentsecondary"
          fontType="font-medium"
          className="cursor-pointer mt-[23px] hover:text-[#E951C5]"
          onClick={() => navigate("/")}
        />
        <Codekatabattle className="absolute bottom-[57px] right-[57px]" />
      </div>
    </div>
  );
};

export default SignUpSlides;
