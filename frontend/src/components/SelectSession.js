import React, { useState, useContext } from "react";
import "../styles/SelectSession.css";
import SessionJoin from "./SessionJoin";
import { DisplayContext } from "../contexts/DisplayContext";

export default props => {
    const disp = useContext(DisplayContext);

    const [sessions, setSessions] = useState([
        {
            name: "Stand Practice",
            startTime: "10.00-12.25",
            endTime: +new Date(),
            workers: 25
        },
        {
            name: "Stand Practice",
            startTime: "10.00-12.25",
            endTime: +new Date(),
            workers: 25
        },
        {
            name: "Stand Practice",
            startTime: "10.00-12.25",
            endTime: +new Date(),
            workers: 25
        },
        {
            name: "Stand Practice",
            startTime: "10.00-12.25",
            endTime: +new Date(),
            workers: 25
        },
        {
            name: "Stand Practice",
            startTime: "10.00-12.25",
            endTime: +new Date(),
            workers: 25
        }
    ]);

    const joinSession = event => {
        event.preventDefault();
        disp.resetDisplay();
        disp.setDisplay("showQR", true);
    };

    const listSessions = () => {
        let toRender = sessions.map(session => {
            return (
                <SessionJoin
                    name={session.name}
                    time={session.startTime}
                    workers={session.workers}
                    buttonClick={joinSession}
                />
            );
        });
        return toRender;
    };

    return (
        <div className="select-session">
            <title>Available Sessions</title>
            <table>
                {listSessions()}
            </table>
        </div>
    );
};
