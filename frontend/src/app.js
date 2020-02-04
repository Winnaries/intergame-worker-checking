import React from "react";
import { Route, Switch } from "react-router-dom";
import UserFormPage from "./pages/userFormPage.js";

export default () => {
    return(
        <Switch>
            <Route exact path="/" component={UserFormPage} />
        </Switch>
    )
};

/* protected route format
<UserRoute exact path="/questions">
                <QuestionProvider>
                    <Questions />
                </QuestionProvider>
            </UserRoute> 
            <Route component={ErrorPage} />*/
            