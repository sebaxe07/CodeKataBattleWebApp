import React from "react";
import { ReactSVG } from "react-svg";
import Decorator from "../../../assets/images/BattleDecorator2.svg";

export const BattleLogo = ({
  BattleIcon,
  dWidth,
  dHeight,
  iWidth,
  iHeight,
  offset,
}) => {
  return (
    <>
      <div className="">
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
          className=" absolute transform -translate-y-1/3 "
        />
        <img
          src={BattleIcon}
          className={`relative w-[${iWidth ? iWidth : "170px"}] h-[${
            iHeight ? iHeight : "170px"
          }] translate-x-5 -translate-y-10  rounded-[100%] ${offset}`}
        />
      </div>
    </>
  );
};

export default BattleLogo;
