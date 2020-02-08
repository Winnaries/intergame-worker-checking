import React, { useState, useContext } from "react";
import "../styles/MiniForm.css";
import SessionJoin from "./SessionJoin";
import { DisplayContext } from "../contexts/DisplayContext";

export default props => {

    // Takes in data as an object of varied data types
    const [field, setField] = useState(props.field || {});

    // Form commands
    const clearForm = () => Object.keys(field).map(key => (field[key] = ""));

    // Handle posting form
    const handleSubmit = event => {
        event.preventDefault();
        props.onSubmit();
        // CODE HERE TO GENERATE QR
    };

    // Handle change in form values
    const handleChange = event => {
        event.preventDefault();
        let fieldCopy = { ...field };
        fieldCopy[event.target.name] = event.target.value;
        setField(fieldCopy);
    };

    // Generate options method for label
    const generateOptions = array => {
        let toRender = array.map((element, index) => {
            return <option value={element} key={index}>{element}</option>;
        });
        return [<option value="DEFAULT" disabled key="default">Select option...</option>,...toRender];
    };

    return (
        <div className={`miniform ${props.className?props.className:""}`}>
            <title>{props.title}</title>
            <form onSubmit={handleSubmit}>
                <select name="team" defaultValue={'DEFAULT'}>{generateOptions(field.teams)}</select>
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
                    name="startTime"
                    type="time"
                    placeholder="Start Time"
                    title="Provide the start time"
                    value={field.startTime}
                    onChange={handleChange}
                    required
                />
                <input
                    name="endTime"
                    type="time"
                    placeholder="End Time"
                    title="Provide the end time"
                    value={field.endTime}
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
