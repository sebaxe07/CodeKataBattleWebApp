import React, { useState, useEffect } from "react";
import trophy from "../../assets/icons/Trophy/trophy.svg";
import { ReactSVG } from "react-svg";
import { Text } from "../common/text";

const colorSchemes = [
  {
    background: "bg-bgaccent",
    shadow: "bg-transparent",
    text: "text-[#FFFFFF80]",
    label: "text-[#FFFFFF80]",
    icon: "bg-accentsecondary",
  },
  {
    background: "bg-bgaccent",
    shadow: "bg-bgprimary",
    text: "text-[#FFFFFF]",
    label: "text-[#FFFFFF]",
    icon: "bg-accentsecondary",
  },
];

const PastTournamentCard = ({ name, description, position, score, select }) => {
  const [colorScheme, setColorScheme] = useState(colorSchemes[0]);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    setSelected(select);
    setColorScheme(colorSchemes[select ? 1 : 0]);
  }, [select]);

  useEffect(() => {
    setColorScheme(colorSchemes[selected ? 1 : 0]);
  }, [selected]);

  const handleClick = () => {
    setSelected(!selected);
  };

  return (
    <div
      className="relative flex items-center justify-center my-[13px] transform active:scale-95"
      onClick={handleClick}
      style={{ userSelect: "none" }}
    >
      <div
        className={`relative ${colorScheme.shadow}  h-[84px] w-[758px] rounded-[29px]`}
      >
        <div
          className={`relative ${colorScheme.background} hover:ring-4 hover:ring-shadowbox transition-all h-[78px] w-[754px] rounded-[29px] shadow-xl`}
        >
          <div className="w-[58px] h-[58px] top-[11px] left-[45px]  bg-bgsecondary rounded-full flex justify-center items-center absolute">
            <ReactSVG src={trophy} className=" w-[35px] h-[35px] " />
          </div>
          <div className="flex flex-row justify-between items-center h-[78px] ml-[140px] mr-[78px]">
            <div className="flex flex-col justify-center items-start  -space-y-4">
              <Text
                text={[`${name}`]}
                size="text-[20px]"
                fontColor={`${colorScheme.text}`}
                fontType="font-bold"
              />
              <Text
                text={[`${description}`]}
                size="text-[16px]"
                fontColor={`${colorScheme.label}`}
                fontType="font-normal"
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

export default PastTournamentCard;
