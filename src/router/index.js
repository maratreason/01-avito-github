import MainPage from "../pages/MainPage";
import RepositoryPage from "../pages/RepositoryPage";

export const routes = [
    {
        path: "/",
        component: MainPage,
        exact: true,
    },
    {
        path: "/repo/:id",
        component: RepositoryPage,
        exact: true,
    },
];
