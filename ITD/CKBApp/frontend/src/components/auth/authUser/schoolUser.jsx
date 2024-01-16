import React, { useState, useEffect } from "react";
import { TextField } from "../../common/textfield";
import { Text } from "../../common/text";

export const SchoolName = () => {
  const [schoolname, setSchoolName] = useState("");

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
          value={schoolname}
          onChange={(e) => setSchoolName(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SchoolName;
