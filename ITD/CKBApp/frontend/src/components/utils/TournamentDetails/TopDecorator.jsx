import React from "react";
import { ReactSVG } from "react-svg";
import Decorator from "../../../assets/images/Decorator.svg";

export const TopDecorator = ({
  LanguageIcon,
  dWidth,
  dHeight,
  iWidth,
  iHeight,
}) => {
  return (
    <>
      <ReactSVG
        src={Decorator}
        beforeInjection={(svg) => {
          svg.setAttribute(
            "style",
            `width: ${dWidth ? dWidth : "170px"}; height: ${
              dHeight ? dHeight : "170px"
            }`
          );
        }}
        className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      />
      <img
        src={LanguageIcon}
        className={`absolute w-[${iWidth ? iWidth : "170px"}] h-[${
          iHeight ? iHeight : "170px"
        }] top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
      />
    </>
  );
};

export default TopDecorator;
