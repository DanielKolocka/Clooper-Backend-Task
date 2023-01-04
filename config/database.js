const mongoose = require('mongoose');

const connectDataBase = () => {
    mongoose.connect(process.env.DB_LOCAL_URI)
        .then(connection => {
            console.log(`MongoDB with Host: ${connection.connection.host}`);
        })
}

module.exports = connectDataBase;