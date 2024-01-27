import React, { useState, useEffect, useContext } from "react";
import { Text } from "../../components/common/text";
import { ReactSVG } from "react-svg";

const colorSchemes = [
  {
    background: "bg-bgaccent",
    hover: "bg-bgsecondary",
    bgIcon: "bg-bgprimary",
  },
  {
    background: "bg-[#265F4C]",
    hover: "bg-[#19362D]",
    bgIcon: "bg-bgstudent",
  },
];

export const Card = ({
  context = "",
  title,
  icon,
  description,
  onClick,
  active,
}) => {
  const [colorScheme, setColorScheme] = useState(colorSchemes[0]);

  const handleClick = () => {
    onClick(title);
  };

  useEffect(() => {
    setColorScheme(colorScheme[0]);
    setColorScheme(colorSchemes[context === title ? 1 : 0]);
  }, [context]);

  return (
    <div
      className={`w-[234px] h-[307px] rounded-[36px] transform active:scale-95  ${
        active ? `${colorScheme.hover}` : `${colorScheme.background}`
      } transition-colors duration-500 hover:${colorScheme.hover} `}
      onClick={handleClick}
    >
      <div className="flex h-full items-center justify-center">
        <div>
          <div
            className={`flex justify-center items-center ${colorScheme.bgIcon} transition-colors duration-1000  w-[168px] h-[164px] rounded-[36px]`}
          >
            <ReactSVG src={icon} />
          </div>

          <Text
            text={[title]}
            size="text-[20px]"
            fontColor="text-white"
            fontType="font-black"
          />
          <Text
            text={[description]}
            size="text-[16px]"
            fontColor="text-white"
            fontType="font-black"
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
