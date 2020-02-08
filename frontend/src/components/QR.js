import React, { useContext } from "react";
import "../styles/QR.css";
import QRCode from "qrcode.react";
import { ValueContext } from "../contexts/ValueContext";

export default () => {
    const val = useContext(ValueContext);

    return (
        <div className="qr">
            <div className="qrcode">
                <QRCode
                    value={val.values.QR?val.values.QR:""}
                    className="generated"
                    size="2048"
                />
            </div>
        </div>
    );
};

