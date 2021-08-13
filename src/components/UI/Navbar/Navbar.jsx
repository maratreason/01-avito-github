import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
    navbar: {
        padding: "15px 0",
    },
});

const Navbar = () => {
    const classes = useStyles();

    return (
        <div className={classes.navbar}>
            {["Главная", "right"].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button>{anchor}</Button>
                </React.Fragment>
            ))}
        </div>
    );
};

export default Navbar;
