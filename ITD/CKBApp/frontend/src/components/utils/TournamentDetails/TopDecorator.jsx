import React from "react";
import { ReactSVG } from "react-svg";
import Decorator from "../../../assets/images/Decorator.svg";

export const TopDecorator = ({ LanguageIcon, size = 80 }) => {
  const innerSize = (size / 50) * 74;
  const innermostSize = (size / 50) * 65;
  const imgSize = (size / 50) * 32;

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
        className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      />
      <img
        src={LanguageIcon}
        style={{ width: `${imgSize}px`, height: `${imgSize}px` }}
        className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
      />
    </>
  );
};

export default TopDecorator;
