const express = require('express');
const cors = require('cors');
const session = require('express-session');
const app = express();
const port = 3001;

// const dotenv = require('dotenv').config();

// static
const connection = require('./static/connection');
const dimensions = require('./static/dimensions');
const general = require('./static/general');

// performance
const performance = require('./performance/performance');

// activity
const keydown = require('./activity/keydown');
const keyup = require('./activity/keydown');
const mouseclick = require('./activity/mouseclick');
const mouseposition = require('./activity/mouseposition');
const timing = require('./activity/timing');

const mysql = require('mysql');

app.use(express.json());
app.use(session({
    secret: 'Sahil',
    saveUninitialized: true,
    resave: false,
    cookie: {
        secure: true,
    }
}));
app.use(cors({ origin: ['https://web-analytics.cloud', 'https://reporting.web-analytics.cloud'] }));
app.set('trust proxy', 1);

app.listen(port, function () {
    console.log(`Analytics Endpoint listening at https://collector.web-analytics.cloud:${port}`);
});

app.get('/', function (req, res) {
    res.send("Working");
});

// serve analytics script
app.get('/analytics.min.js', function (req, res) {
    const options = {
        root: __dirname,
        dotfiles: 'deny'
    };
    res.sendFile('/scripts/collector.js', options, function (err) {
        if (err) {
            console.error(err.message);
        }
    })
});

// static 

// connection data
app.get('/static/connection', connection.get_all);
app.get('/static/connection/:id', connection.get);
app.post('/static/connection', connection.post);
app.put('/static/connection/:id', connection.put);
app.delete('/static/connection/:id', connection.delete);

// dimensions data
app.get('/static/dimensions', dimensions.get_all);
app.get('/static/dimensions/:id', dimensions.get);
app.post('/static/dimensions', dimensions.post);
app.put('/static/dimensions/:id', dimensions.put);
app.delete('/static/dimensions/:id', dimensions.delete);

// general data
app.get('/static/general', general.get_all);
app.get('/static/general/:id', general.get);
app.post('/static/general', general.post);
app.put('/static/general/:id', general.put);
app.delete('/static/general/:id', general.delete);


// performance
app.get('/performance', performance.get_all);
app.get('/performance/:id', performance.get);
app.post('/performance', performance.post);
app.put('/performance/:id', performance.put);
app.delete('/performance/:id', performance.delete);


// activity

// keydown
app.get('/activity/keydown', keydown.get_all);
app.get('/activity/keydown/:id', keydown.get);
app.post('/activity/keydown', keydown.post);
app.put('/activity/keydown/:id', keydown.put);
app.delete('/activity/keydown/:id', keydown.delete);

// keyup
app.get('/activity/keyup', keyup.get_all);
app.get('/activity/keyup/:id', keyup.get);
app.post('/activity/keyup', keyup.post);
app.put('/activity/keyup/:id', keyup.put);
app.delete('/activity/keyup/:id', keyup.delete);

// mouseclick
app.get('/activity/mouseclick', mouseclick.get_all);
app.get('/activity/mouseclick/:id', mouseclick.get);
app.post('/activity/mouseclick', mouseclick.post);
app.put('/activity/mouseclick/:id', mouseclick.put);
app.delete('/activity/mouseclick/:id', mouseclick.delete);

// mouseposition
app.get('/activity/mouseposition', mouseposition.get_all);
app.get('/activity/mouseposition/:id', mouseposition.get);
app.post('/activity/mouseposition', mouseposition.post);
app.put('/activity/mouseposition/:id', mouseposition.put);
app.delete('/activity/mouseposition/:id', mouseposition.delete);

// timing
app.get('/activity/timing', timing.get_all);
app.get('/activity/timing/:id', timing.get);
app.post('/activity/timing', timing.post);
app.put('/activity/timing/:id', timing.put);
app.delete('/activity/timing/:id', timing.delete);