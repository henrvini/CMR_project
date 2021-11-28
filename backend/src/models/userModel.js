const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const DataSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        phone: { type: Number, default: 1 },
        password: String,
    },
    {
        timestamps: true,
    }
);

DataSchema.pre("save", function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

DataSchema.pre("findOneAndUpdate", function (next) {
    let newPassword = this.getUpdate().password + "";
    if (newPassword.length < 55) {
        this.getUpdate().password = bcrypt.hashSync(newPassword, 10);
    }
    next();
});

DataSchema.methods.isCorrectPassword = function (password, callback) {
    bcrypt.compare(password, this.password, function (err, same) {
        if (err) {
            callback(err);
        } else {
            callback(err, same);
        }
    });
};

const users = mongoose.model("Users", DataSchema);
module.exports = users;
