import React from "react";
import { Route, Switch } from "react-router-dom";
import UserFormPage from "./pages/userFormPage.js";
import AdminPage from "./pages/adminPage.js";
import { InfoProvider } from "./contexts/InfoContext.js";

export default () => {
    return (
        <InfoProvider>
            <Switch>
                <Route exact path="/" component={UserFormPage} />
                <Route exact path="/admin" component={AdminPage} />
            </Switch>
        </InfoProvider>
    );
};

/* protected route format
<UserRoute exact path="/questions">
                <QuestionProvider>
                    <Questions />
                </QuestionProvider>
            </UserRoute> 
            <Route component={ErrorPage} />*/
