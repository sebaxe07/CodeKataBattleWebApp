// Importing necessary dependencies and components for the StudentHome component
import React, { useState, useEffect, useContext } from "react";
import axios from "../../services/api";
import { ReactSVG } from "react-svg";
import { Text } from "../../components/common/text";
import Logo from "../../assets/images/Logo.svg";
import TournamentCard from "../../components/utils/TournamentCard";
import TournamentDetails from "../../components/utils/TournamentDetails";
import BattleResume from "../../components/utils/TournamentDetails/BattleResume";
import PastTournamentCard from "../../components/utils/PastTournamentCard";
import { useNavigate } from "react-router-dom";
import { LoadingScreen } from "../../services/LoadingScreen";
import { UserContext } from "../../services/contexts/UserContext";
import RefreshB from "../../assets/icons/refreshB.svg";

// Define the StudentHome component
export const StudentHome = () => {
  // State variables to manage component state
  const [preview, setPreview] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const { activeUser, setActiveUser } = useContext(UserContext);
  const [tournaments, setTournaments] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [selectedBattle, setSelectedBattle] = useState(null);
  const [teams, setTeams] = useState([]);
  const [tourBattleScore, setTourBattleScore] = useState(null);

  const selectedTournamentData = tournaments.find(
    (tournament) => tournament.id === selectedTournament
  );

  // Handle click event for "See More" button

  const selectedTournamentScore = tourBattleScore?.filter(
    (score) => score.tournament === selectedTournament
  );

  const handleSeeMoreClick = () => {
    setPreview(true);
  };

  // Handle click event for "Back" button
  const handleBackClick = () => {
    setPreview(false);
  };

  // Refresh function to fetch latest tournament data
  const refresh = () => {
    fetchData();
  };

  // Fetch data from the server
  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Fetch subscribed tournaments for the active user
      const response = await axios.get(
        `/tms/tournaments/subscribed/${activeUser.roleid}`,
        {
          headers: { Authorization: `Token ${activeUser.authToken}` },
        }
      );

      console.log(response.data);
      // Check if there are any subscribed tournaments
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

        // Fetch teams for the active student
        const teamsResponse = await axios.get(
          `/tgms/teams/student/${activeUser.roleid}`,
          {
            headers: { Authorization: `Token ${activeUser.authToken}` },
          }
        );

        console.log(teamsResponse.data);
        setTeams(teamsResponse.data);
        localStorage.setItem("teams", JSON.stringify(teamsResponse.data));

        const scoreResponse = await axios.get(
          `/ss/scoring/student/${activeUser.roleid}`,
          {
            headers: { Authorization: `Token ${activeUser.authToken}` },
          }
        );

        console.log(scoreResponse.data);
        setTourBattleScore(scoreResponse.data);
        localStorage.setItem("scores", JSON.stringify(scoreResponse.data));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setIsSpinning(false);
    }
  };

  const backgroundfetch = async () => {
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

        // Fetch teams for the active student
        const teamsResponse = await axios.get(
          `/tgms/teams/student/${activeUser.roleid}`,
          {
            headers: { Authorization: `Token ${activeUser.authToken}` },
          }
        );

        console.log(teamsResponse.data);
        // Check if the team data has changed
        const oldTeams = JSON.parse(localStorage.getItem("teams") || "[]");
        if (JSON.stringify(oldTeams) !== JSON.stringify(teamsResponse.data)) {
          // Update the team storage and context only if the team data has changed
          setTeams(teamsResponse.data);
          localStorage.setItem("teams", JSON.stringify(teamsResponse.data));
        }

        // Set the selected tournament to the one with the end date closest to now
        localStorage.setItem("tournaments", JSON.stringify(response.data));

        const scoreResponse = await axios.get(
          `/ss/scoring/student/${activeUser.roleid}`,
          {
            headers: { Authorization: `Token ${activeUser.authToken}` },
          }
        );

        console.log(scoreResponse.data);
        setTourBattleScore(scoreResponse.data);
        localStorage.setItem("scores", JSON.stringify(scoreResponse.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
  // Load data on component mount or retrieve from local storage if available
  useEffect(() => {
    const storedTournaments = JSON.parse(localStorage.getItem("tournaments"));
    const storedTeams = JSON.parse(localStorage.getItem("teams"));
    const storedScores = JSON.parse(localStorage.getItem("scores"));
    if (storedTournaments && storedTeams && storedScores) {
      setTournaments(storedTournaments);
      setTeams(storedTeams);
      setTourBattleScore(storedScores);
    } else {
      fetchData();
    }
    const intervalId = setInterval(backgroundfetch, 5000); // Fetch new data every minute
    return () => clearInterval(intervalId);
  }, []);

  return (
    // Main container for the StudentHome component
    <div className="bg-bgsecondary flex flex-row justify-center items-center h-screen w-[screen-120px] ml-[120px]">
      {isLoading && <LoadingScreen />}
      {/* Render CKB logo */}
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
      {/* Main content container */}
      <div className="flex flex-col w-full h-[90%]  justify-center items-center m-10  ">
        {/* Container for current tournaments */}
        <div className="flex flex-col justify-center items-center space-y-2 w-full h-full ">
          {/* Header for current tournaments */}
          <div className="flex flex-row justify-evenly items-center w-full h-full ">
            <Text
              text={["Current tournaments"]}
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
          {/* Container for displaying current tournaments */}
          {tournaments.filter(
            (tournament) =>
              tournament.status === "active" ||
              tournament.status === "registration"
          ).length > 0 ? (
            <div className="fadeScroll1 w-full h-full">
              <div
                className="overflow-auto  scrollbar-thin scrollbar-thumb-bgprimary scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
                style={{ maxHeight: "300px", minHeight: "300px" }}
              >
                {/* Map through current tournaments and render TournamentCard components */}
                {tournaments
                  .filter(
                    (tournament) =>
                      tournament.status === "active" ||
                      tournament.status === "registration"
                  )
                  .sort((a, b) => new Date(a.end_date) - new Date(b.end_date))
                  .map((tournament) => {
                    const tournamentScoreData = tourBattleScore
                      ? tourBattleScore.find(
                          (score) => score.tournament === tournament.id
                        )
                      : null;

                    const score = tournamentScoreData
                      ? tournamentScoreData.total_score
                      : "-";
                    const position =
                      score === 0
                        ? "-"
                        : tournamentScoreData
                        ? tournamentScoreData.position
                        : "-";

                    return (
                      <TournamentCard
                        key={tournament.id}
                        name={tournament.name}
                        description={tournament.description}
                        icon={tournament.picture}
                        position={position.toString()}
                        score={score.toString()}
                        select={tournament.id === selectedTournament}
                        onClick={() => {
                          setSelectedTournament(tournament.id);
                          handleBackClick();
                        }}
                      />
                    );
                  })}
              </div>
            </div>
          ) : (
            // Display message when no active tournaments
            <div className="flex flex-row items-center justify-center w-[80%] h-[50%]  bg-bgprimary rounded-[36px]">
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
        {/* Container for past tournaments */}
        <div className="flex flex-col mt-[50px] space-y-2 w-full h-full  justify-center items-center">
          {/* Header for past tournaments */}
          <Text
            text={["Past tournaments"]}
            size="text-[24px]"
            fontColor="text-accentprimary"
            fontType="font-bold"
          />
          {/* Container for displaying past tournaments */}
          {tournaments.filter((tournament) => tournament.status === "completed")
            .length > 0 ? (
            <div className="fadeScroll1 w-full h-full">
              <div
                className="overflow-auto  scrollbar-thin scrollbar-thumb-bgprimary scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
                style={{ maxHeight: "300px", minHeight: "300px" }}
              >
                {/* Map through past tournaments and render PastTournamentCard components */}
                {tournaments
                  .filter((tournament) => tournament.status === "completed")
                  .sort((a, b) => new Date(b.end_date) - new Date(a.end_date))
                  .map((tournament) => {
                    let score = "-";
                    let position = "-";

                    if (tourBattleScore) {
                      const tournamentScoreData = tourBattleScore.find(
                        (score) => score.tournament === tournament.id
                      );

                      score = tournamentScoreData
                        ? tournamentScoreData.total_score
                        : "-";
                      position =
                        score === 0
                          ? "-"
                          : tournamentScoreData
                          ? tournamentScoreData.position
                          : "-";
                    }
                    return (
                      <PastTournamentCard
                        key={tournament.id}
                        name={tournament.name}
                        description={tournament.description}
                        icon={tournament.picture}
                        position={position.toString()}
                        score={score.toString()}
                        select={tournament.id === selectedTournament}
                        onClick={() => {
                          setSelectedTournament(tournament.id);
                          handleBackClick();
                        }}
                      />
                    );
                  })}
              </div>
            </div>
          ) : (
            // Display message when no past tournaments
            <div className="flex flex-row items-center justify-center w-[80%] h-[50%]  bg-bgprimary rounded-[36px]">
              <Text
                text={[
                  "No past tournaments",
                  "Once you finish a tournament, it will appear here",
                ]}
                size="text-[20px]"
                fontColor="text-accentprimary"
                fontType="font-bold"
              />
            </div>
          )}
        </div>
      </div>
      {/* Container for displaying TournamentDetails or BattleResume */}
      <div className="flex justify-center items-center  w-full  h-full ">
        {preview ? (
          // Render BattleResume component if in preview mode
          <BattleResume
            selectedBattle={selectedBattle}
            onBackClick={handleBackClick}
            tourData={selectedTournamentData}
          />
        ) : selectedTournamentData ? (
          // Render TournamentDetails component if a tournament is selected
          <TournamentDetails
            tournamentData={selectedTournamentData}
            onSeeMoreClick={handleSeeMoreClick}
            onBattleSelect={setSelectedBattle}
            teams={teams}
            scoreData={selectedTournamentScore}
          />
        ) : (
          // Display message if no tournament is selected
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

export default StudentHome;
