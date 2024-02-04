import React, { useEffect, useRef, useState, useContext } from "react";
import { Text } from "../../../components/common/text";
import { TextField } from "../../../components/common/textfield";
import Button from "../../../components/common/Button";
import { Application, DatePicker } from "react-rainbow-components";
import { TopDecorator } from "../../../components/utils/TournamentDetails/TopDecorator";
import { ReactSVG } from "react-svg";
import Logo from "../../../assets/images/Logo.svg";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import axios from "../../../services/api";
import { LoadingScreen } from "../../../services/LoadingScreen";
import { UserContext } from "../../../services/contexts/UserContext";
import { CompleteTournamentCreation } from "../../../views/educator/Tournament/completeTournamentCreation";

import Back from "../../../assets/icons/backArrow.svg";
import CalendarT from "../../../assets/icons/calendar.svg";
import Edit from "../../../assets/icons/edit.svg";
import BgIconCard from "../../../components/common/bgIconCard";

import IconSelector from "../../../components/common/iconSelector";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";

export const CreateTournament = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dateStart, setStartDate] = useState(
    new Date(new Date().setDate(new Date().getDate() + 1))
  );
  const [dateEnd, setEndDate] = useState(null);
  const [langIco, setLangIco] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const { activeUser, setActiveUser } = useContext(UserContext);
  const [isCreated, setIsCreated] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedIcon, setSelectedIcon] = useState(null);

  const theme = {
    rainbow: {
      palette: {
        brand: "#5c56b6",
        mainBackground: "#332786",
      },
    },
  };

  const showToast = (title) => {
    toast({
      title,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };

  function closeAll() {
    toast.closeAll();
  }

  const handleSubmit = async (event) => {
    closeAll();
    event.preventDefault();

    const validIcon = langIco !== null;
    const validName = name.length > 0;
    const nameLength = name.length < 70;
    const validDescription = description.length > 0;
    const validDateStart = dateStart !== null;
    const validDateEnd = dateEnd !== null;
    const validDate = dateStart < dateEnd;

    // Set error messages if needed
    const conditions = [
      { isValid: validIcon, message: "Please select an icon." },
      { isValid: validName, message: "Please enter a valid name." },
      {
        isValid: nameLength,
        message: "The name is too long (70 characters max).",
      },
      {
        isValid: validDescription,
        message: "Please enter a valid description.",
      },
      { isValid: validDateStart, message: "Please enter a valid start date." },
      { isValid: validDateEnd, message: "Please enter a valid end date." },
      { isValid: validDate, message: "Please enter a valid date range." },
    ];

    conditions.forEach(({ isValid, message }) => {
      if (!isValid) {
        showToast(message);
      }
    });

    // If any of the conditions is not valid, stop the function
    if (!conditions.every(({ isValid }) => isValid)) {
      return;
    }

    const payload = {
      name: name,
      description: description,
      picture: langIco,
      created_by: activeUser.roleid,
      start_date: dateStart,
      end_date: dateEnd,
    };

    console.log(payload);

    setIsLoading(true);

    try {
      const response = await axios.post("/tms/tournaments/", payload, {
        headers: { Authorization: `Token ${activeUser.authToken}` },
      });
      console.log(response.data);

      setIsCreated(true);
    } catch (error) {
      toast({
        title: "Unable to create tournament.",
        description: "Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });

      console.error("Error creating tournament: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const changeIcon = () => {
    setLangIco(selectedIcon);
    onClose();
  };

  return (
    <div className="bg-[#19362D] flex flex-col justify-center items-center  h-screen w-screen">
      {isLoading && <LoadingScreen />}
      <ReactSVG
        src={Logo}
        beforeInjection={(svg) => {
          svg.setAttribute("style", "width: 70px; height: 70px");
        }}
        style={{
          position: "fixed",
          top: 30,
          right: 30,
        }}
      />
      {isCreated ? (
        <CompleteTournamentCreation icon={langIco} />
      ) : (
        <div className="select-none relative rounded-[36px] bg-shadowbox w-[35%] m-10 ml-20 mt-20 h-[100%] flex justify-center">
          <div className="w-full">
            <div className="flex h-[10%] w-[100%] justify-start items-center ml-5">
              <ReactSVG
                src={Back}
                beforeInjection={(svg) => {
                  svg.setAttribute("style", "width: 30px; height: 30px");
                }}
                className="cursor-pointer text-accentprimary"
                onClick={() => {
                  navigate(-1);
                }}
              />
              <Text
                text={["CREATE TOURNAMENT"]}
                size="text-[20px] "
                className={"leading-normal text-start ml-5"}
                fontColor="text-white"
                fontType="font-black"
              />
            </div>
            <div className="flex flex-col translate-y-2 w-[98%] h-[87%] bg-bgprimary rounded-b-[36px]">
              <div className=" justify-center flex items-center translate-x-40 -translate-y-8">
                <TopDecorator LanguageIcon={langIco} size={200} />
                <div
                  className="translate-x-16 translate-y-1/2 cursor-pointer"
                  onClick={console.log("Boton Editar")}
                >
                  <BgIconCard
                    icon={Edit}
                    size={45}
                    bgColor={"bg-white"}
                    onClick={onOpen}
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center mt-10 items-center">
                <div className="flex flex-col mt-5 justify-start gap-5 items-center">
                  <div className="flex flex-col">
                    <Text
                      text={["Name"]}
                      size="text-[16px] "
                      className={"leading-normal text-start ml-5 mb-2"}
                      fontColor="text-white"
                      fontType="font-bold"
                    />
                    <TextField
                      type={"text"}
                      classname={
                        "w-[450px] whitespace-pre-wrap h-[50px] p-5 pl-10  items-center bg-[#332786] text-white rounded-[26px]"
                      }
                      placeholder=""
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <Text
                      text={["Description"]}
                      size="text-[16px] "
                      className={"leading-normal text-start ml-5 mb-2"}
                      fontColor="text-white"
                      fontType="font-bold"
                    />
                    <TextField
                      mode={"area"}
                      type={"text"}
                      classname={
                        "w-[450px] resize-none h-[210px] p-5 pl-10  items-center bg-[#332786] text-white rounded-[26px] overflow-auto  scrollbar-thin scrollbar-thumb-bgprimary scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-track-rounded-full "
                      }
                      placeholder=""
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>
                <Application
                  theme={theme}
                  className=" rainbow-align-content_center"
                >
                  <div className="flex flex-row justify-start pl-10 pr-10 m-5 gap-10 w-[80%] items-center ">
                    <div className="flex flex-col">
                      <Text
                        text={["Start Date"]}
                        size="text-[16px]"
                        className={"text-start ml-5"}
                        fontColor={"text-white"}
                        fontType={"font-bold"}
                      />
                      <DatePicker
                        id="datePicker-19"
                        placeholder={dateStart ? dateStart : "Select date"}
                        value={dateStart}
                        onChange={(dateStart) => setStartDate(dateStart)}
                        minDate={
                          new Date(new Date().setDate(new Date().getDate() + 1))
                        }
                        maxDate={new Date(2025, 11, 31)}
                        icon={
                          <ReactSVG
                            src={CalendarT}
                            beforeInjection={(svg) => {
                              svg.setAttribute(
                                "style",
                                "width: 40px; height: 40px"
                              );
                            }}
                          />
                        }
                      />
                    </div>
                    <div className="flex flex-col">
                      <Text
                        text={["End Date"]}
                        size="text-[16px]"
                        fontColor={"text-white"}
                        className={"text-start ml-5"}
                        fontType={"font-bold"}
                      />
                      <DatePicker
                        id="datePicker-19"
                        placeholder={dateEnd ? dateEnd : "Select date"}
                        value={dateEnd}
                        onChange={(dateEnd) => setEndDate(dateEnd)}
                        minDate={
                          new Date(
                            new Date(dateStart).setDate(
                              new Date(dateStart).getDate() + 1
                            )
                          )
                        }
                        maxDate={new Date(2025, 11, 31)}
                        icon={
                          <ReactSVG
                            src={CalendarT}
                            beforeInjection={(svg) => {
                              svg.setAttribute(
                                "style",
                                "width: 40px; height: 40px"
                              );
                            }}
                          />
                        }
                      />
                    </div>
                  </div>
                </Application>
              </div>
              <div className="flex flex-row gap-10 justify-center h-[20%] w-full items-center">
                <div className="w-[70%] justify-evenly flex items-center">
                  <Button name="Create" onClick={handleSubmit} />
                </div>
              </div>
            </div>
          </div>
          <Modal isOpen={isOpen} onClose={onClose} isCentered size={"xl"}>
            <ModalOverlay />
            <ModalContent borderRadius="36px " bg={"#705bff"}>
              <ModalHeader />
              <ModalBody>
                <div className="flex flex-col justify-center items-center h-full w-full">
                  <IconSelector
                    context={"n icon"}
                    IconSelected={setSelectedIcon}
                  />
                </div>
              </ModalBody>

              <ModalFooter>
                <Button
                  name="Close"
                  onClick={onClose}
                  className={"mx-4"}
                  backg={"bg-accentprimary"}
                />
                <Button name="Select" onClick={changeIcon} />
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default CreateTournament;
