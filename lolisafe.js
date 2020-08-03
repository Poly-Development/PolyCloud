require('sqreen');
require('newrelic');
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
const app = express();
app.use (function (req, res, next) {
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

app.set('trust proxy', 1);

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.enable('view cache');

let limiter = new RateLimit({ windowMs: 5000, max: 2 });
app.use('/api/login/', limiter);
app.use('/api/register/', limiter);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (config.serveFilesWithNode) {
	app.use('/', express.static(config.uploads.folder));
}

app.use('/', express.static('./public'));
app.use('/', album);
app.use('/api', api);

for (let page of config.pages) {
	let root = './pages/';
	if (fs.existsSync(`./pages/custom/${page}.html`)) {
		root = './pages/custom/';
	}
	if (page === 'index') {
		app.get('/', (req, res, next) => res.sendFile(`${page}.html`, { root: root }));
	} else {
		app.get(`/${page}`, (req, res, next) => res.sendFile(`${page}.html`, { root: root }));
	}
}

app.use((req, res, next) => res.status(404).sendFile('404.html', { root: './pages/error/' }));
app.use((req, res, next) => res.status(403).sendFile('403.html', { root: './pages/error/' }));
app.use((req, res, next) => res.status(500).sendFile('500.html', { root: './pages/error/' }));

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Express server listening on port', port)
});
