import React from "react";
import "../styles/HeaderTab.css";

export default props => {
    return (
        <div className="headertab">
            <div className="logo-text">
                {props.title}
            </div>
        </div>
    );
}

/*

            <div className="home" onClick="#">
                Home
            </div>
            <div className="log-out" onClick="#">
                Logout
            </div>
*/
