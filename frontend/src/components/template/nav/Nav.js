import "./Nav.css";
import React from "react";
import { Link } from "react-router-dom";
import { ImExit } from "react-icons/im";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import api from "../../../services/api";
import { getToken, logout } from "../../../services/auth";

export default (props) => {
    async function confirmExit() {
        if (window.confirm("Deseja realmente sair?")) {
            const response = await api.get("/api/users/destroytoken", {
                headers: { token: getToken() },
            });

            if (response.status === 200) {
                logout();
                window.location.href = "/admin/login";
            } else {
                alert("Não foi possível encerrar sessão");
            }
        }
    }

    return (
        <aside className="menu-area">
            <nav className="menu">
                {/* REFATORAR navItem.js */}
                <Link to="/">
                    <i className="fa fa-home"></i> Início
                </Link>
                <Link to="/admin/users">
                    <i className="fa fa-users"></i> Usuários
                </Link>
                <Link to="/admin/companies">
                    <i className="fa fa-building"></i> Empresas
                </Link>
                <Link to="/admin/sellers">
                    <i className=""></i> Vendedores
                </Link>
                <Link to="/admin/courses">
                    <i className=""></i> Cursos
                </Link>
                <Link to="/admin/calendar">
                    <i className="fa fa-calendar"></i> Calendário
                </Link>

                <div className="exit" onClick={confirmExit}>
                    <Button
                        className="button"
                        variant="contained"
                        color="error"
                    >
                        <ImExit />
                        Sair
                    </Button>
                </div>
            </nav>
        </aside>
    );
};
