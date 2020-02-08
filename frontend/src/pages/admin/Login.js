import React, { useState } from "react";
import { Header } from "../../components/Decorations";
import "../../styles/WorkerForm.css";
import { Redirect } from "react-router-dom";

export default () => {
    // Define values
    const [field, setField] = useState({
        password: ""
    });
    const [redirect, setRedirect] = useState(false);

    // Form commands
    const clearForm = () => Object.keys(field).map(key => (field[key] = ""));

    // Handle posting form
    const handleSubmit = event => {
        event.preventDefault();

        // FAKE LOGIN SYSTEM
        if (field.password === "password") {
            setRedirect(true);
        }
    };

    // Handle change in form values
    const handleChange = event => {
        event.preventDefault();
        let fieldCopy = { ...field };
        fieldCopy[event.target.name] = event.target.value;
        setField(fieldCopy);
    };

    if (redirect) return <Redirect to="/admin/dashboard" />;
    // Render form to the user
    return (
        <div className="worker-form admin-form">
            <Header />
            <form onSubmit={handleSubmit}>
                <title>Admin Login</title>
                <input
                    name="password"
                    type="password"
                    placeholder="Enter password"
                    title="Enter admin password"
                    value={field.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};
