import React from "react";
import { ReactSVG } from "react-svg";
import { Text } from "../../common/text";

import CalendarT from "../../../assets/icons/calendar.svg";
import StudentsT from "../../../assets/icons/icon-students.svg";
import CalendarB from "../../../assets/icons/calendarB.svg";
import StudentsB from "../../../assets/icons/icon-students.svg";

export const MiniDetails = ({ context, icon, title, msg }) => {
  const bgcolor = context == "b" ? "bg-accentSecondaryEducator" : "bg-bgaccent";
  const textColor =
    context == "b" ? "text-accenteducator" : "text-accentprimary";
  const textBoldness = context == "b" ? "font-medium" : "font-medium";
  const Calendar = context == "b" ? CalendarB : CalendarT;
  const Students = context == "b" ? StudentsB : StudentsT;

  return (
    <div className="flex flex-col justify-center items-start -space-y-1">
      <Text
        text={[title]}
        size="text-[16px]"
        fontColor={"text-white"}
        fontType={"font-bold"}
      />
      <div
        className={`flex justify-center space-x-2 items-center rounded-[40px] ${bgcolor} pl-4 pr-6 w-auto h-[34px]`}
      >
        <ReactSVG
          src={icon == "Calendar" ? Calendar : Students}
          beforeInjection={(svg) => {
            svg.setAttribute("style", "width: 17px; height: 17px");
          }}
        />
        <Text
          text={[msg]}
          size="text-[16px]"
          fontColor={textColor}
          fontType={textBoldness}
        />
      </div>
    </div>
  );
};

export default MiniDetails;
