var bcrypt = require("bcryptjs");


const data = {
    users: [{
        name: "admin",
        email: "admin@gmail.com",
        password: bcrypt.hashSync('123', 8),
        phone: "6282952623",
        description: "description...",
        role: 1
    },
    {
        name: "docter",
        email: "docter@gmail.com",
        password: bcrypt.hashSync('123', 8),
        phone: "6282952623",
        description: "description...",
        role: 2
    }
    ]
}
module.exports = data;