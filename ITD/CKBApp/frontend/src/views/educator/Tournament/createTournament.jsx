import React, { useEffect, useRef, useState } from "react";
import { Text } from "../../../components/common/text";
import { TextField } from "../../../components/common/textfield";
import Button from "../../../components/common/Button";
import { Application, DatePicker } from "react-rainbow-components";
import { TopDecorator } from "../../../components/utils/TournamentDetails/TopDecorator";
import { BattleLogo } from "../../../components/utils/TournamentDetails/BattleLogo";
import { ReactSVG } from "react-svg";
import Logo from "../../../assets/images/Logo.svg";

import Python from "../../../assets/icons/python.png";
import Binary from "../../../assets/icons/binaryIcon.png";
import Back from "../../../assets/icons/backArrow.png";
import CalendarT from "../../../assets/icons/calendar.svg";
import Edit from "../../../assets/icons/edit.svg";
import BgIconCard from "../../../components/common/bgIconCard";

// import styled from "react-rainbow-components/styled";

export const CreateTournament = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dateStart, setStartDate] = useState(null);
  const [dateEnd, setEndDate] = useState(null);

  function onChange(dateStart) {
    setStartDate(dateStart);
  }
  function onChange(dateEnd) {
    setEndDate(dateEnd);
  }

  const theme = {
    rainbow: {
      palette: {
        brand: "#5c56b6",
        mainBackground: "#332786",
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
      <div className="select-none relative rounded-[36px] bg-shadowbox w-[35%] m-10 ml-20 mt-20 h-[100%] flex justify-center">
        <div className="w-full">
          <div className="flex h-[10%] w-[100%] justify-start items-center ml-5">
            <img
              src={Back}
              className="w-[40px] h-[40px]  rounded-[100%]"
              onClick={() => {
                console.log("pressed");
              }}
            />
            <Text
              text={["CREATE TOURNAMENT"]}
              size="text-[20px] "
              className={"leading-normal text-start ml-5"}
              fontColor="text-white"
              fontType="font-bold"
            />
          </div>
          <div className="flex flex-col translate-y-2 w-[98%] h-[87%] bg-bgprimary rounded-b-[36px]">
            <div className=" justify-center flex items-center translate-x-40 -translate-y-8">
              <TopDecorator LanguageIcon={Python} size={200} />
              <div onClick={() => console.log("Edit Tournament Logo")}>
                <BgIconCard
                  icon={Edit}
                  iWidth={"30px"}
                  iHeight={"30px"}
                  classname={
                    "translate-x-14 translate-y-10 bg-white h-[45px] w-[45px] rounded-[100px] "
                  }
                />
              </div>
            </div>
            <div className="flex flex-col justify-center mt-10 items-center">
              <div className="flex flex-col mt-5 justify-start gap-5 items-center">
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
                      "w-[450px] whitespace-pre-wrap h-[50px] p-5 pl-10  items-center bg-[#332786] text-white rounded-[26px]"
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
                      "w-[450px] resize-none whitespace-pre-wrap h-[210px] p-5 pl-10  items-center bg-[#332786] text-white rounded-[26px]"
                    }
                    placeholder=""
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
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
            </div>
            <div className="flex flex-row gap-10 justify-center h-[20%] w-full items-center">
              <div className="w-[70%] justify-evenly flex items-center">
                <Button name="Invite Sensei" backg={"bg-[#BAAFFF]"} />
                <Button name="Edit Tournament" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTournament;
