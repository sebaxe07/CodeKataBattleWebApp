import React, { useState, useContext } from "react";
import { TextField } from "../../common/textfield";
import { Text } from "../../common/text";
import { RegisterContext } from "../../../services/contexts/RegisterContext";

export const SchoolName = () => {
  const [schoolname, setSchoolName] = useState("");
  const { userData, setUserData } = useContext(RegisterContext);

  // School Screen
  return (
    <div>
      <Text
        text={["Enter your school name"]}
        size="text-[32px]"
        fontColor="text-white"
        fontType="font-black"
      />
      <Text
        text={[""]}
        size="text-[40px]"
        fontColor="text-white"
        fontType="font-black"
      />
      <div className="flex justify-center">
        <TextField
          type={"text"}
          placeholder="School Name"
          value={userData.school}
          onChange={(e) =>
            setUserData({
              ...userData,
              school: e.target.value, // replace key and value with your actual data
            })
          }
        />
      </div>
    </div>
  );
};

export default SchoolName;
