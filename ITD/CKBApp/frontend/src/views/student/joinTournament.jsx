import React from "react";
import ActiveTournamentCard from "../../components/utils/ActiveTournamentCard";
import { Text } from "../.../../../components/common/text";
import { ReactSVG } from "react-svg";
import Logo from "../../assets/images/Logo.svg";

export const JoinTournament = () => {
  return (
    <div className="bg-bgsecondary flex flex-row justify-center items-center h-screen w-[screen-120px] ml-[120px]">
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
      <div className="flex flex-col  h-full w-full justify-center">
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
          className={"mb-5"}
        />

        <div className="fadeScroll1 ">
          <div
            className="overflow-auto  scrollbar-thin scrollbar-thumb-bgprimary scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
            style={{ maxHeight: "600px" }}
          >
            <ActiveTournamentCard
              name="Tournament"
              description="Description 1"
              soonToEnd={true}
              timeRemainig="Subscription ends in 2 days"
              startDate="22 Dec. 2023"
              endDate="01 Jan. 2024"
            />
            <ActiveTournamentCard
              name="Tournament"
              description="Description 1"
              soonToEnd={true}
              timeRemainig="Subscription ends in 2 days"
              startDate="22 Dec. 2023"
              endDate="01 Jan. 2024"
            />
            <ActiveTournamentCard
              name="Tournament"
              description="Description 1"
              soonToEnd={false}
              timeRemainig="Subscription ends in 2 days"
              startDate="22 Dec. 2023"
              endDate="01 Jan. 2024"
            />
            <ActiveTournamentCard
              name="Tournament"
              description="Description 1"
              soonToEnd={false}
              timeRemainig="Subscription ends in 2 days"
              startDate="22 Dec. 2023"
              endDate="01 Jan. 2024"
            />
            <ActiveTournamentCard
              name="Tournament"
              description="Description 1"
              timeRemainig="Subscription ends in 2 days"
              startDate="22 Dec. 2023"
              endDate="01 Jan. 2024"
            />
            <ActiveTournamentCard
              name="Tournament"
              description="Description 1"
              timeRemainig="Subscription ends in 2 days"
              startDate="22 Dec. 2023"
              endDate="01 Jan. 2024"
            />
            <ActiveTournamentCard
              name="Tournament"
              description="Description 1"
              timeRemainig="Subscription ends in 2 days"
              startDate="22 Dec. 2023"
              endDate="01 Jan. 2024"
            />
            <ActiveTournamentCard
              name="Tournament"
              description="Description 1"
              timeRemainig="Subscription ends in 2 days"
              startDate="22 Dec. 2023"
              endDate="01 Jan. 2024"
            />
            <ActiveTournamentCard
              name="Tournament"
              description="Description 1"
              timeRemainig="Subscription ends in 2 days"
              startDate="22 Dec. 2023"
              endDate="01 Jan. 2024"
            />
            <ActiveTournamentCard
              name="Tournament"
              description="Description 1"
              timeRemainig="Subscription ends in 2 days"
              startDate="22 Dec. 2023"
              endDate="01 Jan. 2024"
            />
            <ActiveTournamentCard
              name="Tournament"
              description="Description 1"
              timeRemainig="Subscription ends in 2 days"
              startDate="22 Dec. 2023"
              endDate="01 Jan. 2024"
            />
            <ActiveTournamentCard
              name="Tournament"
              description="Description 1"
              timeRemainig="Subscription ends in 2 days"
              startDate="22 Dec. 2023"
              endDate="01 Jan. 2024"
            />
            <ActiveTournamentCard
              name="Tournament"
              description="Description 1"
              timeRemainig="Subscription ends in 2 days"
              startDate="22 Dec. 2023"
              endDate="01 Jan. 2024"
            />
            <ActiveTournamentCard
              name="Tournament"
              description="Description 1"
              timeRemainig="Subscription ends in 2 days"
              startDate="22 Dec. 2023"
              endDate="01 Jan. 2024"
            />
            <ActiveTournamentCard
              name="Tournament"
              description="Description 1"
              timeRemainig="Subscription ends in 2 days"
              startDate="22 Dec. 2023"
              endDate="01 Jan. 2024"
            />
            <ActiveTournamentCard
              name="Tournament"
              description="Description 1"
              timeRemainig="Subscription ends in 2 days"
              startDate="22 Dec. 2023"
              endDate="01 Jan. 2024"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinTournament;
