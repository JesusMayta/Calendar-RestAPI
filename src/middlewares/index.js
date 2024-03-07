const validateFields = require('./validateFields');
const validateJWT = require('./validateJwt');

module.exports = {
    ...validateFields,
    ...validateJWT
};