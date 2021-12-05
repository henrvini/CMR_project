const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema(
    {
        name: String,
        desc: String,
        duration: String,
        type: String,
        price: String,
    },
    {
        timestamps: true,
    }
);

const courses = mongoose.model("Course", DataSchema);
module.exports = courses;
