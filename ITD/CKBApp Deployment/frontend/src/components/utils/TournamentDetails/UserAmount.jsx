import React from "react";
import { ReactSVG } from "react-svg";
import { Text } from "../../common/text";
import IconUser from "../../../assets/icons/icon-students.svg";

export const UserAmount = ({ UserAmount }) => {
  return (
    <div className="relative flex justify-center space-x-2 items-center rounded-[40px] top-[20px] left-[49px] bg-bgaccent w-[83px] h-[34px]">
      <ReactSVG src={IconUser} />
      <Text
        text={[UserAmount]}
        size="text-[16px]"
        fontColor="text-white"
        fontType="font-normal"
      />
    </div>
  );
};

export default UserAmount;
