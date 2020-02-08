import React, { useState, useContext } from "react";
import { Header } from "../../components/Decorations";
import "../../styles/WorkerForm.css";
import CurrentSessions from "./CurrentSessions";
import Form from "../../components/Form";
import { DisplayContext } from "../../contexts/DisplayContext";

export default () => {
    const disp = useContext(DisplayContext);

    // Define values
    const [field, setField] = useState({
        firstName: "",
        lastName: "",
        studentID: ""
    });

    const handleSubmit = () => {
        disp.setDisplay("currentSessions");
    }

    // Return the QR code to the user
    if (disp.displayStatus === "currentSessions") return <CurrentSessions />;
    // Render form to the user
    return (
        <div className="worker-form">
            <Header />
            <Form onSubmit={handleSubmit} field={field}/>
        </div>
    );
};
