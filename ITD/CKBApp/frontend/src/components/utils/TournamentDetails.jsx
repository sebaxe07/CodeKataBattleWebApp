import React, { useEffect, useRef } from "react";
import { ReactSVG } from "react-svg";
import { Text } from "../common/text";
import Fire from "../../assets/icons/fire.svg";
import Button from "../common/Button";
import { EducatorName } from "./TournamentDetails/EducatorName";
import { TopDecorator } from "./TournamentDetails/TopDecorator";
import { UserAmount } from "./TournamentDetails/UserAmount";
import { TourDescript } from "./TournamentDetails/TourDescript";
import { TopScore } from "../common/TopScore";
import { YouScore } from "../common/YouScore";
import { BattleComp } from "./TournamentDetails/BattleComp";
import { Dates } from "./TournamentDetails/Dates";

import Java from "../../assets/icons/java.svg";
import Python from "../../assets/icons/python.png";
import Sensei from "../../assets/icons/UsersIcons/BearSensei.svg";
import BearUser from "../../assets/icons/UsersIcons/bear.svg";
import TigerUser from "../../assets/icons/UsersIcons/tiger.svg";
import ElephantUser from "../../assets/icons/UsersIcons/elephant.svg";
import PiggyUser from "../../assets/icons/UsersIcons/piggy.svg";

export const TournamentDetails = ({}) => {
  const handleWheel = (e) => {
    e.preventDefault();
    const container = e.currentTarget;
    const containerScrollPosition = container.scrollLeft;
    const scrollSpeed = 0.3; // Change this value to adjust the scroll speed
    container.scrollTo({
      top: 0,
      left: containerScrollPosition + e.deltaY * scrollSpeed,
      behaviour: "smooth",
    });
  };

  return (
    <div className="select-none relative rounded-[36px] bg-shadowbox w-[765px] h-[76%] flex justify-center">
      <div className="relative rounded-[36px] bg-bgprimary w-[747px] h-[97%]">
        <div className=" relative w-full h-[59%]  ">
          <TopDecorator LanguageIcon={Python} />

          <UserAmount UserAmount={"1-5"} />

          <EducatorName
            SenseiImg={Sensei}
            SenseiName={"Miguel"}
            bg={"bg-bgaccent"}
          />

          <TourDescript
            name={"Tournament 1"}
            description={
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            }
          />

          <div className="flex flex-row justify-center items-end relative top-[32%]">
            <TopScore
              users={["Pablo", "Juan", "Sebas"]}
              score={["100", "50", "25"]}
              icons={[ElephantUser, PiggyUser, BearUser]}
            />
            <YouScore userIcon={TigerUser} position={"80"} score={"10"} />
          </div>
        </div>

        <div
          onWheel={handleWheel}
          className="relative bg-bgaccent w-full h-[28%] flex flex-row justify-start items-center  overflow-x-auto space-x-4 scrollbar scrollbar-thumb-bgprimary  "
        >
          <BattleComp
            battleName={"Battle 1"}
            battleDescription={"Battle description 1 Lorem ipsum dolor..."}
            battleXP={"76 XP"}
            languageIcon={Java}
          />
          <BattleComp
            battleName={"Battle 2"}
            battleDescription={"Battle description 2 Lorem ipsum dolor..."}
            battleXP={"76 XP"}
            languageIcon={Java}
          />
          <BattleComp
            battleName={"Battle 3"}
            battleDescription={"Battle description 3 Lorem ipsum dolor..."}
            battleXP={"76 XP"}
            languageIcon={Java}
          />
          <BattleComp
            battleName={"Battle 4"}
            battleDescription={"Battle description 4 Lorem ipsum dolor..."}
            battleXP={"76 XP"}
            languageIcon={Java}
          />
          <BattleComp
            battleName={"Battle 5"}
            battleDescription={"Battle description 5 Lorem ipsum dolor..."}
            battleXP={"76 XP"}
            languageIcon={Java}
          />
        </div>
        <div className="relative rounded-t-none rounded-b-[36px] bg-bgsecondary w-full h-[13%]  flex flex-row justify-center items-center">
          <div className=" w-full h-full flex flex-row justify-center items-center ml-5">
            <Dates state={"Starts"} date={"01 Jan. 2024"} />

            <Dates state={"Ends"} date={"31 Jan. 2024"} />
          </div>
          <div className=" w-full h-full flex flex-row justify-end items-center mr-[5%]">
            <div className="flex flex-row justify-start items-center space-x-2 mr-[10px]">
              <ReactSVG
                src={Fire}
                beforeInjection={(svg) => {
                  svg.setAttribute("style", "width: 23px; height: 23px");
                }}
              />
              <Text
                text={["Ends in 5 days"]}
                size="text-[16px]"
                fontColor="text-accentsecondary"
                fontType="font-bold"
              />
            </div>
            <Button name="JOIN" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentDetails;
