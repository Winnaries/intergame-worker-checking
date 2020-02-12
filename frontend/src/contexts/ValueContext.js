import React, { useState } from "react";

const ValueContext = React.createContext();

const ValueProvider = props => {
    const [values, setValues] = useState({
        QR: null,
        sessions: null,
        workers: null,
        studentID: null
    });
    const [currentSession, setCurrentSession] = useState({});
    const [currentWorker, setCurrentWorker] = useState({});
    const [workers, setWorkers] = useState([]);
    const [API] = useState("http://winnaries.com:8080/api");

    const login = tokenString =>
        localStorage.setItem("token", `Bearer ${tokenString}`);

    const logout = () => localStorage.clear();

    const getToken = () => localStorage.getItem("token");

    const setValue = (key, value) => {
        let dictCopy = { ...values };
        dictCopy[key] = value;
        setValues(dictCopy);
    };

    return (
        <ValueContext.Provider
            value={{
                values,
                setValue,
                API,
                login,
                logout,
                getToken,
                currentSession,
                setCurrentSession,
                currentWorker,
                setCurrentWorker,
                workers,
                setWorkers
            }}
        >
            {props.children}
        </ValueContext.Provider>
    );
};

export { ValueContext, ValueProvider };
