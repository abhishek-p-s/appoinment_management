var mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
    specialization: { type: String, required: false },
    image: { type: Array, required: false },
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema);
module.exports = User