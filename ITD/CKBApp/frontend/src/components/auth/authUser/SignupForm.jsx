import React, { useState, useContext, useEffect, useRef } from "react";
import { TextField } from "../../common/textfield";
import { Text } from "../../common/text";
import { ReactSVG } from "react-svg";
import { RegisterContext } from "../../../services/contexts/RegisterContext";

import PassHide from "../../../assets/icons/passHide.svg";
import PassShow from "../../../assets/icons/passShow.svg";

const SignupForm = ({}) => {
  const { userData, setUserData } = useContext(RegisterContext);

  const [passwordType, setPasswordType] = useState("password");

  const togglePasswordVisibility = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  const handleInputChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <Text
        text={["Register"]}
        size="text-[32px]"
        fontColor="text-white"
        fontType="font-black"
      />
      <div className="mt-5 flex justify-center flex-col gap-5">
        <div>
          <TextField
            type={"text"}
            placeholder="First Name"
            value={userData.firstName}
            onChange={handleInputChange}
            name="firstName"
          />
        </div>
        <div>
          <TextField
            type={"text"}
            placeholder="Last Name"
            value={userData.lastName}
            onChange={handleInputChange}
            name="lastName"
          />
        </div>
        <div>
          <TextField
            type={"email"}
            placeholder="e-Mail"
            value={userData.eMail}
            onChange={handleInputChange}
            autoComplete="off"
            name="eMail"
          />
        </div>
        <div className="flex flex-shrink-0 h-[42px] rounded-[14px] bg-white flex-end justify-around items-center pr-2">
          <TextField
            type={passwordType}
            placeholder="Password"
            value={userData.password}
            onChange={handleInputChange}
            autoComplete="new-password"
            name="password"
          />
          <button onClick={togglePasswordVisibility}>
            {passwordType === "password" ? (
              <ReactSVG src={PassHide} />
            ) : (
              <ReactSVG src={PassShow} />
            )}
          </button>
        </div>
        <div>
          <TextField
            type={"password"}
            placeholder="Confirm Password"
            value={userData.passwordValid}
            onChange={handleInputChange}
            name="passwordValid"
          />
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
