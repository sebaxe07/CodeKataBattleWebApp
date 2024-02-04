import React, { useState, useEffect } from "react";
import { ReactSVG } from "react-svg";
import { Text } from "../../common/text";
import BgIconCard from "../../common/bgIconCard";
import Button from "../../common/Button";

export const TeamList = ({ name, members, max, onJoin }) => {
  return (
    <div
      className={`flex w-full h-[60px] items-center  justify-around p-2 bg-[#9791C1] rounded-[36px] space-x-4 `}
    >
      <div className="flex bg-white rounded-[100%] justify-center items-center w-[45px] h-[45px] ">
        <BgIconCard icon={"swords.svg"} size={35} />
      </div>
      <Text
        text={[name]}
        size="text-[16px]"
        fontColor="text-white"
        className={
          "text-start whitespace-nowrap overflow-hidden overflow-ellipsis w-[150px]"
        }
        fontType="font-bold"
      />
      <Text
        text={[`${members} / ${max} members`]}
        size="text-[16px]"
        fontColor="text-white"
        className={"text-start "}
        fontType="font-bold"
      />
      <Button name="JOIN" onClick={onJoin} />
    </div>
  );
};

export default TeamList;
