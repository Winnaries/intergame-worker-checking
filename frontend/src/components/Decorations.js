import React from "react";
import "../styles/Decorations.css"

// Define header component
export const Header = props => {
    return <div className="header">{props.text||"Intergames HR"}</div>;
};