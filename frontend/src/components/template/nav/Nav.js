import "./Nav.css";
import React from "react";
import { Link } from "react-router-dom";

export default (props) => {
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
            </nav>
        </aside> 
    );
};
