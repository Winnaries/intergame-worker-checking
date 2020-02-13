import React, { useState, useContext } from "react";
import "../styles/MiniForm.css";
import { DisplayContext } from "../contexts/DisplayContext";
import Axios from "axios";
import { ValueContext } from "../contexts/ValueContext";

const MiniForm = props => {
    // Takes in data as an object of varied data types
    const [field, setField] = useState(props.field || {});
    const [optionHeaders, setOptionHeaders] = useState({
        design: false,
        finance: false,
        hr: false,
        welfare: false,
        stand: false,
        show: false,
        structure: false
    });

    // Handle posting form
    const handleSubmit = event => {
        event.preventDefault();
        const toSubmit = { ...field };
        toSubmit.teams = Object.keys(optionHeaders).filter(
            key => optionHeaders[key]
        );
        if (toSubmit.teams.length > 0 && toSubmit.teams.length <= 3)
            props.onSubmit(toSubmit);
        else alert("Teams must be between 1 and 3");
    };

    // Handle change in form values
    const handleChange = event => {
        let fieldCopy = { ...field };
        fieldCopy[event.target.name] = event.target.value;
        setField(fieldCopy);
    };

    // Handle change in checkbox values
    const handleCheckboxChange = event => {
        let optionHeadersCopy = { ...optionHeaders };
        optionHeadersCopy[event.target.name] = event.target.checked;
        setOptionHeaders(optionHeadersCopy);
    };

    // Generate options method for label
    const generateOptions = array => {
        let toRender = array.map(element => {
            return (
                <div key={element}>
                    <input
                        type="checkbox"
                        name={element}
                        onChange={handleCheckboxChange}
                        checked={optionHeaders[element] || ""}
                    />
                    <label htmlFor={element}>{element}</label>
                </div>
            );
        });
        return toRender;
    };

    return (
        <div className={`miniform ${props.className ? props.className : ""}`}>
            <title>{props.title}</title>
            <form onSubmit={handleSubmit}>
                <div className="checkbox-group">
                    {generateOptions(props.field.teams)}
                </div>
                <input
                    name="date"
                    type="date"
                    placeholder="Date"
                    title="Enter the date"
                    value={field.date}
                    onChange={handleChange}
                    required
                />
                <input
                    name="start"
                    type="time"
                    placeholder="Start Time"
                    title="Provide the start time"
                    value={field.start}
                    onChange={handleChange}
                    required
                />
                <input
                    name="end"
                    type="time"
                    placeholder="End Time"
                    title="Provide the end time"
                    value={field.end}
                    onChange={handleChange}
                    required
                />
                <input
                    name="note"
                    type="text"
                    placeholder="Note (Optional)"
                    value={field.note}
                    onChange={handleChange}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

const convertDateForPost = date => {
    const month = parseInt(date.slice(5, 7)) - 1 + "";
    const day = date.slice(8, 10);
    return day + "/" + month;
};

export const EditSession = () => {
    // Define context
    const disp = useContext(DisplayContext);
    const val = useContext(ValueContext);

    // Define values
    const [field] = useState({
        teams: [
            "design",
            "finance",
            "HR",
            "welfare",
            "stand",
            "show",
            "structure"
        ],
        date: "2020-02-01",
        start: "00:00",
        end: "23:59",
        note: ""
    });

    // Submit handler
    const handleSubmit = field => {
        // Process data before posting
        const toSubmit = { ...field };
        toSubmit.date = convertDateForPost(toSubmit.date);
        if (toSubmit.note === "") delete toSubmit.note;

        const headers = {
            "Content-Type": "application/json",
            Authorization: val.getToken()
        };

        const sessionID = val.currentSession["_id"];

        Axios.put(val.API + "/admin/sessions/" + sessionID, toSubmit, {
            headers
        })
            .then(res => console.log(res))
            .catch(err => console.log(err));

        disp.setDisplay(null);
    };

    return (
        <div className="mini-form-page">
            <MiniForm
                title="Edit Session"
                field={field}
                onSubmit={handleSubmit}
            />
        </div>
    );
};

export const NewSession = () => {
    // Define context
    const disp = useContext(DisplayContext);
    const val = useContext(ValueContext);

    // Define values
    const [field] = useState({
        teams: [
            "design",
            "finance",
            "HR",
            "welfare",
            "stand",
            "show",
            "structure"
        ],
        date: "2020-02-01",
        start: "00:00",
        end: "23:59",
        note: ""
    });

    // Submit handler
    const handleSubmit = field => {
        // Process data before posting
        const toSubmit = { ...field };
        toSubmit.date = convertDateForPost(toSubmit.date);
        if (toSubmit.note === "") delete toSubmit.note;

        const headers = {
            "Content-Type": "application/json",
            Authorization: val.getToken()
        };

        Axios.post(val.API + "/admin/sessions", toSubmit, { headers })
            .then(res => {
                Axios.put(
                    val.API + "/admin/sessions/" + res.data["_id"] + "/open",
                    null,
                    { headers }
                )
                    .then(res => console.log(res))
                    .catch(err => console.log(err));
                console.log(res);
            })
            .catch(err => console.log(err));

        disp.setDisplay(null);
    };

    return (
        <div className="mini-form-page">
            <MiniForm
                title="Create New Session"
                field={field}
                onSubmit={handleSubmit}
            />
        </div>
    );
};
