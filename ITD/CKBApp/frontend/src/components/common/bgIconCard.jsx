import React from "react";
import { ReactSVG } from "react-svg";

export const IconCard = ({ icon, bgColor, onClick, active }) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <div
      className={`flex justify-center items-center ${
        active ? bgColor : "bg-shadowbox"
      } w-[110px] h-[101px] rounded-[36px]`}
      onClick={handleClick}
    >
      <ReactSVG src={icon} />
    </div>
  );
};

export default IconCard;
