import React from "react";
import { ReactSVG } from "react-svg";
import Decorator from "../../../assets/images/BattleDecorator2.svg";
import Python from "../../../assets/icons/python.svg";
import Binary from "../../../assets/icons/binaryIcon.svg";

export const BattleLogo = ({
  BattleIcon,
  size = 80,
  shouldTranslate = true,
}) => {
  const innerSize = (size / 60) * 74;
  const imgSize = (size / 70) * 50;

  switch (BattleIcon) {
    case "python.svg":
      BattleIcon = Python;
      break;
    case "binaryIcon.svg":
      BattleIcon = Binary;
      break;
    default:
      BattleIcon = Python;
      break;
  }

  const translateClasses = shouldTranslate
    ? "absolute top-0 left-1/2  -translate-x-16 -translate-y-1/2"
    : "";
  const translateClasses2 = shouldTranslate
    ? "absolute top-0 left-1/2 -translate-x-[28px] -translate-y-[62px]"
    : "-translate-y-[8px]";
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
        src={BattleIcon}
        beforeInjection={(svg) => {
          svg.setAttribute(
            "style",
            `width: ${imgSize}px ; height: ${imgSize}px`
          );
        }}
        className={`absolute ${translateClasses2}`}
      />
    </div>
  );
};

export default BattleLogo;
