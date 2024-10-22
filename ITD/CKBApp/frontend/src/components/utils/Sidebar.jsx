import React, { useContext, useEffect, useState } from "react";
import { ReactSVG } from "react-svg";
import HomeIcon from "../../assets/icons/home.svg";
import Logout from "../../assets/icons/logout.svg";
import search from "../../assets/icons/search.svg";
import BgIconCard from "../common/bgIconCard";
import Button from "../common/Button";
import Rankings from "../../assets/icons/rankings.svg";
import RankingsE from "../../assets/icons/rankings2.svg";
import { NavLink, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "../../services/api";
import { useToast } from "@chakra-ui/react";
import { UserContext } from "../../services/contexts/UserContext";
import { LoadingScreen } from "../../services/LoadingScreen";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";

const colorSchemes = [
  {
    background: "bg-bgaccent",
  },
  {
    background: "bg-shadowboxeducator",
  },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { activeUser, setActiveUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const [colorScheme, setColorScheme] = useState(colorSchemes[0]);
  const [educator, setEducator] = useState(false);

  useEffect(() => {
    if (activeUser) {
      if (activeUser.user_profile.role === "educator") {
        setColorScheme(colorSchemes[1]);
        setEducator(true);
      }
    }
  }, [activeUser]);

  const handleLogout = async () => {
    setIsLoading(true);
    // Get the auth token from local storage
    var authToken = null;
    if (localStorage.getItem("authToken")) {
      authToken = localStorage.getItem("authToken");
    } else {
      authToken = activeUser.authToken;
    }

    try {
      // Make a POST request to the logout endpoint
      await axios.post(
        "/auth/token/logout/",
        {},
        {
          headers: { Authorization: `Token ${authToken}` },
        }
      );
    } catch (error) {
      console.error("Failed to log out:", error);
    } finally {
      setIsLoading(false);

      // Remove the auth token from local storage
      if (localStorage.getItem("authToken")) {
        localStorage.removeItem("authToken");
      }

      if (localStorage.getItem("user")) {
        localStorage.removeItem("user");
      }

      if (localStorage.getItem("tournaments")) {
        localStorage.removeItem("tournaments");
      }

      if (localStorage.getItem("OngoingTournaments")) {
        localStorage.removeItem("OngoingTournaments");
      }

      if (localStorage.getItem("ongoingScores")) {
        localStorage.removeItem("ongoingScores");
      }

      if (localStorage.getItem("scores")) {
        localStorage.removeItem("scores");
      }

      const keys = Object.keys(localStorage);
      const battleKeys = keys.filter((key) => key.startsWith("battle"));
      const tournamentKeys = keys.filter((key) => key.startsWith("tournament"));
      const teamKeys = keys.filter((key) => key.startsWith("team"));
      battleKeys.forEach((key) => localStorage.removeItem(key));
      tournamentKeys.forEach((key) => localStorage.removeItem(key));
      teamKeys.forEach((key) => localStorage.removeItem(key));

      // Remove the user object from the global context
      setActiveUser(null);

      toast({
        title: "Logged out successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Redirect the user to the login page
      navigate("/");
    }
  };
  return (
    <>
      {isLoading && <LoadingScreen />}
      <div
        className={`${colorScheme.background} text-white h-screen w-[120px] fixed top-0 left-0 overflow-y-auto `}
      >
        {/* Sidebar content */}
        <div className="flex flex-col justify-start py-[30px] h-1/2 space-y-7">
          <NavLink
            to={educator ? "/educator/home" : "/student/home"}
            className=" flex justify-center"
          >
            <ReactSVG
              src={HomeIcon}
              beforeInjection={(svg) => {
                svg.setAttribute("style", "width: 40px; height: 35px;");
              }}
              className={educator ? "text-bgeducator" : "text-[#BAAFFF]"}
            />
          </NavLink>
          <NavLink
            to={educator ? "/educator/profile" : "/student/profile"}
            className=" flex justify-center "
          >
            <BgIconCard
              icon={activeUser.user_profile.profile_icon}
              size={55}
              classname={`w-[55px] h-[55px] rounded-[36px]`}
            />
          </NavLink>
          <NavLink
            to={educator ? "/educator/rankings" : "/student/rankings"}
            className=" flex justify-center "
          >
            {educator ? (
              <ReactSVG
                src={RankingsE}
                beforeInjection={(svg) => {
                  svg.setAttribute("style", "width: 40px; height: 35px;");
                }}
              />
            ) : (
              <ReactSVG
                src={Rankings}
                beforeInjection={(svg) => {
                  svg.setAttribute("style", "width: 40px; height: 35px;");
                }}
              />
            )}
          </NavLink>
          {!educator ? (
            <NavLink
              to="/student/joinTournament"
              className=" flex justify-center "
            >
              <ReactSVG
                src={search}
                beforeInjection={(svg) => {
                  svg.setAttribute("style", "width: 40px; height: 35px;");
                }}
              />
            </NavLink>
          ) : null}

          <div
            onClick={onOpen}
            className="absolute bottom-[39px] left-[45px] cursor-pointer"
          >
            <ReactSVG
              src={Logout}
              beforeInjection={(svg) => {
                svg.setAttribute("style", "width: 40px; height: 35px");
              }}
              className={educator ? "text-bgeducator" : "text-[#BAAFFF]"}
            />
          </div>
          <AlertDialog
            motionPreset="slideInBottom"
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isOpen={isOpen}
            isCentered
          >
            <AlertDialogOverlay />
            <AlertDialogContent>
              <AlertDialogHeader>Going early? :( </AlertDialogHeader>
              <AlertDialogBody>
                Are you sure you want to log out?
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button
                  name={"No"}
                  ref={cancelRef}
                  onClick={onClose}
                  backg={"bg-accentprimary"}
                />

                <Button
                  name={"Yes"}
                  className={"ml-3"}
                  onClick={handleLogout}
                />
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Sidebar;
