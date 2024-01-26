import React from "react";

export const TextField = ({ type, placeholder, value, onChange, ...props }) => {
  return (
    <div className="flex justify-between items-center">
      <input
        type={type}
        className={`h-[41px] rounded-[14px] bg-white text-black placeholder-fontlabel pl-5 py-2 px-3  ${
          placeholder === "Password"
            ? "w-[230px] border-white"
            : "w-[269px] focus:outline-none focus:shadow-outline"
        }`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  );
};

export default TextField;
