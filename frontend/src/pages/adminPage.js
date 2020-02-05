import React from "react";

export default () => {
    return(<div>
        <form className="formExample">
                    <input
                        name="password"
                        type="text"
                        className="firstNameField formField"
                        placeholder="Password"
                    />
                    <button className="submitBtn" type="submit">
                        Submit
                    </button>
                </form>
    </div>)
};