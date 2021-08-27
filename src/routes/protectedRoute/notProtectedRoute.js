import React from "react";
import { Redirect, Route } from "react-router-dom";

function NotProtectedRoute({ component: Component, ...restOfProps }) {
    const isAuthenticated = localStorage.getItem("isAuthenticated");

    return (
        <Route
            {...restOfProps}
            render={(props) => (
                !isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
             )
            }
        />
    );
}

export default NotProtectedRoute;
