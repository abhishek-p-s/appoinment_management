var mongoose = require("mongoose");

const roleModal = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
}, {
    timestamps: true
})

const Role = mongoose.model('Role', roleModal);
module.exports = Role