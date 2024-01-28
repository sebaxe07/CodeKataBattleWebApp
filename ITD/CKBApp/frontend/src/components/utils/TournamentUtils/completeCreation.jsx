import React from "react";
import { Button } from "../../common/Button";
import { Text } from "../../common/text";
import TopDecorator from "../TournamentDetails/TopDecorator";
import Python from "../../../assets/icons/python.png";

const CompleteCreation = () => {
  return (
    <div className="select-none relative rounded-[36px] bg-shadowbox w-[35%] m-10 ml-20 mt-20 h-[100%] flex justify-center">
      <div className="flex flex-col translate-y-2 w-[98%] h-[97%] bg-bgprimary rounded-[36px] justify-evenly">
        <div className="flex justify-center translate-y-24 items-center">
          <TopDecorator LanguageIcon={Python} />
        </div>
        <div className="flex flex-col pt-20 justify-center gap-20 items-center">
          <div className="w-full items-center top-40 justify-center flex">
            <Text
              text={["YOUR TORNAMENT WAS SUCCESFULLY CREATED!"]}
              size="text-[32px]"
              fontColor={"text-white"}
              className={"p-10 ml-5"}
              fontType={"font-black"}
            />
          </div>
          <div className="w-full items-center flex-col justify-center flex">
            <Text
              text={["Do you want to add a battle?"]}
              size="text-[16px]"
              fontColor={"text-white"}
              className={"text-start pb-5 ml-5"}
              fontType={"font-bold"}
            />
            <div className="w-[70%] justify-evenly flex flex-row items-center">
              <Button name="Maybe Later" backg={"bg-[#BAAFFF]"} />
              <Button name="LET’S GO!" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteCreation;
