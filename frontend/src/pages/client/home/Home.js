import React from "react";

import "../../../components/template/index.css";

import Main from "../../../components/template/main/Main";
import Logo from "../../../components/template/logo/Logo";
import Nav from "../../../components/template/nav/Nav";
import Footer from "../../../components/template/footer/Footer";

export default (props) => {
    return (
        <grid className="app">
            <Logo />
            <Nav />
            <Main
                icon="home"
                title="Início"
                subtitle="Página projeto faculdade"
            >
                <div className="display-4"> Bem-vindo! </div>
                <hr />
                <p className="mb-0"> Projeto Integrador </p>
            </Main>
            <Footer />
        </grid>
    );
};
