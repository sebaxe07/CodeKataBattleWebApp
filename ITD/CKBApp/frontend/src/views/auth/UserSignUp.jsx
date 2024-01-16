import React, { useState, useEffect } from "react";
import { ReactComponent as Logo } from "../../assets/images/Logo.svg";
import { Button } from "../../components/common/Button";
import { ReactComponent as Codekatabattle } from "../../assets/images/codekatabattle.svg";
import UserType from "../../components/auth/authUser/UserType";
import SignupForm from "../../components/auth/authUser/SignupForm";
import NameUser from "../../components/auth/authUser/NickUser";
import SchoolName from "../../components/auth/authUser/SchoolUser";
import GithubAcc from "../../components/auth/authUser/GithubUser";
import AvatarSelec from "../../components/auth/authUser/AvatarUser";

import { Slide } from "react-awesome-reveal";

export const SignUpSlides = () => {
  const [slide, setSlide] = useState(0);
  const screens = [
    {
      component: <UserType />,
      buttonAction: () => setSlide(1),
    },
    {
      component: <SignupForm />,
      buttonAction: () => setSlide(2),
    },
    {
      component: <NameUser />,
      buttonAction: () => setSlide(3),
    },
    {
      component: <SchoolName />,
      buttonAction: () => setSlide(4),
    },
    {
      component: <GithubAcc />,
      buttonAction: () => setSlide(5),
    },
    {
      component: <AvatarSelec />,
      buttonAction: () => setSlide(6),
    },
  ];

  const handleNextClick = () => {
    if (slide < screens.length - 1) {
      screens[slide].buttonAction();
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
