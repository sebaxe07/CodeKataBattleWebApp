import React from "react";
import { ReactSVG } from "react-svg";
import Decorator from "../../../assets/images/Decorator.svg";

export const TopDecorator = ({ LanguageIcon }) => {
  return (
    <>
      <ReactSVG
        src={Decorator}
        className="absolute    top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      />
      <img
        src={LanguageIcon}
        className="absolute w-[116px] h-[116px] top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      />
    </>
  );
};

export default TopDecorator;
