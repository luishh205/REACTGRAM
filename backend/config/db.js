const mongoose = require("mongoose");
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

const conn = async () => {
    try {
        const dbConn = await mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@primeiroapp.gp5qw.mongodb.net/?retryWrites=true&w=majority&appName=PrimeiroApp`)

        console.log("conectado ao banco!");

        return dbConn;
    } catch (error) {
        console.log(error)
    }
};

conn();

module.exports = conn;