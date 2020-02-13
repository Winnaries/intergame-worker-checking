import React, { useState, useContext, useEffect } from "react";
import "../styles/CustomTable.css";
import { DisplayContext } from "../contexts/DisplayContext";
import { ValueContext } from "../contexts/ValueContext";
import Axios from "axios";

// Child component of SelectSession
const SessionJoin = props => {
    const handleClick = event => {
        event.preventDefault();
        props.buttonClick(props.value);
    };

    return (
        <div className="session-join">
            <div className="session-name">
                {props.value.description || props.value.teams.join(",")}
            </div>
            <button onClick={handleClick}>Join</button>
        </div>
    );
};

// Window allowing users to select session to join
export const SelectSession = () => {
    // Define context
    const disp = useContext(DisplayContext);
    const val = useContext(ValueContext);

    // Refer to properties for session data
    const [sessions, setSessions] = useState([]);

    const headers = {
        "Content-Type": "application/json",
        Authorization: val.getToken()
    };

    const joinSession = session => {
        const sessionID = session["_id"];

        const toSend = {
            nameNick: val.nameNick,
            studentID: val.studentID
        };

        // MAKE THIS SPECIFIC TO SESSION

        Axios.post(val.API + "/workers/pend/" + sessionID, toSend, { headers })
            .then(res => {
                console.log(res.data);
                val.setQR(res.data.identifier);
                disp.setDisplay("showQR");

            })
            .catch(e => console.log(e));
    };

    useEffect(() => {
        const interval = setInterval(() => {
            console.log("getting all available sessions: ", val.studentID);
            Axios.get(val.API + "/sessions/active")
                .then(res => {
                    const test = val.sessions.map(session => session["_id"]);
                    const toComp = res.data.map(session => session["_id"]);
                    const diff = toComp.filter(
                        element => !test.includes(element)
                    );
                    const filteredArr = res.data.filter(session =>
                        diff.includes(session["_id"])
                    );
                    setSessions(filteredArr);
                })
                .catch(e => console.log(e));
        }, 500);

        return () => clearInterval(interval);
    }, [val.API, val.studentID, val.sessions]);

    const listSessions = () =>
        sessions.map((session, index) => {
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
    if (isSuspicious)
        return (
            <div className="suspicious">
                <span role="img" aria-label="emoji">
                    🤨
                </span>
            </div>
        );
};

// Child component of SessionDetail
const SessionWorker = props => {
    const handleClick = event => {
        event.preventDefault();
        props.buttonClick(props.value);
    };

    return (
        <div className="worker">
            <div className="worker-name">
                {suspiciousEmoji(props.value.suspicious)}
                {props.value.active ? "" : "(Inactive)"}
                {props.value.worker.name.nick}
            </div>
            <div className="deleteBtn" onClick={handleClick}>
                Delete
            </div>
        </div>
    );
};

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
        const headers = {
            "Content-Type": "application/json",
            Authorization: val.getToken()
        };
        const interval = setInterval(() => {
            const sessionID = val.currentSession["_id"];
            Axios.get(val.API + "/workers/" + sessionID, { headers })
                .then(res => {
                    val.setWorkers(res.data);
                })
                .catch(e => console.log(e));
        }, 500);

        return () => clearInterval(interval);
    }, [disp.setDisplay, val.workers]);

    const addWorkers = event => {
        event.preventDefault();
        disp.setDisplay("scanQR");
    };

    const deleteWorker = worker => {
        // MAKE THIS DELETE WORKER;

        const sessionID = val.currentSession["_id"];
        const studentID = worker.worker.cuid;

        Axios.delete(
            val.API + "/admin/workers/" + sessionID + "/" + studentID,
            {
                headers
            }
        )
            .then(res => console.log(res))
            .catch(err => console.log(err));

        disp.setDisplay("viewingSessionDetails");
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
