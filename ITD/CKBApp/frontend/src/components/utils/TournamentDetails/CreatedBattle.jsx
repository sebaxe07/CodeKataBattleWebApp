import React, { useState, useEffect } from "react";
import { ReactSVG } from "react-svg";
import { Text } from "../../common/text";
import BgIconCard from "../../common/bgIconCard";
import Button from "../../common/Button";

export const CreatedBattle = ({ context, icon, iconBg, name, state }) => {
  const colorSchemes = [
    {
      even: "bg-bgsecondary",
    },
    {
      even: "bg-[#2C785F]",
    },
  ];

  const [colorScheme, setColorScheme] = useState(colorSchemes[0]);

  useEffect(() => {
    setColorScheme(colorScheme[0]);
    setColorScheme(colorSchemes[context == "b" ? 1 : 0]);
  }, [context]);

  return (
    <div
      className={`flex w-[90%] ml-10 h-[60px] items-center justify-around pb-1 ${colorScheme.even} rounded-[36px]`}
    >
      <div className="flex flex-row -translate-x-10 gap-5 justify-start items-center">
        <div className=" flex bg-white rounded-[100%] justify-center items-center w-[60px] h-[60px]">
          <BgIconCard
            icon={icon}
            iWidth={"45px"}
            iHeight={"45px"}
            classname={`${iconBg} rounded-[100%] w-[55px] h-[55px]`}
          />
        </div>
        <Text
          text={[name]}
          size="text-[16px]"
          fontColor="text-white"
          className={"text-start"}
          fontType="font-bold"
        />
      </div>
      <Button name="Edit" />

      <Text
        text={[`${state}`]}
        size="text-[16px]"
        fontColor="text-white"
        fontType="font-bold"
      />
    </div>
  );
};

export default CreatedBattle;
