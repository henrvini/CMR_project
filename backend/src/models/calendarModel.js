const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema(
    {
        title: String,
        desc_event: String,
        date: String,
        location: String,
    },
    {
        timestamps: true,
    }
);

const calendars = mongoose.model("Calendar", DataSchema);
module.exports = calendars;
