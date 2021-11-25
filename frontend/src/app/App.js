import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import { BrowserRouter } from "react-router-dom";

import Logo from "../components/template/logo/Logo";
import Nav from "../components/template/nav/Nav";
import Footer from "../components/template/footer/Footer";

import Routes from "../routes/Routes"

export default (props) => {
    return (
        <BrowserRouter>
            <div className="app">
                <Logo />
                <Nav />
                <Routes />
                <Footer />
            </div>
        </BrowserRouter>
    );
};
