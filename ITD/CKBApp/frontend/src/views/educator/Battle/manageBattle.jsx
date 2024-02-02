import React, { useEffect, useContext, useState } from "react";
import { ReactSVG } from "react-svg";
import { Text } from "../../../components/common/text";
import Button from "../../../components/common/Button";
import { BattleLogo } from "../../../components/utils/TournamentDetails/BattleLogo";
import { MiniDetails } from "../../../components/utils/TournamentDetails/MiniDetails";
import BgIconCard from "../../../components/common/bgIconCard";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../../services/contexts/UserContext";
import { LoadingScreen } from "../../../services/LoadingScreen";
import { TextField } from "../../../components/common/textfield";
import Logo from "../../../assets/images/Logo.svg";

import Binary from "../../../assets/icons/binaryIcon.svg";
import Back from "../../../assets/icons/backArrow.svg";
import Sensei from "../../../assets/icons/UsersIcons/BearSensei.svg";
import TeamLeaderboard from "../../../components/utils/TournamentDetails/TeamLeaderboard";
import Add from "../../../assets/icons/add.svg";

export const ManageBattle = () => {
  const [battles, setBattles] = useState([]);
  const navigate = useNavigate();
  const { id, bid } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [teamSize, setTeamSize] = useState(0);

  useEffect(() => {
    console.log(id);
    const storedBattles = JSON.parse(localStorage.getItem(`battle${id}`));
    const battleid = Number(bid); // Convert id to number
    setBattles(storedBattles.filter((battle) => battle.id === battleid)[0]);
  }, []);

  useEffect(() => {
    console.log(battles);
    if (battles.min_students_per_group == battles.max_students_per_group) {
      setTeamSize(battles.min_students_per_group);
    } else {
      setTeamSize(
        battles.min_students_per_group + " - " + battles.max_students_per_group
      );
    }
  }, [battles]);

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
      <div className="select-none relative rounded-[36px] bg-accentSecondaryEducator w-[1500px] m-10 ml-20 mt-20 h-[85%] max-h-[85%]  flex justify-start">
        <div className="flex flex-col h-[98%] w-[99%]">
          <div className="flex rounded-t-[36px] h-[10%]  w-full justify-between items-center">
            <div className="flex flex-row items-center ml-10">
              <ReactSVG
                src={Back}
                beforeInjection={(svg) => {
                  svg.setAttribute("style", "width: 30px; height: 30px");
                }}
                className="cursor-pointer text-accenteducator"
                onClick={() => {
                  navigate(-1);
                }}
              />
              <Text
                text={["MANAGE BATTLE"]}
                size="text-[20px] "
                className={"leading-normal text-start ml-5"}
                fontColor="text-white"
                fontType="font-black"
              />
            </div>
          </div>
          <div className="flex h-full rounded-[36px] w-full flex-row ">
            {/* Lado Izquierdo */}
            <div className="flex flex-col h-full  w-full  bg-bgeducator rounded-bl-[36px]">
              <div className="flex flex-row  -space-y-1 mt-20  items-center justify-evenly h-full w-full ">
                <BattleLogo
                  BattleIcon={battles.picture}
                  size={150}
                  shouldTranslate={false}
                />
                <div className="flex flex-col justify-evenly h-full -space-y-2">
                  <MiniDetails
                    context={"b"}
                    title={"Started"}
                    icon={"Calendar"}
                    msg={new Date(battles.start_date).toLocaleDateString()}
                  />
                  <MiniDetails
                    context={"b"}
                    title={"Ends"}
                    icon={"Calendar"}
                    msg={new Date(battles.end_date).toLocaleDateString()}
                  />
                </div>
              </div>
              <div className="flex  flex-col w-full h-full items-center  justify-center  ">
                <div className="flex justify-start w-[80%]  items-center ">
                  <Text
                    text={["Name"]}
                    size="text-[16px] "
                    className={"leading-normal text-start ml-5"}
                    fontColor="text-white"
                    fontType="font-bold"
                  />
                </div>
                <div className="flex w-[80%] h-[15%] rounded-[26px] p-5  mb-3 justify-between items-center bg-accentSecondaryEducator">
                  <Text
                    text={[battles.name]}
                    size="text-[16px] "
                    className={"leading-normal text-start"}
                    fontColor="text-white"
                    fontType="font-bold"
                  />
                </div>
                <div className="flex justify-start w-[80%]  items-center ">
                  <Text
                    text={["Description"]}
                    size="text-[16px] "
                    className={"leading-normal text-start ml-5"}
                    fontColor="text-white"
                    fontType="font-bold"
                  />
                </div>
                <div className="flex w-[80%] h-[157px] rounded-[26px]  p-5 justify-between items-center bg-accentSecondaryEducator">
                  <div className="overflow-auto h-[150px] mt-1 w-full scrollbar-thin scrollbar-thumb-shadowboxeducator scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-track-rounded-full ">
                    <Text
                      text={[battles.description]}
                      size="text-[16px] "
                      className={"leading-normal text-start"}
                      fontColor="text-white"
                      fontType="font-normal"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center h-full w-full  ">
                <Button
                  name="Edit Battle"
                  onClick={() => {
                    navigate("edit");
                  }}
                />
                <div className="flex flex-row gap-3 items-center justify-center">
                  <Text
                    text={["Team Size"]}
                    size="text-[16px]"
                    fontColor="text-white"
                    className={"text-start ml-20"}
                    fontType="font-bold"
                  />
                  <div
                    className={`flex justify-center space-x-2 items-center rounded-[40px] bg-accentSecondaryEducator px-6 w-auto h-[34px]`}
                  >
                    <Text
                      text={[teamSize]}
                      size="text-[16px]"
                      fontColor={"text-white"}
                      fontType={"text-bold"}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Lado Derecho */}
            <div className="flex flex-col h-full w-full justify-center rounded-br-[36px] bg-[#2F8F6F]">
              <div className="flex flex-col basis-1/6 h-full w-full justify-around items-center ">
                <div className="flex  h-full w-full items-center ">
                  <Text
                    text={["Leaderboard"]}
                    size="text-[20px]"
                    fontColor="text-white"
                    className={"text-start ml-20"}
                    fontType="font-black"
                  />
                </div>
                <div className="flex flex-row h-full w-full justify-around items-center ">
                  <Text
                    text={["#"]}
                    size="text-[16px]"
                    fontColor="text-white"
                    className={"text-start"}
                    fontType="font-bold"
                  />
                  <Text
                    text={["Seito"]}
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
              <div className="flex flex-col h-full w-full rounded-br-[36px]  ">
                <div className="overflow-hidden rounded-br-[36px] fadeScroll h-full w-full">
                  <div
                    className="flex flex-col h-full overflow-auto scrollbar-thin scrollbar-thumb-shadowboxeducator scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
                    style={{
                      maxHeight: "600px",
                      minHeight: "300px",
                      paddingBottom: "20px",
                    }}
                  >
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
