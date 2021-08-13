import MainPage from "../pages/MainPage";
import RepositoryPage from "../pages/RepositoryPage";

export const routes = [
    {
        path: "/",
        component: MainPage,
        exact: true,
    },
    {
        path: "/repos/:owner/:name",
        component: RepositoryPage,
        exact: true,
    },
];
