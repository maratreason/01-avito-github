import React, {useState, useEffect} from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import {useFetching} from "../hooks/useFetching";
import RepositoryService from "../api/RepositoryService";
import {getPageCount} from "../components/utils/pages";

import Input from "../components/UI/Input/Input";
import TableComponent from "../components/Table";

const MainPage = () => {
    const [repo, setRepo] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
        const {data} = await RepositoryService.getAll(page, rowsPerPage, "stars", "stars");
        // для пагинации
        setRepo(data.items);
        const totalCount = data.total_count;
        setTotalPages(getPageCount(totalCount, limit));
    });

    useEffect(() => {
        fetchPosts(limit, page);
    }, [page, limit, rowsPerPage]);

    return (
        <Container maxWidth="lg">
            <Typography class="main-title" variant="h3" component="h1">
                Список репозиториев
            </Typography>
            <Input />
            <TableComponent
                page={page}
                setPage={setPage}
                totalPages={totalPages}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                repo={repo}
                isPostsLoading={isPostsLoading}
            />
        </Container>
    );
};

export default MainPage;
