import React, { useState } from "react";
import { TextField } from "../../common/textfield";
import { Text } from "../../common/text";
import { ReactSVG } from "react-svg";

import PassHide from "../../../assets/icons/passHide.svg";
import PassShow from "../../../assets/icons/passShow.svg";

const SignupForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [eMail, setEMail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [passwordValid, setPasswordValidation] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
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
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <TextField
            type={"text"}
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <TextField
            type={"text"}
            placeholder="e-Mail"
            value={eMail}
            onChange={(e) => setEMail(e.target.value)}
          />
        </div>
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
        <div>
          <TextField
            type={"password"}
            placeholder="Confirm Password"
            value={passwordValid}
            onChange={(e) => setPasswordValidation(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
