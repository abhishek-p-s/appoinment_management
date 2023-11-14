var bcrypt = require("bcryptjs");


const data = {
    users: [{
        name: "admin",
        email: "admin@gmail.com",
        password: bcrypt.hashSync('123', 8),
        phone: "6282952623",
        role: 1
    },
    {
        name: "docter",
        email: "docter@gmail.com",
        password: bcrypt.hashSync('123', 8),
        phone: "6282952623",
        role: 2
    }
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