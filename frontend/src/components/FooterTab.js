import React from "react";
import "../styles/FooterTab.css";

export default props => {


    return (
        <div className="footertab">
            <div
                className="disp-results hidden"
            >
                Display Results...
            </div>
            <div
                className="next disabled"
            >
                Next
            </div>
        </div>
    );
};
