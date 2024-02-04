import React, { useContext } from "react";
import { ReactSVG } from "react-svg";
import { ProfileCard } from "../../components/common/profileCard";
import { SuscribedTournaments } from "../../components/utils/SuscribedTournaments";
import { UserContext } from "../../services/contexts/UserContext";
import Logo from "../../assets/images/Logo.svg";
import { Text } from "../../components/common/text";
import MyTournament from "../../components/utils/TournamentUtils/MyTournament";

export const ProfileEducator = ({}) => {
  const { activeUser, setActiveUser } = useContext(UserContext);
  return (
    <div className="bg-bgsecondaryeducator flex flex-row justify-center items-center h-screen w-[screen-120px] ml-[120px]">
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
      <div className="flex flex-row w-full items-center ">
        <div className="flex flex-col w-full  ml-24">
          <div className="flex flex-col w-full  items-start space-y-2 ">
            <Text
              text={["Current tournaments"]}
              size="text-[24px]"
              fontColor="text-white"
              fontType="font-bold"
            />
            <div className="fadeScroll">
              <div
                className="overflow-auto  scrollbar-thin scrollbar-thumb-bgeducator scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
                style={{
                  maxHeight: "350px",
                  minHeight: "300px",
                  width: "1100px",
                }}
              >
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
                <MyTournament
                  name={"Tournament 2"}
                  picture={"hacker_cat.svg"}
                  description={
                    "Tournament Description 2 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                  }
                  startDate={"22 Dec. 2023"}
                  endDate={"01 Jan. 2024"}
                  active={true}
                />
                <MyTournament
                  name={"Tournament 3"}
                  picture={"Code.svg"}
                  description={
                    "Tournament Description 3 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                  }
                  startDate={"22 Dec. 2023"}
                  endDate={"01 Jan. 2024"}
                  active={true}
                />
                <MyTournament
                  name={"Tournament 4"}
                  picture={"Code.svg"}
                  description={
                    "Tournament Description 4 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                  }
                  startDate={"22 Dec. 2023"}
                  endDate={"01 Jan. 2024"}
                  active={true}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start mt-[50px] space-y-2">
            <Text
              text={["Past tournaments"]}
              size="text-[24px]"
              fontColor="text-accentprimary"
              fontType="font-bold"
            />
            <div className="fadeScroll">
              <div
                className="overflow-auto  scrollbar-thin scrollbar-thumb-bgeducator scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
                style={{
                  maxHeight: "350px",
                  minHeight: "300px",
                  width: "1100px",
                }}
              >
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
                <MyTournament
                  name={"Tournament 2"}
                  picture={"github_cop.svg"}
                  description={
                    "Tournament Description 2 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                  }
                  startDate={"22 Dec. 2023"}
                  endDate={"01 Jan. 2024"}
                  active={false}
                />
                <MyTournament
                  name={"Tournament 3"}
                  picture={"binaryIcon.svg"}
                  description={
                    "Tournament Description 3 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                  }
                  startDate={"22 Dec. 2023"}
                  endDate={"01 Jan. 2024"}
                  active={false}
                />
                <MyTournament
                  name={"Tournament 4"}
                  picture={"binaryIcon.svg"}
                  description={
                    "Tournament Description 4 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                  }
                  startDate={"22 Dec. 2023"}
                  endDate={"01 Jan. 2024"}
                  active={false}
                />
              </div>
            </div>
          </div>
        </div>
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
