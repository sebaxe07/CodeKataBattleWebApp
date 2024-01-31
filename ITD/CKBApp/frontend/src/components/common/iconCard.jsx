import React from "react";
import python from "../../assets/icons/python.svg";
import binary from "../../assets/icons/binaryIcon.svg";
import { ReactSVG } from "react-svg";

export const iconCard = ({
  background = "bg-accentprimary",
  shadow = "bg-bgprimary",
  icon = "binaryIcon.svg",
  size = 80,
}) => {
  const innerSize = (size / 80) * 74;
  const innermostSize = (size / 80) * 65;
  const imgSize = (size / 80) * 52;

  switch (icon) {
    case "python.svg":
      icon = python;
      break;
    case "binaryIcon.svg":
      icon = binary;
      break;
    default:
      icon = python;
  }

  return (
    <div
      className={`${shadow} rounded-full absolute left-0 transform -translate-x-1/4 translate-y-0.5`}
      style={{ width: `${size}px`, height: `${(size / 80) * 74}px` }}
    >
      <div
        className="bg-white rounded-full flex justify-center items-center"
        style={{ width: `${innerSize}px`, height: `${innerSize}px` }}
      >
        <div
          className={`${background} rounded-full flex justify-center items-center `}
          style={{ width: `${innermostSize}px`, height: `${innermostSize}px` }}
        >
          <ReactSVG
            src={icon}
            beforeInjection={(svg) => {
              svg.setAttribute(
                "style",
                `width: ${imgSize}; height: ${imgSize};`
              );
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default iconCard;
