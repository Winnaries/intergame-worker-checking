import React, { useState } from "react";
import "../styles/Form.css";

export default props => {
    // Define values
    const [field, setField] = useState(props.field);

    // Form commands
    const clearForm = () => Object.keys(field).map(key => (field[key] = ""));

    // Handle posting form
    const handleSubmit = event => {
        event.preventDefault();
        props.onSubmit();
    };

    // Handle change in form values
    const handleChange = event => {
        event.preventDefault();
        let fieldCopy = { ...field };
        fieldCopy[event.target.name] = event.target.value;
        setField(fieldCopy);
    };

    // Render form to the user
    return (
        <div className={`form ${props.className?props.className:""}`}>
            <form onSubmit={handleSubmit}>
                <title>Enter Your Information</title>
                <input
                    name="firstName"
                    type="text"
                    pattern="^[a-zA-Z- ]{1,50}$"
                    placeholder="First name"
                    title="Enter your first name"
                    value={field.firstname}
                    onChange={handleChange}
                    required
                />
                <input
                    name="lastName"
                    type="text"
                    pattern="^[a-zA-Z- ]{1,50}$"
                    placeholder="Last name"
                    title="Enter your last name"
                    value={field.lastname}
                    onChange={handleChange}
                    required
                />
                <input
                    name="studentID"
                    type="text"
                    pattern="^[0-9]{10}$"
                    placeholder="Student ID"
                    title="Enter your Chulalongkorn Student ID"
                    value={field.studentID}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};
