import React, { useState, useEffect } from "react";
import { Text } from "../common/text";
import BgIconCard from "../common/bgIconCard";

import { ReactSVG } from "react-svg";
import Fire from "../../assets/icons/fire.svg";
import Calendar from "../../assets/icons/calendar.svg";

import Trophy from "../../assets/icons/Trophy/trophyGold.svg";
import { Button } from "../common/Button";

const ActiveTournament = ({
  name,
  color,
  description,
  soonToEnd,
  timeRemainig,
  startDate,
  endDate,
}) => {
  return (
    <div
      className="relative flex items-center justify-center my-[13px] transform active:scale-95 "
      //   onClick={handleClick}
      style={{ userSelect: "none" }}
    >
      <div className={`relative  h-[90px] w-[1363px] rounded-[16px]`}>
        <div
          className={`relative bg-white  h-[90px] w-[1363px] rounded-[29px] shadow-xl`}
        >
          <div className="flex flex-row justify-between items-center h-[78px] ml-[20px] mr-[78px]">
            <div className="flex items-center gap-5 mt-3 ">
              <BgIconCard
                classname={`${color} w-[72px] h-[69px] rounded-[29px]`}
                icon={Trophy}
                onClick={() => console.log()}
              />
              <div className="flex flex-col justify-center items-start  -space-y-4">
                <Text
                  text={[`${name}`]}
                  size="text-[20px]"
                  fontColor={`text-bgsecondary`}
                  fontType="font-bold"
                />
                <Text
                  text={[`${description}`]}
                  size="text-[16px]"
                  fontColor={`text-fontlabel`}
                  fontType="font-normal"
                />
              </div>
            </div>
            {soonToEnd ? (
              <div className="flex flex-row items-center gap-2">
                <ReactSVG
                  src={Fire}
                  beforeInjection={(svg) => {
                    svg.setAttribute("style", "width: 20px; height: 25px");
                  }}
                />
                <Text
                  text={[`${timeRemainig}`]}
                  size="text-[16px]"
                  fontColor={`text-shadowbox`}
                  fontType="font-normal"
                />
              </div>
            ) : null}

            <div className="flex flex-row  gap-10">
              <div className="flex flex-row justify-center items-center gap-3">
                <ReactSVG
                  src={Calendar}
                  beforeInjection={(svg) => {
                    svg.setAttribute("style", "width: 40px; height: 40px");
                  }}
                />
                <div className="flex flex-col items-start -space-y-4">
                  <Text
                    text={["Starts"]}
                    size="text-[16px]"
                    fontColor={`text-[##182338]`}
                    fontType="font-bold"
                  />
                  <Text
                    text={[`${startDate}`]}
                    size="text-[16px]"
                    fontColor={`text-shadowbox`}
                    fontType="font-bold"
                  />
                </div>
              </div>
              <div className="flex flex-row justify-center items-center gap-3">
                <ReactSVG
                  src={Calendar}
                  beforeInjection={(svg) => {
                    svg.setAttribute("style", "width: 40px; height: 40px");
                  }}
                />
                <div className="flex flex-col items-start -space-y-4">
                  <Text
                    text={["Ends"]}
                    size="text-[16px]"
                    fontColor={`text-[#182338]`}
                    fontType="font-bold"
                  />
                  <Text
                    text={[`${endDate}`]}
                    size="text-16px"
                    fontColor={`text-bgaccent`}
                    fontType="font-bold"
                  />
                </div>
              </div>
            </div>
            <Button name="JOIN" onClick={() => console.log()} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveTournament;
