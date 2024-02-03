import React from "react";
import { Button } from "../../../components/common/Button";
import { Text } from "../../../components/common/text";
import TopDecorator from "../../../components/utils/TournamentDetails/TopDecorator";
import { useNavigate } from "react-router-dom";

export const CompleteTournamentCreation = ({ icon }) => {
  const navigate = useNavigate();

  return (
    <div className="select-none relative rounded-[36px] bg-shadowbox w-[35%] m-10 ml-20 mt-20 h-[100%] flex justify-center">
      <div className="flex flex-col translate-y-2 w-[98%] h-[97%] bg-bgprimary rounded-[36px] justify-evenly">
        <div className="flex justify-center translate-y-24 items-center">
          <TopDecorator LanguageIcon={icon} size={250} />
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
            <div className="w-[70%] justify-evenly flex flex-row items-center">
              <Button
                name="LET’S GO!"
                onClick={() => {
                  navigate(-1);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteTournamentCreation;
