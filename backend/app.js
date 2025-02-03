// app.js
const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
const { readdirSync } = require('fs');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT;

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
readdirSync('./routes').map((routeFile) => {
    if (routeFile.endsWith('.js')) {
        const route = require(`./routes/${routeFile}`);
        app.use('/api/v1', route);
    }
});

// Start server
const server = () => {
    db();
    app.listen(PORT, () => {
        console.log('Listening on port:', PORT);
    });
};

server();