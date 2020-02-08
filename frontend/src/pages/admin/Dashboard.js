import React, { useState, useContext } from "react";
import { Header } from "../../components/Decorations";
import NewSession from "../../components/NewSession";
import EditSession from "../../components/EditSession";
import SessionDetails from "../../components/SessionDetails";
import ScanQR from "../../components/ScanQR";
import { DisplayContext } from "../../contexts/DisplayContext";
import { ValueContext } from "../../contexts/ValueContext";
import Table from "../../components/Table";
import "../../styles/TablePage.css";

export default () => {
    const disp = useContext(DisplayContext);
    const val = useContext(ValueContext);
    // Change sessions to update from context

    const viewSessionDetails = event => {
        event.preventDefault();
        val.setValue("currentSession",event.target.name);
        disp.setDisplay("viewingSessionDetails");
    }

    const createSession = event => {
        event.preventDefault();
        disp.setDisplay("creatingNewSession");
    };

    const reset = event => {
        event.preventDefault();
        disp.setDisplay(null);
    }

    const displayView = () => {
        const toRender = [];

        switch(disp.displayStatus) {
            case "creatingNewSession":
                toRender.push(<NewSession/>);
                break;
            case "editingSession":
                toRender.push(<EditSession/>);
                break;
            case "viewingSessionDetails":
                toRender.push(<SessionDetails/>);
                break;
            case "scanQR":
                toRender.push(<ScanQR/>);
                break;
            default:
        }
            
        if (disp.backgroundBlur)
            toRender.push(
                <div
                    className="transparent-screen"
                    onClick={reset}
                />
            );

        return <div>{toRender}</div>;
    };

    return (
        <div className="current-sessions">
            <div
                className={`current-sessions-bkg ${
                    disp.backgroundBlur ? "blurred" : ""
                }`}
            >
                <Header />

                <div className="white-box">
                    <title>Active Sessions</title>
                    <Table data={val.values.sessions} labels={["Team", "Time", "People"]} rowOnClick={viewSessionDetails}/>
                </div>
                <button onClick={createSession}>Create Session</button>
            </div>
            {displayView()}
        </div>
    );
};