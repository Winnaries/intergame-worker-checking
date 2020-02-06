import React, { useState } from "react";
import QR from "../../components/QR";
import { Header } from "../../components/Decorations";
import "../../styles/WorkerForm.css";

export default () => {
    // Define values
    const [field, setField] = useState({
        firstName: "",
        lastName: "",
        studentID: ""
    });
    const [generateQR, setGenerateQR] = useState(false);

    // Form commands
    const scrollToForm = () =>
        window.scrollTo({ behavior: "smooth", top: 100, position: "absolute" });
    const clearForm = () => Object.keys(field).map(key => (field[key] = ""));

    // Handle posting form
    const handleSubmit = event => {
        event.preventDefault();
        console.log("Submitting...");
        clearForm();
        // CODE HERE TO GENERATE QR
        setGenerateQR(true);
    };

    // Handle change in form values
    const handleChange = event => {
        event.preventDefault();
        setField(
            Object.keys(field).map(
                () => (field[event.target.name] = event.target.value)
            )
        );
    };

    // Return the QR code to the user
    if (generateQR)
        return (
            <QR
                firstname={field.firstname}
                lastname={field.lastname}
                studentID={field.studentID}
            />
        );
    // Render form to the user
    return (
        <div className="worker-form">
            <Header />
            <div className="white-box">
                <title>Enter Your Information</title>
                <form onSubmit={handleSubmit}>
                    <input
                        name="firstName"
                        type="text"
                        className="first-name"
                        pattern="^[a-zA-Z- ]{1,50}$"
                        placeholder="First name"
                        title="Enter your first name"
                        value={field.firstname}
                        onChange={handleChange}
                        onSelect={scrollToForm}
                        required
                    />
                    <input
                        name="lastName"
                        type="text"
                        className="last-name"
                        pattern="^[a-zA-Z- ]{1,50}$"
                        placeholder="Last name"
                        title="Enter your last name"
                        value={field.lastname}
                        onChange={handleChange}
                        onSelect={scrollToForm}
                        required
                    />
                    <input
                        name="studentID"
                        type="text"
                        className="student-ID"
                        pattern="^[0-9]{10}$"
                        placeholder="Student ID"
                        title="Enter your Chulalongkorn Student ID"
                        value={field.studentID}
                        onChange={handleChange}
                        onSelect={scrollToForm}
                        required
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};
