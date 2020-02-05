import React from "react";
import { Route, Switch } from "react-router-dom";
import { InfoProvider } from "./contexts/InfoContext.js";
import WorkerForm from "./pages/user/WorkerForm.js";
import Login from "./pages/admin/Login.js";
import Dashboard from "./pages/admin/Dashboard.js";

export default () => {
    return (
        <InfoProvider>
            <Switch>
                <Route exact path="/" component={WorkerForm} />
                <Route exact path="/admin" component={Login} />
                <Route path="/admin/dashboard" component={Dashboard} />
            </Switch>
        </InfoProvider>
    );
};
