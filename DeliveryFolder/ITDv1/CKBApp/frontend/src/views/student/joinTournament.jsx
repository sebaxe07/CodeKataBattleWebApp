import React, { useEffect, useContext, useState } from "react";
import ActiveTournamentCard from "../../components/utils/ActiveTournamentCard";
import { Text } from "../../components/common/text";
import { ReactSVG } from "react-svg";
import Logo from "../../assets/images/Logo.svg";
import { useNavigate } from "react-router-dom";
import { LoadingScreen } from "../../services/LoadingScreen";
import { UserContext } from "../../services/contexts/UserContext";
import axios from "../../services/api";

export const JoinTournament = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const { activeUser, setActiveUser } = useContext(UserContext);
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/tms/tournaments/`, {
          headers: { Authorization: `Token ${activeUser.authToken}` },
        });

        console.log(response.data);
        let newTournaments = response.data;
        if (localStorage.getItem("tournaments")) {
          const storedTournaments = JSON.parse(
            localStorage.getItem("tournaments")
          );

          // Filter out the tournaments that the student is already part of
          newTournaments = newTournaments.filter(
            (tournament) =>
              !storedTournaments.some(
                (storedTournament) => storedTournament.id === tournament.id
              )
          );
          console.log("newTournaments", newTournaments);
        }
        setTournaments(newTournaments);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
        setIsSpinning(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-bgsecondary flex flex-row justify-center items-center h-screen w-[screen-120px] ml-[120px]">
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
      <div className="flex flex-col  h-full w-full justify-center items-center">
        <div className="flex flex-col justify-center items-center w-full">
          {/* <Text
            text={["Looks like you don’t have any active tournament yet..."]}
            size="text-[16px]"
            fontColor="text-accentprimary"
            fontType="font-normal"
          /> */}
          <Text
            text={["¡Join a new tournament!"]}
            size="text-[42px]"
            fontColor="text-white"
            fontType="font-black"
            className={"mb-5"}
          />
        </div>

        {tournaments.length > 0 ? (
          <div className="fadeScroll1 w-full">
            <div
              className="overflow-auto  scrollbar-thin scrollbar-thumb-bgaccent scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
              style={{ maxHeight: "600px" }}
            >
              {tournaments
                .sort((a, b) => new Date(a.start_date) - new Date(b.start_date))
                .map((tournament) => {
                  const startDate = new Date(tournament.start_date);
                  const now = new Date();
                  const diffInDays = Math.ceil(
                    (startDate - now) / (1000 * 60 * 60 * 24)
                  );
                  const soonToEnd = diffInDays <= 5;
                  const timeRemaining = soonToEnd
                    ? `Subscription ends in ${diffInDays} days`
                    : undefined;

                  return (
                    <ActiveTournamentCard
                      key={tournament.id}
                      picture={tournament.picture}
                      name={tournament.name}
                      soonToEnd={soonToEnd}
                      timeRemainig={timeRemaining}
                      startDate={new Date(
                        tournament.start_date
                      ).toLocaleDateString()}
                      endDate={new Date(
                        tournament.end_date
                      ).toLocaleDateString()}
                      tournamentData={tournament}
                    />
                  );
                })}
            </div>
          </div>
        ) : (
          <>
            <Text
              text={["There are no available tournaments right now..."]}
              size="text-[24px]"
              fontColor="text-accentprimary"
              fontType="font-bold"
            />{" "}
          </>
        )}
      </div>
    </div>
  );
};

export default JoinTournament;
