import React, { useState, useEffect } from "react";
import { Button } from "../../components/common/Button";
import { TextField } from "../../components/common/textfield";
import { Text } from "../../components/common/text";
import { ReactComponent as Logo } from "../../assets/images/Logo.svg";
import { ReactComponent as Codekatabattle } from "../../assets/images/codekatabattle.svg";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Username and password are updated every time the user types in the input field
  useEffect(() => {
    console.log("username updated:", username);
  }, [username]);

  useEffect(() => {
    console.log("password updated:", password);
  }, [password]);

  // Login Screen
  return (
    <div className="bg-bgsecondary flex flex-col justify-center items-center h-screen w-screen">
      <Logo />
      <div className="mt-[22px] w-[373px] h-[463px] bg-shadowbox rounded-[36px]">
        <div className="w-[364px] h-[451px] bg-bgprimary rounded-[36px] flex flex-col justify-center items-center space-y-5">
          <Text
            text={["WELCOME", "BACK!"]}
            size="40px"
            fontColor="text-white"
            fontType="font-black"
          />
          <TextField
            type={"text"}
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            type={"password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Text
            text={["Forgot password?"]}
            size="16px"
            fontColor="text-accentprimary"
            fontType="font-medium"
            className="cursor-pointer "
          />

          <Button name="Login" onClick={() => console.log("Button clicked")} />
        </div>
      </div>
      <Text
        text={["I don't have an account"]}
        size="16px"
        fontColor="text-accentsecondary"
        fontType="font-medium"
        className="cursor-pointer mt-[23px]"
      />
      <Codekatabattle className="absolute bottom-[57px] right-[57px]" />
    </div>
  );
};

export default Login;
