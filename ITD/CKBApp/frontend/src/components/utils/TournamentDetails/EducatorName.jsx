import React from "react";
import { ReactSVG } from "react-svg";
import { Text } from "../../common/text";
import BearUser from "../../../assets/icons/UsersIcons/bear.svg";
import TigerUser from "../../../assets/icons/UsersIcons/tiger.svg";
import ElephantUser from "../../../assets/icons/UsersIcons/elephant.svg";
import PiggyUser from "../../../assets/icons/UsersIcons/piggy.svg";

export const EducatorName = ({ SenseiName, SenseiImg, bg }) => {
  switch (SenseiImg) {
    case "bear.svg":
      SenseiImg = BearUser;
      break;
    case "tiger.svg":
      SenseiImg = TigerUser;
      break;
    case "elephant.svg":
      SenseiImg = ElephantUser;
      break;
    case "piggy.svg":
      SenseiImg = PiggyUser;
      break;
    default:
      SenseiImg = BearUser;
  }
  return (
    <div
      className={`rounded-t-[35px]  rounded-b-[35px] top-0 right-0 absolute rounded-tl-none flex flex-col justify-center items-center rounded-tr-16xl rounded-br-none rounded-bl-16xl ${bg} w-[153px] h-[133px]`}
    >
      <div className="relative rounded-full flex justify-center items-center bg-white w-[62px] h-[62px]">
        <div className="relative rounded-full bg-bgicon w-[55px] h-[55px] flex justify-center items-center">
          <ReactSVG
            src={SenseiImg}
            beforeInjection={(svg) => {
              svg.setAttribute("style", "width: 40px; height: 40px");
            }}
          />
        </div>
      </div>
      <Text
        text={["Sensei " + SenseiName]}
        size="text-[16px]"
        fontColor="text-white"
        fontType="font-bold"
      />
    </div>
  );
};

export default EducatorName;
