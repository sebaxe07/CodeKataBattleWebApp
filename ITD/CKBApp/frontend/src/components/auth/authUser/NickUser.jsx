import React, { useState, useEffect } from "react";
import { TextField } from "../../common/textfield";
import { Text } from "../../common/text";

export const NameUser = () => {
  const [nickname, setNickname] = useState("");

  // Nickname Screen
  return (
    <div>
      <Text
        text={["Create an username"]}
        size="text-[32px]"
        fontColor="text-white"
        fontType="font-black"
      />
      <Text
        text={["This is how other Seito will see you.", "Choose a cool one!"]}
        size="text-[16px]"
        fontColor="text-white"
        fontType="font-black"
      />
      <div className="flex justify-center">
        <TextField
          type={"text"}
          placeholder="Nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
      </div>
    </div>
  );
};

export default NameUser;
