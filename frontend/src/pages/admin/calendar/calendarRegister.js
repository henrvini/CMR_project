import React, { useState } from "react";

import api from "../../../services/api";

import "../../../components/template/index.css";

import { BiCalendar } from "react-icons/bi";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { BiCalendarEdit } from "react-icons/bi";
import TextField from "@mui/material/TextField";
import { IoArrowBackCircleOutline } from "react-icons/io5";

import Main from "../../../components/template/main/Main";
import Logo from "../../../components/template/logo/Logo";
import Nav from "../../../components/template/nav/Nav";
import Footer from "../../../components/template/footer/Footer";

const headerProps = {
    icon: <BiCalendar />,
    title: "Calendário",
    subtitle: "Cadastrar novos eventos e datas no sistema",
};

export default function CalendarRegister() {
    const [event_name, setEvent_name] = useState("");
    const [desc_event, setDesc_event] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");

    async function handleSubmit() {
        const data = {
            event_name: event_name,
            desc_event: desc_event,
            date: date,
            location: location,
        };

        if (event_name !== "" && date !== "") {
            const response = await api.post("/api/calendars", data);

            if (response.status === 200) {
                window.location.href = "/admin/calendars";
            } else {
                alert("Erro ao criar novo evento");
            }
        } else {
            alert("Preencha todos os dados obrigatórios");
        }
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
                        <IoArrowBackCircleOutline />
                        Voltar
                    </Button>
                    &nbsp;
                    <Button
                        style={{ marginBottom: 10 }}
                        variant="contained"
                        color="primary"
                        href="/admin/calendars/list"
                    >
                        <BiCalendarEdit size={20} />
                        Gerenciar eventos
                    </Button>
                </div>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="event_name"
                            name="event_name"
                            label="Nome do evento"
                            fullWidth
                            variant="standard"
                            value={event_name}
                            onChange={(e) => setEvent_name(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="desc_event"
                            name="desc_event"
                            label="Descrição do evento"
                            fullWidth
                            variant="standard"
                            value={desc_event}
                            onChange={(e) => setDesc_event(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="date"
                            name="date"
                            label="Data"
                            fullWidth
                            variant="standard"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            type="location"
                            id="location"
                            name="location"
                            label="Local do evento"
                            fullWidth
                            variant="standard"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </Grid>
                </Grid>
                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <Button
                            variant="contained"
                            color="success"
                            onClick={handleSubmit}
                        >
                            Cadastrar
                        </Button>
                    </div>
                </div>
            </Main>
            <Footer />
        </grid>
    );
}
