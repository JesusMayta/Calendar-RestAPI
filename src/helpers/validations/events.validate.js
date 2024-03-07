const moment = require('moment');
const { Event } = require('../../models');

const { isValidObjectId } = require('mongoose');

const isDate = (value, { req, location, path }) => {

    if (!value) return false;
    const fecha = moment(value);

    return (fecha.isValid()) ? true : false;
};

const IdEventExist = async (id = '') => {

    if (isValidObjectId(id)) {
        const existEvent = await Event.findById(id);
        if (!existEvent) throw new Error(`Event not found with ID ${id}`);
        return;
    } else {
        throw new Error(`Id: ${id} not is MongoId valid`);
    };
};

module.exports = {
    IdEventExist,
    isDate,
};