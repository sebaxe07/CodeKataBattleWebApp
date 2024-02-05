import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../services/api";
import { Button } from "../../components/common/Button";
import { TextField } from "../../components/common/textfield";
import { Text } from "../../components/common/text";
import { ReactComponent as Logo } from "../../assets/images/Logo.svg";
import { ReactComponent as Codekatabattle } from "../../assets/images/codekatabattle.svg";
import { LoadingScreen } from "../../services/LoadingScreen";
import { useToast } from "@chakra-ui/react";

export const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault();

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

      const response = await axios.post("/auth/users/reset_password/", {
        email,
      });
      // console.log(response.data); // Handle the response as needed
      // Inform the user that an email has been sent
      toast({
        title: "Password reset email sent!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      // Redirect the user to the login page
      navigate("/");
    } catch (error) {
      console.error("Error sending reset password email:", error);
      // Display an error message
      toast({
        title: "Error sending reset password email!",
        status: "error",
        duration: 3000,
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
            text={["Forgot your password?"]}
            size="text-[40px]"
            fontColor="text-white"
            fontType="font-black"
          />
          <Text
            text={["Enter your email to receive", "a password reset link"]}
            size="text-[16px]"
            fontColor="text-white"
            fontType="font-medium"
            className="leading-tight"
          />
          <TextField
            type={"email"}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button name="Request reset link" onClick={handleSubmit} />
        </div>
      </div>
      <Text
        text={["Already have an account? Login here"]}
        size="text-[16px]"
        fontColor="text-accentsecondary"
        fontType="font-medium"
        className="cursor-pointer mt-[23px] hover:text-[#E951C5]"
        onClick={() => navigate("/")}
      />
      <Codekatabattle className="absolute bottom-[57px] right-[57px]" />
    </div>
  );
};

export default PasswordReset;
