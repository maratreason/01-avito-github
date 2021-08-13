import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {routes} from "../router";
// import Loader from "./UI/loader/Loader";

const AppRouter = () => {

    // if (isLoading) {
    //     return <Loader />
    // }
    return (
        <Switch>
            {routes.map((route) => (
                <Route component={route.component} path={route.path} exact={route.exact} key={route.path} />
            ))}
            <Redirect to="/" />
        </Switch>
    )
};

export default AppRouter;
