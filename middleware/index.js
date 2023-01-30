const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const init = (app) => {
    app.use(express.json());
    app.use(cors());
    app.use(morgan('combined'));
};

module.exports = init;
