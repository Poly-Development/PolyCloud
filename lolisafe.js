require('sqreen');
const config = require('./config.js');
const api = require('./routes/api.js');
const album = require('./routes/album.js');
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const RateLimit = require('express-rate-limit');
const db = require('knex')(config.database);
const fs = require('fs');
const exphbs = require('express-handlebars');
const safe = express();
import express from 'express';
import * as Sentry from '@sentry/node';

Sentry.init({ dsn: 'https://2a64cf30db9a480d9581d51b916da47d@o410886.ingest.sentry.io/5285350' });

// The request handler must be the first middleware on the app
safe.use(Sentry.Handlers.requestHandler());

// All controllers should live here
safe.get('/', function rootHandler(req, res) {
  res.end('Hello world!');
});

// The error handler must be before any other error middleware and after all controllers
safe.use(Sentry.Handlers.errorHandler());

// Optional fallthrough error handler
safe.use(function onError(err, req, res, next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  res.end(res.sentry + "\n");
});

safe.use (function (req, res, next) {
        if (req.secure) {
                // request was via https, so do no special handling
                next();
        } else {
                // request was via http, so redirect to https
                res.redirect('https://' + req.headers.host + req.url);
        }
});
require('./database/db.js')(db);

fs.existsSync('./pages/custom' ) || fs.mkdirSync('./pages/custom');
fs.existsSync('./' + config.logsFolder) || fs.mkdirSync('./' + config.logsFolder);
fs.existsSync('./' + config.uploads.folder) || fs.mkdirSync('./' + config.uploads.folder);
fs.existsSync('./' + config.uploads.folder + '/thumbs') || fs.mkdirSync('./' + config.uploads.folder + '/thumbs');
fs.existsSync('./' + config.uploads.folder + '/zips') || fs.mkdirSync('./' + config.uploads.folder + '/zips')

safe.set('trust proxy', 1);

safe.engine('handlebars', exphbs({ defaultLayout: 'main' }));
safe.set('view engine', 'handlebars');
safe.enable('view cache');

let limiter = new RateLimit({ windowMs: 5000, max: 2 });
safe.use('/api/login/', limiter);
safe.use('/api/register/', limiter);

safe.use(bodyParser.urlencoded({ extended: true }));
safe.use(bodyParser.json());

if (config.serveFilesWithNode) {
	safe.use('/', express.static(config.uploads.folder));
}

safe.use('/', express.static('./public'));
safe.use('/', album);
safe.use('/api', api);

for (let page of config.pages) {
	let root = './pages/';
	if (fs.existsSync(`./pages/custom/${page}.html`)) {
		root = './pages/custom/';
	}
	if (page === 'index') {
		safe.get('/', (req, res, next) => res.sendFile(`${page}.html`, { root: root }));
	} else {
		safe.get(`/${page}`, (req, res, next) => res.sendFile(`${page}.html`, { root: root }));
	}
}

safe.use((req, res, next) => res.status(404).sendFile('404.html', { root: './pages/error/' }));
safe.use((req, res, next) => res.status(403).sendFile('403.html', { root: './pages/error/' }));
safe.use((req, res, next) => res.status(500).sendFile('500.html', { root: './pages/error/' }));

const port = process.env.PORT || 8080;
safe.listen(port, () => {
  console.log('Express server listening on port', port)
});
