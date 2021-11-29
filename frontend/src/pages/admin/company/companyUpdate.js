import React, { useState, useEffect } from "react";
import api from "../../../services/api";
import { useParams } from "react-router";

import "../../../components/template/index.css";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { BiBuildings } from "react-icons/bi";
import TextField from "@mui/material/TextField";
import { IoArrowBackCircleOutline } from "react-icons/io5";

import Main from "../../../components/template/main/Main";
import Logo from "../../../components/template/logo/Logo";
import Nav from "../../../components/template/nav/Nav";
import Footer from "../../../components/template/footer/Footer";

const headerProps = {
    icon: <BiBuildings />,
    title: "Empresas",
    subtitle: "Atualização de empresas do sistema",
};

export default function CompanyUpdate() {
    const [company_name, setCompany_name] = useState("");
    const [trade, setTrade] = useState("");
    const [cgccpf, setCgccpf] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");

    const { idCompany } = useParams();

    useEffect(() => {
        async function getUser() {
            let response = await api.get(`/api/companies.details/${idCompany}`);

            setCompany_name(response.data.company_name); // ERRO AO PUXAR INFORMAÇÕES AO CARREGAR PÁGINA ESTA PUXANDO INFORMAÇÕES SEMPRE DO MESMO USUÁRIO
            setTrade(response.data.trade);
            setCgccpf(response.data.cgccpf);
            setEmail(response.data.email);
            setPhone(response.data.phone);
            setState(response.data.state);
            setCity(response.data.city);
        }
        getUser();
        // eslint-disable-next-line
    }, []);

    async function handleSubmit() {
        const data = {
            _id: idCompany,
            company_name: company_name,
            trade: trade,
            cgccpf: cgccpf,
            email: email,
            phone: phone,
            state: state,
            city: city,
        };

        if (
            company_name !== "" &&
            trade !== "" &&
            cgccpf !== "" &&
            email !== "" &&
            phone !== "" &&
            state !== "" &&
            city !== ""
        ) {
            const response = await api.put("/api/companies", data);

            if (response.status === 200) {
                window.location.href = "/admin/companies";
            } else {
                alert("Erro ao atualizar empresa");
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
                        href="/admin/companies"
                    >
                        <IoArrowBackCircleOutline />
                        Voltar
                    </Button>
                </div>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={8}>
                        <TextField
                            required
                            id="company_name"
                            name="company_name"
                            label="Razão social"
                            fullWidth
                            variant="standard"
                            value={company_name}
                            onChange={(e) => setCompany_name(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            id="cgccpf"
                            name="cgccpf"
                            label="Cnpj"
                            fullWidth
                            variant="standard"
                            value={cgccpf}
                            onChange={(e) => setCgccpf(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <TextField
                            required
                            id="trade"
                            name="trade"
                            label="Nome fantasia"
                            fullWidth
                            variant="standard"
                            value={trade}
                            onChange={(e) => setTrade(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <TextField
                            required
                            id="state"
                            name="state"
                            label="Estado"
                            fullWidth
                            variant="standard"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <TextField
                            required
                            id="city"
                            name="city"
                            label="Cidade"
                            fullWidth
                            variant="standard"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
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
