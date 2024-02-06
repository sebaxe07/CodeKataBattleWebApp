import React, { useState, useContext } from "react";
import { Text } from "../../common/text";
import Card from "../../common/bgIconCard";
import { RegisterContext } from "../../../services/contexts/RegisterContext";

export const AvatarUser = () => {
  const { userData, setUserData } = useContext(RegisterContext);

  // School Screen
  return (
    <div className="h-full w-full">
      <Text
        text={["Select an Avatar"]}
        size="text-[32px]"
        fontColor="text-white"
        fontType="font-black"
      />
      <Text
        text={["Pick the avatar you want, this will be your profile picture"]}
        size="text-[16px]"
        fontColor="text-white"
        fontType="font-black"
      />
      <div className="flex mt-5 w-full h-full justify-around gap-5">
        <Card
          icon={"elephant.svg"}
          size={100}
          onClick={(e) =>
            setUserData({
              ...userData,
              avatar: "elephant.svg",
            })
          }
          active={userData.avatar === "elephant.svg"}
        />

        <Card
          icon={"tiger.svg"}
          size={100}
          onClick={(e) =>
            setUserData({
              ...userData,
              avatar: "tiger.svg",
            })
          }
          active={userData.avatar === "tiger.svg"}
        />
        <Card
          icon={"piggy.svg"}
          size={100}
          onClick={(e) =>
            setUserData({
              ...userData,
              avatar: "piggy.svg",
            })
          }
          active={userData.avatar === "piggy.svg"}
        />
        <Card
          icon={"bear.svg"}
          size={100}
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
