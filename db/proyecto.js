const mysql = require('mysql2');

require('dotenv').config();

const connection3 = mysql.createConnection({
    host: process.env.HOST1,
    user: process.env.USER1,
    password: process.env.PASSWORD1,
    database: process.env.DATABASE1,
    port: process.env.PORT1
});

connection3.connect( (err) =>{
    if(err) {
        console.error("Error en la conexion a la DB 3..." + process.env.HOST, err);
        return;
    }

    console.log("Conectado exitosamente a la base datos Nº3: " + process.env.HOST);
});

module.exports = connection3;