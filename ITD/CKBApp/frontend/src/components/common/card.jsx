import React from "react";
import { Text } from "../../components/common/text";
import { ReactSVG } from "react-svg";

export const Card = ({ title, icon, description, onClick, active }) => {
  const handleClick = () => {
    onClick(title);
  };

  return (
    <div
      className={`w-[234px] h-[307px] rounded-[36px] transform active:scale-95 hover:bg-bgsecondary ${
        active ? "bg-bgsecondary" : "bg-bgaccent "
      }`}
      onClick={handleClick}
    >
      <div className="flex h-full items-center justify-center">
        <div>
          <div className="flex justify-center items-center bg-bgprimary w-[168px] h-[164px] rounded-[36px]">
            <ReactSVG src={icon} />
          </div>

          <Text
            text={[title]}
            size="text-[20px]"
            fontColor="text-white"
            fontType="font-black"
          />
          <Text
            text={[description]}
            size="text-[16px]"
            fontColor="text-white"
            fontType="font-black"
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
