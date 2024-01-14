import React from "react";

// TextField component
// type: string
// placeholder: string
// value: string
// onChange: function
/* use: <TextField
        type={"text"}
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
*/
export const TextField = ({ type, placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      className="w-[269px] h-[42px] rounded-[14px] bg-white text-black placeholder-fontlabel text-center py-2 px-3 focus:outline-none focus:shadow-outline"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default TextField;
