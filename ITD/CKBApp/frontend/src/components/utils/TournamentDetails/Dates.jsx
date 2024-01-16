import React from "react";
import { ReactSVG } from "react-svg";
import { Text } from "../../common/text";
import Calendar from "../../../assets/icons/calendar.svg";

export const Dates = ({ state, date }) => {
  return (
    <div className=" w-full h-full flex flex-col justify-center items-start -space-y-3">
      <Text
        text={[state]}
        size="text-[16px]"
        fontColor="text-accentprimary"
        fontType="font-normal"
      />
      <div className="flex flex-row justify-start items-center space-x-2">
        <ReactSVG
          src={Calendar}
          beforeInjection={(svg) => {
            svg.setAttribute("style", "width: 23px; height: 23px");
          }}
        />
        <Text
          text={[date]}
          size="text-[16px]"
          fontColor="text-accentprimary"
          fontType="font-bold"
        />
      </div>
    </div>
  );
};

export default Dates;
