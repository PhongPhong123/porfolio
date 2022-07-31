const express = require('express');
const http = require('http');
const path = require('path');
const config = require('../config');

function main () {
    const app = express();
    const httpServer = http.createServer(app);

    app.use('/publics', express.static(path.join(config.__dirname, 'publics')));
    app.use('/images', express.static(path.join(config.__dirname, 'assets', 'imgs')));
    app.use('/css', express.static(path.join(config.__dirname, 'assets', 'styles')));
    app.use('/js', express.static(path.join(config.__dirname, 'assets', 'js')));
    app.use('/configs', express.static(path.join(config.__dirname, 'configs')));

    app.get('/', (req, res) => {
        return res.sendFile(path.join(config.__dirname, 'views', 'index.html'));
    });

    app.get('/cv', (req, res) => {
        return res.sendFile(path.join(config.__dirname, 'publics', 'Viet-Anh-Le_CV.pdf'));
    });

    const port = 1808;
    httpServer.listen(port, () => {
        console.log('Running');
    });
}

main();