const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    number: { type: String, required: true, max: 12 },
    gender: { type: String, required: true, max: 1 },
    id: { type: Number, required: true },
    photo: { type: String, required: true },
})

module.exports = mongoose.model('employees', employeeSchema);