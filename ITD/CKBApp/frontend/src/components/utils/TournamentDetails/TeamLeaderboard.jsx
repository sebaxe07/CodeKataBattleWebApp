import React, { useState, useEffect } from "react";
import { ReactSVG } from "react-svg";
import { Text } from "../../common/text";
import BgIconCard from "../../common/bgIconCard";

export const TeamLeaderboard = ({ context, rank, icon, iconBg, name, exp }) => {
  const colorSchemes = [
    {
      even: "bg-bgaccent",
      uneven: "bg-bgprimary",
    },
    {
      even: "bg-bgeducator",
      uneven: "bg-accentSecondaryEducator",
    },
  ];

  const [colorScheme, setColorScheme] = useState(colorSchemes[0]);

  useEffect(() => {
    setColorScheme(colorScheme[0]);
    setColorScheme(colorSchemes[context == "b" ? 1 : 0]);
  }, [context]);

  return (
    <div
      className={`flex w-full h-[60px] items-center  justify-around p-2 ${
        rank % 2 == 0 ? colorScheme.even : colorScheme.uneven
      }`}
    >
      <div className="flex flex-row gap-5 ">
        <Text
          text={[rank]}
          size="text-[16px]"
          fontColor="text-white"
          fontType="font-bold"
        />
        <div className="flex bg-white rounded-[100%] justify-center items-center w-[45px] h-[45px] ">
          <BgIconCard icon={icon} size={35} />
        </div>
      </div>
      <div>
        <Text
          text={[name]}
          size="text-[16px]"
          fontColor="text-white"
          className={"text-start "}
          fontType="font-bold"
        />
      </div>
      <div>
        <Text
          text={[`${exp} XP`]}
          size="text-[16px]"
          fontColor="text-white"
          className={"text-start "}
          fontType="font-bold"
        />
      </div>
    </div>
  );
};

export default TeamLeaderboard;
