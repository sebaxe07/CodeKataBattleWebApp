/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
      scale: ["active"],
      fontFamily: {
        rubik: ["Rubik", "sans-serif"],
      },
      colors: {
        accentprimary: "#baafff",
        accentsecondary: "#ff55d7",
        accentstudent: "#b4ffe6",
        bgaccent: "#332786",
        bgprimary: "#5241c4",
        bgsecondary: "#231e51",
        bgstudent: "#39b58b",
        bgstudentsecondary: "#2c785f",
        fontlabel: "#a2a1ab",
        shadowbox: "#5d4cd3",
        white: "#ffffff",
      },
    },
  },
  variants: {
    extend: {
      textColor: ["placeholder"],
    },
  },
  plugins: [require("@tailwindcss/forms"),
],
};
