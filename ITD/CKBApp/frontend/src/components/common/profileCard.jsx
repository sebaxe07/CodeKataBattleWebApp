import React, { useEffect, useState } from "react";

import BgIconCard from "../../components/common/bgIconCard";
import { Text } from "../.../../../components/common/text";

const colorSchemes = [
  {
    background: "bg-bgprimary",
    shadow: "bg-shadowbox",
    accent: "bg-bgaccent",
  },
  {
    background: "bg-bgeducator",
    shadow: "bg-accentSecondaryEducator",
    accent: "bg-shadowboxeducator",
  },
];

export const ProfileCard = ({ name, username, icon, rol, github, school }) => {
  const [colorScheme, setColorScheme] = useState(colorSchemes[0]);

  useEffect(() => {
    setColorScheme(colorSchemes[rol === "Seito" ? 0 : 1]);
  }, []);

  return (
    <div
      className={`${colorScheme.shadow} w-[414px] h-[626px]  rounded-[36px]`}
    >
      <div
        className={`${colorScheme.background} w-[402px] h-[616px]  rounded-[36px] flex flex-col justify-between items-center`}
      >
        <Text
          text={[`${rol}`]}
          size="text-[20px]"
          fontColor="text-white"
          fontType="font-bold"
          className={"tracking-widest"}
        />
        <div className="flex flex-col h-[350px] items-center justify-center">
          <div className="flex flex-col justify-center">
            <Text
              text={[`${name}`]}
              size="text-[32px]"
              fontColor="text-white"
              fontType="font-bold"
            />
            <Text
              text={[`${username}`]}
              size="text-[16px]"
              fontColor="text-white"
              fontType="font-normal "
            />
          </div>
          <div className="flex bg-white w-[180px] h-[172px] rounded-[100px] justify-center items-center">
            <BgIconCard
              icon={icon}
              iWidth={"100px"}
              iHeight={"100px"}
              classname={` w-[168px] h-[160px] rounded-[100px]`}
            />
          </div>
        </div>
        <div
          className={`${colorScheme.accent} w-[402px] h-[203px]  rounded-b-[36px]  flex flex-col justify-center items-start space-y-5`}
        >
          <div className="flex w-full justify-center ml-20 flex-col items-start">
            <div className="flex flex-col justify-center items-start -space-y-2">
              <Text
                text={["Github username"]}
                size="text-[22px]"
                fontColor="text-white"
                fontType="font-bold"
              />
              <Text
                text={[`${github}`]}
                size="text-[16px]"
                fontColor="text-white"
                fontType="font-normal "
              />
            </div>
            <div className="flex flex-col justify-center items-start -space-y-2">
              <Text
                text={["School"]}
                size="text-[22px]"
                fontColor="text-white"
                fontType="font-bold"
              />
              <Text
                text={[`${school}`]}
                size="text-[16px]"
                fontColor="text-white"
                fontType="font-normal "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
