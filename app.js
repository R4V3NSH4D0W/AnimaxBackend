const express = require("express");
const morgan = require('morgan');
const debug = require('debug')('app:startup');
const home = require('./src/routes/home');
const search = require('./src/routes/search');
const detail = require('./src/routes/mangadetail');
const manga =require( './src/routes/manga');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/home', home);
app.use('/api/search',search);
app.use('/api/detail',detail);
app.use('/api/manga',manga);

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debug("morganEnabled");
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
