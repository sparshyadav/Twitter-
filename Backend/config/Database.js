const mongoose = require("mongoose");

const connectDatabase = () => {
    try {
        mongoose.connect(process.env.DATABASE_URL);

        console.log("Database Connected");
    }
    catch (error) {
        console.log("An Error Occurred While Connecting with Database", error);
    }
}

module.exports = connectDatabase;