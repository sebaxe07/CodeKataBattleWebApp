import React, { useEffect, useRef } from "react";
import { ReactSVG } from "react-svg";
import { Text } from "../../common/text";
import Button from "../../common/Button";
import { TopDecorator } from "../TournamentDetails/TopDecorator";
import { BattleLogo } from "../TournamentDetails/BattleLogo";
import { MiniDetails } from "../TournamentDetails/MiniDetails";
import BgIconCard from "../../common/bgIconCard";

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
import TeamLeaderboard from "../TournamentDetails/TeamLeaderboard";
import Add from "../../../assets/icons/add.svg";

export const ManageTournament = () => {
  return (
    <div className="select-none relative rounded-[36px] bg-shadowbox w-[1500px] m-10 ml-20 mt-20 h-[90%] flex justify-center">
      <div className="flex flex-col h-full">
        <div className="flex rounded-t-[36px] h-[10%] bg-bgprimary w-full justify-between items-center">
          <div className="flex flex-row items-center">
            <img
              src={Back}
              className="w-[40px] h-[40px]  rounded-[100%]"
              onClick={() => {
                console.log("pressed");
              }}
            />
            <Text
              text={["MANAGE TOURNAMENT"]}
              size="text-[20px] "
              className={"leading-normal text-start ml-5"}
              fontColor="text-white"
              fontType="font-bold"
            />
          </div>
          <div className="flex gap-5 flex-row mr-10">
            <div className="flex bg-white rounded-[100%] justify-center items-center w-[50px] h-[50px]">
              <BgIconCard
                icon={"elephant.svg"}
                iWidth={"40px"}
                iHeight={"40px"}
                classname={"rounded-[100%] h-[45px] w-[45px]"}
              />
            </div>
            <div className="flex bg-white rounded-[100%] justify-center items-center w-[50px] h-[50px]">
              <BgIconCard
                icon={"elephant.svg"}
                iWidth={"45px"}
                iHeight={"45px"}
                classname={"rounded-[100%] h-[45px] w-[45px]"}
              />
            </div>
            <BgIconCard icon={Add} iWidth={"25px"} iHeight={"25px"} />
          </div>
        </div>
        <div className="flex h-full rounded-[36px] flex-row">
          {/* Lado Izquierdo */}
          <div className="flex flex-col h-[682px] w-[700px] ml-10 pl-10 justify-center items-center">
            <div className="flex flex-row -space-y-2  items-center justify-evenly w-full">
              <div className="mt-16">
                <BattleLogo BattleIcon={Binary} />
              </div>
              <div className="flex flex-col justify-evenly h-full -space-y-2">
                <MiniDetails
                  context={""}
                  title={"Started"}
                  icon={"Calendar"}
                  msg={"22 Dec. 2023"}
                />
                <MiniDetails
                  context={""}
                  title={"Ends"}
                  icon={"Calendar"}
                  msg={"22 Dec. 2023"}
                />
              </div>
            </div>
            <div className="flex flex-col w-full items-center -mt-5 m-10">
              <div className="space-y-4 mt-5 justify-center items-center">
                <Text
                  text={["Name"]}
                  size="text-[16px] "
                  className={"leading-normal text-start ml-5"}
                  fontColor="text-white"
                  fontType="font-bold"
                />
                <div className="flex w-[80%] h-[15%] rounded-[26px] p-5 pl-10  mb-12 justify-between items-center bg-bgaccent">
                  <Text
                    text={["Tournament 1"]}
                    size="text-[16px] "
                    className={"leading-normal text-start"}
                    fontColor="text-white"
                    fontType="font-bold"
                  />
                </div>
                <Text
                  text={["Description"]}
                  size="text-[16px] "
                  className={"leading-normal text-start ml-5"}
                  fontColor="text-white"
                  fontType="font-bold"
                />
                <div className="flex w-[80%] h-[50%] rounded-[26px] p-10 pl-10 pr-10 mr-2 justify-between items-center bg-bgaccent">
                  <Text
                    text={[
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                    ]}
                    size="text-[16px] "
                    className={"leading-normal text-start"}
                    fontColor="text-white"
                    fontType="font-normal"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center w-full mr-40">
              <Button name="Edit Tournament" />
            </div>
          </div>
          {/* Lado Derecho */}
          <div className="flex flex-row h-[98%] w-[730px] justify-center items-center rounded-br-[36px] bg-bgaccent">
            <div className="flex flex-col h-full w-full justify-around">
              <div className="flex flex-col ">
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
                <div className="flex mb-5 justify-between pr-20 items-center w-full flex-row">
                  <Text
                    text={["Leaderboard"]}
                    size="text-[24px]"
                    fontColor="text-white"
                    className={"text-start ml-20"}
                    fontType="font-bold"
                  />
                  <div className="flex flex-row gap-3 items-center justify-center">
                    <Text
                      text={["Seito Suscribed"]}
                      size="text-[16px]"
                      fontColor="text-white"
                      className={"text-start ml-20"}
                      fontType="font-bold"
                    />
                    <div
                      className={`flex justify-center space-x-2 items-center rounded-[40px] bg-bgprimary pl-4 pr-6 w-auto h-[34px]`}
                    >
                      <ReactSVG
                        src={Sensei}
                        beforeInjection={(svg) => {
                          svg.setAttribute(
                            "style",
                            "width: 17px; height: 17px"
                          );
                        }}
                      />
                      <Text
                        text={["104"]}
                        size="text-[16px]"
                        fontColor={"text-white"}
                        fontType={"text-bold"}
                      />
                    </div>
                  </div>
                </div>
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
                  //   onWheel={handleWheel}
                  className="bg-bgaccent flex-col rounded-br-[36px] h-[90%] flex overflow-y-auto overflow-x-hidden scrollbar-thumb-bgprimary` scrollbar-thin"
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

export default ManageTournament;
