import React, { useState, useRef } from "react";
import "../../styles/Login.css";
import { Redirect } from "react-router-dom";

export default () => {
    const [field, setField] = useState({
        secretKey: ""
    });
    const [redirect, setRedirect] = useState(false);

    const scrollToForm = ref => {
        window.scrollTo({ behavior: "smooth", top: 100, position: "absolute" });
    };

    const formRef = useRef(null);
    const executeScroll = () => scrollToForm(formRef);

    const handleSubmit = event => {
        event.preventDefault();
        // COMPARE SECRET KEY
        if(field.secretKey === "password") setRedirect(true);
    };

    const handleChange = event => {
        event.preventDefault();
        let fieldcopy = { ...field };
        fieldcopy[event.target.name] = event.target.value;
        setField(fieldcopy);
    };

    if(redirect) return <Redirect to="/admin/dashboard"/>
    return (
        <div className="adminPage">
            <div className="header">Intergames HR</div>
            <div className="whiteBox">
                <div className="title">Admin Login</div>
                <form className="whiteBoxForm" onSubmit={handleSubmit} ref={formRef}>
                    <input
                        name="secretKey"
                        type="password"
                        className="passwordField formField"
                        onChange={handleChange}
                        value={field.secretKey}
                        placeholder="Enter password"
                        required
                        onSelect={executeScroll}
                    />
                    <button className="submitBtn" type="submit">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};
