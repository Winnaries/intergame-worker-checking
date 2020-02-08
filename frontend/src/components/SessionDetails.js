import React, { useState, useContext } from "react";
import "../styles/SessionDetails.css";
import SessionJoin from "./SessionJoin";
import { DisplayContext } from "../contexts/DisplayContext";

export default props => {
    const disp = useContext(DisplayContext);

    const [workers, setWorkers] = useState([
        {
            firstname: "Test",
            lastname: "Last",
            studentID: "6238193255"
        }
    ]);

    const addWorkers = event => {
        event.preventDefault();
        disp.setDisplay("scanQR");
    };

    const editSession = event => {
        event.preventDefault();
        disp.setDisplay("editingSession");
    };

    const listSessions = () => {
        let toRender = workers.map(session => {
            return (
                <SessionJoin
                    name={session.firstname}
                    time={session.lastname}
                    workers={session.studentID}
                />
            );
        });
        return toRender;
    };

    return (
        <div className="session-details">
            <title>Session Details</title>
            <div className="go-edit" onClick={editSession}>
                Edit
            </div>
            <div className="subtitle-workers">Workers</div>
            <table>{listSessions()}</table>
            <div className="add-workers" onClick={addWorkers}>Add workers</div>
        </div>
    );
};
