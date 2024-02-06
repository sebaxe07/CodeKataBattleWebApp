import React, { useState, useContext, useEffect } from "react";
import { Text } from "./text";
import BgIconCard from "./bgIconCard";

export const IconSelector = ({ context, ...props }) => {
  const [selectedIcon, setSelectedIcon] = useState(null);

  const library = [
    {
      icon: "python.svg",
      icon2: "java.svg",
      icon3: "javascript.svg",
    },
    {
      icon: "binaryIcon.svg",
      icon2: "hacker_cat.svg",
      icon3: "github_cop.svg",
      icon4: "Code.svg",
    },
  ];

  const [icoLibrary, setLibrary] = useState(library[1]);

  useEffect(() => {
    setLibrary(library[context === " language" ? 0 : 1]);
  }, [context]);

  const handleIconClick = (icon) => {
    setSelectedIcon(icon);
    props.IconSelected(icon);
  };

  // School Screen
  return (
    <div className="h-full w-full flex flex-col">
      <Text
        text={[`Select a${context}`]}
        size="text-[32px]"
        fontColor="text-white"
        fontType="font-black"
      />
      <Text
        text={["Pick the avatar you want, this will be your profile picture"]}
        size="text-[16px]"
        fontColor="text-white"
        fontType="font-black"
      />
      <div className="flex flex-row mt-5 w-full h-full justify-around gap-5">
        <BgIconCard
          icon={icoLibrary.icon}
          size={100}
          onClick={() => handleIconClick(icoLibrary.icon)}
          active={selectedIcon === icoLibrary.icon}
        />

        <BgIconCard
          icon={icoLibrary.icon2}
          size={100}
          onClick={() => handleIconClick(icoLibrary.icon2)}
          active={selectedIcon === icoLibrary.icon2}
        />
        <BgIconCard
          icon={icoLibrary.icon3}
          size={100}
          onClick={() => handleIconClick(icoLibrary.icon3)}
          active={selectedIcon === icoLibrary.icon3}
        />
        {context != " language" ? (
          <BgIconCard
            icon={icoLibrary.icon4}
            size={100}
            onClick={() => handleIconClick(icoLibrary.icon4)}
            active={selectedIcon === icoLibrary.icon4}
          />
        ) : null}
      </div>
    </div>
  );
};

export default IconSelector;
