const mysql = require('mysql2');

require('dotenv').config();

const connection2 = mysql.createConnection({
    host: process.env.REMOTE_HOST,
    user: process.env.REMOTE_USERNAME,
    password: process.env.REMOTE_PASSWORD,
    database: process.env.REMOTE_DATABASE,
    port: process.env.REMOTE_PORT
});

connection2.connect( (err) =>{
    if(err) {
        console.error("Error en la conexion a la DB 2..." + process.env.REMOTE_HOST, err);
        return;
    }

    console.log("Conectado exitosamente a la base datos Nº2: " + process.env.REMOTE_HOST);
});

module.exports = connection2;