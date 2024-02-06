// Import necessary dependencies and components from external libraries and local files.
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../services/api";
import { ReactSVG } from "react-svg";
import { ProfileCard } from "../../components/common/profileCard";
import { SuscribedTournaments } from "../../components/utils/SuscribedTournaments";
import { UserContext } from "../../services/contexts/UserContext";
import Logo from "../../assets/images/Logo.svg";
import { Text } from "../../components/common/text";
import MyTournament from "../../components/utils/TournamentUtils/MyTournament";

// Define the ProfileEducator component.
export const ProfileEducator = ({}) => {
  // Access the user context to retrieve active user information.
  const { activeUser, setActiveUser } = useContext(UserContext);

  // Access the navigation functionality from React Router DOM.
  const navigate = useNavigate();
  // State variables for storing tournament data and managing loading state.
  const [tournaments, setTournaments] = useState([]);
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
      // console.log(response.data);
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
    if (storedTournaments) {
      // If stored tournaments exist, set state with stored data.
      setTournaments(storedTournaments);
    } else {
      // If no stored tournaments, fetch from the server.
      fetchTournaments();
    }
  }, []);
  return (
    <div className="bg-bgsecondaryeducator flex flex-row justify-center items-center h-screen w-[screen-120px] ml-[120px]">
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
      {/* Main content area with educator's profile information and tournaments. */}
      <div className="flex flex-row w-full items-center ">
        <div className="flex flex-col w-full  ml-24">
          {/* Section displaying current tournaments for the educator. */}
          <div className="flex flex-col w-full  items-start space-y-2 ">
            <Text
              text={["Current tournaments"]}
              size="text-[24px]"
              fontColor="text-white"
              fontType="font-bold"
            />
            {/* Scrollable area displaying current tournaments. */}
            <div className="fadeScroll">
              <div
                className="overflow-auto  scrollbar-thin scrollbar-thumb-bgeducator scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
                style={{
                  maxHeight: "350px",
                  minHeight: "300px",
                  width: "1100px",
                }}
              >
                {/* Render MyTournament component for each current tournament. */}
                {tournaments
                  .filter((tournament) => tournament.status !== "completed")
                  .map((tournament) => (
                    <MyTournament
                      key={tournament.id}
                      id={tournament.id}
                      name={tournament.name}
                      description={tournament.description}
                      startDate={new Date(
                        tournament.start_date
                      ).toLocaleDateString()}
                      endDate={new Date(
                        tournament.end_date
                      ).toLocaleDateString()}
                      active={tournament.status === "completed" ? false : true}
                      picture={tournament.picture}
                    />
                  ))}
              </div>
            </div>
          </div>
          {/* Section displaying past tournaments for the educator. */}
          <div className="flex flex-col items-start mt-[50px] space-y-2">
            <Text
              text={["Past tournaments"]}
              size="text-[24px]"
              fontColor="text-accentprimary"
              fontType="font-bold"
            />
            {/* Scrollable area displaying past tournaments. */}
            <div className="fadeScroll">
              <div
                className="overflow-auto  scrollbar-thin scrollbar-thumb-bgeducator scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
                style={{
                  maxHeight: "350px",
                  minHeight: "300px",
                  width: "1100px",
                }}
              >
                {/* Render MyTournament component for each past tournament. */}
                {tournaments
                  .filter((tournament) => tournament.status === "completed")
                  .map((tournament) => (
                    <MyTournament
                      key={tournament.id}
                      id={tournament.id}
                      name={tournament.name}
                      description={tournament.description}
                      startDate={new Date(
                        tournament.start_date
                      ).toLocaleDateString()}
                      endDate={new Date(
                        tournament.end_date
                      ).toLocaleDateString()}
                      active={tournament.status === "completed" ? false : true}
                      picture={tournament.picture}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
        {/* Sidebar displaying educator's profile card. */}
        <div className=" w-1/2">
          <ProfileCard
            icon={activeUser.user_profile.profile_icon}
            rol={
              activeUser.user_profile.role === "student" ? "Seito" : "Sensei"
            }
            name={activeUser.first_name + " " + activeUser.last_name}
            username={activeUser.username}
            github={activeUser.user_profile.github_username}
            school={activeUser.user_profile.school}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileEducator;
