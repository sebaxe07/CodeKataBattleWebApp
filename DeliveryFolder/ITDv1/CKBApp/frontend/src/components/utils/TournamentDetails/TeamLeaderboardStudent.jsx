import React, { useState, useEffect, useContext } from "react";
import { ReactSVG } from "react-svg";
import { Text } from "../../common/text";
import BgIconCard from "../../common/bgIconCard";
import { Button } from "../../common/Button";
import { TextField } from "../../common/textfield";
import { useToast } from "@chakra-ui/react";
import axios from "../../../services/api";
import { UserContext } from "../../../services/contexts/UserContext";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";

export const TeamLeaderboardStudent = ({
  context,
  rank,
  icon,
  iconBg,
  name,
  exp,
  team,
  battle,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [manualScore, setManualScore] = useState(0);
  const toast = useToast();
  const { activeUser, setActiveUser } = useContext(UserContext);

  const colorSchemes = [
    {
      even: "bg-bgaccent",
      uneven: "bg-bgprimary",
    },
    {
      even: "bg-bgeducator",
      uneven: "bg-accentSecondaryEducator",
    },
  ];

  const [colorScheme, setColorScheme] = useState(colorSchemes[0]);

  useEffect(() => {
    setColorScheme(colorScheme[0]);
    setColorScheme(colorSchemes[context == "b" ? 1 : 0]);
  }, [context]);

  useEffect(() => {
    // console.log("TeamLeaderboard: team", team);
  }, [team]);

  useEffect(() => {
    // console.log("TeamLeaderboard: battle", battle);
  }, [battle]);

  return (
    <div
      className={`flex w-full h-[60px] items-center  justify-between px-20 p-2  ${
        rank % 2 == 0 ? colorScheme.even : colorScheme.uneven
      }`}
      onClick={onOpen}
    >
      <div className="flex flex-row gap-5 ">
        <Text
          text={[rank]}
          size="text-[16px]"
          fontColor="text-white"
          fontType="font-bold"
        />
        <div className="flex bg-white rounded-[100%] justify-center items-center w-[45px] h-[45px] ">
          <BgIconCard icon={icon} size={35} />
        </div>
      </div>
      <div>
        <Text
          text={[name]}
          size="text-[16px]"
          fontColor="text-white"
          className={"text-start "}
          fontType="font-bold"
        />
      </div>
      <div>
        <Text
          text={[`${exp} XP`]}
          size="text-[16px]"
          fontColor="text-white"
          className={"text-start "}
          fontType="font-bold"
        />
      </div>
    </div>
  );
};

export default TeamLeaderboardStudent;
