const Company = require("../models/companyModel");

module.exports = {
    async index(req, res) {
        const company = await Company.find();
        res.json(company);
    },

    async create(req, res) {
        const { company_name, trade, cgccpf, email, phone, state, city } = req.body;

        let data = {};
        let company = await Company.findOne({ cgccpf });
        if (!company) {
            data = { company_name, trade, cgccpf, email, phone, state, city };
            company = await Company.create(data);
            return res.status(200).json(company);
        } else {
            return res.status(500).json(company);
        }
    },

    async details(req, res) {
        const { _id } = req.query;
        const company = await Company.findOne(_id);
        res.json(company);
    },

    async delete(req, res) {
        const { _id } = req.params;
        const company = await Company.findByIdAndDelete({ _id });

        return res.json(company);
    },

    async update(req, res) {
        const { _id, company_name, trade, cgccpf, email, phone, state, city } =
            req.body;
        const data = { company_name, trade, cgccpf, email, phone, state, city };

        const company = await Company.findOneAndUpdate({ _id }, data, {
            new: true,
        });

        res.json(company);
    },
};
