import React /*, { useState, useEffect }*/ from "react";
//import axios from "../../services/api";
//import { TextField } from "../../components/common/textfield";
import { Text } from "../../components/common/text";
import { ReactComponent as Logo } from "../../assets/images/Logo.svg";
import TournamentCard from "../../components/utils/TournamentCard";
import TournamentDetails from "../../components/utils/TournamentDetails";
import PastTournamentCard from "../../components/utils/PastTournamentCard";

export const StudentHome = () => {
  return (
    <div className="bg-bgsecondary flex flex-row justify-center items-center h-screen w-[screen-120px] ml-[120px]">
      <Logo className="absolute top-[58px] right-[91px] w-[74px] h-[40px]" />
      <div className="flex flex-col ">
        <div className="flex flex-col items-start space-y-2">
          <Text
            text={["Current tournaments"]}
            size="text-[24px]"
            fontColor="text-white"
            fontType="font-bold"
          />
          <TournamentCard
            name="Tournament 1"
            description="Description 1"
            position="1"
            score="100"
            select={true}
          />
          <TournamentCard
            name="Tournament 2"
            description="Description 2"
            position="2"
            score="50"
            select={false}
          />
          <TournamentCard
            name="Tournament 3"
            description="Description 3"
            position="3"
            score="25"
            select={false}
          />
          <TournamentCard
            name="Tournament 4"
            description="Description 4"
            position="4"
            score="10"
            select={false}
          />
        </div>
        <div className="flex flex-col items-start mt-[50px] space-y-2">
          <Text
            text={["Past tournaments"]}
            size="text-[24px]"
            fontColor="text-accentprimary"
            fontType="font-bold"
          />
          <PastTournamentCard
            name="Tournament 1"
            description="Description 1"
            position="1"
            score="100"
            select={true}
          />
          <PastTournamentCard
            name="Tournament 2"
            description="Description 2"
            position="2"
            score="50"
            select={false}
          />
          <PastTournamentCard
            name="Tournament 3"
            description="Description 3"
            position="3"
            score="25"
            select={false}
          />
          <PastTournamentCard
            name="Tournament 4"
            description="Description 4"
            position="4"
            score="10"
            select={false}
          />
        </div>
      </div>
      <div className="flex justify-center items-center ml-10  h-screen ">
        <TournamentDetails />
      </div>
    </div>
  );
};

export default StudentHome;
