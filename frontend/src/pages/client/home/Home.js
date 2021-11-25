import React from "react";
import Main from "../../../components/template/main/Main";

export default (props) => {
    return (
        <Main icon="home" title="Início" subtitle="Página projeto faculdade">
            <div className="display-4"> Bem-vindo! </div>
            <hr />
            <p className="mb-0"> Projeto Integrador </p>
        </Main>
    );
};
