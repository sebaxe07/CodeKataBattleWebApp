import React from "react";
import { ReactSVG } from "react-svg";
import BgIconCard from "./bgIconCard";
import { Text } from "./text";
import Trophy1 from "../../assets/icons/Trophy/Trophy1.svg";
import Trophy2 from "../../assets/icons/Trophy/Trophy2.svg";
import Trophy3 from "../../assets/icons/Trophy/Trophy3.svg";

export const TopScore = ({
  users, // array of user objects
  score, // array of user scores
  icons, // array of icon objects
}) => {
  return (
    <div className="relative flex flex-row  justify-center items-center rounded-[40px] bg-bgaccent w-[500px] h-[87px] space-x-1 mx-[20px]">
      <div className=" rounded-[40px] bg-accentsecondary w-full min-w-[157px] h-[93px] transform  -translate-y-4 flex  justify-center items-center">
        <div className="absolute transform  -translate-y-[68px]">
          <ReactSVG
            src={Trophy1}
            beforeInjection={(svg) => {
              svg.setAttribute("style", "width: 50px; height: 50px");
            }}
          />
        </div>
        <div className=" rounded-[50%] bg-white w-[62px] h-[62px] flex   justify-center items-center">
          <div className=" rounded-[50%] bg-accentprimary w-[55px] h-[55px] flex  justify-center items-center">
            <BgIconCard icon={icons[0]} size={40} />
          </div>
        </div>
        <div className="flex flex-col justify-center items-start ml-[10px] -space-y-5">
          {users[0] != null ? (
            <Text
              text={[users[0]]}
              size="text-[16px]"
              fontColor="text-white"
              fontType="font-bold"
              className={
                "text-start whitespace-nowrap overflow-hidden overflow-ellipsis w-[80px]"
              }
            />
          ) : (
            <Text
              text={["No Team"]}
              size="text-[16px]"
              fontColor="text-white"
              fontType="font-bold"
              className={
                "text-start whitespace-nowrap overflow-hidden overflow-ellipsis w-[80px]"
              }
            />
          )}
          {score[0] != null ? (
            <Text
              text={[score[0] + " XP"]}
              size="text-[16px]"
              fontColor="text-bgsecondary"
              fontType="font-bold"
            />
          ) : (
            <Text
              text={["0 XP"]}
              size="text-[16px]"
              fontColor="text-bgsecondary"
              fontType="font-bold"
            />
          )}
        </div>
      </div>
      <div className=" rounded-[40px] bg-shadowbox w-full min-w-[157px] h-[93px] transform  -translate-y-4 flex justify-center items-center">
        <div className="absolute transform  -translate-y-[68px]">
          <ReactSVG
            src={Trophy2}
            beforeInjection={(svg) => {
              svg.setAttribute("style", "width: 40px; height: 40px");
            }}
          />
        </div>
        <div className=" rounded-[50%] bg-white w-[62px] h-[62px] flex   justify-center items-center">
          <div className=" rounded-[50%] bg-accentprimary w-[55px] h-[55px] flex  justify-center items-center">
            <BgIconCard icon={icons[1]} size={40} />
          </div>
        </div>
        <div className="flex flex-col justify-center items-start ml-[10px] -space-y-5">
          {users[1] != null ? (
            <Text
              text={[users[1]]}
              size="text-[16px]"
              fontColor="text-white"
              fontType="font-bold"
              className={
                "text-start whitespace-nowrap overflow-hidden overflow-ellipsis w-[80px]"
              }
            />
          ) : (
            <Text
              text={["No Team"]}
              size="text-[16px]"
              fontColor="text-white"
              fontType="font-bold"
              className={
                "text-start whitespace-nowrap overflow-hidden overflow-ellipsis w-[80px]"
              }
            />
          )}
          {score[1] != null ? (
            <Text
              text={[score[1] + " XP"]}
              size="text-[16px]"
              fontColor="text-bgsecondary"
              fontType="font-bold"
            />
          ) : (
            <Text
              text={["0 XP"]}
              size="text-[16px]"
              fontColor="text-bgsecondary"
              fontType="font-bold"
            />
          )}
        </div>
      </div>
      <div className=" rounded-[40px] bg-shadowbox w-full min-w-[157px] h-[93px] transform  -translate-y-4 flex justify-center items-center">
        <div className="absolute transform  -translate-y-[68px]">
          <ReactSVG
            src={Trophy3}
            beforeInjection={(svg) => {
              svg.setAttribute("style", "width: 40px; height: 40px");
            }}
          />
        </div>
        <div className=" rounded-[50%] bg-white w-[62px] h-[62px] flex   justify-center items-center">
          <div className=" rounded-[50%] bg-accentprimary w-[55px] h-[55px] flex  justify-center items-center">
            <BgIconCard icon={icons[2]} size={40} />
          </div>
        </div>
        <div className="flex flex-col justify-center items-start ml-[10px] -space-y-5">
          {users[2] != null ? (
            <Text
              text={[users[2]]}
              size="text-[16px]"
              fontColor="text-white"
              fontType="font-bold"
              className={
                "text-start whitespace-nowrap overflow-hidden overflow-ellipsis w-[80px]"
              }
            />
          ) : (
            <Text
              text={["No Team"]}
              size="text-[16px]"
              fontColor="text-white"
              fontType="font-bold"
              className={
                "text-start whitespace-nowrap overflow-hidden overflow-ellipsis w-[80px]"
              }
            />
          )}
          {score[2] != null ? (
            <Text
              text={[score[2] + " XP"]}
              size="text-[16px]"
              fontColor="text-bgsecondary"
              fontType="font-bold"
            />
          ) : (
            <Text
              text={["0 XP"]}
              size="text-[16px]"
              fontColor="text-bgsecondary"
              fontType="font-bold"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TopScore;
