import React, { useState, useEffect } from "react";

import api from "../../../services/api";

import "../../../components/template/index.css";

import Nav from "../../../components/template/nav/Nav";
import Main from "../../../components/template/main/Main";
import Logo from "../../../components/template/logo/Logo";
import Footer from "../../../components/template/footer/Footer";

import Input from "@mui/material/Input";
import { FiUsers } from "react-icons/fi";
import Button from "@mui/material/Button";
import { FiSearch } from "react-icons/fi";
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";
import { RiPencilLine } from "react-icons/ri";
import { HiOutlineTrash } from "react-icons/hi";
import { AiOutlineUserAdd } from "react-icons/ai";
import TableRow from "@material-ui/core/TableRow";
import { confirmAlert } from "react-confirm-alert";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import "react-confirm-alert/src/react-confirm-alert.css";
import TableContainer from "@material-ui/core/TableContainer";

const headerProps = {
    icon: <FiUsers size={20} />,
    title: "Usuários",
    subtitle: "Detalhes e informações de usuários cadastrados no sistema",
};

export default function UserDetails() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        async function loadUsers() {
            const response = await api.get("/api/users");

            setUsers(response.data);
        }
        loadUsers();
    }, []);

    const lowerSearch = search.toLowerCase();

    const usersFilter = users.filter((user) =>
        user.name.toLowerCase().includes(lowerSearch)
    );

    async function handleDelete(id) {
        confirmAlert({
            title: "Atenção",
            message: "Deseja realmente deletar este usuário?",
            buttons: [
                {
                    label: "Sim",
                    onClick: async () => {
                        let result = await api.delete(`/api/users/${id}`);
                        if (result.status === 200) {
                            window.location.href = "/admin/users";
                        } else {
                            alert("Não foi possível deletar o usuário");
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

    function redirectUpdate(id) {
        window.location.href = `/admin/users/update/${id}`;
    }

    return (
        <grid className="app">
            <Logo />
            <Nav />
            <Main {...headerProps}>
                <div>
                    <Button
                        style={{ marginBottom: 10 }}
                        variant="contained"
                        color="primary"
                        href="/admin/users/register"
                    >
                        <AiOutlineUserAdd size={20} />
                        Cadastrar
                    </Button>
                    <Input
                        style={{ marginLeft: 20, width: 400 }}
                        placeholder="Buscar por nome do usuário"
                        onChange={(e) => setSearch(e.target.value)}
                    ></Input>
                    <FiSearch size={20} />
                </div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Nome</TableCell>
                                <TableCell align="left">E-mail</TableCell>
                                <TableCell align="left">Telefone</TableCell>
                                <TableCell align="left">
                                    Data de cadastro
                                </TableCell>
                                <TableCell align="center">Opções</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {usersFilter.map((row) => (
                                <TableRow
                                    key={row._id}
                                    sx={{
                                        "&:last-child td, &:last-child th": {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell
                                        align="left"
                                        component="th"
                                        scope="row"
                                    >
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="left">
                                        {row.email}
                                    </TableCell>
                                    <TableCell align="left">
                                        {row.phone}
                                    </TableCell>
                                    <TableCell align="left">
                                        {new Date(row.createdAt).toLocaleString(
                                            "pt-br"
                                        )}
                                    </TableCell>

                                    <TableCell align="center">
                                        <Button
                                            onClick={() =>
                                                redirectUpdate(row._id)
                                            }
                                            variant="contained"
                                            color="warning"
                                        >
                                            Editar
                                            <RiPencilLine size={20} />
                                        </Button>
                                        &nbsp; {/*Adiciona um backspace*/}
                                        <Button
                                            onClick={() =>
                                                handleDelete(row._id)
                                            }
                                            variant="contained"
                                            color="error"
                                        >
                                            Deletar
                                            <HiOutlineTrash size={20} />
                                        </Button>
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
