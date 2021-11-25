const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema(
    {
        company_name: String,
        trade: String,
        cgccpf: String,
        email: String,
        phone: { type: Number, default: 1 },
        state: String,
        city: String,
    },
    {
        timestamps: true,
    }
);

const companies = mongoose.model("Company", DataSchema);
module.exports = companies;
