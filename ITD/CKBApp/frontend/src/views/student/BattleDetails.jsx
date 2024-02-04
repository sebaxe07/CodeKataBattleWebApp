import React, { useEffect, useRef, useState } from "react";
import { ReactSVG } from "react-svg";
import { useParams } from "react-router-dom";
import { Text } from "../../components/common/text";
import Button from "../../components/common/Button";
import { useNavigate } from "react-router-dom";
import { EducatorName } from "../../components/utils/TournamentDetails/EducatorName";
import { TopDecorator } from "../../components/utils/TournamentDetails/TopDecorator";
import { BattleLogo } from "../../components/utils/TournamentDetails/BattleLogo";
import { MiniDetails } from "../../components/utils/TournamentDetails/MiniDetails";
import { LoadingScreen } from "../../services/LoadingScreen";
import { TopScore } from "../../components/common/TopScore";
import { YouScore } from "../../components/common/YouScore";
import Logo from "../../assets/images/Logo.svg";
import Python from "../../assets/icons/python.svg";
import Binary from "../../assets/icons/binaryIcon.svg";
import Back from "../../assets/icons/backArrow.svg";
import Sensei from "../../assets/icons/UsersIcons/BearSensei.svg";
import ElephantUser from "../../assets/icons/UsersIcons/elephant.svg";
import PiggyUser from "../../assets/icons/UsersIcons/piggy.svg";
import BearUser from "../../assets/icons/UsersIcons/bear.svg";
import TigerUser from "../../assets/icons/UsersIcons/tiger.svg";
import TeamLeaderboard from "../../components/utils/TournamentDetails/TeamLeaderboard";

const defaultTournamentData = {
  name: "Tournament Name",
  description: "Tournament description",
  start_date: "2021-05-25",
  end_date: "2021-05-25",
  picture: "python.svg",
  battles: [],
  created_by: {
    user_profile: {
      profile_icon: "bear.svg",
      user: {
        first_name: "Sensei",
      },
    },
  },
};

const defaultBattle = {
  status: "active",
  created_by: {
    user_profile: {
      user: { id: 10, first_name: "Sebastian" },
      profile_icon: "bear.svg",
    },
  },
  description: "",
  end_date: "2024-02-07T23:00:00Z",
  max_students_per_group: 5,
  min_students_per_group: 1,
  name: "",
  picture: "python.svg",
  software_project: "",
  start_date: "2024-02-05T23:00:00Z",
};

const defaultTeam = {
  name: "Team Name",
  code: "123456",
  battle: 1,
  members: [],
};

