import React, { useState, useContext } from "react";
import "../styles/Form.css";
import { Redirect } from "react-router-dom";
import { Header } from "./Decorations";
import Axios from "axios";
import { ValueContext } from "../contexts/ValueContext";

// Handle change in form values
const handleChange = (event, fields, setter) => {
    event.preventDefault();
    let fieldsCopy = { ...fields };
    fieldsCopy[event.target.name] = event.target.value;
    setter(fieldsCopy);
};

export const AdminForm = () => {
    // Define context
    const val = useContext(ValueContext);

    // Define values
    const [field, setField] = useState({
        password: ""
    });
    const [redirect, setRedirect] = useState(false);

    // Set specific handler
    const adminChange = event => handleChange(event, field, setField);
    const adminSubmit = event => {
        event.preventDefault();

        const headers = {
            "Content-Type": "application/json"
        };

        Axios.post(val.API + "/login", field, { headers })
            .then(res => {
                val.login(res.data.token);
                setRedirect(true);
            })
            .catch(err => {
                console.log(err);
                alert("Invalid");
            });
    };

    if (redirect) return <Redirect to="/admin/dashboard" />;
    // Render form to the admin
    return (
        <div className="form-page admin-form">
            <Header />
            <form onSubmit={adminSubmit}>
                <title>Admin Login</title>
                <input
                    name="password"
                    type="password"
                    placeholder="Enter password"
                    title="Enter admin password"
                    value={field.password}
                    onChange={adminChange}
                    required
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export const UserForm = () => {
    // Define context
    const val = useContext(ValueContext);

    // Define values
    const [field, setField] = useState({
        firstName: "",
        lastName: "",
        studentID: ""
    });
    const [redirect, setRedirect] = useState(false);

    // Set specific handlers
    const userChange = event => handleChange(event, field, setField);
    const userSubmit = event => {
        event.preventDefault();
        // Do something
        val.setValue("studentID", field.studentID);
        setRedirect(true);
    };

    if (redirect) return <Redirect to="/current-sessions" />;
    // Render form to the user
    return (
        <div className="form-page">
            <Header />
            <form onSubmit={userSubmit} className="form">
                <title>Enter Your Information</title>
                <input
                    name="firstName"
                    type="text"
                    pattern="^[a-zA-Z- ]{1,50}$"
                    placeholder="First name"
                    title="Enter your first name"
                    value={field.firstname}
                    onChange={userChange}
                    required
                />
                <input
                    name="lastName"
                    type="text"
                    pattern="^[a-zA-Z- ]{1,50}$"
                    placeholder="Last name"
                    title="Enter your last name"
                    value={field.lastname}
                    onChange={userChange}
                    required
                />
                <input
                    name="studentID"
                    type="text"
                    pattern="^[0-9]{10}$"
                    placeholder="Student ID"
                    title="Enter your Chulalongkorn Student ID"
                    value={field.studentID}
                    onChange={userChange}
                    required
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

// Form commands
//const clearForm = fields => Object.keys(fields).map(key => (fields[key] = ""));
