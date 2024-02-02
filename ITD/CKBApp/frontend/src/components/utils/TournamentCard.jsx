import React, { useState, useEffect } from "react";
import IconCard from "../common/iconCard";
import { Text } from "../common/text";

const colorSchemes = [
  {
    background: "bg-white",
    shadow: "bg-transparent",
    text: "text-bgsecondary",
    label: "text-fontlabel",
    icon: "bg-accentprimary",
  },
  {
    background: "bg-bgprimary",
    shadow: "bg-bgaccent",
    text: "text-white",
    label: "text-white",
    icon: "bg-accentsecondary",
  },
  {
    background: "bg-bgaccent",
    shadow: "bg-transparent",
    text: "text-[#FFFFFF80]",
    label: "text-[#FFFFFF80]",
    icon: "bg-accentsecondary",
  },
];

const TournamentCard = ({
  name,
  description,
  position,
  icon,
  score,
  select,
  onClick,
}) => {
  const [colorScheme, setColorScheme] = useState(colorSchemes[0]);

  useEffect(() => {
    setColorScheme(colorSchemes[select ? 1 : 0]);
  }, [select]);

  return (
    <div
      className="relative flex items-center justify-center my-[13px] transform active:scale-95 "
      style={{ userSelect: "none" }}
      onClick={onClick}
    >
      <div
        className={`relative ${colorScheme.shadow}  h-[84px] w-[758px] rounded-[29px]`}
      >
        <div
          className={`relative ${colorScheme.background} hover:ring-4 hover:ring-shadowbox  h-[78px] w-[754px] rounded-[29px] shadow-xl transition-all`}
        >
          <IconCard icon={icon} background={colorScheme.icon} />
          <div className="flex flex-row justify-between items-center h-[78px] ml-[90px] mr-[78px]">
            <div className="flex flex-col justify-center items-start  -space-y-4">
              <Text
                text={[`${name}`]}
                size="text-[20px]"
                fontColor={`${colorScheme.text}`}
                fontType="font-bold"
                className={
                  " whitespace-nowrap overflow-ellipsis overflow-hidden w-[250px] text-start"
                }
              />
              <Text
                text={[`${description}`]}
                size="text-[16px]"
                fontColor={`${colorScheme.label}`}
                fontType="font-normal"
                className={
                  " whitespace-nowrap overflow-ellipsis overflow-hidden w-[250px] text-start"
                }
              />
            </div>

            <div className="flex flex-col justify-center items-center  -space-y-4">
              <Text
                text={[`${position}`]}
                size="text-[32px]"
                fontColor={`${colorScheme.text}`}
                fontType="font-bold"
              />
              <Text
                text={["Position"]}
                size="text-[16px]"
                fontColor={`${colorScheme.text}`}
                fontType="font-bold"
              />
            </div>

            <div className="flex flex-col justify-center items-center  -space-y-4">
              <Text
                text={[`${score}`]}
                size="text-[32px]"
                fontColor={`${colorScheme.text}`}
                fontType="font-bold"
              />
              <Text
                text={["Score"]}
                size="text-[16px]"
                fontColor={`${colorScheme.text}`}
                fontType="font-bold"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentCard;
