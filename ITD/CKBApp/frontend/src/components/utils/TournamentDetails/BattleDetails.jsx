import React, { useEffect, useRef } from "react";
import { ReactSVG } from "react-svg";
import { Text } from "../../common/text";
import Button from "../../common/Button";
import { EducatorName } from "./EducatorName";
import { TopDecorator } from "./TopDecorator";
import { BattleLogo } from "./BattleLogo";
import { MiniDetails } from "./MiniDetails";

import { TopScore } from "../../common/TopScore";
import { YouScore } from "../../common/YouScore";
import Python from "../../../assets/icons/python.png";
import Binary from "../../../assets/icons/binaryIcon.png";
import Back from "../../../assets/icons/backArrow.png";
import Sensei from "../../../assets/icons/UsersIcons/BearSensei.svg";
import ElephantUser from "../../../assets/icons/UsersIcons/elephant.svg";
import PiggyUser from "../../../assets/icons/UsersIcons/piggy.svg";
import BearUser from "../../../assets/icons/UsersIcons/bear.svg";
import TigerUser from "../../../assets/icons/UsersIcons/tiger.svg";
import TeamLeaderboard from "./TeamLeaderboard";

export const BattleDetails = ({}) => {
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
    <div className="select-none relative rounded-[36px] bg-bgstudentsecondary w-[1500px] m-10 mr-2 mt-20 h-[76%] flex justify-center">
      <div className="rounded-[36px] bg-bgstudent w-[1480px] h-[97%]">
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
        <div className="flex h-full rounded-[36px] flex-row -mt-10">
          {/* Lado Izquierdo */}
          <div className="flex flex-row h-[682px] w-[720px] gap-8 ml-4 pt-10 justify-center items-center">
            <div className="flex flex-col -space-y-2  items-start mt-20">
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
                <MiniDetails
                  context={"b"}
                  title={"Saito Suscribed"}
                  icon={"Calendar"}
                  msg={"100"}
                />
              </div>
            </div>
            <div className="flex flex-col w-[390px] h-[90%] mt-10 rounded-[26px] p-10 mr-2 mb-12 justify-between items-center bg-bgstudentsecondary">
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
              <Button name="RESUME" />
            </div>
          </div>
          {/* Lado Derecho */}
          <div className="flex flex-row h-full w-[730px] ml-4 justify-center items-center rounded-r-[36px] mb-10 pt-10  bg-[#2A926E]">
            <div className="flex flex-col h-full -space-y-2  justify-around items-center">
              <div className="flex flex-col justify-between items-center">
                <Text
                  text={["Leaderboard"]}
                  size="text-[24px]"
                  fontColor="text-white"
                  className={"text-start"}
                  fontType="font-bold"
                />
                <div className="flex flex-row justify-center items-end relative top-[20%]">
                  <TopScore
                    users={["Pablo", "Juan", "Sebas"]}
                    score={["100", "50", "25"]}
                    icons={[ElephantUser, PiggyUser, BearUser]}
                  />
                  <YouScore userIcon={TigerUser} position={"80"} score={"10"} />
                </div>
              </div>
              <div className="w-full h-[40%]">
                <div className="flex flex-row justify-between ml-20 mr-20">
                  <Text
                    text={["#"]}
                    size="text-[16px]"
                    fontColor="text-white"
                    className={"text-start"}
                    fontType="font-bold"
                  />
                  <Text
                    text={["Leaderboard"]}
                    size="text-[16px]"
                    fontColor="text-white"
                    className={"text-start"}
                    fontType="font-bold"
                  />
                  <Text
                    text={["XP"]}
                    size="text-[16px]"
                    fontColor="text-white"
                    className={"text-start"}
                    fontType="font-bold"
                  />
                </div>
                <div
                  onWheel={handleWheel}
                  className="bg-bgstudent flex-col rounded-l-[36px] w-full h-[90%] flex overflow-y-auto overflow-x-hidden scrollbar-thumb-bgstudentsecondary scrollbar-thin"
                >
                  <TeamLeaderboard
                    rank={"1"}
                    icon={TigerUser}
                    iconBg={"bg-[#FFC700]"}
                    name={"Juanito"}
                    exp={"100"}
                  />
                  <TeamLeaderboard
                    rank={"2"}
                    icon={TigerUser}
                    iconBg={"bg-[#FFC700]"}
                    name={"Juanito"}
                    exp={"100"}
                  />
                  <TeamLeaderboard
                    rank={"3"}
                    icon={TigerUser}
                    iconBg={"bg-[#FFC700]"}
                    name={"Juanito"}
                    exp={"100"}
                  />
                  <TeamLeaderboard
                    rank={"4"}
                    icon={TigerUser}
                    iconBg={"bg-[#FFC700]"}
                    name={"Juanito"}
                    exp={"100"}
                  />
                  <TeamLeaderboard
                    rank={"5"}
                    icon={TigerUser}
                    iconBg={"bg-[#FFC700]"}
                    name={"Juanito"}
                    exp={"100"}
                  />
                  <TeamLeaderboard
                    rank={"6"}
                    icon={TigerUser}
                    iconBg={"bg-[#FFC700]"}
                    name={"Juanito"}
                    exp={"100"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BattleDetails;
