import React, { useState } from "react";

import api from "../../../services/api";

import "../../../components/template/index.css";

import Main from "../../../components/template/main/Main";
import Logo from "../../../components/template/logo/Logo";
import Nav from "../../../components/template/nav/Nav";
import Footer from "../../../components/template/footer/Footer";

const headerProps = {
    icon: "users",
    title: "Usuários",
    subtitle: "Cadastrar novos usuários no sistema",
};

export default function UserRegister() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit() {
        const data = {
            name: name,
            email: email,
            phone: phone,
            password: password,
        };

        if (name !== "" && email !== "" && phone !== "" && password !== "") {
            const response = await api.post("/api/users", data);

            if (response.status === 200) {
                window.location.href = "/admin/users";
            } else {
                alert("Erro ao cadastrar usuário");
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
                <div className="form">
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label>Nome</label>
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Digite o nome completo"
                                />
                            </div>
                        </div>

                        <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label>E-mail</label>
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Digite o e-mail"
                                />
                            </div>
                        </div>

                        <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label>Telefone</label>
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    name="phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="Digite o telefone"
                                />
                            </div>
                        </div>

                        <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label>Senha</label>
                                <input
                                    required
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder="Digite a senha"
                                />
                            </div>
                        </div>
                    </div>

                    <hr />
                    <div className="row">
                        <div className="col-12 d-flex justify-content-end">
                            <button
                                className="btn btn-primary"
                                onClick={handleSubmit}
                            >
                                Salvar
                            </button>

                            <button
                                className="btn btn-secondary ml-2"
                                onClick={""}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </Main>
            <Footer />
        </grid>
    );
}
