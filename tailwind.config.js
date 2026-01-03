module.exports = {
  content: [
    "./src/**/*.{html,ts,scss,css}",
    "./node_modules/primeng/**/*.{html,ts,scss,css}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("tailwindcss-primeui")],
};
