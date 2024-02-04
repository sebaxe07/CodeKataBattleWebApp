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

export const TeamLeaderboard = ({
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

  const handleSetManual = async () => {
    // Validate the manual score
    if (manualScore < 0 || manualScore > 100) {
      toast({
        title: "Invalid Score",
        description: "Manual score must be between 0 and 100",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await axios.patch(
        `/ss/scoring/manual/${team.id}/${manualScore}/`,
        {},
        {
          headers: { Authorization: `Token ${activeUser.authToken}` },
        }
      );
      console.log(response);

      toast({
        title: "Success",
        description: "Manual score set successfully",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "An error occurred, please try again",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      onClose();
    }
  };

  return (
    <div
      className={`flex w-full h-[60px] items-center  justify-between px-20 p-2 cursor-pointer ${
        rank % 2 == 0 ? colorScheme.even : colorScheme.uneven
      }`}
      onClick={onOpen}
    >
      <Modal isOpen={isOpen} onClose={onClose} isCentered size={"6xl"}>
        <ModalOverlay />
        <ModalContent borderRadius="36px">
          <ModalHeader>Team Info</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-0 ">
              <div className="flex flex-row gap-5 ">
                <Text
                  text={["Position: "]}
                  size="text-[16px]"
                  fontColor="text-bgsecondary"
                  fontType="font-black"
                />
                <Text
                  text={["#" + rank]}
                  size="text-[16px]"
                  fontColor="text-bgsecondary"
                  fontType="font-bold"
                />
              </div>
              <div className="flex flex-row gap-5 ">
                <Text
                  text={["Team: "]}
                  size="text-[16px]"
                  fontColor="text-bgsecondary"
                  fontType="font-black"
                />
                <Text
                  text={[team.team.name]}
                  size="text-[16px]"
                  fontColor="text-bgsecondary"
                  fontType="font-bold"
                />
              </div>
              <div className="flex flex-row gap-5 ">
                <Text
                  text={["Members: "]}
                  size="text-[16px]"
                  fontColor="text-bgsecondary"
                  fontType="font-black"
                />
                {team.team.members.map((member, index) => (
                  <Text
                    key={index}
                    text={[
                      member.user_profile.user.first_name +
                        " " +
                        member.user_profile.user.last_name,
                    ]}
                    size="text-[16px]"
                    fontColor="text-bgsecondary"
                    fontType="font-bold"
                  />
                ))}
              </div>
              <div className="flex flex-row gap-5 ">
                <Text
                  text={["Experience: "]}
                  size="text-[16px]"
                  fontColor="text-bgsecondary"
                  fontType="font-black"
                />
                <Text
                  text={[`${team.total_score} XP`]}
                  size="text-[16px]"
                  fontColor="text-bgsecondary"
                  fontType="font-bold"
                />
              </div>
              <div className="flex flex-row gap-5 ">
                <Text
                  text={["Functional Score: "]}
                  size="text-[16px]"
                  fontColor="text-bgsecondary"
                  fontType="font-black"
                />
                <Text
                  text={[`${team.functional_score} XP`]}
                  size="text-[16px]"
                  fontColor="text-bgsecondary"
                  fontType="font-bold"
                />
              </div>
              <div className="flex flex-row gap-5 ">
                <Text
                  text={["Timeliness Score: "]}
                  size="text-[16px]"
                  fontColor="text-bgsecondary"
                  fontType="font-black"
                />
                <Text
                  text={[`${team.timeliness_score} XP`]}
                  size="text-[16px]"
                  fontColor="text-bgsecondary"
                  fontType="font-bold"
                />
              </div>
              <div className="flex flex-row gap-5 ">
                <Text
                  text={["GitHub Repo: "]}
                  size="text-[16px]"
                  fontColor="text-bgsecondary"
                  fontType="font-black"
                />
                <a
                  href={
                    team &&
                    team.team.repository[0] &&
                    team.team.repository[0].url
                      ? team.team.repository[0].url
                      : "github.com"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Text
                    text={[
                      team.team.repository[0] && team.team.repository[0].url
                        ? team.team.repository[0].url
                        : "Not forked yet",
                    ]}
                    size="text-[16px]"
                    fontColor="text-bgsecondary"
                    fontType="font-bold"
                  />
                </a>
              </div>
              {battle.status == "consolidation" ? (
                <div className="flex flex-row gap-5 ">
                  <Text
                    text={["Set Manual Score: "]}
                    size="text-[16px]"
                    fontColor="text-bgsecondary"
                    fontType="font-black"
                  />
                  <TextField
                    type="number"
                    min="0"
                    max="100"
                    name="score"
                    placeholder={team.manual_score}
                    value={manualScore}
                    onChange={(e) => {
                      if (e.target.value < 0) {
                        setManualScore(0);
                      } else if (e.target.value > 100) {
                        setManualScore(100);
                      } else {
                        setManualScore(e.target.value);
                      }
                    }}
                  />
                  <Button name="Set" onClick={handleSetManual} />
                </div>
              ) : null}
            </div>
          </ModalBody>

          <ModalFooter>
            <Button name="OK!" onClick={onClose} />
          </ModalFooter>
        </ModalContent>
      </Modal>
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

export default TeamLeaderboard;
