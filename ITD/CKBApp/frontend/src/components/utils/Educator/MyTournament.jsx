import React, { useState, useEffect } from "react";
import IconCard from "../../common/iconCard";
import { Text } from "../../common/text";
import Calendar from "../../../assets/icons/calendarD.svg";
import Calendar2 from "../../../assets/icons/calendarC.svg";
import { ReactSVG } from "react-svg";
import { Button } from "../../common/Button";
import { TextField } from "../../common/textfield";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

const colorSchemes = [
  {
    background: "bg-white",
    text: "text-bgsecondaryeducator",
    label: "text-bgsecondaryeducator",
    icon: "bg-accentsecondary",
  },
  {
    background: "bg-accentSecondaryEducator",
    text: "text-accenteducator",
    label: "text-accenteducator",
    icon: "bg-accentprimary",
  },
];

export const MyTournament = ({
  name,
  description,
  startDate,
  endDate,
  active,
}) => {
  const [colorScheme, setColorScheme] = useState(colorSchemes[0]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [email, setEmail] = useState("");

  useEffect(() => {
    setColorScheme(colorSchemes[active ? 0 : 1]);
  }, [active]);

  return (
    <div
      className="relative flex items-center justify-center my-[13px] "
      style={{ userSelect: "none" }}
    >
      <div
        className={`relative ${colorScheme.background} hover:ring-4 hover:ring-shadowbox w-[50%] min-w-[941px] min-h-[140px] rounded-[29px] shadow-xl transition-all`}
      >
        <IconCard
          background={colorScheme.icon}
          shadow="bg-shadowboxeducator"
          size={150}
        />
        <div className="flex flex-row justify-between items-center   min-h-[140px] ml-[140px] mr-[200px]">
          <div className="flex flex-col justify-center items-start w-[397px] my-2  grow -space-y-2">
            <Text
              text={[`${name}`]}
              size="text-[25px]"
              fontColor={`${colorScheme.text}`}
              fontType="font-bold"
            />
            <Text
              text={[`${description}`]}
              size="text-[19px]"
              fontColor={`${colorScheme.label}`}
              fontType="font-normal"
              className="text-start leading-tight overflow-y-scroll  scrollbar scrollbar-hide"
            />
          </div>

          {active && (
            <>
              <div className="flex flex-col justify-center items-center gap-3">
                <div className="flex flex-row justify-center items-center gap-3">
                  <ReactSVG
                    src={Calendar}
                    beforeInjection={(svg) => {
                      svg.setAttribute("style", "width: 40px; height: 40px");
                    }}
                    className="text-bgeducator"
                  />
                  <div className="flex flex-col items-start -space-y-4">
                    <Text
                      text={["Starts"]}
                      size="text-[16px]"
                      fontColor={`text-[#182338]`}
                      fontType="font-bold"
                    />
                    <Text
                      text={[`${startDate}`]}
                      size="text-[16px]"
                      fontColor={`text-bgeducator`}
                      fontType="font-bold"
                    />
                  </div>
                </div>

                <div className="flex flex-row justify-center items-center gap-3">
                  <ReactSVG
                    src={Calendar2}
                    beforeInjection={(svg) => {
                      svg.setAttribute("style", "width: 40px; height: 40px");
                    }}
                    className="text-shadowboxeducator"
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
                      size="text-[16px]"
                      fontColor={`text-shadowboxeducator`}
                      fontType="font-bold"
                    />
                  </div>
                </div>
              </div>

              <div className="absolute  flex flex-col justify-center items-center gap-3 ml-4 right-5">
                <Button name="View" className={"min-w-[137px]"} />
                <Button
                  name="Inivte"
                  className={"min-w-[137px]"}
                  onClick={onOpen}
                />
              </div>
            </>
          )}
          {!active && (
            <div className="absolute  flex flex-col justify-center items-center ml-4 right-5">
              <Button name="View" className={"min-w-[137px]"} />
            </div>
          )}
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent borderRadius="36px">
          <ModalHeader>Invite Educators</ModalHeader>
          <ModalBody>
            <TextField
              type={"text"}
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              name="Close"
              onClick={onClose}
              className={"mx-4"}
              backg={"bg-accentprimary"}
            />
            <Button name="Invite" />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default MyTournament;
