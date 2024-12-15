/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      titleone: ["sans", "serif"],
      title: ["Protest Guerrilla", "serif"],
    },
    backgroundSize: {
      '110%': '110%',
      '100%': '100%',
    },
    extend: {
      backgroundImage: {
        'category': "url('https://i.pinimg.com/564x/f2/b2/a6/f2b2a62e80ab3840aea71fb79783c1d5.jpg')",
      }
    },
  },
  plugins: [],
};
