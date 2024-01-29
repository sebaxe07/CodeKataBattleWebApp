import React from "react";
import { Button } from "../../../components/common/Button";
import { Text } from "../../../components/common/text";
import BattleLogo from "../../../components/utils/TournamentDetails/BattleLogo";
import Python from "../../../assets/icons/python.png";

const CompleteTournamentCreation = () => {
  return (
    <div className="select-none relative rounded-[36px] bg-accentSecondaryEducator w-[35%] ml-20 mt-20 h-[70%] flex justify-center">
      <div className="flex flex-col translate-y-2 w-[98%] h-[97%] bg-bgeducator rounded-[36px] justify-evenly">
        <div className="flex justify-center translate-y-40 -translate-x-5 items-center">
          <BattleLogo BattleIcon={Python} size={150} />
        </div>
        <div className="flex flex-col pt-20 justify-center gap-10 items-center">
          <div className="w-full items-center  justify-center flex">
            <Text
              text={["YOUR BATTLE WAS SUCCESFULLY CREATED!"]}
              size="text-[32px]"
              fontColor={"text-white"}
              className={"p-5 ml-5"}
              fontType={"font-black"}
            />
          </div>
          <div className="w-full items-center flex-col justify-center flex">
            <Text
              text={["Do you want to create another one?"]}
              size="text-[16px]"
              fontColor={"text-white"}
              className={"text-start pb-5 ml-5"}
              fontType={"font-bold"}
            />
            <div className="w-[70%] justify-evenly flex flex-row items-center">
              <Button name="MAYBE LATER" backg={"bg-accentSecondaryEducator"} />
              <Button name="LET’S GO!" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteTournamentCreation;
