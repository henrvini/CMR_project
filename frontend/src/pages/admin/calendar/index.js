import React, { useEffect, useState } from "react";
import moment from "moment";

import api from "../../../services/api";

import "../../../components/template/index.css";

import Main from "../../../components/template/main/Main";
import Logo from "../../../components/template/logo/Logo";
import Nav from "../../../components/template/nav/Nav";
import Footer from "../../../components/template/footer/Footer";

import Button from "@mui/material/Button";
import { BiCalendar } from "react-icons/bi";
import { BiCalendarPlus } from "react-icons/bi";
import { BiCalendarEdit } from "react-icons/bi";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const headerProps = {
    icon: <BiCalendar size={20} />,
    title: "Calendário",
    subtitle: "Calendário para agendamento e conferência de datas importantes",
};

export default function Calendar() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        async function loadEvents() {
            const response = await api.get("/api/calendars");
            setEvents(response.data);
        }
        loadEvents();
    }, []);

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
                        href="/admin/calendars/register"
                    >
                        <BiCalendarPlus size={20} />
                        Adicionar evento
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
                <div>
                    <FullCalendar
                        plugins={[dayGridPlugin, interactionPlugin]}
                        events={events}
                    ></FullCalendar>
                </div>
            </Main>
            <Footer />
        </grid>
    );
}
