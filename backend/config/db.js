
const mongoose = require("mongoose");
module.exports = async app => {
    await mongoose.connect('mongodb://127.0.0.1:27017/appoinment', {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        // useFindAndModify: false
    }).then(res => console.log("connected")).catch(err => console.log(err))
    mongoose.Promise = global.Promise;
    process.on("SIGINT", cleanup);
    process.on("SIGTERM", cleanup);
    process.on("SIGHUP", cleanup);
    if (app) {
        app.set("mongoose", mongoose);
    }
};
function cleanup() {
    mongoose.connection.close(function () {
        process.exit(0);
    });
}




