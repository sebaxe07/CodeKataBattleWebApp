import React from "react";
import { ReactSVG } from "react-svg";
import Decorator from "../../../assets/images/Decorator.svg";
import Python from "../../../assets/icons/python.svg";
import Binary from "../../../assets/icons/binaryIcon.svg";

export const TopDecorator = ({
  LanguageIcon,
  size = 80,
  shouldTranslate = true,
}) => {
  const innerSize = (size / 50) * 74;
  const innermostSize = (size / 50) * 65;
  const imgSize = (size / 50) * 29;

  switch (LanguageIcon) {
    case "python.svg":
      LanguageIcon = Python;
      break;
    case "binaryIcon.svg":
      LanguageIcon = Binary;
      break;
    default:
      LanguageIcon = Binary;
      break;
  }

  const translateClasses = shouldTranslate
    ? "absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    : "";

  return (
    <div
      className={
        shouldTranslate ? "" : "relative flex items-center justify-center"
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
        className={` ${translateClasses}`}
      />
      <ReactSVG
        src={LanguageIcon}
        beforeInjection={(svg) => {
          svg.setAttribute(
            "style",
            `width: ${imgSize}px ; height: ${imgSize}px`
          );
        }}
        className={`absolute  ${translateClasses}`}
      />
    </div>
  );
};

export default TopDecorator;
