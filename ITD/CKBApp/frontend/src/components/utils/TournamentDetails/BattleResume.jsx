import React, { useState, useContext, useEffect } from "react";
import axios from "../../../services/api";
import { Text } from "../../common/text";
import Button from "../../common/Button";
import { EducatorName } from "./../TournamentDetails/EducatorName";
import { TopDecorator } from "./../TournamentDetails/TopDecorator";
import { BattleLogo } from "./../TournamentDetails/BattleLogo";
import { MiniDetails } from "../TournamentDetails/MiniDetails";
import Back from "../../../assets/icons/backArrow.svg";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import TextField from "../../common/textfield";
import { TeamList } from "../../utils/TournamentDetails/teamList";
import { useNavigate } from "react-router-dom";
import { LoadingScreen } from "../../../services/LoadingScreen";
import { UserContext } from "../../../services/contexts/UserContext";
import { useToast } from "@chakra-ui/react";
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

export const BattleResume = ({ onBackClick, selectedBattle, tourData }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [teamName, setTeamName] = useState("");
  const [teamCode, setTeamCode] = useState("");
  const [tabIndex, setTabIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(0);
  const firstName =
    selectedBattle.created_by.user_profile.user.first_name.split(" ")[0];
  const navigate = useNavigate();
  const { activeUser } = useContext(UserContext);
  const toast = useToast();
  const [newCode, setNewCode] = useState("AAA000");
  const [publicTeams, setPublicTeams] = useState([]);

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
    if (step === 2) {
      fetchTeams();
    }
  }, [step]);

  const fetchTeams = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `/tgms/teams/battle/public/${selectedBattle.id}`,
        {
          headers: { Authorization: `Token ${activeUser.authToken}` },
        }
      );
      console.log(response.data);
      setPublicTeams(response.data);
    } catch (error) {
      console.error(error);
      showToast("Error fetching teams");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTeam = async (event) => {
    closeAll();
    event.preventDefault();

    // Validate team name
    if (teamName === "") {
      showToast("Please enter a team name");
      return;
    }

    const payload = {
      name: teamName,
      members: [activeUser.roleid],
      is_private: tabIndex === 1,
      battle: selectedBattle.id,
    };

    setIsLoading(true);

    try {
      const response = await axios.post("/tgms/teams/", payload, {
        headers: { Authorization: `Token ${activeUser.authToken}` },
      });
      console.log(response.data);

      localStorage.setItem(
        `teamBattle${selectedBattle.id}`,
        JSON.stringify(response.data)
      );
      setNewCode(response.data.code);
      setStep(3);
    } catch (error) {
      console.error(error);
      showToast("Error creating team");
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinTeam = (teamCode) => {
    setTeamCode(teamCode);
    handleJoinTeamCode();
  };

  const handleJoinTeamCode = async () => {
    closeAll();
    if (teamCode === "") {
      showToast("Please enter a team code");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        `/tgms/teams/join/${teamCode}/${activeUser.roleid}/${selectedBattle.id}/`,
        {},
        {
          headers: { Authorization: `Token ${activeUser.authToken}` },
        }
      );
      console.log(response.data);
      navigate(`/student/battle/${selectedBattle.id}`);
    } catch (error) {
      console.error(error);
      let errorMessage = "An error occurred";
      if (error.response && error.response.data && error.response.data.error) {
        errorMessage = error.response.data.error;
      }
      showToast(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="select-none relative rounded-[36px] bg-[#359673] w-[765px] h-[76%] flex justify-center">
      {isLoading && <LoadingScreen />}
      <div className="relative rounded-[36px] bg-bgeducator w-[747px] h-[97%]">
        <div className=" relative w-full h-full  ">
          <TopDecorator LanguageIcon={tourData.picture} size={230} />
          <img
            src={Back}
            className=" relative w-[40px] h-[40px] translate-x-10 translate-y-10  rounded-[100%] cursor-pointer"
            onClick={onBackClick}
          />
          <EducatorName
            SenseiImg={selectedBattle.created_by.user_profile.profile_icon}
            SenseiName={firstName}
            bg={"bg-[#359673]"}
          />

          <div className="flex flex-row h-full w-[100%] ml-4  justify-evenly items-center ">
            <div className="flex flex-col  items-center  w-[35%]">
              <BattleLogo
                BattleIcon={selectedBattle.picture}
                shouldTranslate={false}
                size={135}
              />
              <div className="flex flex-col -space-y-2 ">
                <Text
                  text={[selectedBattle.name]}
                  size="text-[32px]"
                  fontColor="text-white"
                  className={"text-start"}
                  fontType="font-bold"
                />
              </div>
              <div className="flex flex-col gap-2">
                <MiniDetails
                  context={"b"}
                  title={"Team Size"}
                  icon={"Students"}
                  msg={
                    selectedBattle.min_students_per_group +
                    " - " +
                    selectedBattle.max_students_per_group
                  }
                />
                <MiniDetails
                  context={"b"}
                  title={"Started"}
                  icon={"Calendar"}
                  msg={new Date(selectedBattle.start_date).toLocaleDateString()}
                />
                <MiniDetails
                  context={"b"}
                  title={"Ends"}
                  icon={"Calendar"}
                  msg={new Date(selectedBattle.end_date).toLocaleDateString()}
                />
              </div>
            </div>
            <div className="flex flex-col w-[55%] h-[450px] rounded-[26px] p-10 mr-10 justify-between items-center bg-accentSecondaryEducator">
              <div
                className="overflow-auto mb-10 scrollbar-thin scrollbar-thumb-bgeducator scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
                style={{ maxHeight: "600px" }}
              >
                <Text
                  text={[selectedBattle.description]}
                  size="text-[16px] "
                  className={"leading-normal text-start"}
                  fontColor="text-white"
                  fontType="font-normal"
                />
              </div>
              <Button name="JOIN" onClick={onOpen} />
              <Modal
                onClose={() => {
                  onClose();
                  setStep(0);
                }}
                isOpen={isOpen}
                isCentered
                size="xl"
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader />
                  <ModalCloseButton />
                  <ModalBody>
                    {step === 0 && (
                      <div className="flex flex-col justify-center items-center space-y-4">
                        <Text
                          text={["You’re about to join this battle"]}
                          size="text-[24px]"
                          fontColor="text-bgsecondary"
                          fontType="font-bold"
                        />
                        <Text
                          text={["What would you like to do?"]}
                          size="text-[20px]"
                          fontColor="text-bgsecondary"
                          fontType="font-normal"
                        />
                        <div className="flex flex-row justify-center items-center space-x-4">
                          <Button
                            name="CREATE TEAM"
                            backg="bg-accentprimary"
                            onClick={() => setStep(1)}
                          />
                          <Button
                            name="JOIN TEAM"
                            onClick={() => {
                              setStep(2);
                            }}
                          />
                        </div>
                      </div>
                    )}
                    {step === 1 && (
                      <div className="flex flex-col justify-center items-center space-y-4">
                        <img
                          src={Back}
                          className=" absolute w-[25px] h-[25px] top-3 left-3 rounded-[100%] cursor-pointer"
                          onClick={() => setStep(0)}
                        />
                        <Text
                          text={["Create Team"]}
                          size="text-[24px]"
                          fontColor="text-bgsecondary"
                          fontType="font-bold leading-tight"
                        />
                        <Text
                          text={["Name your team"]}
                          size="text-[20px]"
                          fontColor="text-bgsecondary"
                          fontType="font-normal leading-tight"
                        />
                        <TextField
                          placeholder="Enter team name"
                          type="text"
                          name="teamName"
                          onChange={(e) => setTeamName(e.target.value)}
                          value={teamName}
                          classname={"bg-[#D4D4D9]"}
                        />
                        <Tabs
                          variant="unstyled"
                          onChange={(index) => setTabIndex(index)}
                        >
                          <TabList className="space-x-5 ">
                            <Tab
                              _selected={{
                                color: "white",
                                bg: "#FF55D7",
                                rounded: 36,
                              }}
                              className="bg-accentprimary rounded-[36px] text-white border-[#D4D4D9] border-[1px]"
                            >
                              Public
                            </Tab>
                            <Tab
                              _selected={{
                                color: "white",
                                bg: "#FF55D7",
                                rounded: 36,
                              }}
                              className="bg-accentprimary rounded-[36px] text-white border-[#D4D4D9] border-[1px]"
                            >
                              Private
                            </Tab>
                          </TabList>
                        </Tabs>
                        <Button name="CREATE TEAM" onClick={handleCreateTeam} />
                        <Text
                          text={[
                            "Note: If your team does not meet the minimum number of members,",
                            "you will not be able to participate in the battle.",
                          ]}
                          size="text-[10px]"
                          fontColor="text-bgsecondary"
                          fontType="font-normal"
                          className={"leading-tight"}
                        />
                      </div>
                    )}
                    {step === 3 && (
                      <div className="flex flex-col justify-center items-center space-y-4">
                        <Text
                          text={["Team created successfully"]}
                          size="text-[24px]"
                          fontColor="text-bgsecondary"
                          fontType="font-bold"
                        />
                        <Text
                          text={[
                            "Send this code to your friends to join the team",
                          ]}
                          size="text-[20px]"
                          fontColor="text-bgsecondary"
                          fontType="font-normal"
                        />
                        <Text
                          text={[newCode]}
                          size="text-[30px]"
                          fontColor="text-bgsecondary"
                          fontType="font-black"
                          className={"bg-[#D4D4D9] p-2 rounded-[10px] "}
                        />
                        <Button
                          name="OKAY!"
                          onClick={() => {
                            onClose();
                            navigate(`/student/battle/${selectedBattle.id}`);
                          }}
                        />
                      </div>
                    )}
                    {step === 2 && (
                      <div className="flex flex-col justify-center items-center space-y-2">
                        <img
                          src={Back}
                          className=" absolute w-[25px] h-[25px] top-3 left-3 rounded-[100%] cursor-pointer"
                          onClick={() => setStep(0)}
                        />
                        <Text
                          text={["Join a private team"]}
                          size="text-[24px]"
                          fontColor="text-bgsecondary"
                          fontType="font-bold"
                        />
                        <Text
                          text={["Enter the team code"]}
                          size="text-[20px]"
                          fontColor="text-bgsecondary"
                          fontType="font-normal"
                        />
                        <div className="flex flex-row justify-center items-center space-x-4">
                          <TextField
                            placeholder="Enter team code"
                            type="text"
                            name="teamCode"
                            onChange={(e) => setTeamCode(e.target.value)}
                            value={teamCode}
                            classname={"bg-[#D4D4D9]"}
                          />
                          <Button name="JOIN" onClick={handleJoinTeamCode} />
                        </div>
                        <Text
                          text={["Join a public team"]}
                          size="text-[24px]"
                          fontColor="text-bgsecondary"
                          fontType="font-bold"
                        />
                        <Text
                          text={["Select a team from the list"]}
                          size="text-[20px]"
                          fontColor="text-bgsecondary"
                          fontType="font-normal"
                        />
                        {publicTeams.length > 0 ? (
                          <div
                            className="overflow-auto w-full space-y-2 scrollbar-thin scrollbar-thumb-[#C0C0C0] scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
                            style={{
                              maxHeight: "300px",
                              minHeight: "300px",
                            }}
                          >
                            {publicTeams.map((team) => (
                              <TeamList
                                key={team.id}
                                name={team.name}
                                members={team.members.length}
                                max={selectedBattle.max_students_per_group}
                                onJoin={() => handleJoinTeam(team.code)}
                              />
                            ))}
                          </div>
                        ) : (
                          <div className="flex flex-row items-center justify-center w-[80%] h-[200px]  bg-fontlabel rounded-[36px]">
                            <Text
                              text={["No teams available"]}
                              size="text-[20px]"
                              fontColor="text-bgsecondary"
                              fontType="font-normal"
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </ModalBody>
                  <ModalFooter />
                </ModalContent>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BattleResume;
