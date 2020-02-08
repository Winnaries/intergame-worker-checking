import React, { useState, useContext } from "react";
import "../styles/JoinSuccess.css";
import { ValueContext } from "../contexts/ValueContext";

export default () => {
    const val = useContext(ValueContext);

    return (
        <div className="join-success">
            {`You have joined ${val.values.currentSession?val.values.currentSession:"session"}`}
        </div>
    );
};
