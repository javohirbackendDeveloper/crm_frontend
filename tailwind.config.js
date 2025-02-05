export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "card-slide-in": "cardSlideIn 1s ease-out",
      },
      keyframes: {
        cardSlideIn: {
          "0%": { transform: "translateY(-100%)" },
          "25%": { transform: "translateX(-100%)" },
          "50%": { transform: "translateY(100%)" },
          "75%": { transform: "translateX(100%)" },
          "100%": { transform: "translateY(0) translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};
