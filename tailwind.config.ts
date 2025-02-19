import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primero: "#071919",
        segundo: "#1F342F",
        tercero: "#99618d",
        cuarto: "#51122E",
        quinto: "#E32296",
        sexto: "#ebc7cb",
      },
      screens: {
        "900": "900px",
        "850": "850px",
        "500": "500px",
        "400": "400px",
        "450": "450px",
        "600": "600px",
      },
      fontFamily: {
        primary: ["var(--primary-font)"],
      },
    },
  },
  plugins: [],
};
export default config;
