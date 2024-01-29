import React, { useEffect, useRef, useState } from "react";
import { Text } from "../../../components/common/text";
import { TextField } from "../../../components/common/textfield";
import Button from "../../../components/common/Button";
import { Application, DatePicker } from "react-rainbow-components";
import { BattleLogo } from "../../../components/utils/TournamentDetails/BattleLogo";
import { ReactSVG } from "react-svg";

import Logo from "../../../assets/images/Logo.svg";

import Python from "../../../assets/icons/python.png";
import Back from "../../../assets/icons/backArrow.png";
import CalendarT from "../../../assets/icons/calendar.svg";
import Edit from "../../../assets/icons/edit.svg";
import BgIconCard from "../../../components/common/bgIconCard";

// import styled from "react-rainbow-components/styled";

export const CreateBattle = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [dateStart, setStartDate] = useState(null);
  const [dateEnd, setEndDate] = useState(null);
  const [files, setFile] = useState(0);

  function onChange(dateStart) {
    setStartDate(dateStart);
  }
  function onChange(dateEnd) {
    setEndDate(dateEnd);
  }

  const theme = {
    rainbow: {
      palette: {
        brand: "#39B58B",
        mainBackground: "#265F4C",
      },
    },
  };

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
      <div className="select-none relative rounded-[36px] bg-accentSecondaryEducator w-[35%]  ml-20 mt-20 h-[84%] flex justify-center">
        <div className="w-full">
          {/* Header Section */}
          <div className="flex h-[10%] w-[100%] items-center ml-5">
            <img
              src={Back}
              className="w-[40px] h-[40px]  rounded-[100%]"
              onClick={() => {
                console.log("pressed");
              }}
            />
            <Text
              text={["CREATE BATTLE"]}
              size="text-[20px] "
              className={"leading-normal text-start ml-5"}
              fontColor="text-white"
              fontType="font-bold"
            />
          </div>
          {/* Body */}
          <div className="flex flex-col w-[98%] h-[88%] bg-bgeducator rounded-b-[36px]">
            {/* Logo */}
            <div className=" justify-center flex items-center translate-x-40 -translate-y-10">
              <BattleLogo BattleIcon={Python} size={150} />
              <div
                className="-translate-x-14 translate-y-5"
                onClick={() => console.log("Edit Tournament Logo")}
              >
                <BgIconCard icon={Edit} size={45} bgColor={"bg-white"} />
              </div>
            </div>
            {/* Main Content */}
            <div className="flex flex-col -translate-y-10 justify-center items-center">
              {/* Information Section */}
              <div className="flex flex-col gap-5 items-center">
                <div className="flex flex-col">
                  <Text
                    text={["Name"]}
                    size="text-[16px] "
                    className={"leading-normal text-start ml-5 mb-2"}
                    fontColor="text-white"
                    fontType="font-bold"
                  />
                  <TextField
                    type={"text"}
                    classname={
                      "w-[450px] whitespace-pre-wrap h-[50px] p-5 pl-10  items-center bg-shadowboxeducator text-white rounded-[26px]"
                    }
                    placeholder=""
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <Text
                    text={["Description"]}
                    size="text-[16px] "
                    className={"leading-normal text-start ml-5 mb-2"}
                    fontColor="text-white"
                    fontType="font-bold"
                  />
                  <TextField
                    mode={"area"}
                    type={"text"}
                    classname={
                      "w-[450px] resize-none whitespace-pre-wrap h-[210px] p-5 pl-10  items-center bg-shadowboxeducator text-white rounded-[26px]"
                    }
                    placeholder=""
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
              {/* Date Selection */}
              <Application
                theme={theme}
                className=" rainbow-align-content_center"
              >
                <div className="flex flex-row justify-start pl-10 pr-10 m-5 gap-10 w-[80%] items-center ">
                  <div className="flex flex-col">
                    <Text
                      text={["Start Date"]}
                      size="text-[16px]"
                      className={"text-start ml-5"}
                      fontColor={"text-white"}
                      fontType={"font-bold"}
                    />
                    <DatePicker
                      id="datePicker-19"
                      placeholder={dateStart ? dateStart : "Select date"}
                      value={dateStart}
                      onChange={(dateStart) => setStartDate(dateStart)}
                      icon={
                        <ReactSVG
                          src={CalendarT}
                          beforeInjection={(svg) => {
                            svg.setAttribute(
                              "style",
                              "width: 40px; height: 40px"
                            );
                          }}
                        />
                      }
                    />
                  </div>
                  <div className="flex flex-col">
                    <Text
                      text={["End Date"]}
                      size="text-[16px]"
                      fontColor={"text-white"}
                      className={"text-start ml-5"}
                      fontType={"font-bold"}
                    />
                    <DatePicker
                      id="datePicker-19"
                      placeholder={dateEnd ? dateEnd : "Select date"}
                      value={dateEnd}
                      onChange={(dateEnd) => setEndDate(dateEnd)}
                      icon={
                        <ReactSVG
                          src={CalendarT}
                          beforeInjection={(svg) => {
                            svg.setAttribute(
                              "style",
                              "width: 40px; height: 40px"
                            );
                          }}
                        />
                      }
                    />
                  </div>
                </div>
              </Application>
              {/* Footer */}
              <div className=" w-[100%] ml-10">
                <div className="flex flex-row gap-5 ml-20 items-start justify-evenly w-full">
                  <div className="flex flex-col items-center gap-1 justify-center">
                    <Text
                      text={["Team Size"]}
                      size="text-[16px]"
                      fontColor="text-white"
                      className={"text-start"}
                      fontType="font-bold"
                    />
                    <TextField
                      type={"text"}
                      classname={
                        "w-[100px] h-[40px] p-5 pl-10  items-center bg-shadowboxeducator text-white rounded-[26px]"
                      }
                      placeholder=""
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col justify-start h-[20%] w-full items-start">
                    <Text
                      text={[`You have ${files} files uploaded`]}
                      size="text-[16px]"
                      fontColor={"text-white"}
                      className={"text-start ml-5 "}
                      fontType={"font-bold"}
                    />
                    <div className="w-[70%] flex-row justify-evenly gap-5 flex items-center">
                      <Button name="Upload Code" backg={"bg-[#BAAFFF]"} />
                      <Button name="Create" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBattle;
