import React, { useState } from "react";
import "../styles/Table.css";

const Row = props => {
    // Takes in columns as an object
    const [columns] = useState(props.col_data);

    // Renders columns from given data
    const generateColumns = () =>
        Object.keys(columns).map(key => {
            return (
                <div className="col" key={key}>
                    {columns[key]}
                </div>
            );
        });

    return (
        <div className="row" onClick={props.onClick}>
            {generateColumns()}
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
        data.map((value, index) => {
            return (
                <Row col_data={value} key={index} onClick={props.rowOnClick} />
            );
        });

    // Renders labels from given labels
    const generateLabels = () =>
        labels.map((label, index) => {
            return (
                <div className="col" key={index}>
                    {label}
                </div>
            );
        });

    // Renders table which can be given additional class
    return (
        <div className={`table ${props.className ? props.className : ""}`}>
            <div className="table-label">{generateLabels()}</div>
            <div className="table-body">{generateRows()}</div>
        </div>
    );
};
