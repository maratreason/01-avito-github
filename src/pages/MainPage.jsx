import React, {useState, useEffect} from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import RepositoryService from "../api/RepositoryService";
import {useFetching} from "../hooks/useFetching";
import {useRepos} from "../hooks/useRepos";
import {getPageCount} from "../components/utils/pages";
import TableComponent from "../components/Table";
import ReposFilter from "../components/ReposFilter";

const MainPage = () => {
    const [repos, setRepo] = useState([]);
    const [filter, setFilter] = useState({sort: "", query: ""});
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const sortedAndSearchedRepos = useRepos(repos, filter.sort, filter.query);

    const [fetchRepos, isPostsLoading, postError] = useFetching(async (page) => {
        const {data} = await RepositoryService.getAll(page, rowsPerPage, "stars", "stars");
        const totalCount = data.total_count;
        setRepo(data.items);
        setTotalPages(getPageCount(totalCount, limit));
    });

    useEffect(() => {
        fetchRepos(page);
    }, [page, rowsPerPage]);

    return (
        <Container maxWidth="lg">
            <Typography className="main-title" variant="h3" component="h1">
                Список репозиториев
            </Typography>
            <ReposFilter filter={filter} setFilter={setFilter} />
            <TableComponent
                page={page}
                setPage={setPage}
                totalPages={totalPages}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                repos={sortedAndSearchedRepos}
                isPostsLoading={isPostsLoading}
            />
        </Container>
    );
};

export default MainPage;
