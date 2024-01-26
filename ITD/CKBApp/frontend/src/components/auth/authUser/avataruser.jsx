import React, { useState, useContext } from "react";
import { Text } from "../../common/text";
import Card from "../../common/bgIconCard";
import { RegisterContext } from "../../../services/contexts/RegisterContext";

import IcoElephant from "../../../assets/icons/UsersIcons/elephant.svg";
import IcoTiger from "../../../assets/icons/UsersIcons/tiger.svg";
import IcoPiggy from "../../../assets/icons/UsersIcons/piggy.svg";
import IcoBear from "../../../assets/icons/UsersIcons/bear.svg";

export const AvatarUser = () => {
  const { userData, setUserData } = useContext(RegisterContext);

  // School Screen
  return (
    <div>
      <Text
        text={["Select an avatar"]}
        size="text-[32px]"
        fontColor="text-white"
        fontType="font-black"
      />
      <Text
        text={["Pick the avatar you want. this will be your profile picture"]}
        size="text-[16px]"
        fontColor="text-white"
        fontType="font-black"
      />
      <div className="flex mt-10 justify-center gap-5">
        <Card
          icon={IcoElephant}
          bgColor={"bg-[#6CBE83]"}
          onClick={(e) =>
            setUserData({
              ...userData,
              avatar: "elephant.svg",
            })
          }
          active={userData.avatar === "elephant.svg"}
        />
        <Card
          icon={IcoTiger}
          on
          bgColor={"bg-[#DB79C0]"}
          onClick={(e) =>
            setUserData({
              ...userData,
              avatar: "tiger.svg",
            })
          }
          active={userData.avatar === "tiger.svg"}
        />
        <Card
          icon={IcoPiggy}
          bgColor={"bg-[#5D9BF6]"}
          onClick={(e) =>
            setUserData({
              ...userData,
              avatar: "piggy.svg",
            })
          }
          active={userData.avatar === "piggy.svg"}
        />
        <Card
          icon={IcoBear}
          bgColor={"bg-[#F4A358]"}
          onClick={(e) =>
            setUserData({
              ...userData,
              avatar: "bear.svg",
            })
          }
          active={userData.avatar === "bear.svg"}
        />
      </div>
    </div>
  );
};

export default AvatarUser;
