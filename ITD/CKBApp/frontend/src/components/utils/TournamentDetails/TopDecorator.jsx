import React from "react";
import { ReactSVG } from "react-svg";
import Decorator from "../../../assets/images/Decorator.svg";
import Binary from "../../../assets/images/tournamentLogos/binaryIcon.svg";
import HackerCat from "../../../assets/images/tournamentLogos/hacker_cat.svg";
import Code from "../../../assets/images/tournamentLogos/Code.svg";
import Copilot from "../../../assets/images/tournamentLogos/github_cop.svg";

export const TopDecorator = ({
  LanguageIcon,
  size = 80,
  shouldTranslate = true,
}) => {
  const innerSize = (size / 50) * 74;
  const innermostSize = (size / 50) * 65;
  const imgSize = (size / 50) * 28;

  switch (LanguageIcon) {
    case "binaryIcon.svg":
      console.log("LanguageIcon", LanguageIcon);
      LanguageIcon = Binary;
      break;
    case "hacker_cat.svg":
      console.log("LanguageIcon", LanguageIcon);
      LanguageIcon = HackerCat;

      break;
    case "Code.svg":
      console.log("LanguageIcon", LanguageIcon);
      LanguageIcon = Code;

      break;
    case "github_cop.svg":
      console.log("LanguageIcon", LanguageIcon);
      LanguageIcon = Copilot;

      break;
  }

  const translateClasses = shouldTranslate
    ? "absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    : "";

  return (
    <div
      className={
        shouldTranslate ? "" : "relative flex items-center justify-center "
      }
    >
      <ReactSVG
        src={Decorator}
        beforeInjection={(svg) => {
          svg.setAttribute(
            "style",
            `width: ${innerSize}px ; height: ${innerSize}px`
          );
        }}
        className={`${translateClasses}`}
      />

      <ReactSVG
        src={LanguageIcon}
        beforeInjection={(svg) => {
          svg.setAttribute(
            "style",
            `width: ${imgSize}px ; height: ${imgSize}px; border-radius: 30%`
          );
        }}
        className={`absolute  ${translateClasses} `}
      />
    </div>
  );
};

export default TopDecorator;
