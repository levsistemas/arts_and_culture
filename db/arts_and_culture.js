const mysql = require('mysql2');

require('dotenv').config();

const connection4 = mysql.createConnection({
    host: process.env.PROYECTO_HOST,
    user: process.env.PROYECTO_USER,
    password: process.env.PROYECTO_PASSWORD,
    database: process.env.PROYECTO_DATABASE,
    port: process.env.PROYECTO_PORT
});

connection4.connect( (err) =>{
    if(err) {
        console.error("Error en la conexion a la DB 4..." + process.env.HOST, err);
        return;
    }

    console.log("Conectado exitosamente a la base datos Nº 4: " + process.env.HOST + ' en la base de datos: ' + process.env.PROYECTO_DATABASE);
});

module.exports = connection4;