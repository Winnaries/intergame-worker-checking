import React, { useContext, useEffect } from "react";
import { Header } from "../../components/Decorations";
import { NewSession, EditSession } from "../../components/MiniForm";
import { SessionDetails } from "../../components/CustomTable";
import ScanQR from "../../components/ScanQR";
import { DisplayContext } from "../../contexts/DisplayContext";
import { ValueContext } from "../../contexts/ValueContext";
import Table from "../../components/Table";
import "../../styles/TablePage.css";
import Axios from "axios";

export default () => {
    const disp = useContext(DisplayContext);
    const val = useContext(ValueContext);
    // Change sessions to update from context

    useEffect(() => {
        Axios.get(val.API + "/sessions/active")
            .then(res => {
                val.setSessions(res.data);
            })
            .catch(e => console.log(e));
    }, [disp.displayStatus, val]);

    const createSession = event => {
        event.preventDefault();
        disp.setDisplay("creatingNewSession");
    };

    const renderTable = () => {
        const data = val.sessions;
        if (data) {
            return (
                <Table
                    data={data}
                    labels={["Team", "Time", "Workers"]}
                    key={JSON.stringify(data)}
                />
            );
        }
    };

    const reset = event => {
        event.preventDefault();
        disp.setDisplay(null);
    };

    const displayView = () => {
        const toRender = [];

        switch (disp.displayStatus) {
            case "creatingNewSession":
                toRender.push(<NewSession key={disp.displayStatus} />);
                break;
            case "editingSession":
                toRender.push(
                    <EditSession
                        key={disp.displayStatus}
                        session={val.currentSession}
                    />
                );
                break;
            case "viewingSessionDetails":
                toRender.push(<SessionDetails key={disp.displayStatus} />);
                break;
            case "scanQR":
                toRender.push(<ScanQR key={disp.displayStatus} />);
                break;
            default:
        }

        if (disp.backgroundBlur)
            toRender.push(
                <div
                    className="transparent-screen"
                    onClick={reset}
                    key={disp.backgroundBlur}
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
                    {renderTable()}
                </div>
                <button onClick={createSession}>Create Session</button>
            </div>
            {displayView()}
        </div>
    );
};
