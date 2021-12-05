const Seller = require("../models/sellerModel");

module.exports = {
    async index(req, res) {
        const seller = await Seller.find();
        res.json(seller);
    },

    async create(req, res) {
        const { name, email, phone, cgccpf, companyId } = req.body;

        let data = {};
        let seller = await Seller.findOne({ cgccpf });
        if (!seller) {
            data = { name, email, phone, cgccpf, companyId };
            seller = await Seller.create(data);
            return res.status(200).json(seller);
        } else {
            return res.status(500).json(seller);
        }
    },

    async details(req, res) {
        const _id = req.params;
        const seller = await Seller.findOne(_id);
        res.json(seller);
    },

    async delete(req, res) {
        const { _id } = req.params;
        const seller = await Seller.findByIdAndDelete({ _id });

        return res.json(seller);
    },

    async update(req, res) {
        const { _id, name, email, phone, cgccpf, companyId } = req.body;
        const data = { name, email, phone, cgccpf, companyId };

        const seller = await Seller.findOneAndUpdate({ _id }, data, {
            new: true,
        });

        res.json(seller);
    },
};
