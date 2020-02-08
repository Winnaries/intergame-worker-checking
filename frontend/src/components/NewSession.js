import React, { useContext } from "react";
import "../styles/MiniFormPage.css";
import { DisplayContext } from "../contexts/DisplayContext";
import MiniForm from "./MiniForm";

export default () => {

    const disp = useContext(DisplayContext);

    const handleSubmit = () => {
        disp.setDisplay(null);
    };

    return (
        <div className="mini-form-page">
            <MiniForm
                title="Create New Session"
                field={{
                    teams: [
                        "design",
                        "finance",
                        "hr",
                        "welfare",
                        "stand",
                        "show",
                        "structure"
                    ],
                    date: "2019-01-12",
                    startTime: "00:00",
                    endTime: "23:59",
                    note: "",
                }}
                onSubmit={handleSubmit}
            />
        </div>
    );
};
