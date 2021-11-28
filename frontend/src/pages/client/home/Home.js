import React from "react";

import "../../../components/template/index.css";

import Main from "../../../components/template/main/Main";
import Logo from "../../../components/template/logo/Logo";
import Nav from "../../../components/template/nav/Nav";
import Footer from "../../../components/template/footer/Footer";

import { getNameUser } from "../../../services/auth";

export default (props) => {
    return (
        <grid className="app">
            <Logo />
            <Nav />
            <Main
                icon="home"
                title="Início"
                subtitle="Tela de boas-vindas"
            >
                <div className="display-4">
                    {" "}
                    Seja bem-vindo {getNameUser()}{" "}
                </div>
                <hr />
                <h3 className="mb-0">
                    Esta é a tela inicial do projeto CRM
                </h3>
            </Main>
            <Footer />
        </grid>
    );
};
