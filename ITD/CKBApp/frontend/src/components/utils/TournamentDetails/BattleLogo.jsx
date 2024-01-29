import React from "react";
import { ReactSVG } from "react-svg";
import Decorator from "../../../assets/images/BattleDecorator2.svg";

export const BattleLogo = ({ BattleIcon, size = 80 }) => {
  const innerSize = (size / 60) * 74;
  const innermostSize = (size / 60) * 65;
  const imgSize = (size / 70) * 52;

  return (
    <>
      <ReactSVG
        src={Decorator}
        beforeInjection={(svg) => {
          svg.setAttribute(
            "style",
            `width: ${innerSize}px ; height: ${innerSize}px`
          );
        }}
        className="absolute top-0 left-1/2 transform -translate-x-16 -translate-y-1/2"
      />
      <div
        className="rounded-full flex justify-center items-center"
        style={{ width: `${innermostSize}px`, height: `${innermostSize}px` }}
      >
        <img
          src={BattleIcon}
          style={{ width: `${imgSize}px`, height: `${imgSize}px` }}
          className={`absolute top-0 left-1/2 transform -translate-x-9 -translate-y-16`}
        />
      </div>
    </>
  );
};

export default BattleLogo;
