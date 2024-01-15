import React from "react";
import { ReactSVG } from "react-svg";
import HomeIcon from "../../assets/icons/home.svg";
import SettingsIcon from "../../assets/icons/settings.svg";
import TigerIcon from "../../assets/icons/tiger.svg";
import NotificationIcon from "../../assets/icons/notification.svg";

const Sidebar = () => {
  return (
    <div className="bg-bgaccent text-white h-screen w-[120px] fixed top-0 left-0 overflow-y-auto ">
      {/* Sidebar content */}
      <div className="flex flex-col justify-start py-[30px] h-1/2 space-y-7">
        <div className="mb-2 flex justify-center">
          <ReactSVG src={HomeIcon} />
        </div>
        <div className="mb-2 flex justify-center ">
          <ReactSVG src={TigerIcon} />
        </div>
        <div className="mb-2 flex justify-center">
          <ReactSVG src={NotificationIcon} />
        </div>
        <div className="mb-2 flex justify-center">
          <ReactSVG src={SettingsIcon} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
