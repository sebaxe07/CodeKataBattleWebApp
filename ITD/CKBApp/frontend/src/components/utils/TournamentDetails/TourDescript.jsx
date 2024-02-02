import React from "react";
import { Text } from "../../common/text";

export const TourDescript = ({ name, description }) => {
  return (
    <div className="flex flex-col justify-center items-center relative top-[25%] mx-[71px] ">
      <Text
        text={[name]}
        size="text-[32px]"
        fontColor="text-white"
        fontType="font-bold"
        className={
          "whitespace-nowrap overflow-hidden overflow-ellipsis w-[450px] text-center"
        }
      />
      <Text
        text={[description]}
        size="text-[16px]"
        fontColor="text-accentprimary"
        fontType="font-normal"
        className={"mt-[3px] leading-tight "}
      />
    </div>
  );
};

export default TourDescript;
