import React, { useEffect, useRef, useState, useContext } from "react";
import { Text } from "../../../components/common/text";
import { TextField } from "../../../components/common/textfield";
import Button from "../../../components/common/Button";
import { Application, DatePicker } from "react-rainbow-components";
import { TopDecorator } from "../../../components/utils/TournamentDetails/TopDecorator";
import { ReactSVG } from "react-svg";
import Logo from "../../../assets/images/Logo.svg";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import axios from "../../../services/api";
import { LoadingScreen } from "../../../services/LoadingScreen";
import { UserContext } from "../../../services/contexts/UserContext";

import Back from "../../../assets/icons/backArrow.svg";
import CalendarT from "../../../assets/icons/calendar.svg";
import Edit from "../../../assets/icons/edit.svg";
import BgIconCard from "../../../components/common/bgIconCard";

export const EditTournament = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dateStart, setStartDate] = useState(null);
  const [dateEnd, setEndDate] = useState(null);
  const [langIco, setLangIco] = useState("python.svg");
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const [tournament, setTournament] = useState([]);
  const { activeUser, setActiveUser } = useContext(UserContext);
  const [battles, setBattles] = useState([]);

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

  useEffect(() => {
    const storedTournaments = JSON.parse(localStorage.getItem("tournaments"));
    const tournamentId = Number(id); // Convert id to number
    setTournament(
      storedTournaments.filter(
        (tournament) => tournament.id === tournamentId
      )[0]
    );
    const storedBattles = JSON.parse(localStorage.getItem(`battle${id}`));
    setBattles(storedBattles);
  }, []);

  useEffect(() => {
    setName(tournament.name);
    setDescription(tournament.description);
    setStartDate(tournament.start_date);
    setEndDate(tournament.end_date);
    setLangIco(tournament.picture);
  }, [tournament]);

  const handleSubmit = async (event) => {
    closeAll();
    event.preventDefault();

    const validName = name.length > 0;
    const validDescription = description.length > 0;
    const validDateStart = dateStart !== null;
    const validDateEnd = dateEnd !== null;
    const validDate = new Date(dateStart) < new Date(dateEnd);

    console.log("Valid Date: ", dateStart);
    console.log("Valid Date: ", dateEnd);
    console.log("Valid Date: ", validDate);

    // Set error messages if needed
    const conditions = [
      { isValid: validName, message: "Please enter a valid name." },
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

    for (let battle of battles) {
      const battleStartDate = new Date(battle.start_date);
      const battleEndDate = new Date(battle.end_date);
      if (
        battleStartDate < dateStart ||
        battleStartDate > dateEnd ||
        battleEndDate < dateStart ||
        battleEndDate > dateEnd
      ) {
        showToast(
          "Cannot change tournament date. A battle's date falls outside the new range."
        );
        return;
      }
    }

    const payload = {
      name: name,
      description: description,
      picture: langIco,
      start_date: dateStart,
      end_date: dateEnd,
    };

    setIsLoading(true);

    try {
      const response = await axios.patch(`/tms/tournaments/${id}/`, payload, {
        headers: { Authorization: `Token ${activeUser.authToken}` },
      });

      const storedTournaments = JSON.parse(localStorage.getItem("tournaments"));
      const tournamentId = Number(id); // Convert id to number
      const index = storedTournaments.findIndex(
        (tournament) => tournament.id === tournamentId
      );
      if (index !== -1) {
        storedTournaments[index] = { ...storedTournaments[index], ...payload };
        console.log("Tournament updated in local storage.");
      }
      localStorage.setItem("tournaments", JSON.stringify(storedTournaments));

      toast({
        title: "Tournament updated successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate(-1);
    } catch (error) {
      toast({
        title: "Unable to update tournament.",
        description: "Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });

      console.error("Error updating tournament: ", error);
    } finally {
      setIsLoading(false);
    }
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
              text={["EDIT TOURNAMENT"]}
              size="text-[20px] "
              className={"leading-normal text-start ml-5"}
              fontColor="text-white"
              fontType="font-black"
            />
          </div>
          <div className="flex flex-col translate-y-2 w-[98%] h-[87%] bg-bgprimary rounded-b-[36px]">
            <div className=" justify-center flex items-center translate-x-40 -translate-y-8">
              <TopDecorator LanguageIcon={langIco} size={200} />
              <div className="translate-x-16 translate-y-1/2 cursor-pointer">
                <BgIconCard icon={Edit} size={45} bgColor={"bg-white"} />
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
                      minDate={
                        new Date(new Date().setDate(new Date().getDate() + 1))
                      }
                      maxDate={new Date(2025, 11, 31)}
                      onChange={(dateStart) => setStartDate(dateStart)}
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
                      minDate={
                        new Date(
                          new Date(dateStart).setDate(
                            new Date(dateStart).getDate() + 1
                          )
                        )
                      }
                      maxDate={new Date(2025, 11, 31)}
                      onChange={(dateEnd) => setEndDate(dateEnd)}
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
                <Button name="Confirm Changes" onClick={handleSubmit} />
              </div>
            </div>
          </div>
        </div>
      </div>
      s{" "}
    </div>
  );
};

export default EditTournament;
