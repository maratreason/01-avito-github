import React from "react";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";
import CircularProgress from "@material-ui/core/CircularProgress";
import Rating from '@material-ui/lab/Rating';
import {Link} from "react-router-dom";

import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
        position: "relative",
    },
    starsCell: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
    },
    starsCellText: {
        fontSize: "0.8rem",
        fontWeight: "bold",
        color: "#acacac",
    },
    dateTime: {
        fontSize: "0.8rem",
        color: "#acacac",
        display: "inline",
    }
});

const TableComponent = ({page, setPage, totalPages, rowsPerPage, setRowsPerPage, repos, isPostsLoading}) => {
    const classes = useStyles();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>&nbsp;</TableCell>
                            <TableCell align="left">Название</TableCell>
                            <TableCell align="left">Количество звезд</TableCell>
                            <TableCell align="left">дата последнего коммита</TableCell>
                            <TableCell align="left">ссылка на Github</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            isPostsLoading
                            ? <div className="loader"><CircularProgress disableShrink /></div>
                            : repos.map((repository) => (
                                <TableRow key={repository.id}>
                                    <TableCell>
                                        <img
                                            className="table_avatar"
                                            src={repository.owner.avatar_url}
                                            alt={repository.owner.html_url}
                                        />
                                    </TableCell>
                                    <TableCell component="th" scope="row" align="left">
                                        <Button to={`repos/${repository.owner.login}/${repository.name}`} color="primary" component={Link}>
                                            {repository.name}
                                        </Button>
                                    </TableCell>
                                    <TableCell align="left">
                                        <div className={classes.starsCell}>
                                            <div className={classes.starsCellText}>{repository.stargazers_count}</div>
                                            <Rating name="customized-10" defaultValue={10} max={10} />
                                        </div>
                                    </TableCell>
                                    <TableCell align="left">
                                        <div className={classes.dateTime}>{new Date(repository.updated_at).toLocaleTimeString()} &nbsp;</div>
                                        <strong>{new Date(repository.updated_at).toLocaleDateString()}</strong>
                                    </TableCell>
                                    <TableCell align="left">
                                        <Button to={`repos/${repository.owner.login}/${repository.name}`} variant="contained" color="primary" component={Link}>
                                            Перейти
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                component="div"
                count={totalPages}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    );
};

export default TableComponent;
