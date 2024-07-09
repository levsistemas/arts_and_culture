const express = require('express');
const router = express.Router();
const app = express();
const moment = require('moment');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(express.static('public'));

//METODO PUT PARA ACTUALIZAR LA BASE DE DATOS ARTS_AND_CULTURE
router.put('/arts_and_culture/:id', (req, res) => {
    const conn4 = require('../db/arts_and_culture');
    const id = req.params.id;
    const info = req.body;
    const sql = `UPDATE ${process.env.PROYECTO_LOCAL_TABLE_2} SET ? WHERE ${process.env.PROYECTO_LOCAL_TABLE_2}.id=${id};`;
    conn4.query(sql, info, (err, resp) => {
        if(err) throw err;
        if(err) {
            console.log(err);
        }
        const html = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Actualizado...</title>
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
        <h1>Registro editado exitosamente con Id: <span>${id}</span></h1>
        <div class="data">
            <h2>Nombre: <span>${info.Nombre}</span></h2>
            <h2>Apellido: <span>${info.Apellido}</span></h2>
            <h2>DNI: <span>${info.Dni}</span></h2>
            <h2>Celular: <span>${info.Celular}</span></h2>
            <h2>Sexo: <span>${info.Sexo}</span></h2>
            <h2>Email: <span>${info.Email}</span></h2>
            <h2>Fecha de Nacimiento: <span>${info.Nacimiento}</span></h2>
            <h2>FK_EMAIL: <span>${info.fk_email}</span></h2>
            <h2>FK_INSCRIPCIONES: <span>${info.fk_inscripciones}</span></h2>
            <h2>FK_CURSOS: <span>${info.fk_cursos}</span></h2>
        </div>
        <div class="links">
            <a href='/'>INICIO</a>
            <a href='/query/arts_and_culture'>VOLVER</a>
        </div>
    </div>
        </body>
        </html>`;
        if(res.status(200)) {
            res.status(200).send(html);
            console.log('Registro actualizado exitosamente con ID:' + id + ' en la Tabla ' + process.env.PROYECTO_LOCAL_TABLE_2)
        }
    })
})

router.get('/arts_and_culture/:id', (req, res) => {
    const conn4 = require('../db/arts_and_culture');
    const id = req.params.id;
    const body = req.body;
    const sql = `SELECT * FROM ${process.env.PROYECTO_LOCAL_TABLE_2} WHERE id=?`
    conn4.query(sql, id, (err, result) => {
        if(err) {
            console.log('Error en la consulta...',err)
        }
        if(res.status(200)){
            console.log(`Resultado de consulta exitosa al ID:${id} en la Tabla: ${process.env.PROYECTO_LOCAL_TABLE_2}`);
            const html = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Editando</title>
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
                    <div>
                        ${result.map(element =>`
                        <h1>Editando usuario: <span style="color: blue">${element.Nombre} ${element.Apellido}</span></h1>
                        <div class="data">
                            <div>
                                <label for="">ID</label>
                            </div>
                            <div>
                                <input type="number" name="" id="" value="${element.id}" disabled>
                            </div>
                            <div>
                                <label for="">Nombre</label>
                            </div>
                            <div>
                                <input type="text" name="" id="" value="${element.Nombre}">
                            </div>
                            <div>
                                <label for="">Apellido</label>
                            </div>
                            <div>
                                <input type="text" name="" id="" value="${element.Apellido}">
                            </div>
                            <div>
                                <label for="">Dni</label>
                            </div>
                            <div>
                                <input type="number" name="" id="" value="${element.Dni}">
                            </div>
                            <div>
                                <label for="">Celular</label>
                            </div>
                            <div>
                                <input type="number" name="" id="" value="${element.Celular}">
                            </div>
                            <div>
                                <label for="">Sexo</label>
                            </div>
                            <div>
                                <input type="text" name="" id="" value="${element.Sexo}">
                            </div>
                            <div>
                                <label for="">Email</label>
                            </div>
                            <div>
                                <input type="email" name="" id="" value="${element.Email}">
                            </div>
                            <div>
                                <label for="">Fecha de Nacimiento</label>
                            </div>
                            <div>
                                <input type="text" name="" id="" value="${moment(element.Nacimiento).format('YYYY-MM-DD HH:mm:ss')}">
                            </div>
                            
                            <div>
                                <label for="">FK_EMAIL</label>
                            </div>
                            <div>
                                <input type="number" name="" id="" value="${element.fk_email}">
                            </div>
                            <div>
                                <label for="">FK_INSCRIPCIONES</label>
                            </div>
                            <div>
                                <input type="number" name="" id="" value="${element.fk_inscripciones}">
                            </div>
                            <div>
                                <label for="">FK_CURSOS</label>
                            </div>
                            <div>
                                <input type="number" name="" id="" value="${element.fk_cursos}">
                            </div>
                        </div>
                        `)}
                        <div class="links">
                            <a href="#">GUARDAR CAMBIOS</a>
                            <a href='/query/arts_and_culture/${id}'>VOLVER</a>
                        </div>
                    </div>
                </div>
            </body>
            </html>`;
            res.status(200).send(html)
        }
    })
})

module.exports = router;