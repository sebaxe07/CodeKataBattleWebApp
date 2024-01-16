import React, { useState, useEffect } from "react";
import { Text } from "../../common/text";
import Card from "../../common/bgIconCard";
import { ReactSVG } from "react-svg";

import IcoElephant from "../../../assets/icons/elephant.svg";
import IcoTiger from "../../../assets/icons/tiger.svg";
import IcoPiggy from "../../../assets/icons/piggy.svg";
import IcoBear from "../../../assets/icons/bear.svg";

export const AvatarUser = () => {
  const [activeCard, setActiveCard] = useState(null);

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
          onClick={() => setActiveCard("card1")}
          active={activeCard === "card1"}
        />
        <Card
          icon={IcoTiger}
          on
          bgColor={"bg-[#DB79C0]"}
          onClick={() => setActiveCard("card2")}
          active={activeCard === "card2"}
        />
        <Card
          icon={IcoPiggy}
          bgColor={"bg-[#5D9BF6]"}
          onClick={() => setActiveCard("card3")}
          active={activeCard === "card3"}
        />
        <Card
          icon={IcoBear}
          bgColor={"bg-[#F4A358]"}
          onClick={() => setActiveCard("card4")}
          active={activeCard === "card4"}
        />
      </div>
    </div>
  );
};

export default AvatarUser;
