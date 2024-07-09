const mysql = require('mysql2');

require('dotenv').config();

const connection1 = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.PORT
});

connection1.connect( (err) =>{
    if(err) {
        console.error("Error en la conexion a la DB 1..." + process.env.HOST, err);
        return;
    }

    console.log("Conectado exitosamente a la base datos Nº1: " + process.env.HOST);
});

module.exports = connection1;