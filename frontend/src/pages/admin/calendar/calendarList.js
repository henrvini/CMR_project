import React, { useState, useEffect } from "react";

import api from "../../../services/api";

import "../../../components/template/index.css";

import Nav from "../../../components/template/nav/Nav";
import Main from "../../../components/template/main/Main";
import Logo from "../../../components/template/logo/Logo";
import Footer from "../../../components/template/footer/Footer";

import Button from "@mui/material/Button";
import { FiSearch } from "react-icons/fi";
import { BiCalendar } from "react-icons/bi";
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import { RiPencilLine } from "react-icons/ri";
import { HiOutlineTrash } from "react-icons/hi";
import { BiCalendarPlus } from "react-icons/bi";
import TableRow from "@material-ui/core/TableRow";
import { confirmAlert } from "react-confirm-alert";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import "react-confirm-alert/src/react-confirm-alert.css";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import TableContainer from "@material-ui/core/TableContainer";

const headerProps = {
    icon: <BiCalendar size={20} />,
    title: "Calendário",
    subtitle: "Detalhes e informações de datas e eventos cadastrados no sistema",
};

export default function CalendarList() {
    const [calendars, setCalendars] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        async function loadCalendars() {
            const response = await api.get("/api/calendars");
            setCalendars(response.data);
        }
        loadCalendars();
    }, []);

    const lowerSearch = search.toLowerCase();

    const calendarsFilter = calendars.filter((calendar) =>
        calendar.title.toLowerCase().includes(lowerSearch)
    );

    async function handleDelete(id) {
        confirmAlert({
            title: "Atenção",
            message: "Deseja realmente deletar este evento?",
            buttons: [
                {
                    label: "Sim",
                    onClick: async () => {
                        let result = await api.delete(`/api/calendars/${id}`);
                        if (result.status === 200) {
                            window.location.href = "/admin/calendars/list";
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
        window.location.href = `/admin/calendars/update/${id}`;
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
                        href="/admin/calendars"
                    >
                        <IoArrowBackCircleOutline size={20} />
                        Voltar
                    </Button>
                    &nbsp;
                    <Button
                        style={{ marginBottom: 10 }}
                        variant="contained"
                        color="primary"
                        href="/admin/calendars/register"
                    >
                        <BiCalendarPlus size={20} />
                        Adicionar evento
                    </Button>
                    <Input
                        style={{ marginLeft: 20, width: 400 }}
                        placeholder="Buscar por título do evento"
                        onChange={(e) => setSearch(e.target.value)}
                    ></Input>
                    <FiSearch size={20} />
                </div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Título</TableCell>
                                <TableCell align="left">Descrição</TableCell>
                                <TableCell align="left">Local</TableCell>
                                <TableCell align="left">Data</TableCell>
                                <TableCell align="center">Opções</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {calendarsFilter.map((row) => (
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
                                        {row.title}
                                    </TableCell>
                                    <TableCell align="left">
                                        {row.desc_event}
                                    </TableCell>
                                    <TableCell align="left">
                                        {row.location}
                                    </TableCell>
                                    <TableCell align="left">
                                        {new Date(row.date).toLocaleDateString(
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
