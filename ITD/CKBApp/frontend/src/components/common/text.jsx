import React from "react";

// Text component
// text: array of strings
// size: string
// fontType: string
// fontColor: string
// className: string
/* use: <Text
        text={["WELCOME", "BACK!"]}
        size="text-[40px]"
        fontColor="text-white"
        fontType="font-black"
        />
*/
export const Text = ({
  text,
  size,
  fontType,
  fontColor,
  className,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`${size} ${fontType} ${fontColor} text-center leading-10 ${className}`}
    >
      {text.map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ))}
    </div>
  );
};

export default Text;
