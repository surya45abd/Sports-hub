/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#f4f5f1",
        ink: "#17211d",
        muted: "#68716c",
        line: "#dce0da",
        surface: "#ffffff",
        "surface-tint": "#ebede7",
        acid: "#d4f45b",
        "brand-red": "#ef5a43",
        "brand-blue": "#4165d5",
        gold: "#d4af37",
        silver: "#a3a8a5",
        bronze: "#cd7f32",
      },
      fontFamily: {
        display: ['"Barlow Condensed"', "Impact", "sans-serif"],
        body: ['"DM Sans"', '"Segoe UI"', "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        lift: "0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)",
        modal: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
};
