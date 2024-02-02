import React from "react";
import { ReactSVG } from "react-svg";
import { Text } from "../../common/text";
import BattleDecorator from "../../../assets/images/BattleDecorator.svg";
import { Button } from "../../common/Button";
import python from "../../../assets/icons/python.svg";
import binary from "../../../assets/icons/binaryIcon.svg";
import { useNavigate } from "react-router-dom";

export const BattleComp = ({
  battleName,
  battleXP,
  languageIcon,
  battleData,
  partOf = false,
  ...props
}) => {
  const navigate = useNavigate();
  switch (languageIcon) {
    case "python.svg":
      languageIcon = python;
      break;
    case "binaryIcon.svg":
      languageIcon = binary;
      break;
    default:
      languageIcon = python;
  }
  return (
    <div className="bg-bgprimary relative w-[34%] h-[63%] min-w-[259px] rounded-[36px] flex justify-center items-start mx-2">
      <ReactSVG
        src={BattleDecorator}
        className="absolute  -right-4  top-0  transform  -translate-y-1/3"
      />
      <ReactSVG
        src={languageIcon}
        beforeInjection={(svg) => {
          svg.setAttribute("style", "width: 40px; height: 40px");
        }}
        className="absolute translate-x-[110.5px] "
      />
      <div className="flex flex-col justify-center items-start mt-8 -ml-[50px]">
        <Text
          text={[battleName]}
          size="text-[24px]"
          fontColor="text-white"
          fontType="font-bold"
          className={""}
        />
      </div>
      <Button
        name={partOf ? "CONTINUE" : "SEE MORE"}
        className={
          "transform  absolute bottom-0 translate-y-[40%] -translate-x-[20%] "
        }
        onClick={() => {
          if (partOf) {
            props.onBattleSelect(battleData);
            navigate(`/student/battle/${battleData.id}`);
          } else {
            props.onSeeMoreClick();
            props.onBattleSelect(battleData);
          }
        }}
      />
      {partOf && (
        <div className="flex absolute bottom-[18px] right-[16px] justify-center items-center bg-accentprimary w-[15%]  h-[35%] rounded-[13px]">
          <Text
            text={[battleXP + " XP"]}
            size="text-[16px]"
            fontColor="text-white"
            fontType="font-bold"
            className={"leading-tight text-center mx-[15px]  "}
          />
        </div>
      )}
    </div>
  );
};
