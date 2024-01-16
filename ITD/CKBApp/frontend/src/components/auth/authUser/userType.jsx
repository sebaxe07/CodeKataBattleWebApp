import React, { useState, useEffect } from "react";
import { Text } from "../../common/text";
import UserStudent from "../../../assets/icons/userStudent.svg";
import UserTeacher from "../../../assets/icons/userTeacher.svg";
import Card from "../../common/card";

export const UserType = () => {
  const [activeCard, setActiveCard] = useState(null);

  return (
    <div>
      <Text
        text={["What's your role?"]}
        size="text-[32px]"
        fontColor="text-white"
        fontType="font-black"
      />
      <Text
        text={["Choose your usertype"]}
        size="text-[16px]"
        fontColor="text-white"
        fontType="font-black"
      />
      <div className="flex mt-5 gap-10 flex-row justify-center items-center">
        <Card
          title="SEITO"
          description="If you are an student"
          icon={UserStudent}
          onClick={() => setActiveCard("SEITO")}
          active={activeCard === "SEITO"}
        />
        <Card
          title="SENSEI"
          description="If you are an teacher"
          icon={UserTeacher}
          onClick={() => setActiveCard("SENSEI")}
          active={activeCard === "SENSEI"}
        />
      </div>
    </div>
  );
};
export default UserType;
