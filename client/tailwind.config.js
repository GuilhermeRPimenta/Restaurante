/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  theme: {
    extend: {
      colors: {
        primary: "#F55A00",
        secondary: "#BEB7A4",
        eerieBlack: "191919",
        babyPowder: "#FFFFFC",
        khaki: "BEB7A4",
      },
      fontFamily: {
        pacifico: ["Pacifico", "cursive"],
      },
    },
  },
};
