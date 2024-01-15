import React from "react";

// CheckBox component

export const CheckBox = ({ value, onChange }) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        className="  w-[17px] h-[17px] rounded-[5px] bg-accentprimary text-accentsecondary placeholder-fontlabel text-center  focus:outline-none mr-1"
        value={value}
        onChange={onChange}
      />
      <label className="text-[16px] text-accentprimary font-medium">
        Remember me
      </label>
    </div>
  );
};

export default CheckBox;
