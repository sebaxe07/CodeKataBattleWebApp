import React, { useEffect, useRef } from "react";
import { ReactSVG } from "react-svg";
import { Text } from "../../common/text";
import Button from "../../common/Button";
import { EducatorName } from "./../TournamentDetails/EducatorName";
import { TopDecorator } from "./../TournamentDetails/TopDecorator";
import { BattleLogo } from "./../TournamentDetails/BattleLogo";
import { MiniDetails } from "../TournamentDetails/MiniDetails";
import Python from "../../../assets/icons/python.svg";
import Sensei from "../../../assets/icons/UsersIcons/BearSensei.svg";
import Back from "../../../assets/icons/backArrow.svg";
import Binary from "../../../assets/icons/binaryIcon.svg";

export const BattleResume = ({}) => {
  const handleWheel = (e) => {
    e.preventDefault();
    const container = e.currentTarget;
    const containerScrollPosition = container.scrollLeft;
    const scrollSpeed = 0.3; // Change this value to adjust the scroll speed
    container.scrollTo({
      top: 0,
      left: containerScrollPosition + e.deltaY * scrollSpeed,
      behaviour: "smooth",
    });
  };

  return (
    <div className="select-none relative rounded-[36px] bg-[#359673] w-[665px] m-10 mr-2 mt-20 h-[76%] flex justify-center">
      <div className="relative rounded-[36px] bg-bgeducator w-[657px] h-[97%]">
        <div className=" relative w-full h-[59%]  ">
          <TopDecorator LanguageIcon={Python} />
          <img
            src={Back}
            className=" relative w-[40px] h-[40px] translate-x-10 translate-y-10  rounded-[100%]"
            onClick={() => {
              console.log("pressed");
            }}
          />
          <EducatorName
            SenseiImg={Sensei}
            SenseiName={"Miguel"}
            bg={"bg-[#359673]"}
          />

          <div className="flex flex-row h-[185%] w-[100%] gap-8 ml-4 justify-evenly items-center">
            <div className="flex flex-col -space-y-2  items-start">
              <BattleLogo BattleIcon={Binary} />
              <div className="flex flex-col -space-y-2">
                <Text
                  text={["Battle"]}
                  size="text-[32px]"
                  fontColor="text-white"
                  className={"text-start"}
                  fontType="font-bold"
                />
                <Text
                  text={["Active Tournament 1"]}
                  size="text-[16px]"
                  fontColor="text-white"
                  className={"text-start"}
                  fontType="font-normal"
                />
              </div>
              <div className="flex flex-col gap-2">
                <MiniDetails
                  context={"b"}
                  title={"Team Size"}
                  icon={"Students"}
                  msg={"1-5"}
                />
                <MiniDetails
                  context={"b"}
                  title={"Started"}
                  icon={"Calendar"}
                  msg={"22 Dec. 2023"}
                />
                <MiniDetails
                  context={"b"}
                  title={"Ends"}
                  icon={"Calendar"}
                  msg={"22 Dec. 2023"}
                />
              </div>
            </div>
            <div className="flex flex-col w-[390px] h-[450px] rounded-[26px] p-10 mr-2 mb-12 justify-between items-center bg-accentSecondaryEducator">
              <div>
                <Text
                  text={[
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                  ]}
                  size="text-[16px] "
                  className={"leading-normal text-start"}
                  fontColor="text-white"
                  fontType="font-normal"
                />
                <Text
                  text={[
                    "Lorem ipsum dolor sit amet,",
                    "eiusmod tempor incididunt ",
                    "laboris nisi ut aliquip ex ea commodo.",
                  ]}
                  size="text-[16px]"
                  fontColor="text-white "
                  className={"text-start leading-8"}
                  fontType="font-normal"
                />
              </div>
              <Button name="JOIN" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BattleResume;
