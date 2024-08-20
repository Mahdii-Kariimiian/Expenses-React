/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        screens: {
            sm: "450px",
            md: "670px",
            lg: "1024px",
            xl: "1280px",
            "2xl": "1536px",
        },
        fontFamily: {
            sans: [
                "ui-sans-serif",
                "system-ui",
                "BlinkMacSystemFont",
                '"Segoe UI"',
                "Roboto",
                '"Helvetica Neue"',
                "Arial",
                "sans-serif",
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ],
        },
    },

    plugins: [],
};
