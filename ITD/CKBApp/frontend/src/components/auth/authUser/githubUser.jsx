import React, { useState, useEffect } from "react";
import { Button } from "../../common/Button";
import { TextField } from "../../common/textfield";
import { Text } from "../../common/text";

export const GithubAcc = () => {
  const [githubacc, setGithub] = useState("");

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
          value={githubacc}
          onChange={(e) => setGithub(e.target.value)}
        />
      </div>
    </div>
  );
};

export default GithubAcc;
