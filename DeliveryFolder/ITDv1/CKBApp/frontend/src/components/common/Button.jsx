import React from "react";

// Button component
// name: string
// onClick: function
// use: <Button name="Login" onClick={() => // console.log("Button clicked")} />

export const Button = ({
  name,
  onClick,
  className,
  backg = "bg-accentsecondary",
}) => {
  return (
    <button
      onClick={onClick}
      className={` hover:bg-[#E951C5] shadow-lg px-[40px] py-[13px] transform active:scale-95  ${backg} rounded-[16px] font-extrabold   text-white text-[16px] tracking-[0] leading-[normal] whitespace-nowrap ${className}`}
    >
      {name}
    </button>
  );
};

export default Button;
