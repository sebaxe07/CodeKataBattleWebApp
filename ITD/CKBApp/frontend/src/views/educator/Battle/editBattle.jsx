import React, { useEffect, useRef, useState, useContext } from "react";
import { Text } from "../../../components/common/text";
import { TextField } from "../../../components/common/textfield";
import Button from "../../../components/common/Button";
import { Application, DatePicker } from "react-rainbow-components";
import { BattleLogo } from "../../../components/utils/TournamentDetails/BattleLogo";
import { ReactSVG } from "react-svg";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import axios from "../../../services/api";
import { LoadingScreen } from "../../../services/LoadingScreen";
import { UserContext } from "../../../services/contexts/UserContext";
import { CompleteBattleCreation } from "../../../views/educator/Battle/completeBattleCreation";
import IconSelector from "../../../components/common/iconSelector";

import Logo from "../../../assets/images/Logo.svg";

import Back from "../../../assets/icons/backArrow.svg";
import CalendarT from "../../../assets/icons/calendar.svg";
import Edit from "../../../assets/icons/edit.svg";
import BgIconCard from "../../../components/common/bgIconCard";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";

export const EditBattle = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [teamMin, setTeamMin] = useState("");
  const [teamMax, setTeamMax] = useState("");
  const [dateStart, setStartDate] = useState(null);
  const [dateEnd, setEndDate] = useState(null);
  const [files, setFile] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [langIco, setLangIco] = useState("python.svg");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const { activeUser, setActiveUser } = useContext(UserContext);
  const [isCreated, setIsCreated] = useState(false);
  const { id, bid } = useParams();
  const [tournament, setTournament] = useState([]);

  const [battles, setBattles] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedIcon, setSelectedIcon] = useState(null);

  const theme = {
    rainbow: {
      palette: {
        brand: "#39B58B",
        mainBackground: "#265F4C",
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

  const handleSelectIcon = async (event) => {};

  useEffect(() => {
    const storedBattles = JSON.parse(localStorage.getItem(`battle${id}`));
    const battleid = Number(bid); // Convert id to number
    setBattles(storedBattles.filter((battle) => battle.id === battleid)[0]);
  }, []);

  useEffect(() => {
    if (battles !== null) {
      setName(battles.name);
      setDescription(battles.description);
      setTeamMin(battles.min_students_per_group);
      setTeamMax(battles.max_students_per_group);
      setStartDate(battles.start_date);
      setEndDate(battles.end_date);
      setLangIco(battles.picture);
      const url = new URL(battles.software_project);
      const fileName = url.pathname.split("/").pop();
      setFile(fileName);
    }
  }, [battles]);

  useEffect(() => {
    console.log(id);
    const storedTournaments = JSON.parse(localStorage.getItem("tournaments"));
    const tournamentId = Number(id); // Convert id to number
    setTournament(
      storedTournaments.filter(
        (tournament) => tournament.id === tournamentId
      )[0]
    );
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const validMimeTypes = [
      "application/zip",
      "application/x-zip-compressed",
      "multipart/x-zip",
      "application/octet-stream",
    ];

    if (!validMimeTypes.includes(file.type)) {
      showToast("Please upload a zip file");
      return;
    }
    setSelectedFile(file);
  };

  useEffect(() => {
    console.log(selectedFile);
    if (selectedFile) {
      setFile(selectedFile.name);
    }
  }, [selectedFile]);

  const handleClickUploadCode = () => {
    // Trigger the file input click event
    fileInputRef.current.click();
  };

  const handleSubmit = async (event) => {
    closeAll();
    event.preventDefault();

    // Check if all fields are valid
    const validName = name !== "";
    const validDescription = description !== "";
    const validDateStart = dateStart !== null;
    const validDateEnd = dateEnd !== null;
    const validTeamMin = teamMin !== "";
    const validTeamMax = teamMax !== "";
    const validTeamSize = Number(teamMin) <= Number(teamMax);
    const validLangIco = langIco !== "";
    const validDate = dateStart < dateEnd;

    // Set error messages if needed
    const conditions = [
      { isValid: validName, message: "Please input a valid name." },
      {
        isValid: validDescription,
        message: "Please input a valid description.",
      },
      { isValid: validDateStart, message: "Please input a valid start date." },
      { isValid: validDateEnd, message: "Please input a valid end date." },
      { isValid: validDate, message: "Please input a valid date range." },

      {
        isValid: validTeamMin,
        message: "Please input a valid minimum team size.",
      },
      {
        isValid: validTeamMax,
        message: "Please input a valid maximum team size.",
      },
      {
        isValid: validTeamSize,
        message:
          "Minimum team size must be less than or equal to maximum team size.",
      },
      { isValid: validLangIco, message: "Please select a language icon." },
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

    const payload = new FormData();
    payload.append("name", name);
    payload.append("description", description);
    payload.append("min_students_per_group", teamMin);
    payload.append("max_students_per_group", teamMax);
    payload.append(
      "start_date",
      new Date(dateStart).toISOString().split(".")[0]
    );
    payload.append("end_date", new Date(dateEnd).toISOString().split(".")[0]);
    payload.append("picture", langIco);
    if (selectedFile) {
      payload.append("software_project", selectedFile);
    }

    console.log(payload);

    setIsLoading(true);

    try {
      const response = await axios.patch(`/tms/battles/${bid}/`, payload, {
        headers: { Authorization: `Token ${activeUser.authToken}` },
        "Content-Type": "multipart/form-data",
      });
      console.log(response.data);

      const storedBattles = JSON.parse(localStorage.getItem(`battle${id}`));
      const battleid = Number(bid); // Convert id to number

      const index = storedBattles.findIndex((battle) => battle.id === battleid);
      if (index !== -1) {
        storedBattles[index] = { ...storedBattles[index], ...response.data };
      }
      localStorage.setItem(`battle${id}`, JSON.stringify(storedBattles));

      toast({
        title: "Battle updated successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate(-1);
    } catch (error) {
      toast({
        title: "Unable to update battle.",
        description: "Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });

      console.error("Error updating battle: ", error);
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

      <div className="flex flex-col  select-none rounded-[36px] bg-accentSecondaryEducator w-[35%] h-[84%] ">
        {/* Header Section */}
        <div className="flex h-[10%] w-[100%] items-center  ">
          <ReactSVG
            src={Back}
            beforeInjection={(svg) => {
              svg.setAttribute("style", "width: 30px; height: 30px");
            }}
            className="cursor-pointer text-accenteducator ml-10"
            onClick={() => {
              navigate(-1);
            }}
          />
          <Text
            text={["EDIT BATTLE"]}
            size="text-[20px] "
            className={"leading-normal  ml-2"}
            fontColor="text-white"
            fontType="font-black"
          />
        </div>
        {/* Body */}
        <div className="flex flex-col relative bg-bgeducator h-[87%] w-[98%] rounded-b-[36px]">
          {/* Logo */}
          <div className="translate-x-32 -translate-y-10">
            <BattleLogo BattleIcon={langIco} size={150} />
            <div className="translate-x-96 translate-y-1/2 cursor-pointer">
              <BgIconCard
                icon={Edit}
                size={45}
                bgColor={"bg-white"}
                onClick={onOpen}
              />
            </div>
          </div>
          {/* Main Content */}
          <div className="flex flex-col justify-center items-center">
            {/* Information Section */}
            <div className="flex flex-col gap-5 items-center">
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
                    "w-[450px] whitespace-pre-wrap h-[50px] p-5 pl-10  items-center bg-shadowboxeducator text-white rounded-[26px]"
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
                    "w-[450px] resize-none h-[210px]  items-center bg-shadowboxeducator text-white rounded-[26px] overflow-auto scrollbar-thin scrollbar-thumb-accentSecondaryEducator scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
                  }
                  placeholder=""
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            {/* Date Selection */}
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
                    minDate={new Date(tournament.start_date)}
                    maxDate={
                      new Date(
                        new Date(tournament.end_date).setDate(
                          new Date(tournament.end_date).getDate() - 1
                        )
                      )
                    }
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
                    maxDate={new Date(tournament.end_date)}
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
            {/* Footer */}
            <div className="flex flex-row  ">
              <div className="flex flex-col items-center  w-full justify-center mr-2">
                <Text
                  text={["Team Size (1-50)"]}
                  size="text-[16px]"
                  fontColor="text-white"
                  className={"text-start"}
                  fontType="font-bold"
                />
                <div className="flex flex-row justify-between gap-1 items-center">
                  <TextField
                    type={"number"}
                    classname={
                      "w-[90px] h-[40px]  bg-shadowboxeducator text-white rounded-[26px] "
                    }
                    placeholder="Min"
                    value={teamMin}
                    onChange={(e) => {
                      if (
                        e.target.value === "" ||
                        (e.target.value >= 1 && e.target.value <= 50)
                      ) {
                        setTeamMin(e.target.value);
                      }
                    }}
                  />
                  <TextField
                    type={"number"}
                    classname={
                      "w-[90px] h-[40px]  bg-shadowboxeducator text-white rounded-[26px]"
                    }
                    placeholder="Max"
                    value={teamMax}
                    onChange={(e) => {
                      if (
                        e.target.value === "" ||
                        (e.target.value >= 1 && e.target.value <= 50)
                      ) {
                        setTeamMax(e.target.value);
                      }
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col  w-full items-center ">
                <Text
                  text={[`File ${files} uploaded.`]}
                  size="text-[16px]"
                  fontColor={"text-white"}
                  className={"text-start "}
                  fontType={"font-bold"}
                />
                <div className="w-[70%] flex-row justify-evenly gap-5 flex items-center">
                  {/* Hidden file input */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                    accept=".zip"
                  />
                  {/* Button to trigger file input */}
                  <Button
                    onClick={handleClickUploadCode}
                    name="Upload Code"
                    backg={"bg-[#BAAFFF]"}
                  />
                  <Button name="Save Changes" onClick={handleSubmit} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size={"xl"}>
        <ModalOverlay />
        <ModalContent borderRadius="36px " bg={"#39b58b"}>
          <ModalHeader />
          <ModalBody>
            <div className="flex flex-col justify-center items-center h-full w-full">
              <IconSelector
                context={" language"}
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
  );
};

export default EditBattle;
