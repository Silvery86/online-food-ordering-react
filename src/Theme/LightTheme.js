const { createTheme } = require("@mui/material");

export const lightTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#2abe27"  // Keeping the primary green color consistent
        },
        secondary: {
            main: "#165116"  // Keeping the secondary color, but you can adjust if needed for lighter contrast
        },
        white: {
            main: "#ffffff"  // Using white for "black" since this will be a light theme
        },
        black: {
            main: "#000000"  // Using white for "black" since this will be a light theme
        },
        background: {
            main: "#ffffff",
            default: "#f5f5f5",  // Light gray background for more contrast in light mode
            paper: "#ffffff"  // White paper for light theme
        },
        textColor: {
            main: "#333333"  // Dark gray for text to ensure readability on light backgrounds
        }
    }
});
