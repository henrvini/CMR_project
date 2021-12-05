const Course = require("../models/courseModel");

module.exports = {
    async index(req, res) {
        const course = await Course.find();
        res.json(course);
    },

    async create(req, res) {
        const { name, desc, duration, type, price } = req.body;

        let data = {};
        let course = await Course.findOne({ name });
        if (!course) {
            data = { name, desc, duration, type, price };
            course = await Course.create(data);
            return res.status(200).json(course);
        } else {
            return res.status(500).json(course);
        }
    },

    async details(req, res) {
        const _id = req.params;
        const course = await Course.findOne(_id);
        res.json(course);
    },

    async delete(req, res) {
        const { _id } = req.params;
        const course = await Course.findByIdAndDelete({ _id });

        return res.json(course);
    },

    async update(req, res) {
        const { _id, name, desc, duration, type, price } = req.body;
        const data = { name, desc, duration, type, price };

        const course = await Course.findOneAndUpdate({ _id }, data, {
            new: true,
        });

        res.json(course);
    },
};
