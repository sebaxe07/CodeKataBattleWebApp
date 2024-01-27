import React from "react";
import python from "../../assets/icons/python.png";

export const iconCard = ({
  background = "bg-accentprimary",
  shadow = "bg-bgprimary",
}) => {
  return (
    <div
      className={`${shadow} w-[80px] h-[74px] rounded-full absolute left-0 transform -translate-x-1/4 translate-y-0.5 `}
    >
      <div className="bg-white w-[74px] h-[74px] rounded-full flex justify-center items-center">
        <div
          className={`${background} w-[65px] h-[65px] rounded-full flex justify-center items-center`}
        >
          <img src={python} className="w-[52px] h-[52px]" alt="fireSpot" />
        </div>
      </div>
    </div>
  );
};

export default iconCard;
