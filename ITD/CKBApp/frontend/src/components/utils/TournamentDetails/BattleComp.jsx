import React from "react";
import { ReactSVG } from "react-svg";
import { Text } from "../../common/text";
import BattleDecorator from "../../../assets/images/BattleDecorator.svg";
import { Button } from "../../common/Button";

export const BattleComp = ({
  battleName,
  battleDescription,
  battleXP,
  languageIcon,
}) => {
  return (
    <div className="bg-bgprimary relative w-[34%] h-[63%] min-w-[259px] rounded-[36px] flex justify-center items-start mx-2">
      <ReactSVG
        src={BattleDecorator}
        className="absolute  -right-4  top-0  transform  -translate-y-1/2"
      />
      <ReactSVG
        src={languageIcon}
        className="absolute  right-1  top-2  transform  -translate-y-1/2"
      />
      <div className="flex flex-col justify-center items-start -ml-[50px] -space-y-2 mt-[15px]">
        <Text
          text={[battleName]}
          size="text-[16px]"
          fontColor="text-white"
          fontType="font-bold"
          className={""}
        />
        <Text
          text={[battleDescription]}
          size="text-[16px]"
          fontColor="text-accentprimary"
          fontType="font-normal"
          className={" leading-tight text-start max-w-[150px]"}
        />
      </div>
      <Button
        name="RESUME"
        className={
          "transform  absolute bottom-0 translate-y-[40%] -translate-x-[20%] "
        }
      />
      <div className="flex absolute bottom-[18px] right-[16px] justify-center items-center bg-accentprimary w-[15%]  h-[35%] rounded-[13px]">
        <Text
          text={[battleXP]}
          size="text-[16px]"
          fontColor="text-white"
          fontType="font-bold"
          className={"leading-tight text-center mx-[15px]  "}
        />
      </div>
    </div>
  );
};
