const { nextui } = require("@nextui-org/react")

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  // #1E3685
  darkMode: "class",
  plugins: [nextui(
    {
      layout: {
        fontSize: {
					xs: ['12', '20'],
					'2xl': ['32px', '32px'], // banner 2
					sm: ['14px', '20px'], // body text
					base: ['16px', '20px'], // text body
					cardtitle: ['24px', '24px'], // card title          
        }
      },
      themes: {
        light: {
          colors: {
            'main-blue': '#1E3685'
          }
        }
      }
    }
  )],
}

