// Import necessary dependencies and components from external libraries and local files.
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

/**
 * Component to display global rankings.
 *
 * @component
 * @param {Object} context - The user's context.
 * @returns {JSX.Element} The JSX element representing the global rankings.
 */
export const GlobalRankings = ({ context }) => {
  // State variables to manage the component's state.
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

  // Define color schemes for different user contexts (student and educator).
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

  // State variable to manage the color scheme based on the user context.
  const [colorScheme, setColorScheme] = useState(colorSchemes[0]);

  // Effect to set the color scheme based on the user context.
  useEffect(() => {
    setColorScheme(colorSchemes[context === "educator" ? 1 : 0]);
  }, [context]);

  // Event handler to show more details for a selected tournament.
  const handleSeeMoreClick = () => {
    setPreview(true);
  };

  // Event handler to go back from the preview of a selected tournament.
  const handleBackClick = () => {
    setPreview(false);
  };

  // Function to refresh the data by fetching tournaments and teams.
  const refresh = () => {
    fetchData();
  };

  // Function to fetch tournament and team data.
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `/tms/tournaments/subscribed/${activeUser.roleid}`,
        {
          headers: { Authorization: `Token ${activeUser.authToken}` },
        }
      );

      // If no tournaments are available, navigate to joinTournament page.
      if (response.data.length === 0) {
        navigate("/student/joinTournament");
      } else {
        // Update state with fetched tournament data.
        setTournaments(response.data);
        // Sort the tournaments by end date.
        const sortedTournaments = response.data.sort(
          (a, b) => new Date(a.end_date) - new Date(b.end_date)
        );
        // Set the selected tournament to the one with the end date closest to now.
        setSelectedTournament(sortedTournaments[0].id);
        localStorage.setItem("tournaments", JSON.stringify(response.data));

        // Fetch teams for the active user.
        const teamsResponse = await axios.get(
          `/tgms/teams/student/${activeUser.roleid}`,
          {
            headers: { Authorization: `Token ${activeUser.authToken}` },
          }
        );

        // Update state with fetched team data.
        setTeams(teamsResponse.data);
        localStorage.setItem("teams", JSON.stringify(teamsResponse.data));
      }
    } catch (error) {
      console.log(error);
    } finally {
      // Set loading and spinning states to false after fetching data.
      setIsLoading(false);
      setIsSpinning(false);
    }
  };

  // Effect to check if tournaments and teams are stored in local storage and fetch if not.
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

  // Return JSX markup for the GlobalRankings component.
  return (
    <div
      className={`${colorScheme.bgMain} flex flex-row justify-center items-center h-screen w-[screen-120px] ml-[120px]`}
    >
      {/* Display loading screen if data is being fetched. */}
      {isLoading && <LoadingScreen />}

      {/* Render the application logo. */}
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
      {/* Main content area with ongoing tournaments and global rankings. */}
      <div className="flex flex-col w-full h-[90%]  justify-center items-center m-10 ">
        <div className="flex flex-col justify-center items-center space-y-2 w-full h-full ">
          {/* Header for ongoing tournaments section. */}
          <div className="flex flex-row justify-evenly items-center w-full h-[20%]">
            <Text
              text={["Ongoing tournaments"]}
              size="text-[24px]"
              fontColor="text-white"
              fontType="font-bold"
            />
            {/* Refresh button for fetching updated data. */}
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
          {/* Display ongoing tournaments or a message if none are active. */}
          {tournaments.filter(
            (tournament) =>
              tournament.status === "active" ||
              tournament.status === "registration"
          ).length > 0 ? (
            <div className={`${colorScheme.fadescroll} w-full h-full`}>
              {/* Scrollable area for ongoing tournaments. */}
              <div
                className={`overflow-auto  scrollbar-thin scrollbar-thumb-${colorScheme.bgPrimary} scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-track-rounded-full`}
                style={{ maxHeight: "650px", minHeight: "300px" }}
              >
                {/* Render TournamentCard component for each ongoing tournament. */}
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
            // Message displayed when no active tournaments are available.
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
      {/* Display global rankings or a message if no tournament is selected. */}
      <div className="flex justify-center items-center  w-full  h-full ">
        {selectedTournamentData ? (
          // ShowRanks component displaying global rankings for the selected tournament.
          <ShowRanks tournamentData={selectedTournamentData} />
        ) : (
          // Message displayed when no tournament is selected.
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

// Export the GlobalRankings component as the default export.
export default GlobalRankings;
