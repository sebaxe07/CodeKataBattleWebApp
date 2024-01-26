import React from "react";
import { ReactSVG } from "react-svg";

export const BgIconCard = ({
  icon,
  iWidth,
  iHeight,
  classname,
  bgColor,
  onClick,
  active,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div
      className={
        active == null
          ? ` ${classname} flex justify-center items-center`
          : `flex justify-center items-center w-[110px] h-[101px] rounded-[36px] ${
              active ? bgColor : `bg-shadowbox`
            }`
      }
      onClick={handleClick}
    >
      <ReactSVG
        src={icon}
        beforeInjection={(svg) => {
          svg.setAttribute("style", `width: ${iWidth}; height: ${iHeight};`);
        }}
      />
    </div>
  );
};

export default BgIconCard;
