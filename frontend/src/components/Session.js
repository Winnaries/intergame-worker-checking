import React from "react";
import "../styles/Session.css";

export default props => {
    return (
        <div className={`session ${props.className}`} onClick={props.onClick}>
            <div className="session-name">{props.name}</div>
            <div className="session-time">{props.time}</div>
            <div className="session-workers-amount">{props.workers}</div>
        </div>
    );
};
