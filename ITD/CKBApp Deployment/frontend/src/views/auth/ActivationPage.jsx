import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "../../services/api";
import { Button } from "../../components/common/Button";
import { Text } from "../../components/common/text";
import { ReactComponent as Logo } from "../../assets/images/Logo.svg";
import { ReactComponent as Codekatabattle } from "../../assets/images/codekatabattle.svg";
import { useToast } from "@chakra-ui/react";

export const ActivationPage = () => {
  const { uid, token } = useParams();

  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const activateUser = async () => {
      try {
        const response = await axios.post("/auth/users/activation/", {
          uid,
          token,
        });
        // console.log(response.data); // Handle the response as needed
        // Inform the user that an email has been sent
        toast({
          title: "Account activation successful!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        console.error("Error activating account:", error);
        // Display an error message
      }
    };
    activateUser();
  }, []);

  return (
    <div className="bg-bgsecondary flex flex-col justify-center items-center h-screen w-screen">
      <Logo />
      <div className="mt-[22px] w-[600px] h-[482px] bg-shadowbox rounded-[36px]">
        <div className="w-[585px] h-[469px] bg-bgprimary rounded-[36px] flex flex-col justify-center items-center space-y-5">
          <Text
            text={["Account activation", "successful!"]}
            size="text-[40px]"
            fontColor="text-white"
            fontType="font-black"
          />
          <Text
            text={[
              "Your account has been activated successfully. You can now login to your account.",
            ]}
            size="text-[16px]"
            fontColor="text-white"
            fontType="font-medium"
            className="text-center leading-tight mx-3"
          />

          <Button name="Back to Login" onClick={() => navigate("/")} />
        </div>
      </div>
      <Codekatabattle className="absolute bottom-[57px] right-[57px]" />
    </div>
  );
};

export default ActivationPage;
