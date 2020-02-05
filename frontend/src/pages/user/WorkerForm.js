import React, { useState } from "react";
import "../../styles/WorkerForm.css";
import QR from "../../components/QR";

export default () => {
    const [field, setField] = useState({
        firstname: "",
        lastname: "",
        studentID: ""
    });
    const [redirect, setRedirect] = useState(false);

    const clearForm = () => {
        Object.keys(field).map(key => field[key] = "");
    };

    const handleSubmit = event => {
        event.preventDefault();
        console.log("Submitting...");
        // CODE HERE TO GENERATE QR
        setRedirect(true);
    };

    const handleChange = event => {
        event.preventDefault();
        let fieldcopy = { ...field };
        fieldcopy[event.target.name] = event.target.value;
        setField(fieldcopy);
    };

    if (redirect)
        return (
            <QR
                firstname={field.firstname}
                lastname={field.lastname}
                studentID={field.studentID}
                redirect={setRedirect}
                clear={clearForm}
            />
        );
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
                        pattern="^[a-zA-Z- ]{1,50}$"
                        value={field.firstname}
                        placeholder="First name"
                        title="Enter your first name"
                        required
                    />
                    <input
                        name="lastname"
                        type="text"
                        className="lastnameField formField"
                        onChange={handleChange}
                        value={field.lastname}
                        pattern="^[a-zA-Z- ]{1,50}$"
                        placeholder="Last name"
                        title="Enter your last name"
                        required
                    />
                    <input
                        name="studentID"
                        type="text"
                        className="studentIDField formField"
                        onChange={handleChange}
                        value={field.studentID}
                        pattern="^[0-9]{1,10}$"
                        placeholder="Student ID"
                        title="Enter your Chulalongkorn Student ID"
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
