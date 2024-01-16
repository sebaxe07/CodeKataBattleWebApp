import React from "react";
import { ReactSVG } from "react-svg";
import HomeIcon from "../../assets/icons/home.svg";
import SettingsIcon from "../../assets/icons/settings.svg";
import TigerIcon from "../../assets/icons/UsersIcons/tiger.svg";
import NotificationIcon from "../../assets/icons/notification.svg";
import Logout from "../../assets/icons/logout.svg";
import { NavLink, Outlet } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <div className="bg-bgaccent text-white h-screen w-[120px] fixed top-0 left-0 overflow-y-auto ">
        {/* Sidebar content */}
        <div className="flex flex-col justify-start py-[30px] h-1/2 space-y-7">
          <NavLink to="/student/home" className=" flex justify-center">
            <ReactSVG src={HomeIcon} />
          </NavLink>
          <NavLink className=" flex justify-center ">
            <ReactSVG
              src={TigerIcon}
              beforeInjection={(svg) => {
                svg.setAttribute("style", "width: 50px; height: 50px");
              }}
            />
          </NavLink>
          <NavLink className=" flex justify-center">
            <ReactSVG src={NotificationIcon} />
          </NavLink>
          <NavLink className=" flex justify-center">
            <ReactSVG src={SettingsIcon} />
          </NavLink>
          <NavLink to="/" className="absolute bottom-[39px] left-[45px]">
            <ReactSVG src={Logout} />
          </NavLink>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Sidebar;
