import React from "react";
import python from "../../assets/icons/python.png";

export const iconCard = ({
  background = "bg-accentprimary",
  shadow = "bg-bgprimary",
  size = 80,
}) => {
  const innerSize = (size / 80) * 74;
  const innermostSize = (size / 80) * 65;
  const imgSize = (size / 80) * 52;

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
          className={`${background} rounded-full flex justify-center items-center`}
          style={{ width: `${innermostSize}px`, height: `${innermostSize}px` }}
        >
          <img
            src={python}
            alt="fireSpot"
            style={{ width: `${imgSize}px`, height: `${imgSize}px` }}
          />
        </div>
      </div>
    </div>
  );
};

export default iconCard;
