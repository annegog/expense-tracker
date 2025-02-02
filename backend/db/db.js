const mongoose = require('mongoose');

const db = async () => {
    try {
       mongoose.set('strictQuery', false);
       await mongoose.connect(process.env.MONGO_URL);
       console.log('DB CONNECTED!');
    } catch (error) {
        console.error('ERROR on DB Connection:', error.message);
        process.exit(1); // Exit process if DB fails
    }
}

module.exports = { db };
