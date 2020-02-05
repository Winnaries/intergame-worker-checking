import React, { useState } from "react";
import "../../styles/Login.css";

export default () => {
    const [field, setField] = useState({
        secretKey:""
    });

    const handleSubmit = event => {
        event.preventDefault();
        // COMPARE SECRET KEY
        alert("Logged in");
    };

    const handleChange = event => {
        event.preventDefault();
        let fieldcopy = { ...field };
        fieldcopy[event.target.name] = event.target.value;
        setField(fieldcopy);
    };

    return (
        <div className="adminPage">
            <div className="whiteBox">
                <div className="title">Admin Login</div>
                <form className="whiteBoxForm" onSubmit={handleSubmit}>
                    <input
                        name="secretKey"
                        type="password"
                        className="firstNameField formField"
                        onChange={handleChange}
                        value={field.secretKey}
                        placeholder="Enter secret key"
                        required
                    />
                    <button
                        className="submitBtn"
                        type="submit"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};
