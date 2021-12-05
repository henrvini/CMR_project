import React, { useState, useEffect } from "react";
import api from "../../../services/api";
import { useParams } from "react-router";

import "../../../components/template/index.css";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { IoSchoolOutline } from "react-icons/io5";
import TextField from "@mui/material/TextField";
import { IoArrowBackCircleOutline } from "react-icons/io5";

import Main from "../../../components/template/main/Main";
import Logo from "../../../components/template/logo/Logo";
import Nav from "../../../components/template/nav/Nav";
import Footer from "../../../components/template/footer/Footer";

const headerProps = {
    icon: <IoSchoolOutline size={20} />,
    title: "Cursos",
    subtitle: "Atualização de cursos do sistema",
};

export default function CoursesUpdate() {
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [duration, setDuration] = useState("");
    const [type, setType] = useState("");
    const [price, setPrice] = useState("");

    const { idCourse } = useParams();

    useEffect(() => {
        async function getCourse() {
            const response = await api.get(`/api/courses.details/${idCourse}`);

            setName(response.data.name);
            setDesc(response.data.desc);
            setDuration(response.data.duration);
            setType(response.data.type);
            setPrice(response.data.price);
        }
        getCourse();
        // eslint-disable-next-line
    }, []);

    async function handleSubmit() {
        const data = {
            _id: idCourse,
            name: name,
            desc: desc,
            duration: duration,
            type: type,
            price: price,
        };

        if (
            name !== "" &&
            desc !== "" &&
            duration !== "" &&
            type !== "" &&
            price !== ""
        ) {
            const response = await api.put("/api/courses", data);

            if (response.status === 200) {
                window.location.href = "/admin/courses";
            } else {
                alert("Erro ao atualizar curso");
            }
        } else {
            alert("Preencha todos os dados");
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
                        href="/admin/courses"
                    >
                        <IoArrowBackCircleOutline size={20} />
                        Voltar
                    </Button>
                </div>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={8}>
                        <TextField
                            required
                            id="name"
                            name="name"
                            label="Nome do curso"
                            fullWidth
                            variant="standard"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            id="desc"
                            name="desc"
                            label="Descrição"
                            fullWidth
                            variant="standard"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <TextField
                            required
                            id="duration"
                            name="duration"
                            label="Duração"
                            fullWidth
                            variant="standard"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <TextField
                            required
                            id="type"
                            name="type"
                            label="Tipo"
                            fullWidth
                            variant="standard"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <TextField
                            required
                            id="price"
                            name="price"
                            label="Preço"
                            fullWidth
                            variant="standard"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
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
