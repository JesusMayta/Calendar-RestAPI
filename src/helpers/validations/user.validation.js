const { Usuario } = require("../../models");

const emailExist = async (email = '') => {
    const userEmail = await Usuario.findOne({ email });
    if (userEmail) {
        throw new Error(`User exist with email: ${email}`);
    };
    return;
};

module.exports = {
    emailExist
};