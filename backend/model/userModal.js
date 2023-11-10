var mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    description: { type: String, required: false },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: Number, required: true },
    image: { type: Array, required: false },
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema);
module.exports = User