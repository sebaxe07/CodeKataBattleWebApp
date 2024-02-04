import React from "react";
import { ReactSVG } from "react-svg";

import TigerIcon from "../../assets/icons/UsersIcons/tiger.svg";
import ElephantIcon from "../../assets/icons/UsersIcons/elephant.svg";
import BearIcon from "../../assets/icons/UsersIcons/bear.svg";
import PiggyIcon from "../../assets/icons/UsersIcons/piggy.svg";
import Trophy from "../../assets/icons/Trophy/trophyGold.svg";

import Hacker from "../../assets/images/tournamentLogos/hacker_cat.svg";
import Copilot from "../../assets/images/tournamentLogos/github_cop.svg";
import Code from "../../assets/images/tournamentLogos/Code.svg";
import Binary from "../../assets/images/tournamentLogos/binaryIcon.svg";
import Sword from "../../assets/icons/swords.svg";

import Java from "../../assets/images/battleLogos/java.svg";
import Python from "../../assets/images/battleLogos/python.svg";
import Csharp from "../../assets/images/battleLogos/csharp.svg";
import Javascript from "../../assets/images/battleLogos/javascript.svg";

import Rankings from "../../assets/icons/rankings.svg";

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
    case "hacker_cat.svg":
      icon = Hacker;
      bgIcon = `bg-[#6CBE83]`;
      break;
    case "github_cop.svg":
      icon = Copilot;
      bgIcon = `bg-[#5D9BF6]`;
      break;
    case "Code.svg":
      icon = Code;
      bgIcon = `bg-[#EE8361]`;
      break;
    case "binaryIcon.svg":
      icon = Binary;
      bgIcon = `bg-[#DB79C0]`;
      break;
    case "java.svg":
      icon = Java;
      bgIcon = `bg-[#F4A358]`;
      break;
    case "python.svg":
      icon = Python;
      bgIcon = `bg-[#DB79C0]`;
      break;
    case "csharp.svg":
      icon = Csharp;
      bgIcon = `bg-[#5D9BF6]`;
      break;
    case "javascript.svg":
      icon = Javascript;
      bgIcon = `bg-[#f0db4f]`;
      break;
    case "swords.svg":
      icon = Sword;
      bgIcon = `bg-[${randomColor}]`;
      break;
    case "rankings.svg":
      icon = Rankings;
      bgIcon = bgColor;
      break;
    default:
      icon = icon;
      bgIcon = bgColor;
      break;
  }

  const handleClick = () => {
    if (onClick != null) {
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
          ? `rounded-full ${bgIcon} flex justify-center items-center `
          : `flex justify-center items-center rounded-[36px] ${
              active
                ? `rounded-full cursor-pointer ${bgIcon}`
                : `bg-shadowbox cursor-pointer`
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
