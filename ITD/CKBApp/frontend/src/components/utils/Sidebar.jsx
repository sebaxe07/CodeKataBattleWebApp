import React, { useContext, useState } from "react";
import { ReactSVG } from "react-svg";
import HomeIcon from "../../assets/icons/home.svg";
import Logout from "../../assets/icons/logout.svg";
import BgIconCard from "../common/bgIconCard";
import Button from "../common/Button";
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
  AlertDialogCloseButton,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";

const Sidebar = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { activeUser, setActiveUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

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

      // Remove the auth token from local storage
      if (localStorage.getItem("authToken")) {
        localStorage.removeItem("authToken");
      }

      if (localStorage.getItem("user")) {
        localStorage.removeItem("user");
      }

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
    } catch (error) {
      console.error("Failed to log out:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      {isLoading && <LoadingScreen />}
      <div className="bg-bgaccent text-white h-screen w-[120px] fixed top-0 left-0 overflow-y-auto ">
        {/* Sidebar content */}
        <div className="flex flex-col justify-start py-[30px] h-1/2 space-y-7">
          <NavLink to="/student/home" className=" flex justify-center">
            <ReactSVG
              src={HomeIcon}
              beforeInjection={(svg) => {
                svg.setAttribute("style", "width: 40px; height: 35px");
              }}
            />
          </NavLink>
          <NavLink
            to="/student/studentProfile"
            className=" flex justify-center "
          >
            <BgIconCard
              icon={activeUser.user_profile.profile_icon}
              iWidth={"40px"}
              iHeight={"40px"}
              classname={`w-[55px] h-[55px] rounded-[36px]`}
              classname={"bg-[#EE8361] w-[55px] h-[50px] rounded-[36px]"}
            />
          </NavLink>

          <div
            onClick={onOpen}
            className="absolute bottom-[39px] left-[45px] cursor-pointer"
          >
            <ReactSVG
              src={Logout}
              beforeInjection={(svg) => {
                svg.setAttribute("style", "width: 40px; height: 35px");
              }}
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
