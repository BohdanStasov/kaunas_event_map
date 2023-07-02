/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#050816",
        secondary: "#aaa6c3",
        "white-100": "#f3f3f3",
        "red": "#ff0000",
      },
      screens: {
        xs: "350px",
      },
    },
  },
  plugins: [],
};

