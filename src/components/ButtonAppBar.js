import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
        fontWeight: "bold",
    },
    button: {
        marginLeft: theme.spacing(2),
        backgroundColor: "#FF6347",
        "&:hover": {
            backgroundColor: "#FF0000",
        },
    },
}));

export default function ButtonAppBar() {
    const classes = useStyles();
    const username = localStorage.getItem("userName");

    const handleLogout = async (e) => {
        e.preventDefault();

        localStorage.removeItem("userId");
        localStorage.removeItem("userName");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("password");
        window.location.href = "http://localhost:3000/login";
    };

    return (
        <React.Fragment>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Hi {username},<br/>Welcome to Customer Data Management Activity
                    </Typography>
                    <Button
                        variant="contained" className={classes.button} onClick={handleLogout}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
            <Toolbar />
        </React.Fragment>
    );
}
