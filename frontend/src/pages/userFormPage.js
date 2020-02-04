import React, { useState } from "react";
import "../styles/userFormPage.css";
import QR from "../components/QR";

export default () => {
    const [field, setField] = useState({
        firstname: "",
        lastname: "",
        studentID: ""
    });
    const [errors, setErrors] = useState({
        firstname: false,
        lastname: false,
        studentID: false
    });
    const [redirect, setRedirect] = useState(false);

    const checkEmptyFields = () => {
        if (field.firstname === "" || field.lastname === "" || field.studentID === "") return true;
        return false;
    }

    const validateForm = () => {
        let currentErrors = {};

        if (!/^[a-zA-Z- ]{1,50}$/.test(field.firstname))
            currentErrors.firstname = true;
        if (!/^[a-zA-Z- ]{1,50}$/.test(field.lastname))
            currentErrors.lastname = true;
        if (!/^[0-9]{1,10}$/.test(field.studentID))
            currentErrors.studentID = true;

        if (Object.entries(currentErrors).length === 0) return true;
        setErrors(currentErrors);
        alert("Invalid information");
    };

    const handleSubmit = () => {
        console.log("Submitting...");
        if (validateForm()) setRedirect(true);
        // CODE TO SUBMIT HERE
    };

    const handleChange = event => {
        event.preventDefault();
        let fieldcopy = { ...field };
        fieldcopy[event.target.name] = event.target.value;
        setField(fieldcopy);
    };

    if(redirect) return <QR/>
    return (
        <div className="userFormPage">
            <div className="submitInfo">
                <div className="title">Enter Your Information</div>
                <form className="formExample" onSubmit={handleSubmit}>
                    <input
                        name="firstname"
                        type="text"
                        className="firstNameField formField"
                        onChange={handleChange}
                        value={field.firstname}
                        placeholder="First name"
                    />
                    <input
                        name="lastname"
                        type="text"
                        className="lastnameField formField"
                        onChange={handleChange}
                        value={field.lastname}
                        placeholder="Last name"
                    />
                    <input
                        name="studentID"
                        type="text"
                        className="studentIDField formField"
                        onChange={handleChange}
                        value={field.studentID}
                        placeholder="Student ID"
                    />
                    <button className="submitBtn" type="submit" disabled={checkEmptyFields()}>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};
