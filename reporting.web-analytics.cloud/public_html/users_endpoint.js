const express = require("express");
const cors = require('cors');
const mysql = require('mysql');
const dotenv = require('dotenv').config();

const app = express();
const port = 3002;
const config = {
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    port: process.env.port
}

function handleError(error) {
    if (error) {
        console.error(error.message);
        // console.error(error.stack);
    }
}

app.use(express.json());
app.use(cors({ credentials: true, origin: true }));
app.set('trust proxy', 1);

app.listen(port, () => console.log(
    `User CRUD API listening on port ${port}`
));

app.get('/', function (req, res) {
    db_connection = mysql.createConnection(config);
    db_connection.connect(handleError);

    let sql = `SELECT * FROM users`;
    let data = "Not set";

    db_connection.query(sql, data, (err, results, fields) => {
        handleError(err);
        res.send(results);
    });

    db_connection.end(handleError);
});

app.get('/:id', function (req, res) {
    db_connection = mysql.createConnection(config);
    db_connection.connect(handleError);

    let sql = `SELECT * FROM users where id=?`
    let data = [req.params.id]

    db_connection.query(sql, data, (err, results, fields) => {
        handleError(err);
        res.send(results);
    });

    db_connection.end(handleError);
});

app.post('/', function (req, res) {
    db_connection = mysql.createConnection(config);
    db_connection.connect(handleError);

    object = req.body;
    data = []

    for (const key in object) {
        data.push(object[key]);
    }

    let sql = `INSERT INTO users(id, username, passcode, isAdmin)
                VALUES(?, ?, ?, ?)`;

    db_connection.query(sql, data, (err, results, fields) => {
        handleError(err);
        res.send(object);
    });

    db_connection.end(handleError);
});

app.put('/:id', function (req, res) {
    db_connection = mysql.createConnection(config);
    db_connection.connect(handleError);

    object = req.body;
    delete object.id;
    data = []

    for (const key in object) {
        data.push(object[key]);
    }
    data.push(req.params.id);

    let sql = `UPDATE users 
    
                SET username=?, 
                passcode=?, 
                isAdmin=?

                WHERE id=?`;

    db_connection.query(sql, data, (err, results, fields) => {
        handleError(err);
        res.send(object);
    });

    db_connection.end(handleError);
});

app.delete('/:id', function (req, res) {
    db_connection = mysql.createConnection(config);
    db_connection.connect(handleError);

    let sql = `DELETE FROM users where id=?`
    let data = [req.params.id]

    db_connection.query(sql, data, (err, results, fields) => {
        handleError(err);
        res.send(results);
    });

    db_connection.end(handleError);
});