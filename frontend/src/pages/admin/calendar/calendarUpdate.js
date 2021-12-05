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
    subtitle: "Atualização de eventos e datas cadastradas no sistema",
};

export default function CalendarUpdate() {
    const [title, setTitle] = useState("");
    const [desc_event, setDesc_event] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");

    const { idCalendar } = useParams();

    useEffect(() => {
        async function getCalendar() {
            const response = await api.get(
                `/api/calendars.details/${idCalendar}`
            );

            setTitle(response.data.title);
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
            title: title,
            desc_event: desc_event,
            date: date,
            location: location,
        };

        if (title !== "" && date !== "") {
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
                        <IoArrowBackCircleOutline size={20} />
                        Voltar
                    </Button>
                </div>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="title"
                            name="title"
                            label="Título do evento"
                            fullWidth
                            variant="standard"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
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
