// import React from "react";

// export default function UserRegister() {
//     return (
//         <div>
//             <h1>Cadastro de usuário</h1>
//         </div>
//     );
// }

import React, { useState } from "react";
import axios from "axios";
import api from "../../../services/api";

import Main from "../../../components/template/main/Main";

const headerProps = {
    icon: "users",
    title: "Usuários",
    subtitle: "Cadastro de usuários: Incluir, listar, alterar e excluir!",
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

        try{
            if (name != "" && email != "" && phone != "" && password != "") {
                const response = await api.post("/api/users", data)
            }
        }catch(err){
            alert(err)
        }
        // if (name != "" && email != "" && phone != "" && password != "") {
        //     const response = await api.post("/api/users", data);

        //     if (response.status === 200) {
        //         // window.location.href = "/admin/users";
        //         alert("SUCESSO!");
        //     } else {
        //         alert("ERRO AO CADASTRAR USUÁRIO!");
        //     }
        // }else {
        //     alert("Preencha todos os dados")
        // }
    }

    return (
        <Main {...headerProps}>
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input
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
                                type="number"
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
                                type="password"
                                className="form-control"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                            onClick={handleSubmit()}
                        >
                            Salvar
                        </button>

                        <button className="btn btn-secondary ml-2" onClick={""}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </Main>
    );
}