export const BattleDetails = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [team, setTeam] = useState(defaultTeam);
  const [tournamentData, setTournamentData] = useState(defaultTournamentData);
  const [battle, setBattle] = useState(defaultBattle);
  const { id } = useParams();
  const navigate = useNavigate();
  const [teamSize, setTeamSize] = useState(0);
  const firstName =
    tournamentData.created_by.user_profile.user.first_name.split(" ")[0];

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

  useEffect(() => {
    console.log(battle);
    if (battle.min_students_per_group == battle.max_students_per_group) {
      setTeamSize(battle.min_students_per_group);
    } else {
      setTeamSize(
        battle.min_students_per_group + " - " + battle.max_students_per_group
      );
    }
  }, [battle]);

  useEffect(() => {
    setIsLoading(true);
    const battleID = Number(id);
    const teams = JSON.parse(localStorage.getItem("teams")) || [];
    const foundTeam = teams.find((team) => team.battle === battleID);
    setTeam(foundTeam);
    const tournaments = JSON.parse(localStorage.getItem("tournaments")) || [];

    // find the battle in the tournaments
    let foundTournament = null;
    tournaments.forEach((tournament) => {
      const foundBattle = tournament.battles.find(
        (battle) => battle.id === battleID
      );
      if (foundBattle) {
        foundTournament = tournament;
        setBattle(foundBattle);
      }
    });
    setTournamentData(foundTournament);
    setIsLoading(false);
  }, []);

  return (
    <div className="bg-bgsecondary flex flex-row justify-center items-center h-screen w-[screen-120px] ml-[120px]">
      {isLoading && <LoadingScreen />}

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
      <div className="select-none relative rounded-[36px] bg-accentSecondaryEducator w-[1500px] m-10 ml-20 mt-20 h-[75%] max-h-[75%]  flex justify-start">
        <div className="flex flex-col h-[98%] w-[99%]">
          <div className="flex flex-row items-center ml-10">
            <TopDecorator LanguageIcon={tournamentData.picture} size={250} />
            <EducatorName
              SenseiImg={Sensei}
              SenseiName={firstName}
              bg={"bg-[#359673]"}
            />
          </div>
          <div className="flex h-full rounded-[36px] w-full flex-row ">
            {/* Lado Izquierdo */}
            <div className="flex flex-col h-full  w-full items-center justify-evenly bg-bgeducator rounded-l-[36px]">
              <div className="flex basis-1/8 mt-5 w-[100%] items-center">
                <ReactSVG
                  src={Back}
                  beforeInjection={(svg) => {
                    svg.setAttribute("style", "width: 40px; height: 40px");
                  }}
                  className="cursor-pointer text-accenteducator ml-10"
                  onClick={() => {
                    navigate(-1);
                  }}
                />
              </div>
              <div className="flex flex-row -space-y-2 basis-7/8 w-full h-full justify-evenly items-center">
                <div className="flex flex-col">
                  <BattleLogo
                    BattleIcon={battle.picture}
                    shouldTranslate={false}
                    size={120}
                  />
                  <div className="flex flex-col -space-y-2">
                    <Text
                      text={[battle.name]}
                      size="text-[32px]"
                      fontColor="text-white"
                      className={
                        "text-start whitespace-nowrap overflow-hidden overflow-ellipsis w-[150px]"
                      }
                      fontType="font-bold"
                    />
                    <Text
                      text={[tournamentData.name]}
                      size="text-[16px]"
                      fontColor="text-white"
                      className={
                        "text-start whitespace-nowrap overflow-hidden overflow-ellipsis w-[150px]"
                      }
                      fontType="font-normal"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <MiniDetails
                      context={"b"}
                      title={"Team Size"}
                      icon={"Students"}
                      msg={teamSize}
                    />
                    <MiniDetails
                      context={"b"}
                      title={"Started"}
                      icon={"Calendar"}
                      msg={new Date(battle.start_date).toLocaleDateString()}
                    />
                    <MiniDetails
                      context={"b"}
                      title={"Ends"}
                      icon={"Calendar"}
                      msg={new Date(battle.end_date).toLocaleDateString()}
                    />
                    <MiniDetails
                      context={"b"}
                      title={"Battle Status"}
                      icon={"Calendar"}
                      msg={battle.status.toUpperCase()}
                    />
                  </div>
                </div>
                <div className="flex flex-col w-[390px] h-[90%]  rounded-[26px]  justify-center items-center">
                  <div className="flex items-center justify-evenly w-[100%] h-[50%]">
                    <Text
                      text={["My team"]}
                      size="text-[20px]"
                      fontColor="text-white"
                      className={"text-start"}
                      fontType="font-bold"
                    />
                    <Text
                      text={[team.name]}
                      size="text-[20px]"
                      fontColor="text-white"
                      className={
                        "text-start bg-accentSecondaryEducator rounded-[40px] py-2  px-5 ml-2"
                      }
                      fontType="font-bold"
                    />
                    <Text
                      text={["Invite Code:", team.code]}
                      size="text-[16px]"
                      fontColor="text-white"
                      className={"text-center leading-tight"}
                      fontType="font-bold"
                    />
                  </div>
                  <div className="flex flex-col w-[390px] h-full rounded-[26px] p-10 mr-2 mb-12 justify-between items-center bg-accentSecondaryEducator">
                    <div
                      className="overflow-auto mb-5  scrollbar-thin scrollbar-thumb-bgeducator scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
                      style={{ maxHeight: "300px" }}
                    >
                      <Text
                        text={[battle.description]}
                        size="text-[16px] "
                        className={"leading-normal text-start"}
                        fontColor="text-white"
                        fontType="font-normal"
                      />
                    </div>
                    {battle.status === "active" && (
                      <a
                        href={`https://github.com/CodeKataBattleHUB/${battle.name.replace(
                          /\s/g,
                          "-"
                        )}-${battle.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button name="Go to Github" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* Lado Derecho */}
            <div className="flex flex-col h-full w-full justify-center items-center rounded-r-[36px] bg-[#2F8F6F]">
              <div className="flex flex-col h-[40%] w-full justify-start items-center">
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
              <div className="w-full h-[42%]">
                <div className="flex flex-row justify-around">
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
                <div className="bg-bgeducator flex-col w-full h-full flex overflow-y-auto overflow-x-hidden scrollbar-thumb-accentSecondaryEducator scrollbar-thin">
                  <TeamLeaderboard
                    context={"b"}
                    rank={"1"}
                    icon="tiger.svg"
                    name={"Juanito"}
                    exp={"100"}
                  />
                  <TeamLeaderboard
                    context={"b"}
                    rank={"2"}
                    icon="tiger.svg"
                    name={"Juanito"}
                    exp={"100"}
                  />
                  <TeamLeaderboard
                    context={"b"}
                    rank={"3"}
                    icon="tiger.svg"
                    name={"Juanito"}
                    exp={"100"}
                  />
                  <TeamLeaderboard
                    context={"b"}
                    rank={"4"}
                    icon="tiger.svg"
                    name={"Juanito"}
                    exp={"100"}
                  />
                  <TeamLeaderboard
                    context={"b"}
                    rank={"5"}
                    icon="tiger.svg"
                    name={"Juanito"}
                    exp={"100"}
                  />
                  <TeamLeaderboard
                    context={"b"}
                    rank={"6"}
                    icon="tiger.svg"
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
