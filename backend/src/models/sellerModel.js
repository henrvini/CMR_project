const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        phone: String,
        cgccpf: String,
        companyId: String,
    },
    {
        timestamps: true,
    }
);

const sellers = mongoose.model("Seller", DataSchema);
module.exports = sellers;
