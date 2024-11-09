const { createTheme } = require("@mui/material");

export const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#2abe27"
        },
        secondary: {
            main: "#165116"
        },
        black: {
            main: "#0D0D0D"
        },
        background: {
            main: "#000000",
            default: "#0D0D0D",
            paper: "#0D0D0D"
        },
        textColor: {
            main: "#f1fdf0"
        },
        orderColor : {
            PENDING: "#f0ad4e", 
            PAID: "#2abe27",
            OUT_FOR_DELIVERY: "#0275d8", 
            FAILED: "#d9534f", 
            CANCEL: "#d9534f", 
            DELIVERED: "#5cb85c", 
            COMPLETED: "#5bc0de", 
            DEFAULT: "#6c757d" 
        },

    }
})