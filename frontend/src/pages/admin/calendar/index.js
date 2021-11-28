import React, { Component } from "react";
import axios from "axios";

import '../../../components/template/index.css'

import Main from "../../../components/template/main/Main";
import Logo from "../../../components/template/logo/Logo";
import Nav from "../../../components/template/nav/Nav";
import Footer from "../../../components/template/footer/Footer";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const headerProps = {
    icon: "calendar",
    title: "Calendário",
    subtitle: "Calendário para agendamento e conferência de datas importantes",
};

const baseUrl = "http://localhost:3001/calendar";
const initialState = {
    user: { name: "", email: "" },
    list: [],
};

export default class Calendar extends Component {
    state = { ...initialState };

    componentWillMount() {
        axios(baseUrl).then((resp) => {
            this.setState({ list: resp.data });
        });
    }

    clear() {
        this.setState({ user: initialState.user });
    }

    save() {
        const user = this.state.user;
        const method = user.id ? "put" : "post";
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl;
        axios[method](url, user).then((resp) => {
            const list = this.getUpdatedList(resp.data);
            this.setState({ user: initialState.user, list });
        });
    }

    getUpdatedList(user, add = true) {
        const list = this.state.list.filter((u) => u.id !== user.id);
        if (add) list.unshift(user);
        return list;
    }

    updateField(event) {
        const user = { ...this.state.user };
        user[event.target.name] = event.target.value;
        this.setState({ user });
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Título</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={this.state.user.name}
                                onChange={(e) => this.updateField(e)}
                                placeholder="Digite o título..."
                            />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Data</label>
                            <input
                                type="text"
                                className="form-control"
                                name="email"
                                value={this.state.user.email}
                                onChange={(e) => this.updateField(e)}
                                placeholder="Digite uma data..."
                            />
                        </div>
                    </div>
                </div>

                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button
                            className="btn btn-primary"
                            onClick={(e) => this.save(e)}
                        >
                            Salvar
                        </button>

                        <button
                            className="btn btn-secondary ml-2"
                            onClick={(e) => this.clear(e)}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    load(user) {
        this.setState({ user });
    }

    remove(user) {
        axios.delete(`${baseUrl}/${user.id}`).then((resp) => {
            const list = this.getUpdatedList(user, false);
            this.setState({ list });
        });
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Data</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>{this.renderRows()}</tbody>
            </table>
        );
    }

    renderRows() {
        return this.state.list.map((user) => {
            return (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        <button
                            className="btn btn-warning"
                            onClick={() => this.load(user)}
                        >
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button
                            className="btn btn-danger ml-2"
                            onClick={() => this.remove(user)}
                        >
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            );
        });
    }

    renderCalendar() {
        console.log(this.state.list);
        return (
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                weekends={false}
                events={this.state.list.map((event) => ({
                    title: event.name,
                    date: event.email,
                }))}
            ></FullCalendar>
        );
    }

    render() {
        return (
            <grid className="app">
                <Logo />
                <Nav />
                <Main {...headerProps}>
                    {this.renderForm()}
                    {this.renderTable()}
                    {this.renderCalendar()}
                </Main>
                <Footer />
            </grid>
        );
    }
}
