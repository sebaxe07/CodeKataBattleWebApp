import React from "react";

import BgIconCard from "../../components/common/bgIconCard";
import { Text } from "../.../../../components/common/text";

export const ProfileCard = ({
  name,
  username,
  icon,
  cIcon,
  rol,
  age,
  school,
}) => {
  return (
    <div className="w-[414px] h-[626px] bg-shadowbox rounded-[36px]">
      <div className="w-[402px] h-[616px] bg-bgprimary rounded-[36px] flex flex-col justify-around items-center">
        <Text
          text={[`${rol}`]}
          size="text-[20px]"
          fontColor="text-white"
          fontType="font-medium"
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
              fontColor="text-accentprimary"
              fontType="font-normal "
            />
          </div>
          <div className="flex bg-white w-[180px] h-[172px] rounded-[100px] justify-center items-center">
            <BgIconCard
              icon={icon}
              iWidth={"100px"}
              iHeight={"100px"}
              classname={`${cIcon} w-[168px] h-[160px] rounded-[100px]`}
            />
          </div>
        </div>
        <div className="w-[402px] h-[203px] bg-bgaccent rounded-bl-[36px] rounded-br-[36px]  flex flex-col justify-center items-start space-y-5">
          <div className="flex w-full justify-center ml-20 flex-col items-start">
            <div className="flex flex-col justify-center items-start -space-y-2">
              <Text
                text={["Age"]}
                size="text-[22px]"
                fontColor="text-white"
                fontType="font-bold"
              />
              <Text
                text={[`${age}`]}
                size="text-[16px]"
                fontColor="text-accentprimary"
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
                fontColor="text-accentprimary"
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
