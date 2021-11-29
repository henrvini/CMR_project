import React, { useState, useEffect } from "react";
import api from "../../../services/api";
import { useParams } from "react-router";

import "../../../components/template/index.css";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { BiCalendar } from "react-icons/bi";
import TextField from "@mui/material/TextField";
import { IoArrowBackCircleOutline } from "react-icons/io5";

import Main from "../../../components/template/main/Main";
import Logo from "../../../components/template/logo/Logo";
import Nav from "../../../components/template/nav/Nav";
import Footer from "../../../components/template/footer/Footer";

const headerProps = {
    icon: <BiCalendar size={20} />,
    title: "Calendário",
    subtitle: "Detalhes e informações de eventos cadastrados no sistema",
};

export default function CalendarUpdate() {
    const [event_name, setEvent_name] = useState("");
    const [desc_event, setDesc_event] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");

    const { idCalendar } = useParams();

    useEffect(() => {
        async function getCalendar() {
            let response = await api.get(
                `/api/calendars.details/${idCalendar}`
            );

            setEvent_name(response.data.event_name); // ERRO AO PUXAR INFORMAÇÕES AO CARREGAR PÁGINA ESTA PUXANDO INFORMAÇÕES SEMPRE DO MESMO USUÁRIO
            setDesc_event(response.data.desc_event);
            setDate(response.data.date);
            setLocation(response.data.location);
        }
        getCalendar();
        // eslint-disable-next-line
    }, []);

    async function handleSubmit() {
        const data = {
            _id: idCalendar,
            event_name: event_name,
            desc_event: desc_event,
            date: date,
            location: location,
        };

        if (event_name !== "" && date !== "") {
            const response = await api.put("/api/calendars", data);

            if (response.status === 200) {
                window.location.href = "/admin/calendars/list";
            } else {
                alert("Erro ao atualizar evento");
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
                        href="/admin/calendars/list"
                    >
                        <IoArrowBackCircleOutline />
                        Voltar
                    </Button>
                </div>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={8}>
                        <TextField
                            required
                            id="event_name"
                            name="event_name"
                            label="Nome"
                            fullWidth
                            variant="standard"
                            value={event_name}
                            onChange={(e) => setEvent_name(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <TextField
                            required
                            id="desc_event"
                            name="desc_event"
                            label="Descrição"
                            fullWidth
                            variant="standard"
                            value={desc_event}
                            onChange={(e) => setDesc_event(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
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
                    <Grid item xs={12} sm={2}>
                        <TextField
                            required
                            id="location"
                            name="location"
                            label="Local"
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
                            Salvar
                        </Button>
                    </div>
                </div>
            </Main>
            <Footer />
        </grid>
    );
}
