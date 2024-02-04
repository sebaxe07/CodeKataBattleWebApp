// Import necessary dependencies and components from external libraries and local files.
import React, { useState, useEffect, useContext } from "react";
import axios from "../../services/api";
import { ReactSVG } from "react-svg";
import { Text } from "../../components/common/text";
import Logo from "../../assets/images/Logo.svg";
import MyTournament from "../../components/utils/TournamentUtils/MyTournament";
import AddIcon from "../../assets/icons/add.svg";
import { UserContext } from "../../services/contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { LoadingScreen } from "../../services/LoadingScreen";
import RefreshG from "../../assets/icons/refreshG.svg";

// Define the EducatorHome component.
export const EducatorHome = () => {
  // Access the navigation functionality from React Router DOM.
  const navigate = useNavigate();
  // Access user-related information using the UserContext.
  const { activeUser, setActiveUser } = useContext(UserContext);
  // State variables for storing tournament data and managing loading state.
  const [tournaments, setTournaments] = useState([]);
  const [invitedTournaments, setInvitedTournaments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);

  // Function to fetch tournaments from the server.
  const fetchTournaments = async () => {
    // Set loading state to true.
    setIsLoading(true);
    try {
      // Make a GET request to fetch tournaments for the current educator.
      const response = await axios.get(
        `/tms/tournaments/user/${activeUser.roleid}`,
        {
          headers: { Authorization: `Token ${activeUser.authToken}` },
        }
      );

      // Save fetched tournaments to local storage.
      localStorage.setItem("tournaments", JSON.stringify(response.data));

      // Update state with the fetched tournaments.
      setTournaments(response.data);
      console.log(response.data);

      // Make a GET request to fetch tournaments the educator has been invited to.
      const invitedResponse = await axios.get(
        `/tms/tournaments/invited/${activeUser.roleid}`,
        {
          headers: { Authorization: `Token ${activeUser.authToken}` },
        }
      );

      // Save fetched invited tournaments to local storage.
      localStorage.setItem(
        "invitedTournaments",
        JSON.stringify(invitedResponse.data)
      );

      // Update state with the fetched invited tournaments.
      setInvitedTournaments(invitedResponse.data);
      console.log(invitedResponse.data);
    } catch (error) {
      // Log an error message if fetching tournaments fails.
      console.error("Failed to fetch tournaments:", error);
    } finally {
      // Set loading and spinning states to false when the operation is complete.
      setIsLoading(false);
      setIsSpinning(false);
    }
  };

  // Function to trigger a refresh by fetching tournaments.
  const refresh = () => {
    fetchTournaments();
  };

  // useEffect hook to fetch tournaments when the component mounts.
  useEffect(() => {
    // Retrieve stored tournaments from local storage.
    const storedTournaments = JSON.parse(localStorage.getItem("tournaments"));
    const storedInvitedTournaments = JSON.parse(
      localStorage.getItem("invitedTournaments")
    );
    if (storedTournaments && storedInvitedTournaments) {
      // If stored tournaments exist, set state with stored data.
      setTournaments(storedTournaments);
      setInvitedTournaments(storedInvitedTournaments);
    } else {
      // If no stored tournaments, fetch from the server.
      fetchTournaments();
    }
  }, []);

  return (
    <div className="bg-bgsecondaryeducator flex flex-col justify-start items-center py-32 min-h-screen w-[screen-120px] ml-[120px]  scrollbar-thin scrollbar-thumb-bgeducator scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
      {" "}
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
      {/* Render a loading screen if data is being fetched. */}
      {isLoading && <LoadingScreen />}
      {/* Main content area with tournament information. */}
      <div className="flex flex-col  h-full w-full justify-center items-center">
        {/* Header with My Tournaments title and refresh button. */}
        <div className="flex flex-row w-full justify-evenly items-center ">
          <Text
            text={["My Tournaments"]}
            size="text-[24px]"
            fontColor="text-white font-bold"
          />
          {/* Refresh button for fetching updated tournament data manually. */}
          <ReactSVG
            src={RefreshG}
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

        {/* Scrollable area displaying the educator's tournaments. */}
        <div className="fadeScroll w-[60%]">
          <div
            className="overflow-auto  scrollbar-thin scrollbar-thumb-bgeducator scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
            style={{ maxHeight: "600px" }}
          >
            {/* Map through tournaments and render MyTournament component for each. */}
            {tournaments.map((tournament) => (
              <MyTournament
                key={tournament.id}
                id={tournament.id}
                name={tournament.name}
                description={tournament.description}
                startDate={new Date(tournament.start_date).toLocaleDateString()}
                endDate={new Date(tournament.end_date).toLocaleDateString()}
                active={tournament.status === "completed" ? false : true}
                picture={tournament.picture}
              />
            ))}
          </div>
        </div>

        {/* Add Tournament button for navigating to the tournament creation page. */}
        <div
          className="flex w-[50px]  justify-center cursor-pointer mt-5 items-center"
          onClick={() => navigate("/educator/tournament/create")}
        >
          <ReactSVG src={AddIcon} className="text-accentSecondaryEducator" />
        </div>
      </div>
      <div className="flex flex-col  h-full w-full justify-center items-center mt-10">
        {/* Header with My Tournaments title and refresh button. */}
        <div className="flex flex-row w-full justify-evenly items-center ">
          <Text
            text={["Invited Tournaments"]}
            size="text-[24px]"
            fontColor="text-white font-bold"
          />
          {/* Refresh button for fetching updated tournament data manually. */}
          <ReactSVG
            src={RefreshG}
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

        {/* Scrollable area displaying the educator's tournaments. */}
        <div className="fadeScroll w-[60%]">
          <div
            className="overflow-auto  scrollbar-thin scrollbar-thumb-bgeducator scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
            style={{ maxHeight: "600px" }}
          >
            {/* Map through tournaments and render MyTournament component for each. */}
            {invitedTournaments.map((tournament) => (
              <MyTournament
                key={tournament.id}
                id={tournament.id}
                name={tournament.name}
                description={tournament.description}
                startDate={new Date(tournament.start_date).toLocaleDateString()}
                endDate={new Date(tournament.end_date).toLocaleDateString()}
                active={tournament.status === "completed" ? false : true}
                picture={tournament.picture}
                invite={false}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducatorHome;
