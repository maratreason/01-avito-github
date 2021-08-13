import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        marginBottom: 30,
    },
}));

const ReposFilter = ({filter, setFilter}) => {
    const classes = useStyles();

    return (
        <TextField
            className={classes.root}
            d="outlined-basic"
            label="Поиск репозиториев"
            variant="outlined"
            value={filter.query}
            onChange={e => setFilter({...filter, query: e.target.value})}
        />
    );
};

export default ReposFilter;
