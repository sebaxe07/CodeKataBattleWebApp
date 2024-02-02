import React from "react";
import { ReactSVG } from "react-svg";
import { Text } from "./text";
import BearUser from "../../assets/icons/UsersIcons/bear.svg";
import TigerUser from "../../assets/icons/UsersIcons/tiger.svg";
import ElephantUser from "../../assets/icons/UsersIcons/elephant.svg";
import PiggyUser from "../../assets/icons/UsersIcons/piggy.svg";

export const YouScore = ({ userIcon, position, score }) => {
  switch (userIcon) {
    case "bear.svg":
      userIcon = BearUser;
      break;
    case "tiger.svg":
      userIcon = TigerUser;
      break;
    case "elephant.svg":
      userIcon = ElephantUser;
      break;
    case "piggy.svg":
      userIcon = PiggyUser;
      break;
    default:
      userIcon = BearUser;
  }

  return (
    <div className="relative rounded-[40px] bg-accentprimary w-[111px] h-[150px] flex flex-col justify-center items-center ">
      <div className="absolute transform  -translate-y-[70px] bg-bgaccent rounded-[40px] min-w-[57px]">
        <Text
          text={["#" + position]}
          size="text-[16px]"
          fontColor="text-white"
          fontType="font-bold"
        />
      </div>
      <div className=" rounded-[50%] mt-[30px] bg-white w-[62px] h-[62px] flex   justify-center items-center ">
        <div className=" rounded-[50%] bg-accentsecondary w-[55px] h-[55px] flex  justify-center items-center">
          <ReactSVG
            src={userIcon}
            beforeInjection={(svg) => {
              svg.setAttribute("style", "width: 40px; height: 40px");
            }}
          />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center  -space-y-5">
        <Text
          text={["You"]}
          size="text-[16px]"
          fontColor="text-white"
          fontType="font-bold"
        />
        <Text
          text={[score + " XP"]}
          size="text-[16px]"
          fontColor="text-bgsecondary"
          fontType="font-bold"
        />
      </div>
    </div>
  );
};
