import React, { useState, useContext } from "react";
import QrReader from "react-qr-reader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ValueContext } from "../contexts/ValueContext";
import Axios from "axios";

export default () => {
    const val = useContext(ValueContext);

    const [result, setResult] = useState(null);

    const handleScan = data => {
        if (data !== null && data !== result) {
            val.setQR(data);
            // Sets the state for double checking
            setResult(data);

            const headers = {
                "Content-Type": "application/json",
                Authorization: val.getToken()
            };

            const toSend = {
                identifier: data
            };

            Axios.put(val.API + "/admin/workers/activate/" + val.currentSession["_id"], toSend, {
                headers
            })
                .then(res => {
                    console.log(res);
                    toast("QR successfully scanned");
                })
                .catch(e => console.log(e));
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
