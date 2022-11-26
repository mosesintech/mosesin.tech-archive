module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  plugins: [require("@tailwindcss/typography")],
  theme: {
    screens: {
      sm: "640px",
      md: "1024px",
      lg: "1300px",
      xl: "1580px",
      "2xl": "2000px",
    },
  },
}
