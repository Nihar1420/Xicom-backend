const { mongoose } = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const dbConnect = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_CONNECTION_URI);
        console.log(`Successfully connected to database ${connection.connection.name}`);
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = dbConnect;
