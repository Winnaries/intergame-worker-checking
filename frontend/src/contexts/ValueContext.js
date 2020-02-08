import React, { useState } from "react";

const ValueContext = React.createContext();

const ValueProvider = props => {

    const [values, setValues] = useState({
        QR: null,
        currentSession: null,
        sessions: [{
            name: "Building",
            startTime: "12.00-13.00",
            workers: 60
        },
        {
            name: "Stand Practice",
            startTime: "10.00-12.25",
            workers: 25
        },
        {
            name: "Stand Practice",
            startTime: "10.00-12.25",
            workers: 25
        },
        {
            name: "Stand Practice",
            startTime: "10.00-12.25",
            workers: 25
        },
        {
            name: "Stand Practice",
            startTime: "10.00-12.25",
            workers: 25
        },
        {
            name: "Stand Practice",
            startTime: "10.00-12.25",
            workers: 25
        },
        {
            name: "Stand Practice",
            startTime: "10.00-12.25",
            workers: 25
        }]
    });

    const setValue = (key, value) => {
        let dictCopy = {...values};
        dictCopy[key] = value;
        setValues(dictCopy);
    }

    const resetValues = () => Object.keys(values).map(key => values[key] = null);

    return (
        <ValueContext.Provider
            value={{
                values,
                setValue,
                resetValues
            }}
        >
            {props.children}
        </ValueContext.Provider>
    );
};

export { ValueContext, ValueProvider };
