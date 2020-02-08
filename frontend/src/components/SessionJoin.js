import React from "react";
import "../styles/SessionJoin.css";

export default props => {
    return (
        <div className="session-join" onClick={props.onClick}>
            <div className="session-name">{props.name}</div>
            <button onClick={props.buttonClick}>Join</button>
        </div>
    );
};
