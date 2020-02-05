import React from "react";
import "../../styles/Login.css";
import "../../styles/Dashboard.css";
import HeaderTab from "../../components/HeaderTab";
import FooterTab from "../../components/FooterTab";

export default () => {

    return (
        <div className="dashboard">
            <HeaderTab title="Dashboard"/>
            <FooterTab/>
        </div>
    );
};
