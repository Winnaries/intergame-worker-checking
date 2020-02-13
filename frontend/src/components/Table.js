import React, { useState, useContext } from "react";
import "../styles/Table.css";
import { ValueContext } from "../contexts/ValueContext";
import { DisplayContext } from "../contexts/DisplayContext";

const Row = props => {
    // Set context
    const disp = useContext(DisplayContext);
    const val = useContext(ValueContext);
    // Takes in columns as an object
    const [session] = useState(props.value);

    const getDate = String => {
        const date = new Date(String);
        const day = date.getUTCDate();
        const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sept",
            "Oct",
            "Nov",
            "Dec"
        ];
        const month = months[date.getUTCMonth()];
        return day + " " + month;
    };

    const getTimeRange = (time_one, time_two) => {
        const time1 = new Date(time_one);
        const time2 = new Date(time_two);
        const hours1 = time1.getUTCHours();
        const minutes1 =
            (time1.getUTCMinutes() < 10 ? "0" : "") + time1.getUTCMinutes();
        const hours2 = time2.getUTCHours();
        const minutes2 =
            (time2.getUTCMinutes() < 10 ? "0" : "") + time2.getUTCMinutes();
        return hours1 + ":" + minutes1 + " - " + hours2 + ":" + minutes2;
    };

    const setSession = event => {
        event.preventDefault();
        val.setWorkers(session.workers);
        val.setCurrentSession(props.value);
        disp.setDisplay("viewingSessionDetails");
    }

    return (
        <div className="row" onClick={session.workers?setSession:null}>
            <div className="col">{[...session.teams].join(", ")}</div>
            <div className="col middle">
                {getDate(session.time.start)}
                <br />
                {getTimeRange(session.time.start, session.time.end)}
            </div>
            <div className="col">{session.workers?session.workers.length:session.description}</div>
        </div>
    );
};

export default props => {

    // Takes in data as an array of objects
    const [data] = useState(props.data || []);
    // Takes in labels as an array
    const [labels] = useState(props.labels || []);

    // Renders rows from data
    const generateRows = () =>
        data.map(session => (
            <Row
                value={session}
                key={session._id}
            />
        ));

    // Renders labels from given labels
    const generateLabels = () =>
        labels.map((label, index) => (
            <div className="col" key={index}>
                {label}
            </div>
        ));

    // Renders table which can be given additional class
    return (
        <div className={`table ${props.className ? props.className : ""}`}>
            <div className="table-label">{generateLabels()}</div>
            <div className="table-body">{generateRows()}</div>
        </div>
    );
};
