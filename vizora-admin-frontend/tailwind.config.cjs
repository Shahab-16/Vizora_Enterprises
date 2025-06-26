const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'sansita': ['Sansita', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },
      colors: {
        "primary-purple": "#5927E5",
        "secondary-purple": "#835DF0",
        "primary-black": "#383839",
      },
      boxShadow: {
        custom: "0 0 10px rgba(0, 0, 0, 0.3)",
      },
      
    },
  },
  plugins: [],
})
