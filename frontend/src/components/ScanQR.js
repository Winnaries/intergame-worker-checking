import React, { useState, createContext, useContext } from "react";
import QrReader from "react-qr-reader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ValueContext } from "../contexts/ValueContext";

export default () => {
    const val = useContext(ValueContext);
    
    const [result, setResult] = useState(null);

    const handleScan = data => {
        if (data !== null && data !== result) {
            val.setValue("QR", data);
            // Sets the state for double checking
            setResult(data);
            
            toast("QR successfully scanned");
        }
    };

    const handleError = err => {
        console.error(err);
    };

    return (
        <div className="qr-reader">
            <QrReader
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ width: "100%" }}
            />
        </div>
    );
};
