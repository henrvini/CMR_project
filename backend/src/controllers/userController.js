const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const secret = "mysecret";

module.exports = {
    async index(req, res) {
        const user = await User.find();
        res.json(user);
    },

    async create(req, res) {
        const { name, email, phone, password } = req.body;

        let data = {};
        let user = await User.findOne({ email });
        if (!user) {
            data = { name, email, phone, password };
            user = await User.create(data);
            return res.status(200).json(user);
        } else {
            return res.status(500).json(user);
        }
    },

    async details(req, res) {
        const { _id } = req.query;
        const user = await User.findOne(_id);
        res.json(user);
    },

    async delete(req, res) {
        const { _id } = req.params;
        const user = await User.findByIdAndDelete({ _id });

        return res.json(user);
    },

    async update(req, res) {
        const { _id, name, email, phone, password } = req.body;
        const data = { name, email, phone, password };

        const user = await User.findOneAndUpdate({ _id }, data, {
            new: true,
        });

        res.json(user);
    },

    async login(req, res) {
        const { email, password } = req.body;
        User.findOne(
            {
                email: email,
            },
            function (err, user) {
                if (err) {
                    console.log(err);
                    res.status(200).json({ error: "Erro no servidor" });
                } else if (!user) {
                    res.status(200).json({
                        status: 2,
                        error: "E-mail incorreto",
                    });
                } else {
                    user.isCorrectPassword(
                        password,
                        async function (err, same) {
                            if (err) {
                                res.status(200).json({
                                    error: "Erro no servidor",
                                });
                            } else if (!same) {
                                res.status(200).json({
                                    status: 2,
                                    error: "Senha incorreta",
                                });
                            } else {
                                const payload = { email };
                                const token = jwt.sign(payload, secret, {
                                    expiresIn: "24h",
                                });
                                res.cookie("token", token, { httpOnly: true });
                                res.status(200).json({
                                    status: 1,
                                    auth: true,
                                    token: token,
                                    id_client: user._id,
                                    user: user.name,
                                });
                            }
                        }
                    );
                }
            }
        );
    },

    async checkToken(req, res) {
        const token =
            req.body.token ||
            req.query.token ||
            req.cookies.token ||
            req.headers["x-access-token"];

        if (!token) {
            res.json({
                status: 401,
                msg: "Não autorizado: Token inexistente",
            });
        } else {
            jwt.verify(token, secret, function (err, decoded) {
                if (err) {
                    res.json({
                        status: 401,
                        msg: "Não autorizado: Token inválido",
                    });
                } else {
                    res.json({ status: 200 });
                }
            });
        }
    },

    async destroyToken(req, res) {
        const token = req.headers.token;

        if (token) {
            res.cookie("token", null, { httpOnly: true });
        } else {
            res.status(401).send("Logout não autorizado");
        }
        res.send("Sessão finalizada com sucesso");
    },
};
