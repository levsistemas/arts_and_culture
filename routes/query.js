const express = require('express');
const router = express.Router();
const app = express();
const moment = require('moment');

const bodyParser = require('body-parser')

app.use(bodyParser.json());

app.use(express.urlencoded({extended: true }));

app.use(express.json());

router.get("/arts_and_culture", (request, response) => {
    const connection3 = require('../db/arts_and_culture')
    const sql1 = 'SELECT * FROM ' + process.env.PROYECTO_DATABASE + '.' + process.env.PROYECTO_LOCAL_TABLE_2;
    const sql2 = `SELECT usuarios.id, usuarios.Nombre, usuarios.Apellido, usuarios.Dni, usuarios.Celular, usuarios.Sexo, usuarios.Email, usuarios.Nacimiento, email.email AS CORREO, registro.id_registro AS REGISTRO, x.id_x AS IDENTIFICADOR FROM usuarios JOIN email ON usuarios.fk_email = email.id_email
    JOIN registro ON usuarios.fk_registro = registro.id_registro
    JOIN x ON usuarios.fk_x = x.id_x;`
    connection3.query(sql1, (err, result) => {
        if (err) throw err;
        const html = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Consultando registros</title>
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
                    // height: 100vh;
                    color: #ecf0f1;
                }

                .container {
                    background-color: #34495e;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
                    width: 80%;
                    max-width: 800px;
                }

                h1 {
                    color: #e74c3c;
                    margin-bottom: 20px;
                }

                h2 {
                    margin-bottom: 10px;
                }

                .card {
                    background-color: #2c3e50;
                    padding: 15px;
                    border-radius: 8px;
                    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
                    margin-bottom: 20px;
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

                .action-links {
                    display: flex;
                    justify-content: space-between;
                    width: 50%;
                    margin-top: 10px;
                }

                .action-links a {
                    text-decoration: none;
                    color: #e74c3c;
                    background-color: #ecf0f1;
                    padding: 5px 10px;
                    border-radius: 4px;
                    transition: background-color 0.3s;
                }

                .action-links a:hover {
                    background-color: #bdc3c7;
                }

                hr {
                    margin-top: 20px;
                    margin-bottom: 20px;
                    border: 1px solid #ecf0f1;
                }
            </style>
        </head>
        <body>
        <div class="container">
        <h1>Consultando la tabla: <span>${process.env.PROYECTO_LOCAL_TABLE_2}</span></h1>
        ${result.map(elements => `
            <div class="card">
                <div class="data">
                    <h2>ID: <span>${elements.id}</span></h2>
                    <h2>Nombre: <span>${elements.Nombre}</span></h2>
                    <h2>Apellido: <span>${elements.Apellido}</span></h2>
                    <h2>DNI: <span>${elements.Dni}</span></h2>
                    <h2>Celular: <span>${elements.Celular}</span></h2>
                    <h2>Sexo: <span>${elements.Sexo}</span></h2>
                    <h2>Email: <span>${elements.Email}</span></h2>
                    <h2>Fecha de Nacimiento: <span>${moment(elements.Nacimiento).format('YYYY-MM-DD HH:mm:ss')}</span></h2>
                    <h2>FK_EMAIL: <span>${elements.fk_email}</span></h2>
                    <h2>FK_INSCRIPCIONES: <span>${elements.fk_inscripciones}</span></h2>
                    <h2>FK_CURSOS: <span>${elements.fk_cursos}</span></h2>
                    <div class="action-links">
                        <a href="/query/arts_and_culture/${elements.id}">CONSULTAR</a>
                        <a href="/edit/arts_and_culture/${elements.id}">EDITAR</a>
                        <a href="/delete/arts_and_culture/${elements.id}">ELIMINAR</a>
                    </div>
                </div>
            </div>
            `).join('')}
            <div class="links">
                <a href='/'>INICIO</a>
            </div>
        </div>
        </body>
        </html>`
        response.send(html);
    });
});

router.get("/arts_and_culture/:id", (request, response) => {
    const connection3 = require('../db/arts_and_culture')
    const id = request.params.id;
    const sql1 = `SELECT * FROM ${process.env.PROYECTO_DATABASE}.${process.env.PROYECTO_LOCAL_TABLE_2} WHERE id=?;`;
    connection3.query(sql1, id, (err, result) => {
        if(err) {
            console.log('ERROR',err)
        }
        if(response.status(200)){
            console.log('CONSULTA EXITOSA AL REGISTRO:' + id + ' en la Tabla: ' + process.env.PROYECTO_LOCAL_TABLE_2);
            const html = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Consultando registro</title>
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
                    <h1>Consultando registro con ID: <span>${id}</span> para la Tabla ${process.env.PROYECTO_LOCAL_TABLE_2}</h1>
                    ${result.map(element => `
                        <div class="data">
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
                    <a href='/'>INICIO</a>
                    <a href='/edit/arts_and_culture/${id}'>EDITAR</a>
                    <a href='/delete/arts_and_culture/${id}'>ELIMINAR</a>
                    <a href='/query/arts_and_culture'>VOLVER</a>
                    </div>
                </div>
            </body>
            </html>`
            response.status(200).send(html)
        }
    })
})

module.exports = router;