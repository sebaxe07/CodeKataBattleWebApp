import React /*, { useState, useEffect }*/ from "react";
//import axios from "../../services/api";
//import { TextField } from "../../components/common/textfield";
import { ReactSVG } from "react-svg";
import { Text } from "../../components/common/text";
import Logo from "../../assets/images/Logo.svg";
import MyTournament from "../../components/utils/Educator/MyTournament";
import AddIcon from "../../assets/icons/add.svg";

export const EducatorHome = () => {
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
      <div className="flex flex-col  h-full w-full justify-center">
        <Text
          text={["My Tournaments"]}
          size="text-[24px]"
          fontColor="text-white"
          fontType="font-bold"
        />
        <div className="fadeScroll">
          <div
            className="overflow-auto  scrollbar-thin scrollbar-thumb-bgeducator scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
            style={{ maxHeight: "600px" }}
          >
            <MyTournament
              name={"Tournament 1"}
              description={
                "Tournament Description 1 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              }
              startDate={"22 Dec. 2023"}
              endDate={"01 Jan. 2024"}
              active={true}
            />
            <MyTournament
              name={"Tournament 1"}
              description={
                "Tournament Description 1 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              }
              startDate={"22 Dec. 2023"}
              endDate={"01 Jan. 2024"}
              active={true}
            />
            <MyTournament
              name={"Tournament 1"}
              description={
                "Tournament Description 1 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              }
              startDate={"22 Dec. 2023"}
              endDate={"01 Jan. 2024"}
              active={true}
            />
            <MyTournament
              name={"Tournament 1"}
              description={
                "Tournament Description 1 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              }
              startDate={"22 Dec. 2023"}
              endDate={"01 Jan. 2024"}
              active={true}
            />
            <MyTournament
              name={"Tournament 1"}
              description={
                "Tournament Description 1 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              }
              startDate={"22 Dec. 2023"}
              endDate={"01 Jan. 2024"}
              active={true}
            />
            <MyTournament
              name={"Tournament 1"}
              description={
                "Tournament Description 1 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              }
              startDate={"22 Dec. 2023"}
              endDate={"01 Jan. 2024"}
              active={true}
            />
            <MyTournament
              name={"Tournament 1"}
              description={
                "Tournament Description 1 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              }
              startDate={"22 Dec. 2023"}
              endDate={"01 Jan. 2024"}
              active={true}
            />
            <MyTournament
              name={"Tournament 1"}
              description={
                "Tournament Description 1 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              }
              startDate={"22 Dec. 2023"}
              endDate={"01 Jan. 2024"}
              active={true}
            />
            <MyTournament
              name={"Tournament 1"}
              description={
                "Tournament Description 1 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              }
              startDate={"22 Dec. 2023"}
              endDate={"01 Jan. 2024"}
              active={true}
            />
            <MyTournament
              name={"Tournament 1"}
              description={
                "Tournament Description 1 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              }
              startDate={"22 Dec. 2023"}
              endDate={"01 Jan. 2024"}
              active={true}
            />
            <MyTournament
              name={"Tournament 1"}
              description={
                "Tournament Description 1 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              }
              startDate={"22 Dec. 2023"}
              endDate={"01 Jan. 2024"}
              active={true}
            />
            <MyTournament
              name={"Tournament 3"}
              description={
                "Tournament Description 3 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              }
              startDate={"22 Dec. 2023"}
              endDate={"01 Jan. 2024"}
              active={true}
            />
            <MyTournament
              name={"Tournament 2"}
              description={
                "Tournament Description 2 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              }
              startDate={"22 Dec. 2023"}
              endDate={"01 Jan. 2024"}
              active={false}
            />
          </div>
        </div>

        <div className="flex justify-center cursor-pointer mt-5">
          <ReactSVG src={AddIcon} />
        </div>
      </div>
    </div>
  );
};

export default EducatorHome;
