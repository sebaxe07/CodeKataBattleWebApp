// Import necessary dependencies and components from external libraries and local files.
import React, { useContext } from "react";
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

  // Return JSX markup for the ProfileEducator component.
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
                <MyTournament
                  name={"Tournament 1"}
                  picture={"binaryIcon.svg"}
                  description={
                    "Tournament Description 1 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                  }
                  startDate={"22 Dec. 2023"}
                  endDate={"01 Jan. 2024"}
                  active={true}
                />
                {/* Additional tournaments rendered similarly. */}
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
                <MyTournament
                  name={"Tournament 1"}
                  picture={"Code.svg"}
                  description={
                    "Tournament Description 1 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                  }
                  startDate={"22 Dec. 2023"}
                  endDate={"01 Jan. 2024"}
                  active={false}
                />
                {/* Additional tournaments rendered similarly. */}
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

// Export the ProfileEducator component as the default export.
export default ProfileEducator;
