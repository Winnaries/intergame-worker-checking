import React, { useContext, useState } from "react";
import "../../styles/Login.css";
import "../../styles/Dashboard.css";
import { InfoContext } from "../../contexts/InfoContext";
import Session from "../../components/Session";
import CreateSession from "../../components/CreateSession";
import EditSession from "../../components/EditSession";


export default () => {
    const context = useContext(InfoContext);

    // Change sessions to update from context
    const [sessions, setSessions] = useState([
        {
            name: "Building",
            startTime: "12.00-13.00",
            endTime: +new Date(),
            workers: 60
        },
        {
            name: "Stand Practice",
            startTime: "10.00-12.25",
            endTime: +new Date(),
            workers: 25
        },
        {
            name: "Building",
            startTime: "12.45-14.00",
            endTime: +new Date(),
            workers: 10
        },
        {
            name: "Cutout",
            startTime: "9.00-12.00",
            endTime: +new Date(),
            workers: 35
        },
        {
            name: "Building",
            startTime: "12.45-14.00",
            endTime: +new Date(),
            workers: 10
        }
    ]);

    // Define view modes by "view", "edit", "create"
    const [viewMode, setViewMode] = useState("edit")

    const displayView = () => {
        switch(viewMode) {
            case "edit":
                return <EditSession/>
            case "create":
                return <CreateSession/>
            default:
                return null;
        }
    }

    const listSessions = () => {
        let toRender = sessions.map(session => {
            return (
                <Session
                    name={session.name}
                    time={session.startTime}
                    workers={session.workers}
                />
            );
        });
        return toRender;
    };

    return (
        <div className="dashboard">
            <div className="header">Intergames HR</div>
            <div className="white-box">
                <div className="sessions-title">Sessions</div>
                <Session name="Sector" time="Time" workers="People" className="sessions-label"/>
                <div className="sessions-content">
                    {listSessions()}
                </div>
            </div>
            <button className="sessions-create-btn">Create Session</button>
        </div>
    );
};
