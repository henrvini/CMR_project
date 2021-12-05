import React from "react";

import "../../../components/template/index.css";

import { AiOutlineHome } from "react-icons/ai";

import Main from "../../../components/template/main/Main";
import Logo from "../../../components/template/logo/Logo";
import Nav from "../../../components/template/nav/Nav";
import Footer from "../../../components/template/footer/Footer";

import { getNameUser } from "../../../services/auth";

const headerProps = {
    icon: <AiOutlineHome size={20} />,
    title: "Home",
    subtitle: "Página inicial",
};

export default (props) => {
    return (
        <grid className="app">
            <Logo />
            <Nav />
            <Main {...headerProps}>
                <div className="display-4">Seja bem-vindo {getNameUser()} </div>
                <hr />
                <h3 className="mb-0">Esta é a tela inicial do projeto CRM</h3>
            </Main>
            <Footer />
        </grid>
    );
};
