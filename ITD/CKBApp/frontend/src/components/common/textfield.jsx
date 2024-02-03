import React from "react";

export const TextField = ({
  mode = "input",
  type,
  classname,
  placeholder,
  value,
  onChange,
  ...props
}) => {
  return (
    <div className="flex justify-between items-center">
      {mode == "area" ? (
        <textarea
          type={type}
          className={`rounded-[14px] text-black placeholder-fontlabel pl-5 py-2 px-3 ${classname} ${
            placeholder === "Password"
              ? "w-[230px] border-white"
              : "w-[269px] focus:outline-none focus:shadow-outline"
          } `}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...props}
        />
      ) : (
        <input
          type={type}
          className={`h-[41px] rounded-[14px] text-black placeholder-fontlabel pl-5 py-2 px-3 ${classname} ${
            placeholder === "Password"
              ? "w-[230px] border-white"
              : "w-[269px] focus:outline-none focus:shadow-outline"
          } `}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...props}
        />
      )}
    </div>
  );
};

export default TextField;
