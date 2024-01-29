import React, { useEffect, useRef } from "react";
import { ReactSVG } from "react-svg";
import { Text } from "../../../components/common/text";
import Button from "../../../components/common/Button";
import { TopDecorator } from "../../../components/utils/TournamentDetails/TopDecorator";
import { BattleLogo } from "../../../components/utils/TournamentDetails/BattleLogo";
import { MiniDetails } from "../../../components/utils/TournamentDetails/MiniDetails";
import BgIconCard from "../../../components/common/bgIconCard";
import Logo from "../../../assets/images/Logo.svg";

import CreatedBattle from "../../../components/utils/TournamentDetails/CreatedBattle";

import Python from "../../../assets/icons/python.png";
import Binary from "../../../assets/icons/binaryIcon.png";
import Back from "../../../assets/icons/backArrow.png";
import Sensei from "../../../assets/icons/UsersIcons/BearSensei.svg";
import ElephantUser from "../../../assets/icons/UsersIcons/elephant.svg";
import PiggyUser from "../../../assets/icons/UsersIcons/piggy.svg";
import BearUser from "../../../assets/icons/UsersIcons/bear.svg";
import TigerUser from "../../../assets/icons/UsersIcons/tiger.svg";
import TeamLeaderboard from "../../../components/utils/TournamentDetails/TeamLeaderboard";
import Add from "../../../assets/icons/add.svg";

