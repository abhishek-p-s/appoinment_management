var mongoose = require("mongoose");

const appointmentModal = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    date_time: { type: String, required: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    specialization: { type: String, required: false },
    comments: { type: String, required: false },
}, {
    timestamps: true
})

const Appointment = mongoose.model('Appointment', appointmentModal);
module.exports = Appointment