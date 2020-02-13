import React, { useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { DisplayProvider } from "./contexts/DisplayContext.js";
import { ValueProvider, ValueContext } from "./contexts/ValueContext.js";
import { AdminForm, UserForm } from "./components/Form";
import ErrorPage from "./pages/user/ErrorPage.js";
import Dashboard from "./pages/admin/Dashboard.js";
import "./styles/Main.css";
import { toast } from "react-toastify";
import CurrentSessions from "./pages/user/CurrentSessions.js";

toast.configure();

const ProtectedRoute = props => {
    const val = useContext(ValueContext);

    if (val.getToken())
        return <Route exact path={props.path} component={props.component} />;
    else return <Redirect to="/admin" />;
};

const UserRoute = props => {
    const val = useContext(ValueContext);

    if (val.studentID)
        return <Route exact path={props.path} component={props.component} />;
    else return <Redirect to="/" />;
};

export default () => {
    return (
        <DisplayProvider>
            <ValueProvider>
                <Switch>
                    <Route exact path="/" component={UserForm} />
                    <Route exact path="/admin" component={AdminForm} />
                    <UserRoute
                        path="/current-sessions"
                        component={CurrentSessions}
                    />
                    <ProtectedRoute
                        path="/admin/dashboard"
                        component={Dashboard}
                    />
                    <Route path="*" component={ErrorPage} />
                </Switch>
            </ValueProvider>
        </DisplayProvider>
    );
};
