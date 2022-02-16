const mysql = require('mysql');
const dotenv = require('dotenv').config();

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
    }
}

exports.get_all = function (req, res) {
    db_connection = mysql.createConnection(config);
    db_connection.connect(handleError);

    let sql = `SELECT * FROM mouseclick`;
    let data = "Not set";

    db_connection.query(sql, data, (err, results, fields) => {
        handleError(err);
        res.send(results);
    });

    db_connection.end(handleError);
}

exports.get = function (req, res) {
    return null;
}

exports.post = function (req, res) {
    db_connection = mysql.createConnection(config);

    object = req.body;
    delete object.ready;
    data = [req.sessionID];

    for (const key in object) {
        data.push(object[key]);
    }

    db_connection.connect(handleError);

    let sql = `INSERT INTO mouseclick(
                            sessionID,
                            clientX,
                            clientY,
                            layerX,
                            layerY,
                            offsetX,
                            offsetY,
                            pageX,
                            pageY,
                            screenX,
                            screenY,
                            x,
                            y,
                            altKey,
                            ctrlKey,
                            shiftKey,
                            timestamp
                           )
                VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db_connection.query(sql, data, (err, results, fields) => {
        handleError(err);
    });

    db_connection.end(handleError);
    res.send("keyup success");
}

exports.delete = function (req, res) {
    return null;
}

exports.put = function (req, res) {
    return null;
}