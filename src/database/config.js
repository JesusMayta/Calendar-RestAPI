const { connect } = require('mongoose');
require('colors');

const dbConnection = async () => {

    try {
        await connect(process.env.DB_CNN);

        console.log('\nMongoDb connection online!!'.blue);
    } catch (error) {
        console.log(error);
        throw new Error('\nError connecting to Mongo');
    };
};

module.exports = {
    dbConnection
};