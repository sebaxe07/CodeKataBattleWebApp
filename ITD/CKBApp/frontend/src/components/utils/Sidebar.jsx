import React from "react";
import { ReactSVG } from "react-svg";
import HomeIcon from "../../assets/icons/home.svg";
import SettingsIcon from "../../assets/icons/settings.svg";
import TigerIcon from "../../assets/icons/UsersIcons/tiger.svg";
import NotificationIcon from "../../assets/icons/notification.svg";
import Logout from "../../assets/icons/logout.svg";
import BgIconCard from "../common/bgIconCard";

import { NavLink, Outlet } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
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
              icon={TigerIcon}
              iWidth={"40px"}
              iHeight={"40px"}
              classname={"bg-[#EE8361] w-[55px] h-[50px] rounded-[36px]"}
            />
          </NavLink>
          <NavLink className=" flex justify-center">
            <ReactSVG
              src={NotificationIcon}
              beforeInjection={(svg) => {
                svg.setAttribute("style", "width: 40px; height: 35px");
              }}
            />
          </NavLink>
          <NavLink className=" flex justify-center">
            <ReactSVG
              src={SettingsIcon}
              beforeInjection={(svg) => {
                svg.setAttribute("style", "width: 40px;  height: 35px");
              }}
            />
          </NavLink>
          <NavLink to="/" className="absolute bottom-[39px] left-[45px]">
            <ReactSVG
              src={Logout}
              beforeInjection={(svg) => {
                svg.setAttribute("style", "width: 40px; height: 35px");
              }}
            />
          </NavLink>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Sidebar;
