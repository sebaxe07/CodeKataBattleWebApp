import React from "react";
import { ReactSVG } from "react-svg";
import TigerIcon from "../../assets/icons/UsersIcons/tiger.svg";
import ElephantIcon from "../../assets/icons/UsersIcons/elephant.svg";
import BearIcon from "../../assets/icons/UsersIcons/bear.svg";
import PiggyIcon from "../../assets/icons/UsersIcons/piggy.svg";
import Trophy from "../../assets/icons/Trophy/trophyGold.svg";
import Swords from "../../assets/icons/swords.svg";

export const BgIconCard = ({
  icon,
  bgIcon,
  size = 60,
  onClick,
  bgColor,
  active,
}) => {
  const colors = [
    "#EE8361",
    "#60ADF4",
    "#6360F4",
    "#F4A358",
    "#5D9BF6",
    "#DB79C0",
    "#6CBE83",
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

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
      bgIcon = `bg-[${randomColor}]`;
      break;
    case "swords.svg":
      icon = Swords;
      bgIcon = `bg-[${randomColor}]`;
      break;
    default:
      icon = icon;
      bgIcon = bgColor;
      break;
  }

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const innerSize = (size / 70) * 74;
  const innermostSize = (size / 70) * 65;
  const imgSize = (size / 70) * 52;

  return (
    <div
      className={
        active == null
          ? `rounded-full ${bgIcon} flex justify-center items-center`
          : `flex justify-center items-center rounded-[36px] ${
              active ? bgIcon : `bg-shadowbox`
            }`
      }
      style={{ width: `${innerSize}px`, height: `${innerSize}px` }}
      onClick={handleClick}
    >
      <ReactSVG
        src={icon}
        beforeInjection={(svg) => {
          svg.setAttribute("style", `width: ${imgSize}; height: ${imgSize};`);
        }}
      />
    </div>
  );
};

export default BgIconCard;
