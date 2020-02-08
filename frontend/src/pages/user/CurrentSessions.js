import React, { useContext } from "react";
import "../../styles/TablePage.css";
import { DisplayContext } from "../../contexts/DisplayContext";
import { ValueContext } from "../../contexts/ValueContext";
import { Header } from "../../components/Decorations";
import SelectSession from "../../components/SelectSession";
import QR from "../../components/QR";
import Table from "../../components/Table";


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
    }

    const displayView = () => {
        const toRender = [];

        switch(disp.displayStatus) {
            case "joinSessions":
                toRender.push(<SelectSession />);
                break;
            case "showQR":
                toRender.push(<QR />);
                break;
            default:
        }
        // For successful users if (disp_context.displayStatus.) toRender.push(<JoinSuccess/>);
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
                    <title>My Sessions</title>
                    <Table data={val.values.sessions} labels={["Team", "Date", "People"]}/>
                </div>
                <button onClick={joinSession}>Join Session</button>
            </div>
            {displayView()}
        </div>
    );
};
