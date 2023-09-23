const {connect} = require('mongoose');
require('dotenv').config({});

const MONGO_URL = process.env.MONGO_URL;

const mongoConnection = () => {
    return connect(MONGO_URL);
};

module.exports = {mongoConnection};