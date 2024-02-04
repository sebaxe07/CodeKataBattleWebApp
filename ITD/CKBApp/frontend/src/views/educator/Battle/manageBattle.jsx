import React, { useEffect, useContext, useState } from "react";
import { ReactSVG } from "react-svg";
import { Text } from "../../../components/common/text";
import Button from "../../../components/common/Button";
import { BattleLogo } from "../../../components/utils/TournamentDetails/BattleLogo";
import { MiniDetails } from "../../../components/utils/TournamentDetails/MiniDetails";
import BgIconCard from "../../../components/common/bgIconCard";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../../services/contexts/UserContext";
import { LoadingScreen } from "../../../services/LoadingScreen";
import { TextField } from "../../../components/common/textfield";
import Logo from "../../../assets/images/Logo.svg";

import Binary from "../../../assets/icons/binaryIcon.svg";
import Back from "../../../assets/icons/backArrow.svg";
import Sensei from "../../../assets/icons/UsersIcons/BearSensei.svg";
import TeamLeaderboard from "../../../components/utils/TournamentDetails/TeamLeaderboard";
import Add from "../../../assets/icons/add.svg";
import axios from "../../../services/api";
import { useToast } from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

export const ManageBattle = () => {
  const [battles, setBattles] = useState([]);
  const navigate = useNavigate();
  const { id, bid } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [scoring, setScoring] = useState([]);
  const [tournament, setTournament] = useState([{ status: "registration" }]);
  const [teamSize, setTeamSize] = useState(0);
  const { activeUser, setActiveUser } = useContext(UserContext);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  useEffect(() => {
    console.log(id);
    const storedTournaments = JSON.parse(localStorage.getItem("tournaments"));
    const tournamentId = Number(id); // Convert id to number
    setTournament(
      storedTournaments.filter(
        (tournament) => tournament.id === tournamentId
      )[0]
    );
    console.log(id);
    const storedBattles = JSON.parse(localStorage.getItem(`battle${id}`));
    const battleid = Number(bid); // Convert id to number
    setBattles(storedBattles.filter((battle) => battle.id === battleid)[0]);
    fechtRanking();
    const intervalId = setInterval(fechtRanking, 5000); // Fetch new data every 5 seconds
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    console.log(battles);
    if (battles.min_students_per_group == battles.max_students_per_group) {
      setTeamSize(battles.min_students_per_group);
    } else {
      setTeamSize(
        battles.min_students_per_group + " - " + battles.max_students_per_group
      );
    }
  }, [battles]);

  const fechtRanking = async () => {
    const battleID = Number(bid);
    try {
      const response = await axios.get(`/ss/ranking/${battleID}/`, {
        headers: { Authorization: `Token ${activeUser.authToken}` },
      });
      console.log(response.data);
      setScoring(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEndBattle = async () => {
    setIsLoading(true);
    try {
      const response = await axios.patch(
        `/tms/battles/end/${bid}/`,
        {},
        {
          headers: { Authorization: `Token ${activeUser.authToken}` },
        }
      );
      console.log(response.data);
      battles.status = "ended";
      battles.end_date = new Date().toLocaleDateString();

      let battle = JSON.parse(localStorage.getItem(`battle${id}`));
      // Find the index of the battle with the matching ID
      const batID = Number(bid);
      let battleIndex = battle.findIndex((b) => b.id === batID);
      // Update the necessary fields
      battle[battleIndex].status = "ended";
      battle[battleIndex].end_date = new Date();
      // Save the updated battle data back to local storage
      localStorage.setItem(`battle${id}`, JSON.stringify(battle));

      onClose();

      toast({
        title: "Battle ended",
        description: "The Battle has ended",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Failed to end Battle:", error);
      toast({
        title: "Failed to end Battle",
        description: "An error occurred while ending the Battle",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleConsolidation = async () => {
    setIsLoading(true);
    try {
      const response = await axios.patch(
        `/tms/battles/consolidate/${bid}/`,
        {},
        {
          headers: { Authorization: `Token ${activeUser.authToken}` },
        }
      );
      console.log(response.data);
      battles.status = "consolidation";
      battles.end_date = new Date().toLocaleDateString();

      let battle = JSON.parse(localStorage.getItem(`battle${id}`));
      // Find the index of the battle with the matching ID
      const batID = Number(bid);
      let battleIndex = battle.findIndex((b) => b.id === batID);
      // Update the necessary fields
      battle[battleIndex].status = "consolidation";
      battle[battleIndex].end_date = new Date();
      // Save the updated battle data back to local storage
      localStorage.setItem(`battle${id}`, JSON.stringify(battle));

      onClose();
      toast({
        title: "Battle consolidated",
        description:
          "The Battle has been consolidated, proceed with manual scoring if necessary",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Failed to consolidate Battle:", error);
      toast({
        title: "Failed to consolidate Battle",
        description: "An error occurred while consolidating the Battle",
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
        `/tms/battles/start/${bid}/`,
        {},
        {
          headers: { Authorization: `Token ${activeUser.authToken}` },
        }
      );
      console.log(response.data);

      const runBattle = await axios.post(
        `/tgms/battles/start/${bid}/`,
        {},
        {
          headers: { Authorization: `Token ${activeUser.authToken}` },
        }
      );
      console.log(runBattle.data);

      battles.start_date = new Date().toLocaleDateString();
      battles.status = "active";

      let battle = JSON.parse(localStorage.getItem(`battle${id}`));

      // Find the index of the tournament with the matching ID
      const batID = Number(bid);
      let battleIndex = battle.findIndex((b) => b.id === batID);

      // Update the necessary fields
      battle[battleIndex].start_date = new Date();
      battle[battleIndex].status = "active";

      // Save the updated tournaments data back to local storage
      localStorage.setItem(`battle${id}`, JSON.stringify(battle));

      toast({
        title: "Battle started",
        description: "The Battle has started, emails have been sent",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Failed to start Battle:", error);
      toast({
        title: "Failed to start Battle",
        description: "An error occurred while starting the Battle",
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
      <AlertDialog
        borderRadius="36px "
        bg={"#39b58b"}
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Start Battle Consolidation?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to consolidate the battle? This action is will
            end the battle and start the consolidation process. Then you will be
            able to manually score the teams by clicking on the team in the
            leaderboard.
          </AlertDialogBody>
          <AlertDialogFooter className="gap-2">
            <Button ref={cancelRef} onClick={onClose} name={"No"} />
            <Button
              colorScheme="red"
              ml={3}
              onClick={handleConsolidation}
              name={"Yes"}
            />
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="select-none relative rounded-[36px] bg-accentSecondaryEducator w-[1500px] m-10 ml-20 mt-20 h-[85%] max-h-[85%]  flex justify-start">
        <div className="flex flex-col h-[98%] w-[99%]">
          <div className="flex rounded-t-[36px] h-[10%]  w-full justify-between items-center">
            <div className="flex flex-row items-center ml-10">
              <ReactSVG
                src={Back}
                beforeInjection={(svg) => {
                  svg.setAttribute("style", "width: 30px; height: 30px");
                }}
                className="cursor-pointer text-accenteducator"
                onClick={() => {
                  navigate(-1);
                }}
              />
              <Text
                text={["MANAGE BATTLE"]}
                size="text-[20px] "
                className={"leading-normal text-start ml-5"}
                fontColor="text-white"
                fontType="font-black"
              />
            </div>
          </div>
          <div className="flex h-full rounded-[36px] w-full flex-row ">
            {/* Lado Izquierdo */}
            <div className="flex flex-col h-full  w-full  bg-bgeducator rounded-bl-[36px]">
              <div className="flex flex-row  -space-y-1 mt-20  items-center justify-evenly h-full w-full ">
                <BattleLogo
                  BattleIcon={battles.picture}
                  size={150}
                  shouldTranslate={false}
                />
                <div className="flex flex-col justify-evenly h-full -space-y-2">
                  <MiniDetails
                    context={"b"}
                    title={"Started"}
                    icon={"Calendar"}
                    msg={new Date(battles.start_date).toLocaleDateString()}
                  />
                  <MiniDetails
                    context={"b"}
                    title={"Ends"}
                    icon={"Calendar"}
                    msg={new Date(battles.end_date).toLocaleDateString()}
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
                <div className="flex w-[80%] h-[15%] rounded-[26px] p-5  mb-3 justify-between items-center bg-accentSecondaryEducator">
                  <Text
                    text={[battles.name]}
                    size="text-[16px] "
                    className={"leading-normal text-start"}
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
                <div className="flex w-[80%] h-[157px] rounded-[26px]  p-5 justify-between items-center bg-accentSecondaryEducator">
                  <div className="overflow-auto h-[150px] mt-1 w-full scrollbar-thin scrollbar-thumb-shadowboxeducator scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-track-rounded-full ">
                    <Text
                      text={[battles.description]}
                      size="text-[16px] "
                      className={"leading-normal text-start"}
                      fontColor="text-white"
                      fontType="font-normal"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center h-full w-full  ">
                {battles.status === "registration" && (
                  <div>
                    <Button
                      name="Edit Battle"
                      onClick={() => {
                        navigate("edit");
                      }}
                      className={"mr-5"}
                    />
                    {tournament.status === "active" && (
                      <Button name="Early start" onClick={handleEarlyStart} />
                    )}
                  </div>
                )}
                {battles.status === "active" && (
                  <div>
                    <Button name="Consolidate battle" onClick={onOpen} />
                  </div>
                )}
                {battles.status === "consolidation" && (
                  <div>
                    <Button name="End Battle" onClick={handleEndBattle} />
                  </div>
                )}
                <div className="flex flex-row gap-3 items-center justify-center">
                  <Text
                    text={["Team Size"]}
                    size="text-[16px]"
                    fontColor="text-white"
                    className={"text-start ml-20"}
                    fontType="font-bold"
                  />
                  <div
                    className={`flex justify-center space-x-2 items-center rounded-[40px] bg-accentSecondaryEducator px-6 w-auto h-[34px]`}
                  >
                    <Text
                      text={[teamSize]}
                      size="text-[16px]"
                      fontColor={"text-white"}
                      fontType={"text-bold"}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Lado Derecho */}
            <div className="flex flex-col h-full w-full justify-center rounded-br-[36px] bg-[#2F8F6F]">
              <div className="flex flex-col basis-1/6 h-full w-full justify-around items-center ">
                <div className="flex  h-full w-full items-center ">
                  <Text
                    text={["Leaderboard"]}
                    size="text-[20px]"
                    fontColor="text-white"
                    className={"text-start ml-20"}
                    fontType="font-black"
                  />
                </div>
                <div className="flex flex-row h-full w-full justify-around items-center ">
                  <Text
                    text={["#"]}
                    size="text-[16px]"
                    fontColor="text-white"
                    className={"text-start"}
                    fontType="font-bold"
                  />
                  <Text
                    text={["Seito"]}
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
              <div className="flex flex-col h-full w-full rounded-br-[36px]  ">
                {battles.status !== "registration" ? (
                  <div className="overflow-hidden rounded-br-[36px] fadeScroll h-full w-full">
                    <div
                      className="flex flex-col h-full overflow-auto scrollbar-thin scrollbar-thumb-shadowboxeducator scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
                      style={{
                        maxHeight: "600px",
                        minHeight: "300px",
                        paddingBottom: "20px",
                      }}
                    >
                      {scoring.map((team, index) => (
                        <TeamLeaderboard
                          context={"b"}
                          rank={index + 1}
                          icon={"swords.svg"}
                          name={team.team.name}
                          exp={team.total_score}
                          team={team}
                          battle={battles}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col justify-center items-center w-full h-full">
                    <Text
                      text={["Battle yet to start"]}
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
  );
};

export default ManageBattle;
