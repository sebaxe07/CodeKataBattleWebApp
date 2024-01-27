import React from "react";
import { ReactSVG } from "react-svg";
import Decorator from "../../../assets/images/BattleDecorator2.svg";

export const BattleLogo = ({ BattleIcon }) => {
  return (
    <>
      <div className="">
        <ReactSVG
          src={Decorator}
          beforeInjection={(svg) => {
            svg.setAttribute("style", "width: 170px; height: 170px");
          }}
          className=" absolute transform -translate-y-1/3"
        />
        <img
          src={BattleIcon}
          className=" relative w-[115px]  h-[117px] translate-x-5 -translate-y-10  rounded-[100%]"
        />
      </div>
    </>
  );
};

export default BattleLogo;
