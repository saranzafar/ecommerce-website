module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/lib/esm/**/*.js',
    "./src/**/*.{html,js}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          "50": "#FDFDEA",
          "100": "#FDF6B2",
          "200": "#FCE96A",
          "300": "#FACA15",
          "400": "#E3A008",
          "500": "#C27803",
          "600": "#9F580A",
          "700": "#8E4B10",
          "800": "#723B13",
          "900": "#633112",
        },
        white: {
          '50': "#F9FAFB",
          '100': "#F3F4F6",
          '200': "#E5E7EB",
          '300': "#D1D5DB",
          '400': "#9CA3AF",
          '500': "#71717a",
          '600': "#6B7280",
          '700': "#4B5563",
          '800': "#374151",
          '900': "#1F2937",
          '950': "#111827"
        }
      }
    }
  },
  plugins: [
    require('flowbite/plugin')
  ]
}