export const ManageTournament = () => {
  return (
    <div className="bg-[#19362D] flex flex-col justify-center items-center  h-screen w-screen">
      <ReactSVG
        src={Logo}
        beforeInjection={(svg) => {
          svg.setAttribute("style", "width: 70px; height: 70px");
        }}
        style={{
          position: "fixed",
          top: 30,
          right: 30,
        }}
      />
      <div className="select-none relative rounded-[36px] bg-shadowbox w-[1500px] m-10 ml-20 mt-20 h-[85%] max-h-[85%]  flex justify-center">
        <div className="flex flex-col h-[99%]">
          <div className="flex rounded-t-[36px] h-[10%]  w-full justify-between items-center">
            <div className="flex flex-row items-center ml-10">
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
              <div className="flex flex-row gap-3">
                <div className="flex bg-white rounded-[100%] justify-center items-center w-[50px] h-[50px]">
                  <BgIconCard icon={"elephant.svg"} size={40} />
                </div>
                <div className="flex bg-white rounded-[100%] justify-center items-center w-[50px] h-[50px]">
                  <BgIconCard icon={"elephant.svg"} size={40} />
                </div>
              </div>
              <BgIconCard
                icon={Add}
                size={30}
                onClick={() => console.log("Add new Sensei")}
              />
            </div>
          </div>
          <div className="flex h-full rounded-[36px] flex-row">
            {/* Lado Izquierdo */}
            <div className="flex flex-col h-[95%] rounded-bl-[36px] w-[50%] pl-10 justify-center items-center bg-bgprimary">
              <div className="flex flex-row -space-y-2  items-center justify-evenly w-full">
                <div className="mt-16 -translate-x-10 translate-y-12">
                  <BattleLogo BattleIcon={Binary} size={150} />
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
                  <div className="flex w-[80%] h-[15%] rounded-[26px] p-5 pl-10  mb-12 justify-between items-center bg-shadowbox">
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
                  <div className="flex w-[80%] h-[50%] rounded-[26px] p-10 pl-10 pr-10 mr-2 justify-between items-center bg-shadowbox">
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
            <div className="flex flex-col h-[95%] rounded-br-[36px] w-[50%] justify-center items-center bg-[#413e97]">
              {/* Created Battles */}
              <div className="flex flex-col w-full h-[48%] justify-evenly pl-14 pr-14">
                <div
                  // onWheel={handleWheel}
                  className="flex-col rounded-[36px] overflow-y-clip overflow-x-hidden h-[68%] flex "
                >
                  <Text
                    text={["Created Battles"]}
                    size="text-[20px] "
                    className={"leading-normal text-start mb-5 ml-5"}
                    fontColor="text-white"
                    fontType="font-black"
                  />
                  <div className="w-full gap-4 flex-col flex overflow-y-auto overflow-x-hidden scrollbar-thumb-bgprimary scrollbar-thin fixed-height-container">
                    <CreatedBattle
                      icon={"tiger.svg"}
                      name={"Juanito"}
                      state={"ACTIVE"}
                    />
                    <CreatedBattle
                      icon={"tiger.svg"}
                      name={"Juanito"}
                      state={"ACTIVE"}
                    />
                    <CreatedBattle
                      icon={"tiger.svg"}
                      name={"Juanito"}
                      state={"ACTIVE"}
                    />
                    <CreatedBattle
                      icon={"tiger.svg"}
                      name={"Juanito"}
                      state={"ACTIVE"}
                    />
                    <CreatedBattle
                      icon={"tiger.svg"}
                      name={"Juanito"}
                      state={"ACTIVE"}
                    />
                  </div>
                </div>
                <div className="ml-16">
                  <ReactSVG
                    src={Add}
                    beforeInjection={(svg) => {
                      svg.setAttribute("style", "width: 25px; height: 25px");
                    }}
                  />
                </div>
              </div>
              {/* LeaderBoard */}
              <div className="flex flex-col w-full h-[48%] ">
                {/* Leaderboard Header */}
                <div className="flex justify-around h-[20%] pr-20 items-center w-full flex-col">
                  <div className="flex justify-between w-full">
                    <div>
                      <Text
                        text={["Leaderboard"]}
                        size="text-[20px]"
                        fontColor="text-white"
                        className={"text-start ml-20"}
                        fontType="font-black"
                      />
                    </div>
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
                  <div className="flex flex-row justify-around w-full ml-20 mr-20">
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
                </div>
                {/* Leaderboard Information */}
                <div className="flex flex-col max-h-[82%] ">
                  <div //   onWheel={handleWheel}
                    className="rounded-br-[36px] overflow-y-clip   fadeScroll1 "
                  >
                    <div className="flex flex-col w-full overflow-y-scroll max-h-[100%] overflow-x-hidden scrollbar-thumb-bgaccent scrollbar-thin">
                      <TeamLeaderboard
                        rank={"1"}
                        icon={"tiger.svg"}
                        name={"Juanito"}
                        exp={"100"}
                      />
                      <TeamLeaderboard
                        rank={"2"}
                        icon={"tiger.svg"}
                        name={"Juanito"}
                        exp={"100"}
                      />
                      <TeamLeaderboard
                        rank={"1"}
                        icon={"tiger.svg"}
                        name={"Juanito"}
                        exp={"100"}
                      />
                      <TeamLeaderboard
                        rank={"2"}
                        icon={"tiger.svg"}
                        name={"Juanito"}
                        exp={"100"}
                      />
                      <TeamLeaderboard
                        rank={"1"}
                        icon={"tiger.svg"}
                        name={"Juanito"}
                        exp={"100"}
                      />
                      <TeamLeaderboard
                        rank={"2"}
                        icon={"tiger.svg"}
                        name={"Juanito"}
                        exp={"100"}
                      />
                      <TeamLeaderboard
                        rank={"1"}
                        icon={"tiger.svg"}
                        name={"Juanito"}
                        exp={"100"}
                      />
                      <TeamLeaderboard
                        rank={"1"}
                        icon={"tiger.svg"}
                        name={"Juanito"}
                        exp={"100"}
                      />
                      <TeamLeaderboard
                        rank={"2"}
                        icon={"tiger.svg"}
                        name={"Juanito"}
                        exp={"100"}
                      />
                      <TeamLeaderboard
                        rank={"1"}
                        icon={"tiger.svg"}
                        name={"Juanito"}
                        exp={"100"}
                      />
                      <TeamLeaderboard
                        rank={"1"}
                        icon={"tiger.svg"}
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
      </div>
    </div>
  );
};

export default ManageTournament;
