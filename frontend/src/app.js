import React from "react";
import { Route, Switch } from "react-router-dom";
import { DisplayProvider } from "./contexts/DisplayContext.js";
import { ValueProvider } from "./contexts/ValueContext.js";
import WorkerForm from "./pages/user/WorkerForm.js";
import ErrorPage from "./pages/user/ErrorPage.js";
import Login from "./pages/admin/Login.js";
import Dashboard from "./pages/admin/Dashboard.js";
import "./styles/Main.css";
import { toast } from "react-toastify";
import CurrentSessions from "./pages/user/CurrentSessions.js";

toast.configure();

export default () => {
    return (
        <DisplayProvider>
            <ValueProvider>
                <Switch>
                    <Route exact path="/" component={WorkerForm} />
                    <Route
                        exact
                        path="/current-sessions"
                        component={CurrentSessions}
                    />
                    <Route exact path="/admin" component={Login} />
                    <Route
                        exact
                        path="/admin/dashboard"
                        component={Dashboard}
                    />
                    <Route path="*" component={ErrorPage} />
                </Switch>
            </ValueProvider>
        </DisplayProvider>
    );
};
