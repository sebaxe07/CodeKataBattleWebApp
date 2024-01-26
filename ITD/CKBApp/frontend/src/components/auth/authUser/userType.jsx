import React, { useContext } from "react";
import { Text } from "../../common/text";
import { RegisterContext } from "../../../services/contexts/RegisterContext";

import UserStudent from "../../../assets/icons/userStudent.svg";
import UserTeacher from "../../../assets/icons/userTeacher.svg";
import Card from "../../common/card";

export const UserType = () => {
  const { userData, setUserData } = useContext(RegisterContext);

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
          onClick={() =>
            setUserData({
              ...userData,
              userType: "student", // replace key and value with your actual data
            })
          }
          active={userData.userType === "student"}
        />
        <Card
          title="SENSEI"
          description="If you are an teacher"
          icon={UserTeacher}
          onClick={() =>
            setUserData({
              ...userData,
              userType: "educator", // replace key and value with your actual data
            })
          }
          active={userData.userType === "educator"}
        />
      </div>
    </div>
  );
};
export default UserType;
