import React, { useState } from "react";

const ValueContext = React.createContext();

const ValueProvider = props => {
    const [QR, setQR] = useState(null);
    const [sessions, setSessions] = useState(null);
    const [studentID, setStudentID] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [nameNick, setNameNick] = useState(null);
    const [currentSession, setCurrentSession] = useState({});
    const [currentWorker, setCurrentWorker] = useState({});
    const [workers, setWorkers] = useState([]);
    const [API] = useState("http://winnaries.com:8080/api");

    const login = tokenString =>
        localStorage.setItem("token", `Bearer ${tokenString}`);

    const logout = () => localStorage.clear();

    const getToken = () => localStorage.getItem("token");

    return (
        <ValueContext.Provider
            value={{
                API,
                login,
                logout,
                getToken,
                currentSession,
                setCurrentSession,
                currentWorker,
                setCurrentWorker,
                workers,
                setWorkers,
                QR,
                setQR,
                sessions,
                setSessions,
                studentID,
                setStudentID,
                lastName,
                setLastName,
                firstName,
                setFirstName,
                nameNick,
                setNameNick
            }}
        >
            {props.children}
        </ValueContext.Provider>
    );
};

export { ValueContext, ValueProvider };
