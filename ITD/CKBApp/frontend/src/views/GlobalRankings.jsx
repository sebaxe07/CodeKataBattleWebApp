import React, { useState, useEffect, useContext } from "react";
import axios from "../services/api";
import { ReactSVG } from "react-svg";
import { Text } from "../components/common/text";
import Logo from "../assets/images/Logo.svg";
import TournamentCard from "../components/utils/TournamentCard";
import { useNavigate } from "react-router-dom";
import { LoadingScreen } from "../services/LoadingScreen";
import { UserContext } from "../services/contexts/UserContext";
import RefreshB from "../assets/icons/refreshB.svg";

import ShowRanks from "./ShowRanks";

export const GlobalRankings = ({ context }) => {
  const [preview, setPreview] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const { activeUser, setActiveUser } = useContext(UserContext);
  const [tournaments, setTournaments] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [selectedBattle, setSelectedBattle] = useState(null);
  const [teams, setTeams] = useState([]);
  const selectedTournamentData = tournaments.find(
    (tournament) => tournament.id === selectedTournament
  );

  const colorSchemes = [
    {
      bgMain: "bg-bgsecondary",
      bgPrimary: "bg-bgprimary",
      bgAccent: "bg-bgaccent",
      fadescroll: "fadeScroll1",
    },
    {
      bgMain: "bg-bgsecondaryeducator",
      bgPrimary: "bg-primaryeducator",
      bgAccent: "bg-accentSecondaryEducator",
      fadescroll: "fadeScroll",
    },
  ];

  const [colorScheme, setColorScheme] = useState(colorSchemes[0]);

  useEffect(() => {
    setColorScheme(colorScheme[0]);
    setColorScheme(colorSchemes[context == "educator" ? 1 : 0]);
  }, [context]);

  const handleSeeMoreClick = () => {
    setPreview(true);
  };
  const handleBackClick = () => {
    setPreview(false);
  };

  const refresh = () => {
    fetchData();
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `/tms/tournaments/subscribed/${activeUser.roleid}`,
        {
          headers: { Authorization: `Token ${activeUser.authToken}` },
        }
      );

      console.log(response.data);
      if (response.data.length === 0) {
        console.log("No tournaments");
        navigate("/student/joinTournament");
      } else {
        console.log("Tournaments");
        setTournaments(response.data);
        // Sort the tournaments by end date
        const sortedTournaments = response.data.sort(
          (a, b) => new Date(a.end_date) - new Date(b.end_date)
        );

        // Set the selected tournament to the one with the end date closest to now
        setSelectedTournament(sortedTournaments[0].id);
        localStorage.setItem("tournaments", JSON.stringify(response.data));

        const teamsResponse = await axios.get(
          `/tgms/teams/student/${activeUser.roleid}`,
          {
            headers: { Authorization: `Token ${activeUser.authToken}` },
          }
        );

        console.log(teamsResponse.data);
        setTeams(teamsResponse.data);
        localStorage.setItem("teams", JSON.stringify(teamsResponse.data));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setIsSpinning(false);
    }
  };

  useEffect(() => {
    const storedTournaments = JSON.parse(localStorage.getItem("tournaments"));
    const storedTeams = JSON.parse(localStorage.getItem("teams"));
    if (storedTournaments && storedTeams) {
      setTournaments(storedTournaments);
      setTeams(storedTeams);
    } else {
      fetchData();
    }
  }, []);

  return (
    <div
      className={`${colorScheme.bgMain} flex flex-row justify-center items-center h-screen w-[screen-120px] ml-[120px]`}
    >
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
      <div className="flex flex-col w-full h-[90%]  justify-center items-center m-10 ">
        <div className="flex flex-col justify-center items-center space-y-2 w-full h-full ">
          <div className="flex flex-row justify-evenly items-center w-full h-[20%]">
            <Text
              text={["Ongoing tournaments"]}
              size="text-[24px]"
              fontColor="text-white"
              fontType="font-bold"
            />
            <ReactSVG
              src={RefreshB}
              beforeInjection={(svg) => {
                svg.setAttribute("style", "width: 30px; height: 30px");
              }}
              className={`cursor-pointer ${isSpinning ? "spin" : ""}`}
              onClick={() => {
                setIsSpinning(true);
                refresh();
              }}
            />
          </div>
          {tournaments.filter(
            (tournament) =>
              tournament.status === "active" ||
              tournament.status === "registration"
          ).length > 0 ? (
            <div className={`${colorScheme.fadescroll} w-full h-full`}>
              <div
                className={`overflow-auto  scrollbar-thin scrollbar-thumb-${colorScheme.bgPrimary} scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-track-rounded-full`}
                style={{ maxHeight: "650px", minHeight: "300px" }}
              >
                {tournaments
                  .filter(
                    (tournament) =>
                      tournament.status === "active" ||
                      tournament.status === "registration"
                  )
                  .sort((a, b) => new Date(a.end_date) - new Date(b.end_date))
                  .map((tournament) => (
                    <TournamentCard
                      key={tournament.id}
                      name={tournament.name}
                      description={tournament.description}
                      icon={tournament.picture}
                      position={"1"}
                      score={"100"}
                      select={tournament.id === selectedTournament}
                      onClick={() => {
                        setSelectedTournament(tournament.id);
                        handleBackClick();
                      }}
                    />
                  ))}
              </div>
            </div>
          ) : (
            <div
              className={`flex flex-row items-center justify-center w-[80%] h-[50%]  ${colorScheme.bgPrimary} rounded-[36px]`}
            >
              <Text
                text={[
                  "No active tournaments",
                  "Once you join a tournament, it will appear here",
                ]}
                size="text-[20px]"
                fontColor="text-accentprimary"
                fontType="font-bold"
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center items-center  w-full  h-full ">
        {selectedTournamentData ? (
          <ShowRanks tournamentData={selectedTournamentData} />
        ) : (
          <div className="flex flex-row items-center justify-center w-[80%] h-[80%] bg-bgprimary rounded-[36px]">
            <Text
              text={["Select a tournament to see more details!"]}
              size="text-[24px]"
              fontColor="text-accentprimary"
              fontType="font-black"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalRankings;
