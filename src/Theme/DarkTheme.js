const { createTheme } = require("@mui/material");

export const darkTheme = createTheme({
    palette : {
        mode : "dark",
        primary : {
            main : "#2abe27"
        },
        secondary:{
            main : "#165116"
        },
        black:{
            main : "#0D0D0D"
        },
        background:{
            main: "#000000",
            default: "#0D0D0D",
            paper: "#0D0D0D"
        },
        textColor:{
            main:"#f1fdf0"
        }
    }
})