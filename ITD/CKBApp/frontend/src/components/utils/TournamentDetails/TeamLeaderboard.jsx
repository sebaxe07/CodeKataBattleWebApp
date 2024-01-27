import React from "react";
import { ReactSVG } from "react-svg";
import { Text } from "../../common/text";
import BgIconCard from "../../common/bgIconCard";

export const TeamLeaderboard = ({ rank, icon, iconBg, name, exp }) => {
  return (
    <div
      className={`flex w-full h-[60px] align-center justify-around pt-2 ${
        rank % 2 == 0 ? "bg-accentstudent" : "bg-bgstudentsecondary"
      }`}
    >
      <div className="flex flex-row gap-5">
        <Text
          text={[rank]}
          size="text-[16px]"
          fontColor="text-white"
          fontType="font-bold"
        />
        <div className="flex bg-white rounded-[100%] justify-center items-center w-[45px] h-[45px]">
          <BgIconCard
            icon={icon}
            iWidth={"35px"}
            iHeight={"35px"}
            classname={`${iconBg} rounded-[100%] w-[40px] h-[40px]`}
          />
        </div>
      </div>
      <div>
        <Text
          text={[name]}
          size="text-[16px]"
          fontColor="text-white"
          className={"text-start"}
          fontType="font-bold"
        />
      </div>
      <div>
        <Text
          text={[`${exp} XP`]}
          size="text-[16px]"
          fontColor="text-white"
          fontType="font-bold"
        />
      </div>
    </div>
  );
};

export default TeamLeaderboard;
