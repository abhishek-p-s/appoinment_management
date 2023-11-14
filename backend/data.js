var bcrypt = require("bcryptjs");


const data = {
    users: [{
        name: "admin",
        email: "admin@gmail.com",
        password: '123',
        phone: "6282952623",
        role: 1
    },
    ],
    roles: [
        {
            id: 1,
            name: "Admin",
        },
        {
            id: 2,
            name: "Doctor",
        },
        {
            id: 3,
            name: "Patient",
        }
    ]
}
module.exports = data;