import React, { useState } from 'react';
import {BrowserRouter as Router, useRouteMatch, Switch} from "react-router-dom";
import {MenuDrawer} from "../../components/menuDrawer/menuDrawer";
import {Login} from "../login/login";
import ProtectedRoute from "../protectedRoute/protectedRoute";
import {Home} from "../home/home";
import {Dashboard} from "../dashboard/dashboard";
import {Profile} from "../profile/profile";

export const AppPage = () => {
    let { path, url } = useRouteMatch();

    return (
        <div style={{
            flexDirection: "row",
            display: "flex",
            flex: 1
        }}>
            <MenuDrawer />
                    <Switch>
                        <ProtectedRoute exact path={`/`} component={Home} />
                        <ProtectedRoute path={`/dash`} component={Dashboard} />
                        <ProtectedRoute path={`/profile`} component={Profile} />
                    </Switch>
        </div>
    );
}