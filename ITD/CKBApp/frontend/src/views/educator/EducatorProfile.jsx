import React from "react";
import ActiveTournamentCard from "../../components/utils/ActiveTournamentCard";
import { Text } from "../../components/common/text";
import { ReactSVG } from "react-svg";
import Logo from "../../assets/images/Logo.svg";
import ManageTournament from "../../components/utils/TournamentUtils/manageTournament";
import CreateTournament from "../../components/utils/TournamentUtils/createTournament";
import More from "../../assets/icons/dotsAccent.svg";

import CompleteCreation from "../../components/utils/TournamentUtils/completeCreation";

export const EducatorProfile = () => {
  return (
    <div className="bg-[#19362D] flex flex-col justify-center items-center  h-screen w-screen">
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
      {/* <CompleteCreation /> */}
      {/* <CreateTournament /> */}
      <ManageTournament />
    </div>
  );
};

export default EducatorProfile;
