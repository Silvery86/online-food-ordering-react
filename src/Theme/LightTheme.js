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
        },
        orderColor: {
            PENDING: "#f0ad4e",
            PREPARED: "#5bc0de",
            PAID: "#2abe27",
            OUT_FOR_DELIVERY: "#0275d8",
            FAILED: "#d9534f",
            CANCEL: "#d9534f",
            DELIVERED: "#5cb85c",
            DEFAULT: "#6c757d"
        },
    }
});
