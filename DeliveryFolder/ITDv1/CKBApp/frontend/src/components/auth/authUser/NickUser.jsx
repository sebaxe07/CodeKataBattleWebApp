import React, { useState, useEffect, useContext } from "react";
import { TextField } from "../../common/textfield";
import { Text } from "../../common/text";
import { RegisterContext } from "../../../services/contexts/RegisterContext";

export const NameUser = () => {
  const { userData, setUserData } = useContext(RegisterContext);

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
        fontType="font-bold"
      />
      <div className="flex justify-center">
        <TextField
          type={"text"}
          placeholder="Username"
          value={userData.username}
          onChange={(e) =>
            setUserData({
              ...userData,
              username: e.target.value, // replace key and value with your actual data
            })
          }
        />
      </div>
    </div>
  );
};

export default NameUser;
