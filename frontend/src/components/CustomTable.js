import React, { useState, useContext, useEffect, useCallback } from "react";
import "../styles/CustomTable.css";
import { DisplayContext } from "../contexts/DisplayContext";
import { ValueContext } from "../contexts/ValueContext";
import Axios from "axios";

// Child component of SelectSession
const SessionJoin = props => (
    <div className="session-join">
        <div className="session-name">{props.value.name}</div>
        <button onClick={props.buttonClick}>Join</button>
    </div>
);

// Window allowing users to select session to join
export const SelectSession = props => {
    // Define context
    const disp = useContext(DisplayContext);

    // Refer to properties for session data
    const [sessions] = useState(props.sessions || []);

    const joinSession = event => {
        event.preventDefault();
        // MAKE THIS SPECIFIC TO SESSION
        disp.setDisplay("showQR");
    };

    const listSessions = () =>
        sessions.map((session, index) => {
            console.log(index);
            return (
                <SessionJoin
                    value={session}
                    key={index}
                    buttonClick={joinSession}
                />
            );
        });

    return (
        <div className="select-session">
            <title>Available Sessions</title>
            <div className="available-sessions">{listSessions()}</div>
        </div>
    );
};

const suspiciousEmoji = isSuspicious => {
    if (isSuspicious) return <div className="suspicious">🤨</div>;
};

// Child component of SessionDetail
const SessionWorker = props => (
    <div className="worker">
        <div className="worker-name">
            {suspiciousEmoji(props.value.suspicious)}
            {props.value.code}
        </div>
        <div className="deleteBtn" onClick={props.buttonClick}>
            Delete
        </div>
    </div>
);

// Window allowing admin to view session details (i.e. workers)
export const SessionDetails = () => {
    // Define context
    const disp = useContext(DisplayContext);
    const val = useContext(ValueContext);

    // Refer to properties for worker data
    const workers = val.workers || [];
    const sessionNote = val.currentSession.description || "";

    const headers = {
        "Content-Type": "application/json",
        Authorization: val.getToken()
    };

    useEffect(() => {
        const sessionID = val.currentSession["_id"];

        Axios.get(val.API + "/workers/" + sessionID, { headers })
            .then(res => {
                val.setWorkers(res.data);
            })
            .catch(e => console.log(e));
    }, [val.workers]);

    const addWorkers = event => {
        event.preventDefault();
        disp.setDisplay("scanQR");
    };

    const deleteWorker = event => {
        event.preventDefault();
        // MAKE THIS DELETE WORKER;

        const sessionID = val.currentSession["_id"];
        const studentID = val.currentWorker["_id"];

        Axios.delete(val.API + "/admin/worker/" + sessionID + "/" + studentID, {
            headers
        })
            .then(res => console.log(res))
            .catch(err => console.log(err));
        alert("deleted");
    };

    const editSession = event => {
        event.preventDefault();
        disp.setDisplay("editingSession");
    };

    const deleteSession = event => {
        event.preventDefault();

        const headers = {
            "Content-Type": "application/json",
            Authorization: val.getToken()
        };

        const sessionID = val.currentSession["_id"];

        Axios.delete(val.API + "/admin/sessions/" + sessionID, {
            headers
        })
            .then(res => console.log(res))
            .catch(err => console.log(err));

        disp.setDisplay(null);
    };

    const listWorkers = () =>
        workers.map(worker => (
            <SessionWorker
                value={worker}
                key={JSON.stringify(worker)}
                buttonClick={deleteWorker}
            />
        ));

    const renderNote = () => {
        return sessionNote;
    };

    return (
        <div className="session-details">
            <div className="head-block">
                <div className="details-title">Session Details</div>
            </div>
            <div className="body-block">
                <div className="headings">
                    <div className="subtitle-workers">{renderNote()}</div>
                    <div className="add-workers" onClick={addWorkers}>
                        Add
                        <br />
                        worker
                    </div>
                </div>
                <div className="available-workers">{listWorkers()}</div>
            </div>
            <div className="foot-block">
                <div className="go-edit" onClick={editSession}>
                    Edit Session
                </div>
                <div className="go-delete" onClick={deleteSession}>
                    Delete Session
                </div>
            </div>
        </div>
    );
};
