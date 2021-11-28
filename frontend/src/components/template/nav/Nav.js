import "./Nav.css";
import React from "react";

import { Link } from "react-router-dom";

import { ImExit } from "react-icons/im";
import { FiUsers } from "react-icons/fi";
import Button from "@mui/material/Button";
import { BiCalendar } from "react-icons/bi";
import { BiBuildings } from "react-icons/bi";
import { MdOutlineSell } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";
import { IoSchoolOutline } from "react-icons/io5";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import api from "../../../services/api";
import { getToken, logout } from "../../../services/auth";

export default (props) => {
    async function confirmExit() {
        confirmAlert({
            title: "Atenção",
            message: "Deseja realmente sair?",
            buttons: [
                {
                    label: "Sim",
                    onClick: async () => {
                        const response = await api.get(
                            "/api/users/destroytoken",
                            {
                                headers: { token: getToken() },
                            }
                        );

                        if (response.status === 200) {
                            logout();
                            window.location.href = "/admin/login";
                        } else {
                            alert("Não foi possível encerrar sessão");
                        }
                    },
                },
                {
                    label: "Não",
                    onClick: () => {},
                },
            ],
        });
    }

    return (
        <aside className="menu-area">
            <nav className="menu">
                {/* REFATORAR navItem.js */}
                <Link to="/">
                    <AiOutlineHome /> Início
                </Link>
                <Link to="/admin/users">
                    <FiUsers /> Usuários
                </Link>
                <Link to="/admin/companies">
                    <BiBuildings /> Empresas
                </Link>
                <Link to="/admin/sellers">
                    <MdOutlineSell />
                    Vendedores
                </Link>
                <Link to="/admin/courses">
                    <IoSchoolOutline /> Cursos
                </Link>
                <Link to="/admin/calendar">
                    <BiCalendar /> Calendário
                </Link>

                <div className="exit">
                    <Button
                        onClick={confirmExit}
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
