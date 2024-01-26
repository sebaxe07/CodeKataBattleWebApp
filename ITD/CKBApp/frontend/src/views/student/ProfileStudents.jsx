import React, { useContext } from "react";
import { ReactSVG } from "react-svg";
import { ProfileCard } from "../.../../../components/common/profileCard";
import { SuscribedTournaments } from "../.../../../components/utils/SuscribedTournaments";
import { UserContext } from "../../services/contexts/UserContext";

import TigerIcon from "../../assets/icons/UsersIcons/tiger.svg";
import Logo from "../../assets/images/Logo.svg";

export const ProfileStudents = ({}) => {
  const { userData, setUserData } = useContext(UserContext);
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
        <SuscribedTournaments />
        <ProfileCard
          icon={TigerIcon}
          cIcon={"bg-[#FFCC4D]"}
          rol="SEITO"
          name="Marcela"
          username="Marceasaurusrex"
          age="22"
          school="Universidad del North"
        />
      </div>
    </div>
  );
};

export default ProfileStudents;
