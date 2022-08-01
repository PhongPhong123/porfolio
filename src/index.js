// const express = require('express');
// const http = require('http');
// const path = require('path');
// const config = require('../config');
// const fetch = require('node-fetch');
// const dotenv = require('dotenv');

import express from 'express';
import http from 'http';
import path from 'path';
import config from '../config.js';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

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

    app.get('/github-repos', async (req, res) => {
        const response = await fetch(`https://api.github.com/users/${process.env.GITHUB_USERNAME}/repos`);
        const responseJson = await response.json();
        return res.json(responseJson);
    });

    const port = 1808;
    httpServer.listen(port, () => {
        console.log('Running');
    });
}

main();