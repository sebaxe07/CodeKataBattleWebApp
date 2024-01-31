import React from "react";
import { Button } from "../../../components/common/Button";
import { Text } from "../../../components/common/text";
import BattleLogo from "../../../components/utils/TournamentDetails/BattleLogo";
import { useNavigate } from "react-router-dom";

export const CompleteBattleCreation = ({ icon }) => {
  const navigate = useNavigate();
  return (
    <div className="select-none relative rounded-[36px] bg-accentSecondaryEducator w-[35%]  h-[70%] flex justify-center">
      <div className="flex flex-col w-[98%] h-[97%] bg-bgeducator rounded-[36px] justify-evenly items-center ">
        <BattleLogo BattleIcon={icon} size={200} shouldTranslate={false} />
        <Text
          text={["YOUR BATTLE WAS SUCCESFULLY CREATED!"]}
          size="text-[32px]"
          fontColor={"text-white"}
          fontType={"font-black"}
        />

        <Button
          name="GOT IT!"
          onClick={() => {
            navigate(-1);
          }}
        />
      </div>
    </div>
  );
};

export default CompleteBattleCreation;
