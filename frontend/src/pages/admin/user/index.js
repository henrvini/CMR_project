import React, { useState, useEffect } from "react";

import api from "../../../services/api";

import '../../../components/template/index.css'

import Main from "../../../components/template/main/Main";
import Logo from "../../../components/template/logo/Logo";
import Nav from "../../../components/template/nav/Nav";
import Footer from "../../../components/template/footer/Footer";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const headerProps = {
    icon: "users",
    title: "Usuários",
    subtitle: "Detalhes e informações de usuários cadastrados no sistema",
};

export default function UserDetails() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function loadUsers() {
            const response = await api.get("/api/users");

            setUsers(response.data);
        }
        loadUsers();
    }, []);

    async function handleDelete(id) {
        if (window.confirm("Deseja realmente excluir este usuário?")) {
            let result = await api.delete(`/api/users/${id}`);
            if (result.status === 200) {
                window.location.href = "/admin/users";
            } else {
                alert("Não foi possível deletar o usuário");
            }
        }
    }

    function redirect(id) {
        window.location.href = `/admin/users/update/${id}`;
    }

    return (
        <grid className="app">
            <Logo />
            <Nav />
            <Main {...headerProps}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Nome</TableCell>
                                <TableCell align="center">E-mail</TableCell>
                                <TableCell align="center">Telefone</TableCell>
                                <TableCell align="center">
                                    Data de cadastro
                                </TableCell>
                                <TableCell align="right">Opções</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((row) => (
                                <TableRow
                                    key={row._id}
                                    sx={{
                                        "&:last-child td, &:last-child th": {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.email}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.phone}
                                    </TableCell>
                                    <TableCell align="center">
                                        {new Date(row.createdAt).toLocaleString(
                                            "pt-br"
                                        )}
                                    </TableCell>
                                    <TableCell align="right">
                                        <button
                                            className="btn btn-warning"
                                            onClick={() => redirect(row._id)}
                                        >
                                            Editar
                                            <i className="fa fa-pencil"></i>
                                        </button>
                                        <button
                                            className="btn btn-danger ml-2"
                                            onClick={() =>
                                                handleDelete(row._id)
                                            }
                                        >
                                            Excluir
                                            <i className="fa fa-trash"></i>
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Main>
            <Footer />
        </grid>
    );
}
