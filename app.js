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

app.use('/home', home);
app.use('/search',search);
app.use('/detail',detail);
app.use('/manga',manga);

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debug("morganEnabled");
}
