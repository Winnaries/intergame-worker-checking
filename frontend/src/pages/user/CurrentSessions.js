import React, { useContext, useEffect } from "react";
import "../../styles/TablePage.css";
import { DisplayContext } from "../../contexts/DisplayContext";
import { ValueContext } from "../../contexts/ValueContext";
import { Header } from "../../components/Decorations";
import { SelectSession } from "../../components/CustomTable";
import ShowQR from "../../components/ShowQR";
import Table from "../../components/Table";
import Axios from "axios";

export default () => {
    const disp = useContext(DisplayContext);
    const val = useContext(ValueContext);

    const joinSession = event => {
        event.preventDefault();
        disp.setDisplay("joinSessions");
    };

    const reset = event => {
        event.preventDefault();
        disp.setDisplay(null);
    };

    const renderTable = () => {
        const data = val.sessions;
        if (data)
            return (
                <Table data={data} labels={["Teams", "Time", "Description"]} />
            );
    };

    useEffect(() => {
        const interval = setInterval(() => {
            Axios.get(val.API + "/workers/" + val.studentID + "/sessions")
                .then(res => val.setSessions(res.data))
                .catch(e => console.log(e));
        }, 500);

        return () => clearInterval(interval);
    }, [val]);

    const displayView = () => {
        const toRender = [];

        switch (disp.displayStatus) {
            case "joinSessions":
                toRender.push(<SelectSession key={disp.displayStatus} />);
                break;
            case "showQR":
                toRender.push(<ShowQR key={disp.displayStatus} />);
                break;
            default:
        }
        // For successful users if (disp_context.displayStatus.) toRender.push(<JoinSuccess/>);
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
                    <title>My Sessions</title>
                    {renderTable()}
                </div>
                <button onClick={joinSession}>Join Session</button>
            </div>
            {displayView()}
        </div>
    );
};
