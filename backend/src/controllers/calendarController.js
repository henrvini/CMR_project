const Calendar = require("../models/calendarModel");

module.exports = {
    async index(req, res) {
        const calendar = await Calendar.find();
        res.json(calendar);
    },

    async create(req, res) {
        const { title, desc_event, date, location } = req.body;

        let data = {};
        let calendar = await Calendar.findOne({ title });
        if (!calendar) {
            data = { title, desc_event, date, location };
            calendar = await Calendar.create(data);
            return res.status(200).json(calendar);
        } else {
            return res.status(500).json(calendar);
        }
    },

    async details(req, res) {
        const { _id } = req.query;
        const calendar = await Calendar.findOne(_id);
        res.json(calendar);
    },

    async delete(req, res) {
        const { _id } = req.params;
        const calendar = await Calendar.findByIdAndDelete({ _id });

        return res.json(calendar);
    },

    async update(req, res) {
        const { _id, title, desc_event, date, location } = req.body;
        const data = { title, desc_event, date, location };

        const calendar = await Calendar.findOneAndUpdate({ _id }, data, {
            new: true,
        });

        res.json(calendar);
    },
};
