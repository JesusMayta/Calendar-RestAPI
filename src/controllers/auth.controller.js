const { request, response } = require('express');
const { Usuario } = require('../models');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers');

const LoginUser = async (req = request, res = response) => {

    const { email, password } = req.body;

    try {

        const user = await Usuario.findOne({ email });
        if (!user) return res.status(400).json({ ok: false, msg: 'User or password incorrect' });

        //* Confirmar password
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) return res.status(400).json({ ok: false, msg: 'The password is incorrect' });

        //* JWT
        const token = await generateJWT(user.id, user.name);

        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error in login service, please talk with administrator'
        });
    };
};

const RegisterUser = async (req = request, res = response) => {

    const { email, password, name } = req.body;

    try {

        const user = new Usuario({ email, password, name });

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        //* JWT
        const token = await generateJWT(user.id, user.name);

        res.status(210).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error saving user, please talk with administrator'
        });
    };
};

const RevalidateToken = async (req = request, res = response) => {

    const { uid, name } = req;

    try {
        //* JWT
        const token = await generateJWT(uid, name);

        res.json({
            ok: true,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error renew token, please talk with administrator'
        });
    };
};


module.exports = {
    LoginUser,
    RegisterUser,
    RevalidateToken
};