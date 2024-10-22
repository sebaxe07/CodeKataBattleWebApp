import React, { useEffect, useState, useContext } from "react";
import { ReactSVG } from "react-svg";
import { useParams } from "react-router-dom";
import { Text } from "../../../components/common/text";
import Button from "../../../components/common/Button";
import { TopDecorator } from "../../../components/utils/TournamentDetails/TopDecorator";
import { MiniDetails } from "../../../components/utils/TournamentDetails/MiniDetails";
import BgIconCard from "../../../components/common/bgIconCard";
import Logo from "../../../assets/images/Logo.svg";
import axios from "../../../services/api";
import { UserContext } from "../../../services/contexts/UserContext";

import CreatedBattle from "../../../components/utils/TournamentDetails/CreatedBattle";

import Back from "../../../assets/icons/backArrow.svg";
import Add from "../../../assets/icons/add.svg";
import { TextField } from "../../../components/common/textfield";
import { useNavigate } from "react-router-dom";
import { LoadingScreen } from "../../../services/LoadingScreen";
import RefreshG from "../../../assets/icons/refreshB.svg";
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
import TeamLeaderboardEducator from "../../../components/utils/TournamentDetails/TeamLeaderboardEducator";

export const ManageTournament = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const [tournament, setTournament] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [invitedTournaments, setInvitedTournaments] = useState([]);
  const [battles, setBattles] = useState([]);
  const [tournamentScores, setTournamentScores] = useState([]);
  const toast = useToast();
  const { activeUser, setActiveUser } = useContext(UserContext);

  useEffect(() => {
    // console.log(id);
    const storedTournaments = JSON.parse(localStorage.getItem("tournaments"));
    const tournamentId = Number(id); // Convert id to number

    const storedInvitedTournaments = JSON.parse(
      localStorage.getItem("invitedTournaments")
    );

    const tournament =
      storedTournaments.find((t) => t.id === tournamentId) ||
      storedInvitedTournaments.find((t) => t.id === tournamentId);

    if (tournament) {
      setTournament(tournament);
    } else {
      console.error(
        `Tournament with ID ${tournamentId} not found in storedTournaments or storedInvitedTournaments`
      );
    }

    const storedBattles = JSON.parse(localStorage.getItem(`battle${id}`));
    const storedTournamentScores = JSON.parse(
      localStorage.getItem(`tournamentScores${id}`)
    );
    if (storedBattles && storedTournamentScores) {
      setBattles(storedBattles);
      setTournamentScores(storedTournamentScores);
    } else {
      fetchBattles();
    }

    const intervalId = setInterval(backgroundfetch, 5000); // Fetch new data every minute
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // console.log("tournament", tournament);
  }, [tournament]);

  useEffect(() => {
    // console.log(battles);
  }, [battles]);

  const fetchBattles = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `/tms/battles/user/${activeUser.roleid}/${id}`,
        {
          headers: { Authorization: `Token ${activeUser.authToken}` },
        }
      );

      // Save battles
      localStorage.setItem(`battle${id}`, JSON.stringify(response.data));

      setBattles(response.data);
      // console.log(response.data);

      const scoreTournamentResponse = await axios.get(
        `/ss/ranking/tournament/${id}/`,
        {
          headers: { Authorization: `Token ${activeUser.authToken}` },
        }
      );

      // console.log(scoreTournamentResponse.data);
      setTournamentScores(scoreTournamentResponse.data);
      localStorage.setItem(
        `tournamentScores${id}`,
        JSON.stringify(scoreTournamentResponse.data)
      );
    } catch (error) {
      console.error("Failed to fetch battles:", error);
    } finally {
      setIsLoading(false);
      setIsSpinning(false);
    }
  };

  const backgroundfetch = async () => {
    try {
      const response = await axios.get(
        `/tms/battles/user/${activeUser.roleid}/${id}`,
        {
          headers: { Authorization: `Token ${activeUser.authToken}` },
        }
      );

      // Save battles
      localStorage.setItem(`battle${id}`, JSON.stringify(response.data));

      setBattles(response.data);
      // console.log(response.data);

      const scoreTournamentResponse = await axios.get(
        `/ss/ranking/tournament/${id}/`,
        {
          headers: { Authorization: `Token ${activeUser.authToken}` },
        }
      );

      // console.log(scoreTournamentResponse.data);
      setTournamentScores(scoreTournamentResponse.data);
      localStorage.setItem(
        `tournamentScores${id}`,
        JSON.stringify(scoreTournamentResponse.data)
      );
    } catch (error) {
      console.error("Failed to fetch battles:", error);
    }
  };

  const refresh = () => {
    fetchBattles();
  };

  const handleTournamentEnd = async () => {
    setIsLoading(true);
    try {
      const response = await axios.patch(
        `/tms/tournaments/end/${id}/`,
        {},
        {
          headers: { Authorization: `Token ${activeUser.authToken}` },
        }
      );
      // console.log(response.data);

      tournament.end_date = new Date();
      tournament.status = "completed";
      // Get the current tournaments data from local storage
      let tournaments = JSON.parse(localStorage.getItem("tournaments"));

      // Find the index of the tournament with the matching ID
      const tourID = Number(id);
      let tournamentIndex = tournaments.findIndex((t) => t.id === tourID);

      // Update the necessary fields
      tournaments[tournamentIndex].end_date = new Date();
      tournaments[tournamentIndex].status = "completed";

      // Save the updated tournaments data back to local storage
      localStorage.setItem("tournaments", JSON.stringify(tournaments));

      toast({
        title: "Tournament ended",
        description: "The tournament has ended",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Failed to end tournament:", error);
      toast({
        title: "Failed to end tournament",
        description: "An error occurred while ending the tournament",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEarlyStart = async () => {
    setIsLoading(true);
    try {
      const response = await axios.patch(
        `/tms/tournaments/start/${id}/`,
        {},
        {
          headers: { Authorization: `Token ${activeUser.authToken}` },
        }
      );
      // console.log(response.data);

      tournament.start_date = new Date();
      tournament.status = "active";
      // Get the current tournaments data from local storage
      let tournaments = JSON.parse(localStorage.getItem("tournaments"));

      // Find the index of the tournament with the matching ID
      const tourID = Number(id);
      let tournamentIndex = tournaments.findIndex((t) => t.id === tourID);

      // Update the necessary fields
      tournaments[tournamentIndex].start_date = new Date();
      tournaments[tournamentIndex].status = "active";

      // Save the updated tournaments data back to local storage
      localStorage.setItem("tournaments", JSON.stringify(tournaments));

      toast({
        title: "Tournament started",
        description: "The tournament has started",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Failed to start tournament:", error);
      toast({
        title: "Failed to start tournament",
        description: "An error occurred while starting the tournament",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#19362D] flex flex-col justify-center items-center  h-screen w-screen">
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
      {isLoading && <LoadingScreen />}
      <div className="select-none relative rounded-[36px] bg-shadowbox w-[1500px] m-10 ml-20 mt-20 h-[85%] max-h-[85%]  flex justify-start">
        <div className="flex flex-col h-[98%] w-[99%]">
          <div className="flex rounded-t-[36px] h-[10%]  w-full justify-between items-center">
            <div className="flex flex-row items-center ml-10">
              <ReactSVG
                src={Back}
                beforeInjection={(svg) => {
                  svg.setAttribute("style", "width: 30px; height: 30px");
                }}
                className="cursor-pointer text-accentprimary"
                onClick={() => {
                  navigate("/educator/home");
                }}
              />
              <Text
                text={["MANAGE TOURNAMENT"]}
                size="text-[20px] "
                className={"leading-normal text-start ml-5"}
                fontColor="text-white"
                fontType="font-black"
              />
            </div>
            <div className="flex gap-5 flex-row  items-center justify-center mr-10">
              <Text
                text={[
                  "Invited senseis: " +
                    (tournament?.invited_Educators?.length || 0),
                ]}
                size="text-[20px] "
                className={"leading-normal text-start ml-5"}
                fontColor="text-white"
                fontType="font-bold"
              />
            </div>
          </div>
          <div className="flex h-full rounded-[36px] w-full flex-row">
            {/* Lado Izquierdo */}
            <div className="flex flex-col h-full rounded-bl-[36px] w-[50%] justify-center items-center bg-bgprimary">
              <div className="flex flex-row  -space-y-1  items-center justify-evenly h-full w-full ">
                <TopDecorator
                  LanguageIcon={tournament.picture}
                  size={220}
                  shouldTranslate={false}
                />
                <div className="flex flex-col justify-evenly h-full -space-y-16">
                  <MiniDetails
                    context={""}
                    title={"Started"}
                    icon={"Calendar"}
                    msg={new Date(tournament.start_date).toLocaleDateString()}
                  />
                  <MiniDetails
                    context={""}
                    title={"Ends"}
                    icon={"Calendar"}
                    msg={new Date(tournament.end_date).toLocaleDateString()}
                  />
                </div>
              </div>
              <div className="flex  flex-col w-full h-full items-center  justify-center  ">
                <div className="flex justify-start w-[80%]  items-center ">
                  <Text
                    text={["Name"]}
                    size="text-[16px] "
                    className={"leading-normal text-start ml-5"}
                    fontColor="text-white"
                    fontType="font-bold"
                  />
                </div>
                <div className="flex w-[80%] h-[15%] rounded-[26px] p-5 pl-10  mb-8 justify-between items-center bg-shadowbox">
                  <Text
                    text={[tournament.name]}
                    size="text-[16px] "
                    className={
                      "leading-normal text-start whitespace-nowrap overflow-hidden overflow-ellipsis"
                    }
                    fontColor="text-white"
                    fontType="font-bold"
                  />
                </div>
                <div className="flex justify-start w-[80%]  items-center ">
                  <Text
                    text={["Description"]}
                    size="text-[16px] "
                    className={"leading-normal text-start ml-5"}
                    fontColor="text-white"
                    fontType="font-bold"
                  />
                </div>
                <div className="flex w-[80%] h-[157px] rounded-[26px]  pl-10 justify-between items-center bg-shadowbox">
                  <div className="overflow-auto h-[150px] mt-1 w-full scrollbar-thin scrollbar-thumb-bgaccent scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-track-rounded-full ">
                    <Text
                      text={[tournament.description]}
                      size="text-[16px] "
                      className={"leading-normal text-start mr-5"}
                      fontColor="text-white"
                      fontType="font-normal"
                    />
                  </div>
                </div>
              </div>
              {tournament.status === "registration" ? (
                <div className="flex justify-center items-center w-full h-full gap-5">
                  <Button
                    name="Edit Tournament"
                    onClick={() => {
                      navigate("edit");
                    }}
                  />
                  <Button name="Early start" onClick={handleEarlyStart} />
                </div>
              ) : null}
              {tournament.status === "active" &&
              battles.every((battle) => battle.status === "completed") ? (
                <div className="flex justify-center items-center w-full h-full gap-5">
                  <Button name="End tournament" onClick={handleTournamentEnd} />
                </div>
              ) : null}
            </div>
            {/* Lado Derecho */}
            <div className="flex flex-col h-full rounded-br-[36px] w-[50%]  bg-[#413e97]">
              {/* Created Battles */}
              <div className="flex flex-col w-full h-full justify-center basis-2/4	 ">
                <Text
                  text={["Created Battles"]}
                  size="text-[20px] "
                  className={"leading-normal text-start  ml-5"}
                  fontColor="text-white"
                  fontType="font-black"
                />
                <div className="fadeScroll2">
                  <div
                    className="overflow-auto flex flex-col items-center scrollbar-thin scrollbar-thumb-bgaccent scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
                    style={{ maxHeight: "200px", minHeight: "200px" }}
                  >
                    {battles.length > 0 ? (
                      battles.map((battle) => (
                        <CreatedBattle
                          key={battle.id}
                          bid={battle.id}
                          name={battle.name}
                          state={battle.status}
                          icon={"swords.svg"}
                        />
                      ))
                    ) : (
                      <div className="flex flex-col justify-center items-center w-full h-full  mt-10">
                        <Text
                          text={["You have not created any battles yet"]}
                          size="text-[32px]"
                          fontColor="text-white"
                          className={"text-start"}
                          fontType="font-bold"
                        />
                        <Text
                          text={["Create one now!"]}
                          size="text-[24px]"
                          fontColor="text-white"
                          className={"text-start"}
                          fontType="font-bold"
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="ml-16 my-5 flex flex-row   justify-around ">
                  <ReactSVG
                    src={Add}
                    beforeInjection={(svg) => {
                      svg.setAttribute("style", "width: 25px; height: 25px");
                    }}
                    className="cursor-pointer text-accentprimary"
                    onClick={() =>
                      navigate(`/educator/tournament/${id}/battle/create`)
                    }
                  />
                  <ReactSVG
                    src={RefreshG}
                    beforeInjection={(svg) => {
                      svg.setAttribute("style", "width: 25px; height: 25px");
                    }}
                    className={`cursor-pointer ${isSpinning ? "spin" : ""}`}
                    onClick={() => {
                      setIsSpinning(true);
                      refresh();
                    }}
                  />
                </div>
              </div>
              {/* LeaderBoard  */}
              <div className="flex basis-2/4 flex-col w-full h-full justify-center  ">
                {/* Leaderboard Header */}
                <div className="flex justify-around h-full  items-center w-full flex-col ">
                  <div className="flex justify-around items-center h-full w-full ">
                    <Text
                      text={["Leaderboard"]}
                      size="text-[20px]"
                      fontColor="text-white"
                      className={"text-start "}
                      fontType="font-black"
                    />
                    <div
                      className={`flex justify-center items-center rounded-[40px] bg-bgprimary p-4  w-auto h-[34px]`}
                    >
                      <Text
                        text={["Seito Suscribed:"]}
                        size="text-[16px]"
                        fontColor="text-white"
                        className={"text-start mr-5"}
                        fontType="font-bold"
                      />

                      <Text
                        text={[
                          tournament && tournament.subscribed_Students
                            ? tournament.subscribed_Students.length
                            : 0,
                        ]}
                        size="text-[16px]"
                        fontColor={"text-white"}
                        fontType={"text-bold"}
                      />
                    </div>
                  </div>
                  <div className="flex flex-row justify-around h-full w-full ">
                    <Text
                      text={["#"]}
                      size="text-[16px]"
                      fontColor="text-white"
                      className={"text-start"}
                      fontType="font-bold"
                    />
                    <Text
                      text={["Name"]}
                      size="text-[16px]"
                      fontColor="text-white"
                      className={"text-start"}
                      fontType="font-bold"
                    />
                    <Text
                      text={["XP"]}
                      size="text-[16px]"
                      fontColor="text-white"
                      className={"text-start"}
                      fontType="font-bold"
                    />
                  </div>
                </div>
                {/* Leaderboard Information */}
                <div className="flex flex-col h-full w-full rounded-br-[36px] ">
                  {tournament.status === "registration" ? (
                    <div className="flex flex-col justify-start items-center w-full h-full">
                      <Text
                        text={["Tournament yet to start"]}
                        size="text-[32px]"
                        fontColor="text-white"
                        className={"text-start"}
                        fontType="font-bold"
                      />
                      <Text
                        text={["No scores for teams available"]}
                        size="text-[24px]"
                        fontColor="text-white"
                        className={"text-start"}
                        fontType="font-bold"
                      />
                    </div>
                  ) : tournamentScores.length > 0 ? (
                    <div className="overflow-hidden rounded-br-[36px] fadeScroll1">
                      <div
                        className="overflow-auto flex flex-col items-center scrollbar-thin scrollbar-thumb-bgaccent scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
                        style={{
                          maxHeight: "300px",
                          minHeight: "300px",
                          paddingBottom: "20px",
                        }}
                      >
                        {tournamentScores.map((score, index) => (
                          <TeamLeaderboardEducator
                            key={score.id}
                            rank={index + 1}
                            icon={score.student.user_profile.profile_icon}
                            name={score.student.user_profile.user.first_name}
                            exp={score.total_score}
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col justify-start items-center w-full h-full">
                      <Text
                        text={["Battles yet to start"]}
                        size="text-[32px]"
                        fontColor="text-white"
                        className={"text-start"}
                        fontType="font-bold"
                      />
                      <Text
                        text={["No scores for teams available"]}
                        size="text-[24px]"
                        fontColor="text-white"
                        className={"text-start"}
                        fontType="font-bold"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageTournament;
