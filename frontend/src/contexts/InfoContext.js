import React from "react";
import axios from "axios";

const InfoContext = React.createContext();

const InfoProvider = props => {

    return (
        <InfoContext.Provider
            value={{
                //FUNCTIONS
            }}
        >
            {props.children}
        </InfoContext.Provider>
    );
};

export { InfoContext, InfoProvider };
