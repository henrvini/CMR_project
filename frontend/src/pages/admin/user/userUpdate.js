import React, { useState, useEffect } from "react";
import api from "../../../services/api";
import { useParams } from "react-router";

import "../../../components/template/index.css";

import Grid from "@mui/material/Grid";
import { FiUsers } from "react-icons/fi";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { IoArrowBackCircleOutline } from "react-icons/io5";

import Main from "../../../components/template/main/Main";
import Logo from "../../../components/template/logo/Logo";
import Nav from "../../../components/template/nav/Nav";
import Footer from "../../../components/template/footer/Footer";

const headerProps = {
    icon: <FiUsers size={20} />,
    title: "Usuários",
    subtitle: "Atualização de usuários do sistema",
};

export default function UserUpdate() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const { idUser } = useParams();

    useEffect(() => {
        async function getUser() {
            let response = await api.get(`/api/users.details/${idUser}`);

            setName(response.data.name); // ERRO AO PUXAR INFORMAÇÕES AO CARREGAR PÁGINA ESTA PUXANDO INFORMAÇÕES SEMPRE DO MESMO USUÁRIO
            setEmail(response.data.email);
            setPhone(response.data.phone);
            setPassword(response.data.password);
        }
        getUser();
        // eslint-disable-next-line
    }, []);

    async function handleSubmit() {
        const data = {
            _id: idUser,
            name: name,
            email: email,
            phone: phone,
            password: password,
        };

        if (name !== "" && email !== "" && phone !== "" && password !== "") {
            const response = await api.put("/api/users", data);

            if (response.status === 200) {
                window.location.href = "/admin/users";
            } else {
                alert("Erro ao atualizar usuário");
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
                        href="/admin/users"
                    >
                        <IoArrowBackCircleOutline size={20} />
                        Voltar
                    </Button>
                </div>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="name"
                            name="name"
                            label="Nome"
                            fullWidth
                            variant="standard"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="email"
                            name="email"
                            label="Email"
                            fullWidth
                            variant="standard"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="phone"
                            name="phone"
                            label="Telefone"
                            fullWidth
                            variant="standard"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            type="password"
                            id="password"
                            name="password"
                            label="Senha"
                            fullWidth
                            variant="standard"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
