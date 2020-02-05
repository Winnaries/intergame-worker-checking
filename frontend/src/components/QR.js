import React, { useContext, useState } from "react";
import QRCode from "qrcode.react";
import "../styles/QR.css";
import { Redirect } from "react-router-dom";

export default props => {


    const handleClick = event => {
        event.preventDefault();
        props.clear();
        props.redirect(false);
    };

    return (
        <div className="qr">
            <div className="qrcode">
                <QRCode
                    value={`http://backend.com/api/?firstname=${props.firstname}?lastname=${props.name}?studentID=${props.studentID}`}
                    className="generated"
                    size="2048"
                />
            </div>
            <button className="btn" onClick={handleClick}>
                Go back
            </button>
        </div>
    );
};
 
