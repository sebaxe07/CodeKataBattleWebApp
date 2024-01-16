import React from "react";
import { ReactSVG } from "react-svg";
import { Text } from "../../common/text";

export const EducatorName = ({ SenseiName, SenseiImg, bg }) => {
  return (
    <div
      className={`rounded-t-[35px]  rounded-b-[35px] top-0 right-0 absolute rounded-tl-none flex flex-col justify-center items-center rounded-tr-16xl rounded-br-none rounded-bl-16xl ${bg} w-[153px] h-[133px]`}
    >
      <div className="relative rounded-full flex justify-center items-center bg-white w-[62px] h-[62px]">
        <div className="relative rounded-full bg-bgicon w-[55px] h-[55px] flex justify-center items-center">
          <ReactSVG src={SenseiImg} />
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
