/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        gray: {
          900: "#1a202c",
          // Otros colores personalizados
        },
        // Otros colores personalizados
      },
      // Puedes añadir más configuraciones personalizadas si es necesario
    },
  },
  plugins: [],
};
