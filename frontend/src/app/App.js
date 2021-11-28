import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import { BrowserRouter } from "react-router-dom";

import Routes from "../routes/Routes";

export default (props) => {
    return (
        <BrowserRouter>
            <Routes />
        </BrowserRouter>
    );
};
