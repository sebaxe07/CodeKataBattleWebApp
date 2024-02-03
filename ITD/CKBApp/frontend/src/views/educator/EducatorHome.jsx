import React, { useState, useEffect, useContext } from "react";
import axios from "../../services/api";
//import { TextField } from "../../components/common/textfield";
import { ReactSVG } from "react-svg";
import { Text } from "../../components/common/text";
import Logo from "../../assets/images/Logo.svg";
import MyTournament from "../../components/utils/TournamentUtils/MyTournament";
import AddIcon from "../../assets/icons/add.svg";
import { UserContext } from "../../services/contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { LoadingScreen } from "../../services/LoadingScreen";
import RefreshG from "../../assets/icons/refreshG.svg";

export const EducatorHome = () => {
  const navigate = useNavigate();
  const { activeUser, setActiveUser } = useContext(UserContext);
  const [tournaments, setTournaments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);

  const fetchTournaments = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `/tms/tournaments/user/${activeUser.roleid}`,
        {
          headers: { Authorization: `Token ${activeUser.authToken}` },
        }
      );

      // Save tournaments
      localStorage.setItem("tournaments", JSON.stringify(response.data));

      setTournaments(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Failed to fetch tournaments:", error);
    } finally {
      setIsLoading(false);
      setIsSpinning(false);
    }
  };

  const refresh = () => {
    fetchTournaments();
  };

  useEffect(() => {
    const storedTournaments = JSON.parse(localStorage.getItem("tournaments"));
    if (storedTournaments) {
      setTournaments(storedTournaments);
    } else {
      fetchTournaments();
    }
  }, []);

  return (
    <div className="bg-bgsecondaryeducator flex flex-row justify-center items-center h-screen w-[screen-120px] ml-[120px]">
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
      <div className="flex flex-col  h-full w-full justify-center items-center">
        <div className="flex flex-row w-full justify-evenly items-center ">
          <Text
            text={["My Tournaments"]}
            size="text-[24px]"
            fontColor="text-white font-bold"
          />
          <ReactSVG
            src={RefreshG}
            beforeInjection={(svg) => {
              svg.setAttribute("style", "width: 30px; height: 30px");
            }}
            className={`cursor-pointer ${isSpinning ? "spin" : ""}`}
            onClick={() => {
              setIsSpinning(true);
              refresh();
            }}
          />
        </div>

        <div className="fadeScroll w-full">
          <div
            className="overflow-auto  scrollbar-thin scrollbar-thumb-bgeducator scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
            style={{ maxHeight: "600px" }}
          >
            {tournaments.map((tournament) => (
              <MyTournament
                key={tournament.id}
                id={tournament.id}
                name={tournament.name}
                description={tournament.description}
                startDate={new Date(tournament.start_date).toLocaleDateString()}
                endDate={new Date(tournament.end_date).toLocaleDateString()}
                active={tournament.status === "completed" ? false : true}
                picture={tournament.picture}
              />
            ))}
          </div>
        </div>

        <div
          className="flex w-[50px]  justify-center cursor-pointer mt-5 items-center"
          onClick={() => navigate("/educator/tournament/create")}
        >
          <ReactSVG src={AddIcon} className="text-accentSecondaryEducator" />
        </div>
      </div>
    </div>
  );
};

export default EducatorHome;
