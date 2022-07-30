const express = require('express');
const http = require('http');
const path = require('path');
const config = require('../config');

function main () {
    const app = express();
    const httpServer = http.createServer(app);

    app.get('/', (req, res) => {
        return res.sendFile(path.join(config.__dirname, 'views', 'index.html'));
    });

    const port = 1808;
    httpServer.listen(port, () => {
        console.log('Running');
    });
}

main();