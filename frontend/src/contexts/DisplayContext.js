import React, { useState, useEffect } from "react";

const DisplayContext = React.createContext();

const DisplayProvider = props => {
    /*
        showQR
        scanQR
        joinSessions
        backgroundBlur
        creatingNewSession
        viewingSessionDetails
        editingSession
        currentSessions
    */
    const [displayStatus, setDisplay] = useState(null);
    const [backgroundBlur, setBackgroundBlur] = useState(false);

    useEffect(() => {
        displayStatus !== null
            ? setBackgroundBlur(true)
            : setBackgroundBlur(false);
    }, [displayStatus]);

    return (
        <DisplayContext.Provider
            value={{
                displayStatus,
                setDisplay,
                backgroundBlur,
                setBackgroundBlur
            }}
        >
            {props.children}
        </DisplayContext.Provider>
    );
};

export { DisplayContext, DisplayProvider };
