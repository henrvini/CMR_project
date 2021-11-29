const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema(
    {
        event_name: String,
        desc_event: String,
        date: Date,
        location: String,
    },
    {
        timestamps: true,
    }
);

const calendars = mongoose.model("Calendar", DataSchema);
module.exports = calendars;
