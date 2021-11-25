import React, { Component } from 'react'
import axios from 'axios'
import Main from "../../template/main/Main";

const headerProps = {
    icon: 'building',
    title: 'Empresas',
    subtitle: 'Cadastro de empresas: Incluir, Listar, Alterar e Excluir!'
}

const baseUrl = 'http://localhost:3001/company'
const initialState = {
    company: { name: '', email: '' },
    list: []
}

export default class CompanyCrud extends Component {

    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    clear() {
        this.setState({ company: initialState.company })
    }

    save() {
        const company = this.state.company
        const method = company.id ? 'put' : 'post'
        const url = company.id ? `${baseUrl}/${company.id}` : baseUrl
        axios[method](url, company)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ company: initialState.company, list })
            })
    }

    getUpdatedList(company, add = true) {
        const list = this.state.list.filter(u => u.id !== company.id)
        if(add) list.unshift(company)
        return list
    }

    updateField(event) {
        const company = { ...this.state.company }
        company[event.target.name] = event.target.value
        this.setState({ company })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control"
                                name="name"
                                value={this.state.company.name}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>E-mail</label>
                            <input type="text" className="form-control"
                                name="email"
                                value={this.state.company.email}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o e-mail..." />
                        </div>
                    </div>
                </div>

                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => this.save(e)}>
                            Salvar
                        </button>

                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    load(company) {
        this.setState({ company })
    }

    remove(company) {
        axios.delete(`${baseUrl}/${company.id}`).then(resp => {
            const list = this.getUpdatedList(company, false)
            this.setState({ list })
        })
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(company => {
            return (
                <tr key={company.id}>
                    <td>{company.id}</td>
                    <td>{company.name}</td>
                    <td>{company.email}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(company)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(company)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }
    
    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}