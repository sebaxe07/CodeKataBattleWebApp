import React, { useContext } from "react";
import { TextField } from "../../common/textfield";
import { Text } from "../../common/text";
import { RegisterContext } from "../../../services/contexts/RegisterContext";

export const GithubAcc = () => {
  const { userData, setUserData } = useContext(RegisterContext);

  // Login Screen
  return (
    <div>
      <Text
        text={["Github"]}
        size="text-[32px]"
        fontColor="text-white"
        fontType="font-black"
      />
      <Text
        text={[
          "Enter your Github aacount, this will allow you to upload your results.",
        ]}
        size="text-[16px]"
        fontColor="text-white"
        fontType="font-black"
      />
      <div className="flex justify-center">
        <TextField
          type={"text"}
          placeholder="Type your Github account"
          value={userData.githubacc}
          onChange={(e) =>
            setUserData({
              ...userData,
              githubacc: e.target.value, // replace key and value with your actual data
            })
          }
        />
      </div>
    </div>
  );
};

export default GithubAcc;
