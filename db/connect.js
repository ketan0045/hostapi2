const mongoose = require("mongoose");

const connectDB = (uri) => {
    console.log("connectDB -----To database")
    return mongoose.connect(uri, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true
    })
}

module.exports = connectDB;
