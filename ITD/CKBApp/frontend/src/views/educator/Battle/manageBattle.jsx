import React, { useEffect, useRef } from "react";
import { ReactSVG } from "react-svg";
import { Text } from "../../../components/common/text";
import Button from "../../../components/common/Button";
import { BattleLogo } from "../../../components/utils/TournamentDetails/BattleLogo";
import { MiniDetails } from "../../../components/utils/TournamentDetails/MiniDetails";
import BgIconCard from "../../../components/common/bgIconCard";

import Logo from "../../../assets/images/Logo.svg";

import Binary from "../../../assets/icons/binaryIcon.png";
import Back from "../../../assets/icons/backArrow.png";
import Sensei from "../../../assets/icons/UsersIcons/BearSensei.svg";
import TeamLeaderboard from "../../../components/utils/TournamentDetails/TeamLeaderboard";
import Add from "../../../assets/icons/add.svg";

export const ManageBattle = () => {
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
      <div className="select-none relative rounded-[36px] bg-accentSecondaryEducator w-[1500px] m-10 ml-20 mt-20 h-[85%] flex justify-center">
        <div className="flex flex-col ">
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
                text={["MANAGE BATTLE"]}
                size="text-[20px] "
                className={"leading-normal text-start ml-5"}
                fontColor="text-white"
                fontType="font-bold"
              />
            </div>
            <div className="flex gap-5 flex-row mr-10 items-center">
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
                size={45}
                onClick={() => console.log("Add new Sensei")}
              />
            </div>
          </div>
          <div className="flex h-full rounded-[36px] flex-row">
            {/* Lado Izquierdo */}
            <div className="flex flex-col h-[98%]  w-[50%] pl-28 justify-center items-center bg-bgeducator rounded-bl-[36px]">
              <div className="flex flex-row -space-y-2  items-center justify-evenly w-full">
                <div className="mt-16 translate-y-12">
                  <BattleLogo BattleIcon={Binary} size={150} />
                </div>
                <div className="flex flex-col justify-evenly h-full -space-y-2">
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
              <div className="flex flex-col w-full items-center -mt-5 m-10">
                <div className="space-y-4 mt-5 justify-center items-center">
                  <Text
                    text={["Name"]}
                    size="text-[16px] "
                    className={"leading-normal text-start ml-5"}
                    fontColor="text-white"
                    fontType="font-bold"
                  />
                  <div className="flex w-[80%] h-[15%] rounded-[26px] p-5 pl-10  mb-12 justify-between items-center bg-accentSecondaryEducator">
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
                  <div className="flex w-[80%] h-[50%] rounded-[26px] p-10 pl-10 pr-10 mr-2 justify-between items-center bg-accentSecondaryEducator">
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
                <Button name="Edit Battle" />
                <div className="flex flex-row gap-3 items-center justify-center">
                  <Text
                    text={["Team Size"]}
                    size="text-[16px]"
                    fontColor="text-white"
                    className={"text-start ml-20"}
                    fontType="font-bold"
                  />
                  <div
                    className={`flex justify-center space-x-2 items-center rounded-[40px] bg-accentSecondaryEducator pl-4 pr-6 w-auto h-[34px]`}
                  >
                    <ReactSVG
                      src={Sensei}
                      beforeInjection={(svg) => {
                        svg.setAttribute("style", "width: 17px; height: 17px");
                      }}
                    />
                    <Text
                      text={["1-5"]}
                      size="text-[16px]"
                      fontColor={"text-white"}
                      fontType={"text-bold"}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Lado Derecho */}
            <div className="flex flex-row h-[98%] w-[49%] justify-center items-center rounded-br-[36px] bg-[#2F8F6F]">
              <div className="flex flex-col h-full w-full justify-center">
                {/* LeaderBoard Information */}
                <div className="w-full max-h-[782px]">
                  <div className="flex justify-between pr-20 items-center w-full flex-row">
                    <Text
                      text={["Leaderboard"]}
                      size="text-[20px]"
                      fontColor="text-white"
                      className={"text-start ml-20"}
                      fontType="font-black"
                    />
                  </div>
                  <div className="flex flex-col h-full">
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
                    {/* Leaderboard Content */}
                    <div
                      //   onWheel={handleWheel}
                      className="flex-col rounded-br-[36px]  overflow-y-clip h-full max-h-[630px] flex fadeScroll "
                    >
                      <div className="overflow-y-scroll overflow-x-hidden scrollbar-thumb-bgsecondaryeducator scrollbar-thin">
                        <TeamLeaderboard
                          rank={"1"}
                          context={"b"}
                          icon={"tiger.svg"}
                          name={"Juanito"}
                          exp={"100"}
                        />
                        <TeamLeaderboard
                          rank={"2"}
                          context={"b"}
                          icon={"tiger.svg"}
                          name={"Juanito"}
                          exp={"100"}
                        />
                        <TeamLeaderboard
                          rank={"1"}
                          context={"b"}
                          icon={"tiger.svg"}
                          name={"Juanito"}
                          exp={"100"}
                        />
                        <TeamLeaderboard
                          rank={"2"}
                          context={"b"}
                          icon={"tiger.svg"}
                          name={"Juanito"}
                          exp={"100"}
                        />
                        <TeamLeaderboard
                          rank={"1"}
                          context={"b"}
                          icon={"tiger.svg"}
                          name={"Juanito"}
                          exp={"100"}
                        />
                        <TeamLeaderboard
                          rank={"2"}
                          context={"b"}
                          icon={"tiger.svg"}
                          name={"Juanito"}
                          exp={"100"}
                        />
                        <TeamLeaderboard
                          rank={"1"}
                          context={"b"}
                          icon={"tiger.svg"}
                          name={"Juanito"}
                          exp={"100"}
                        />
                        <TeamLeaderboard
                          rank={"2"}
                          context={"b"}
                          icon={"tiger.svg"}
                          name={"Juanito"}
                          exp={"100"}
                        />
                        <TeamLeaderboard
                          rank={"1"}
                          context={"b"}
                          icon={"tiger.svg"}
                          name={"Juanito"}
                          exp={"100"}
                        />
                        <TeamLeaderboard
                          rank={"2"}
                          context={"b"}
                          icon={"tiger.svg"}
                          name={"Juanito"}
                          exp={"100"}
                        />
                        <TeamLeaderboard
                          rank={"1"}
                          context={"b"}
                          icon={"tiger.svg"}
                          name={"Juanito"}
                          exp={"100"}
                        />
                        <TeamLeaderboard
                          rank={"2"}
                          context={"b"}
                          icon={"tiger.svg"}
                          name={"Juanito"}
                          exp={"100"}
                        />
                        <TeamLeaderboard
                          rank={"1"}
                          context={"b"}
                          icon={"tiger.svg"}
                          name={"Juanito"}
                          exp={"100"}
                        />
                        <TeamLeaderboard
                          rank={"2"}
                          context={"b"}
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
    </div>
  );
};

export default ManageBattle;
