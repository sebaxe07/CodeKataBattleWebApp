import React, { useContext } from "react";
import { ReactSVG } from "react-svg";
import { ProfileCard } from "../../components/common/profileCard";
import { SuscribedTournaments } from "../.../../../components/utils/SuscribedTournaments";
import { UserContext } from "../../services/contexts/UserContext";
import Logo from "../../assets/images/Logo.svg";

export const ProfileStudents = ({}) => {
  const { activeUser, setActiveUser } = useContext(UserContext);
  return (
    <div className="bg-bgsecondary flex flex-col justify-center items-center h-screen w-screen">
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
      <div className="flex flex-row w-full justify-around items-center">
        <ProfileCard
          icon={activeUser.user_profile.profile_icon}
          rol={activeUser.user_profile.role === "student" ? "Seito" : "Sensei"}
          name={activeUser.first_name + " " + activeUser.last_name}
          username={activeUser.username}
          github={activeUser.user_profile.github_username}
          school={activeUser.user_profile.school}
        />
      </div>
    </div>
  );
};

export default ProfileStudents;
