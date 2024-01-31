import React, { useState, useEffect } from "react";
import { ReactSVG } from "react-svg";
import { Text } from "../../common/text";
import BgIconCard from "../../common/bgIconCard";
import Button from "../../common/Button";
import { useNavigate, useParams } from "react-router-dom";

export const CreatedBattle = ({ context = "", icon, name, state, bid }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const colorSchemes = [
    {
      background: "bg-[#322D73]",
    },
    {
      background: "bg-[#2C785F]",
    },
  ];

  const [colorScheme, setColorScheme] = useState(colorSchemes[0]);

  useEffect(() => {
    setColorScheme(colorScheme[0]);
    setColorScheme(colorSchemes[context == "b" ? 1 : 0]);
  }, [context]);

  return (
    <div
      className={`flex w-[90%] h-[50px] items-center  ${colorScheme.background} rounded-[36px] my-3`}
    >
      <div className="flex flex-1  items-center ">
        <div className=" flex bg-white rounded-[100%] justify-center items-center w-[60px] h-[60px]">
          <BgIconCard icon={icon} size={50} />
        </div>
        <Text
          text={[name]}
          size="text-[16px]"
          fontColor="text-white"
          className={"text-start ml-5"}
          fontType="font-bold"
        />
      </div>
      <div className="flex flex-1 flex-row items-center justify-between h-full">
        <Button
          name="Edit"
          className={"h-full  max-w-[120px] flex-grow"}
          onClick={() =>
            navigate(`/educator/tournament/${id}/battle/manage/${bid}`)
          }
        />

        <Text
          text={[state ? "Active" : "Inactive"]}
          size="text-[16px]"
          fontColor="text-white"
          fontType="font-bold"
          className={"mr-16"}
        />
      </div>
    </div>
  );
};

export default CreatedBattle;
