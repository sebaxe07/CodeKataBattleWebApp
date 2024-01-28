import React from "react";
import { ReactSVG } from "react-svg";
import TigerIcon from "../../assets/icons/UsersIcons/tiger.svg";
import ElephantIcon from "../../assets/icons/UsersIcons/elephant.svg";
import BearIcon from "../../assets/icons/UsersIcons/bear.svg";
import PiggyIcon from "../../assets/icons/UsersIcons/piggy.svg";
import Trophy from "../../assets/icons/Trophy/trophyGold.svg";

export const BgIconCard = ({
  icon,
  bgIcon,
  iWidth,
  iHeight,
  classname,
  onClick,
  bgColor,
  active,
}) => {
  switch (icon) {
    case "tiger.svg":
      icon = TigerIcon;
      bgIcon = "bg-[#DB79C0]";
      break;
    case "elephant.svg":
      icon = ElephantIcon;
      bgIcon = "bg-[#6CBE83]";
      break;
    case "bear.svg":
      icon = BearIcon;
      bgIcon = "bg-[#F4A358]";
      break;
    case "piggy.svg":
      icon = PiggyIcon;
      bgIcon = "bg-[#5D9BF6]";
      break;
    case "trophyGold.svg":
      icon = Trophy;
      // Random background color
      const colors = [
        "#EE8361",
        "#60ADF4",
        "#6360F4",
        "#F4A358",
        "#5D9BF6",
        "#DB79C0",
        "#6CBE83",
      ];
      break;
    default:
      icon = ElephantIcon;
      bgIcon = "bg-[#6CBE83]";
      break;
  }

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div
      className={
        active == null
          ? ` ${classname} ${bgIcon} flex justify-center items-center`
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
