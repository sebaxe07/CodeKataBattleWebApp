import React, { useContext, useEffect, useState } from "react";
import { ReactSVG } from "react-svg";
import { Text } from "../common/text";
import Fire from "../../assets/icons/fire.svg";
import { EducatorName } from "./TournamentDetails/EducatorName";
import { TopDecorator } from "./TournamentDetails/TopDecorator";
import { TourDescript } from "./TournamentDetails/TourDescript";
import { TopScore } from "../common/TopScore";
import { YouScore } from "../common/YouScore";
import { BattleComp } from "./TournamentDetails/BattleComp";
import { Dates } from "./TournamentDetails/Dates";
import { UserContext } from "../../services/contexts/UserContext";

import BearUser from "../../assets/icons/UsersIcons/bear.svg";
import ElephantUser from "../../assets/icons/UsersIcons/elephant.svg";
import PiggyUser from "../../assets/icons/UsersIcons/piggy.svg";

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

export const TournamentDetails = ({
  tournamentData = defaultTournamentData,
  onSeeMoreClick,
  onBattleSelect,
  teams,
  scoreData = [
    {
      total_score: 0,
      position: 0,
      battle_scores: [],
      top_tournament_scores: [
        { student: { user_profile: { user: {} } }, total_score: 0 },
      ],
    },
  ],
}) => {
  const [topScore, setTopScore] = useState(null);

  const { activeUser, setActiveUser } = useContext(UserContext);
  const endDate = new Date(tournamentData.end_date);
  const currentDate = new Date();
  const differenceInTime = endDate.getTime() - currentDate.getTime();
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
  const firstName =
    tournamentData.created_by.user_profile.user.first_name.split(" ")[0];
  const handleWheel = (e) => {
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
    // console.log("scoreData ", scoreData[0]);
  }, [scoreData]);

  return (
    <div className="select-none relative rounded-[36px] bg-shadowbox w-[765px] h-[76%] flex justify-center">
      <div className="relative rounded-[36px] bg-bgprimary w-[747px] h-[97%]">
        <div className=" relative w-full h-[59%]  ">
          <TopDecorator LanguageIcon={tournamentData.picture} size={230} />

          <EducatorName
            SenseiImg={tournamentData.created_by.user_profile.profile_icon}
            SenseiName={firstName}
            bg={"bg-bgaccent"}
          />

          <TourDescript
            name={tournamentData.name}
            description={tournamentData.description}
          />

          <div className="flex flex-row justify-center items-end relative top-[35%]">
            {tournamentData.battles.length > 0 ? (
              <>
                <TopScore
                  users={
                    scoreData[0].top_tournament_scores
                      ? scoreData[0].top_tournament_scores.map(
                          (score) => score.student.user_profile.user.first_name
                        )
                      : ["a", "b", "c"]
                  }
                  score={
                    scoreData[0].top_tournament_scores
                      ? scoreData[0].top_tournament_scores.map((score) =>
                          score.total_score.toString()
                        )
                      : []
                  }
                  icons={
                    scoreData[0].top_tournament_scores
                      ? scoreData[0].top_tournament_scores.map(
                          (score) => score.student.user_profile.profile_icon
                        )
                      : [BearUser, ElephantUser, PiggyUser]
                  }
                />
              </>
            ) : null}
            <YouScore
              userIcon={activeUser.user_profile.profile_icon}
              position={
                scoreData[0].total_score !== 0 ? scoreData[0].position : "-"
              }
              score={scoreData[0].total_score}
            />
          </div>
        </div>

        <div
          onWheel={handleWheel}
          className="relative bg-bgaccent w-full h-[30%] flex flex-row justify-start items-center overflow-auto scrollbar-thin scrollbar-thumb-bgprimary scrollbar-track-transparent"
        >
          {tournamentData.battles.length > 0 ? (
            tournamentData.battles.map((battle) => {
              const battleScore = scoreData[0].battle_scores.find(
                (score) => score.battle === battle.id
              );
              const battleXP = battleScore ? battleScore.total_score : 0;

              return (
                <BattleComp
                  key={battle.id}
                  battleName={battle.name}
                  languageIcon={battle.picture}
                  battleXP={battleXP}
                  battleData={battle}
                  onSeeMoreClick={onSeeMoreClick}
                  onBattleSelect={onBattleSelect}
                  partOf={teams.some((team) => team.battle === battle.id)}
                />
              );
            })
          ) : (
            <div className="flex flex-row items-center justify-center w-full mx-5 h-[50%]  bg-bgprimary rounded-[36px]">
              <Text
                text={["No battles yet"]}
                size="text-[20px]"
                fontColor="text-accentprimary"
                fontType="font-bold"
              />
            </div>
          )}
        </div>
        <div className="relative rounded-t-none rounded-b-[36px] bg-bgsecondary w-full h-[13%]  flex flex-row justify-center items-center">
          <div className=" w-full h-full flex flex-row justify-center items-center ml-5">
            <Dates
              state={"Starts"}
              date={new Date(tournamentData.start_date).toLocaleDateString()}
            />

            <Dates
              state={"Ends"}
              date={new Date(tournamentData.end_date).toLocaleDateString()}
            />
          </div>
          <div className=" w-full h-full flex flex-row justify-end items-center mr-[5%]">
            <div className="flex flex-row justify-start items-center space-x-2 mr-[10px]">
              <ReactSVG
                src={Fire}
                beforeInjection={(svg) => {
                  svg.setAttribute("style", "width: 23px; height: 23px");
                }}
              />
              <Text
                text={[`Ends in ${differenceInDays} days`]}
                size="text-[16px]"
                fontColor="text-accentsecondary"
                fontType="font-bold"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentDetails;
