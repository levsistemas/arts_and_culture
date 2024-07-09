const express = require('express');
const router = express.Router();
const app = express();
const moment = require('moment');

const bodyParser = require('body-parser')
app.use(bodyParser.json());

app.use(express.static('public'));

router.delete('/arts_and_culture/:id', (req, res) => {
    const conn4 = require('../db/arts_and_culture');
    const id = req.params.id;
    const sql = `DELETE FROM ${process.env.PROYECTO_LOCAL_TABLE_2} WHERE id=${id}`;
    conn4.query(sql, (err, resp) => {
        if (err) {
            console.log('ERROR:',err)
        }
        if(res.status(200)){
            console.log('El Usuario fue borrado exitosamente con id:' + id + ' en la tabla:' + process.env.PROYECTO_LOCAL_TABLE_2);
            console.log(resp)
            const html = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Registro generado</title>
                <style>
                    * {
                        box-sizing: border-box;
                        margin: 0;
                        padding: 0;
                    }
            
                    body {
                        background-color: #2c3e50;
                        font-family: Arial, sans-serif;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        color: #ecf0f1;
                    }
            
                    .container {
                        background-color: #34495e;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
                    }
            
                    h1 {
                        color: #e74c3c;
                        margin-bottom: 20px;
                    }
            
                    h2 {
                        margin-bottom: 10px;
                    }
            
                    .data span {
                        color: #3498db;
                        background-color: #ecf0f1;
                        padding: 2px 4px;
                        border-radius: 4px;
                    }
            
                    .links {
                        display: flex;
                        justify-content: space-between;
                        margin-top: 20px;
                    }
            
                    .links a {
                        color: #3498db;
                        text-decoration: none;
                        background-color: #ecf0f1;
                        padding: 10px 20px;
                        border-radius: 4px;
                        transition: background-color 0.3s;
                    }
            
                    .links a:hover {
                        background-color: #bdc3c7;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Registro eliminado exitosamente con ID: <span>${id}</span> para la Tabla ${process.env.PROYECTO_LOCAL_TABLE_2}</h1>
                    <div class="links">
                        <a href='/'>INICIO</a>
                        <a href='/query/arts_and_culture'>VOLVER</a>
                    </div>
                </div>
            </body>
            </html>`;
            res.send(html)
        }
    })
})

router.get("/arts_and_culture/:id", (request, response) => {
    const connection3 = require('../db/arts_and_culture')
    const id = request.params.id;
    const sql1 = `SELECT * FROM ${process.env.PROYECTO_DATABASE}.${process.env.PROYECTO_LOCAL_TABLE_2} WHERE id=?;`;
    connection3.query(sql1, id, (err, result) => {
        if(err) {
            console.log('ERROR',err)
        }
        if(response.status(200)){
            console.log('PAGINA DE CONFIRMACION PARA BORRAR EL REGISTRO:' + id + ' en la Tabla: ' + process.env.PROYECTO_LOCAL_TABLE_2);
            const html = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Eliminar registro</title>
                <style>
                    * {
                        box-sizing: border-box;
                        margin: 0;
                        padding: 0;
                    }
            
                    body {
                        background-color: #2c3e50;
                        font-family: Arial, sans-serif;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        color: #ecf0f1;
                    }
            
                    .container {
                        background-color: #34495e;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
                    }
            
                    h1 {
                        color: #e74c3c;
                        margin-bottom: 20px;
                    }
            
                    h2 {
                        margin-bottom: 10px;
                    }
            
                    .data span {
                        color: #3498db;
                        background-color: #ecf0f1;
                        padding: 2px 4px;
                        border-radius: 4px;
                    }
            
                    .links {
                        display: flex;
                        justify-content: space-between;
                        margin-top: 20px;
                    }
            
                    .links a {
                        color: #3498db;
                        text-decoration: none;
                        background-color: #ecf0f1;
                        padding: 10px 20px;
                        border-radius: 4px;
                        transition: background-color 0.3s;
                    }
            
                    .links a:hover {
                        background-color: #bdc3c7;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Confirma la operación para eliminar el registro con ID: <span>${id}</span> para la Tabla ${process.env.PROYECTO_LOCAL_TABLE_2}</h1>
                    ${result.map(element => `
                        <div class="data">
                        <h2>Id: <span>${element.id}</span></h2>
                        <h2>Nombre: <span>${element.Nombre}</span></h2>
                        <h2>Apellido: <span>${element.Apellido}</span></h2>
                        <h2>DNI: <span>${element.Dni}</span></h2>
                        <h2>Celular: <span>${element.Celular}</span></h2>
                        <h2>Sexo: <span>${element.Sexo}</span></h2>
                        <h2>Email: <span>${element.Email}</span></h2>
                        <h2>Fecha de Nacimiento: <span>${moment(element.Nacimiento).format('YYYY-MM-DD HH:mm:ss')}</span></h2>
                        <h2>FK_EMAIL: <span>${element.fk_email}</span></h2>
                        <h2>FK_INSCRIPCIONES: <span>${element.fk_inscripciones}</span></h2>
                        <h2>FK_CURSOS: <span>${element.fk_cursos}</span></h2>
                    </div>
                    `)}
                    <div class="links">
                        <a href='/'>ELIMINAR</a>
                        <a href='/query/arts_and_culture/${id}'>VOLVER</a>
                        <a href='/'>INICIO</a>
                    </div>
                </div>
            </body>
            </html>`
            response.status(200).send(html)
        }
    })
})

module.exports = router;