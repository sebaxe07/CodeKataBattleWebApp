import React from "react";
import ActiveTournamentCard from "../../components/utils/ActiveTournamentCard";
import { Text } from "../.../../../components/common/text";
import { ReactSVG } from "react-svg";
import Logo from "../../assets/images/Logo.svg";
import More from "../../assets/icons/dotsAccent.svg";

export const JoinTournament = () => {
  return (
    <div className="bg-bgsecondary flex flex-col justify-center items-center  h-screen w-screen">
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
      <div className="flex justify-center items-center h-screen w-[screen-120px] ml-[120px]">
        <div>
          <Text
            text={["Looks like you don’t have any active tournament yet..."]}
            size="text-[16px]"
            fontColor="text-accentprimary"
            fontType="font-normal"
          />
          <Text
            text={["¡Join a new tournament!"]}
            size="text-[32px]"
            fontColor="text-white"
            fontType="font-bold"
          />

          <div className="mt-20 flex-col">
            <ActiveTournamentCard
              name="Tournament"
              color="bg-[#EE8361]"
              description="Description 1"
              soonToEnd={true}
              timeRemainig="Subscription ends in 2 days"
              startDate="22 Dec. 2023"
              endDate="01 Jan. 2024"
              select={true}
            />
            <ActiveTournamentCard
              name="Tournament"
              color="bg-[#60ADF4]"
              description="Description 1"
              soonToEnd={true}
              timeRemainig="Subscription ends in 2 days"
              startDate="22 Dec. 2023"
              endDate="01 Jan. 2024"
              select={true}
            />
            <ActiveTournamentCard
              name="Tournament"
              color="bg-[#6360F4]"
              description="Description 1"
              soonToEnd={false}
              timeRemainig="Subscription ends in 2 days"
              startDate="22 Dec. 2023"
              endDate="01 Jan. 2024"
              select={true}
            />
            <ActiveTournamentCard
              name="Tournament"
              color="bg-[#F47DD8]"
              description="Description 1"
              soonToEnd={false}
              timeRemainig="Subscription ends in 2 days"
              startDate="22 Dec. 2023"
              endDate="01 Jan. 2024"
              select={true}
            />
            <ActiveTournamentCard
              name="Tournament"
              color="bg-[#52AE66]"
              description="Description 1"
              timeRemainig="Subscription ends in 2 days"
              startDate="22 Dec. 2023"
              endDate="01 Jan. 2024"
              select={true}
            />
          </div>
          <div
            className="flex justify-center mt-8 "
            onClick={() => console.log()}
          >
            <ReactSVG src={More} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinTournament;
