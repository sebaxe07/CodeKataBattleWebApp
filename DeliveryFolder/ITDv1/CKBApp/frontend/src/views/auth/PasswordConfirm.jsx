import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "../../services/api";
import { Button } from "../../components/common/Button";
import { TextField } from "../../components/common/textfield";
import { Text } from "../../components/common/text";
import { ReactComponent as Logo } from "../../assets/images/Logo.svg";
import { ReactComponent as Codekatabattle } from "../../assets/images/codekatabattle.svg";
import { useToast } from "@chakra-ui/react";
import { ReactSVG } from "react-svg";
import PassHide from "../../assets/icons/passHide.svg";
import PassShow from "../../assets/icons/passShow.svg";
import { LoadingScreen } from "../../services/LoadingScreen";

export const PasswordConfirm = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [passwordType, setPasswordType] = useState("password");
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if passwords are equal
    const arePasswordsEqual = password === passwordValid;

    const isPasswordInputted = password !== undefined && password !== "";

    if (!isPasswordInputted) {
      toast({
        title: "Please input a valid password",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!arePasswordsEqual) {
      toast({
        title: "Passwords do not match",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post("/auth/users/reset_password_confirm/", {
        uid: uid, // The user's ID, as included in the password reset link
        token: token, // The password reset token, as included in the password reset link
        new_password: password, // The new password
        re_new_password: passwordValid, // The new password, repeated for confirmation
      });
      console.log(response.data); // Handle the response as needed
      // Inform the user that an email has been sent
      toast({
        title: "Password reseted successfully, please login",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      // Redirect the user to the login page
      navigate("/");
    } catch (error) {
      console.error("Error resetting password:", error);
      // Display an error message
      let errorMessage = null;
      if (error.response && error.response.data) {
        const errors = error.response.data;
        for (const key in errors) {
          if (errors[key] instanceof Array) {
            errorMessage = errors[key].join(" ");
          } else {
            errorMessage = errors[key];
          }
        }
      }
      toast({
        title: "Error resetting password! Please try again.",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-bgsecondary flex flex-col justify-center items-center h-screen w-screen">
      {isLoading && <LoadingScreen />}
      <Logo />
      <div className="mt-[22px] w-[373px] h-[482px] bg-shadowbox rounded-[36px]">
        <div className="w-[364px] h-[469px] bg-bgprimary rounded-[36px] flex flex-col justify-center items-center space-y-5">
          <Text
            text={["Reset your password"]}
            size="text-[40px]"
            fontColor="text-white"
            fontType="font-black"
          />
          <Text
            text={["Enter your new passwod"]}
            size="text-[16px]"
            fontColor="text-white"
            fontType="font-medium"
            className="leading-tight"
          />
          <div className="flex flex-shrink-0 h-[42px] rounded-[14px] bg-white flex-end justify-around items-center pr-2">
            <TextField
              type={passwordType}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
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
              onChange={(e) => setPasswordValid(e.target.value)}
              autoComplete="off"
            />
          </div>

          <Button name="Reset password!" onClick={handleSubmit} />
        </div>
      </div>

      <Codekatabattle className="absolute bottom-[57px] right-[57px]" />
    </div>
  );
};

export default PasswordConfirm;
