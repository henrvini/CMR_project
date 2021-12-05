import React, { useState, useEffect } from "react";
import api from "../../../services/api";
import { useParams } from "react-router";

import "../../../components/template/index.css";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { MdOutlineSell } from "react-icons/md";
import TextField from "@mui/material/TextField";
import { IoArrowBackCircleOutline } from "react-icons/io5";

import Main from "../../../components/template/main/Main";
import Logo from "../../../components/template/logo/Logo";
import Nav from "../../../components/template/nav/Nav";
import Footer from "../../../components/template/footer/Footer";

const headerProps = {
    icon: <MdOutlineSell size={20} />,
    title: "Vendedores",
    subtitle: "Atualização de vendedores(as) do sistema",
};

export default function SellerUpdate() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [cgccpf, setCgccpf] = useState("");
    const [companyId, setCompanyId] = useState("");

    const { idSeller } = useParams();

    useEffect(() => {
        async function getSeller() {
            const response = await api.get(`/api/sellers.details/${idSeller}`);

            setName(response.data.name);
            setEmail(response.data.email);
            setPhone(response.data.phone);
            setCgccpf(response.data.cgccpf);
            setCompanyId(response.data.companyId);
        }
        getSeller();
        // eslint-disable-next-line
    }, []);

    async function handleSubmit() {
        const data = {
            _id: idSeller,
            name: name,
            email: email,
            phone: phone,
            cgccpf: cgccpf,
            companyId: companyId,
        };

        if (
            name !== "" &&
            email !== "" &&
            phone !== "" &&
            cgccpf !== "" &&
            companyId !== ""
        ) {
            const response = await api.put("/api/sellers", data);

            if (response.status === 200) {
                window.location.href = "/admin/sellers";
            } else {
                alert("Erro ao atualizar vendedor(a)");
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
                        href="/admin/sellers"
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
                            label="Nome do vendedor"
                            fullWidth
                            variant="standard"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
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
                    <Grid item xs={12} sm={8}>
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
                    <Grid item xs={12} sm={2}>
                        <TextField
                            required
                            id="cgccpf"
                            name="cgccpf"
                            label="CPF"
                            fullWidth
                            variant="standard"
                            value={cgccpf}
                            onChange={(e) => setCgccpf(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <TextField
                            required
                            id="companyId"
                            name="companyId"
                            label="Empresa"
                            fullWidth
                            variant="standard"
                            value={companyId}
                            onChange={(e) => setCompanyId(e.target.value)}
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
