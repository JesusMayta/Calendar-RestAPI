const userValidations = require('./validations/user.validation');
const eventsValidations = require('./validations/events.validate');
const configJWT = require('./jwt/configJwt');

module.exports = {
    ...configJWT,
    ...eventsValidations,
    ...userValidations
};