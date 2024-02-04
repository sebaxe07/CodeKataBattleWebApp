import React from "react";
import Binary from "../../assets/images/tournamentLogos/binaryIcon.svg";
import HackerCat from "../../assets/images/tournamentLogos/hacker_cat.svg";
import Code from "../../assets/images/tournamentLogos/Code.svg";
import Copilot from "../../assets/images/tournamentLogos/github_cop.svg";
import { ReactSVG } from "react-svg";

export const iconCard = ({
  background = "bg-accentprimary",
  shadow = "bg-bgprimary",
  icon,
  size = 80,
}) => {
  const innerSize = (size / 80) * 74;
  const innermostSize = (size / 80) * 65;
  const imgSize = (size / 80) * 52;

  switch (icon) {
    case "binaryIcon.svg":
      icon = Binary;
      break;
    case "hacker_cat.svg":
      icon = HackerCat;
      break;
    case "Code.svg":
      icon = Code;
      break;
    case "github_cop.svg":
      icon = Copilot;
      break;
  }

  return (
    <div
      className={`${shadow} rounded-full absolute left-0 transform -translate-x-1/4 translate-y-0.5`}
      style={{ width: `${size}px`, height: `${(size / 80) * 74}px` }}
    >
      <div
        className="bg-white rounded-full flex justify-center items-center"
        style={{ width: `${innerSize}px`, height: `${innerSize}px` }}
      >
        <div
          className={`${background} rounded-full flex justify-center items-center `}
          style={{ width: `${innermostSize}px`, height: `${innermostSize}px` }}
        >
          <ReactSVG
            src={icon}
            beforeInjection={(svg) => {
              svg.setAttribute(
                "style",
                `width: ${imgSize}; height: ${imgSize}; border-radius: 30%`
              );
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default iconCard;
