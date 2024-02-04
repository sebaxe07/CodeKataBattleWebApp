import React, { useState, useEffect, useContext } from "react";
import { Text } from "../common/text";
import BgIconCard from "../common/bgIconCard";

import { ReactSVG } from "react-svg";
import Fire from "../../assets/icons/fire.svg";
import Calendar from "../../assets/icons/calendar.svg";

import { Button } from "../common/Button";

import { useNavigate } from "react-router-dom";
import { LoadingScreen } from "../../services/LoadingScreen";
import { UserContext } from "../../services/contexts/UserContext";
import axios from "../../services/api";
import { useToast } from "@chakra-ui/react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";

const ActiveTournament = ({
  name,
  picture,
  soonToEnd,
  timeRemainig,
  startDate,
  endDate,
  tournamentData,
}) => {
  const colors = [
    "bg-[#EE8361]",
    "bg-[#60ADF4]",
    "bg-[#F4D160]",
    "bg-[#6360F4]",
    "bg-[#F47DD8]",
    "bg-[#52AE66]",
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { activeUser, setActiveUser } = useContext(UserContext);
  const toast = useToast();

  const handleJoin = async (event) => {
    if (event) {
      event.preventDefault();
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        `/tms/tournaments/subscribe/${activeUser.roleid}/${tournamentData.id}`,
        {},
        {
          headers: { Authorization: `Token ${activeUser.authToken}` },
        }
      );
      console.log(response.data);

      toast({
        title: "Subscription successful!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/student/home");
    } catch (error) {
      console.error("Error subscribing user:", error);

      toast({
        title: "Error subscribing to tournament! Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="relative flex items-center justify-center my-[13px] "
      style={{ userSelect: "none" }}
    >
      {isLoading && <LoadingScreen />}
      <div
        className="relative flex items-center justify-center w-[80%] transform active:scale-95 bg-white hover:ring-4 hover:ring-shadowbox transition-all  h-[90px]  rounded-[29px] shadow-xl"
        onClick={onOpen}
      >
        <div className="flex flex-row justify-start mx-5 gap-10 items-center  h-full   w-1/3 ">
          <BgIconCard
            classname={`${randomColor} w-[72px] h-[69px] rounded-[29px]`}
            icon={picture}
          />
          <Text
            text={[`${name}`]}
            size="text-[20px]"
            fontColor={`text-bgsecondary`}
            fontType="font-bold"
            className={
              " whitespace-nowrap overflow-ellipsis overflow-hidden w-[300px] text-start"
            }
          />
        </div>
        <div className="flex flex-row justify-center items-center  h-full   w-1/4 ">
          {soonToEnd ? (
            <div className="flex flex-row items-center gap-2">
              <ReactSVG
                src={Fire}
                beforeInjection={(svg) => {
                  svg.setAttribute("style", "width: 20px; height: 25px");
                }}
              />
              <Text
                text={[`${timeRemainig}`]}
                size="text-[16px]"
                fontColor={`text-shadowbox`}
                fontType="font-normal"
              />
            </div>
          ) : null}
        </div>
        <div className="flex flex-row justify-evenly items-center  h-full w-1/4  ">
          <div className="flex flex-row justify-center items-center gap-3">
            <ReactSVG
              src={Calendar}
              beforeInjection={(svg) => {
                svg.setAttribute("style", "width: 40px; height: 40px");
              }}
            />
            <div className="flex flex-col items-start -space-y-4">
              <Text
                text={["Starts"]}
                size="text-[16px]"
                fontColor={`text-[##182338]`}
                fontType="font-bold"
              />
              <Text
                text={[`${startDate}`]}
                size="text-[16px]"
                fontColor={`text-shadowbox`}
                fontType="font-bold"
              />
            </div>
          </div>
          <div className="flex flex-row justify-center items-center gap-3">
            <ReactSVG
              src={Calendar}
              beforeInjection={(svg) => {
                svg.setAttribute("style", "width: 40px; height: 40px");
              }}
            />
            <div className="flex flex-col items-start -space-y-4">
              <Text
                text={["Ends"]}
                size="text-[16px]"
                fontColor={`text-[#182338]`}
                fontType="font-bold"
              />
              <Text
                text={[`${endDate}`]}
                size="text-16px"
                fontColor={`text-bgaccent`}
                fontType="font-bold"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-evenly items-center  h-full w-1/4  ">
          <Button name="View More" />
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size={"xl"}>
        <ModalOverlay />
        <ModalContent borderRadius="36px">
          <ModalHeader />
          <ModalBody>
            <div className="flex flex-col justify-start  space-x-2 space-y-5   items-center  h-full   w-full ">
              <Text
                text={[tournamentData.name]}
                size="text-[24px]"
                fontColor={`text-bgsecondary`}
                fontType="font-black"
                className={"text-center leading-tight"}
              />
              <Text
                text={[tournamentData.description]}
                size="text-[16px]"
                fontColor={`text-bgprimary`}
                fontType="font-bold"
                className={"text-start leading-tight mt-2"}
              />
              <div className="flex flex-row justify-evenly items-center  h-full w-full  ">
                <div className="flex flex-row justify-center items-center gap-3">
                  <ReactSVG
                    src={Calendar}
                    beforeInjection={(svg) => {
                      svg.setAttribute("style", "width: 40px; height: 40px");
                    }}
                  />
                  <div className="flex flex-col items-start -space-y-4">
                    <Text
                      text={["Starts"]}
                      size="text-[16px]"
                      fontColor={`text-[##182338]`}
                      fontType="font-bold"
                    />
                    <Text
                      text={[`${startDate}`]}
                      size="text-[16px]"
                      fontColor={`text-shadowbox`}
                      fontType="font-bold"
                    />
                  </div>
                </div>
                <div className="flex flex-row justify-center items-center gap-3">
                  <ReactSVG
                    src={Calendar}
                    beforeInjection={(svg) => {
                      svg.setAttribute("style", "width: 40px; height: 40px");
                    }}
                  />
                  <div className="flex flex-col items-start -space-y-4">
                    <Text
                      text={["Ends"]}
                      size="text-[16px]"
                      fontColor={`text-[#182338]`}
                      fontType="font-bold"
                    />
                    <Text
                      text={[`${endDate}`]}
                      size="text-16px"
                      fontColor={`text-bgaccent`}
                      fontType="font-bold"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-center items-center  h-full   w-full ">
                {soonToEnd ? (
                  <div className="flex flex-row items-center gap-2">
                    <ReactSVG
                      src={Fire}
                      beforeInjection={(svg) => {
                        svg.setAttribute("style", "width: 20px; height: 25px");
                      }}
                    />
                    <Text
                      text={[`${timeRemainig}`]}
                      size="text-[16px]"
                      fontColor={`text-shadowbox`}
                      fontType="font-normal"
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button
              name="Close"
              onClick={onClose}
              className={"mx-4"}
              backg={"bg-accentprimary"}
            />
            <Button name="Join" onClick={handleJoin} />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ActiveTournament;
