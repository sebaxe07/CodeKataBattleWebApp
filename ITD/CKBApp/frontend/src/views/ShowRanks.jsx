import React, { useState, useEffect, useContext } from "react";
import { ReactSVG } from "react-svg";
import { Text } from "../components/common/text";
import { EducatorName } from "../components/utils/TournamentDetails/EducatorName";
import { TopDecorator } from "../components/utils/TournamentDetails//TopDecorator";
import { TourDescript } from "../components/utils/TournamentDetails/TourDescript";
import { TeamLeaderboardEducator } from "../components/utils/TournamentDetails/TeamLeaderboardEducator";
import { UserContext } from "../services/contexts/UserContext";

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

const defaultScore = {
  id: 1,
  student: { id: 1, user_profile: {} },
  total_score: 100,
  tournament: 1,
};

export const ShowRanks = ({
  context,
  tournamentData = defaultTournamentData,
  scoreData = defaultScore,
  onSeeMoreClick,
  onBattleSelect,
}) => {
  const colorSchemes = [
    {
      bgMain: "bg-bgsecondary",
      bgPrimary: "bg-bgprimary",
      bgAccent: "bg-bgaccent",
      shadow: "bg-shadowbox",
      fadescroll: "fadeScroll1",
    },
    {
      bgMain: "bg-bgsecondaryeducator",
      bgPrimary: "bg-primaryeducator",
      bgAccent: "bg-accentSecondaryEducator",
      shadow: "bg-shadowboxeducator",
      fadescroll: "fadeScroll",
    },
  ];
  const filteredScores = scoreData.filter(
    (score) => score.tournament === tournamentData.id
  );

  const [colorScheme, setColorScheme] = useState(colorSchemes[0]);

  useEffect(() => {
    setColorScheme(colorScheme[0]);
    setColorScheme(colorSchemes[context == "educator" ? 1 : 0]);
  }, [context]);

  useEffect(() => {
    console.log("scoreData ", scoreData[0]);
    console.log("filteredScores ", filteredScores);
  }, [scoreData, filteredScores]);

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

  return (
    <div
      className={`select-none relative rounded-[36px] ${colorScheme.shadow} w-[765px] h-[80%] mt-10 flex justify-center`}
    >
      <div
        className={`relative flex flex-col rounded-[36px] ${colorScheme.bgPrimary} w-[747px] h-[97%]`}
      >
        <div className=" relative flex  w-full h-full justify-center  ">
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
        </div>
        <div className="w-full h-full">
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
          <div className="flex flex-col h-full w-full">
            <div className=" h-full ] fadeScroll1">
              <div
                className={`overflow-y-auto overflow-x-hidden flex flex-col items-center scrollbar-thin rounded-b-[36px] scrollbar-thumb-${colorScheme.bgAccent} scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-track-rounded-full`}
                style={{
                  maxHeight: "500px",
                  minHeight: "300px",
                  paddingBottom: "10px",
                }}
              >
                {filteredScores.map((score, index) => (
                  <TeamLeaderboardEducator
                    key={score.id}
                    rank={index + 1}
                    icon={score.student.user_profile.profile_icon}
                    name={score.student.user_profile.user.first_name}
                    exp={score.total_score}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowRanks;
