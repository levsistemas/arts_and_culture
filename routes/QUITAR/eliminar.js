const express = require('express');
const router = express.Router();
const app = express();

const bodyParser = require('body-parser')
app.use(bodyParser.json());

app.use(express.static('public'));

router.get('/:id', (req, res) => {
    const connection1 = require('../db/db');
    const id = req.params.id
    const sql = 'SELECT * FROM ' + process.env.TABLE + ' WHERE ID=?';
    //const sql = 'ALAMERDA * FROM ' + process.env.TABLE + ' WHERE ID=?';
    connection1.query(sql, [id], (err, response) => {
    try {
        const html = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>ELIMINAR</title>
            </head>
            <body>
                <div>
                ${response.map(elemento => 
                    `<h1>Eliminando usuario: ${elemento.nombre} ${elemento.apellido}</h1>
                    <div>
                        <label for="">Nombre</label>
                    </div>
                    <div>
                        <input type="text" name="" id="" value="${elemento.nombre}">
                    </div>
                    <div>
                        <label for="">Apellido</label>
                    </div>
                    <div>
                        <input type="text" name="" id="" value="${elemento.apellido}">
                    </div>
                    <div>
                        <label for="">Edad</label>
                    </div>
                    <div>
                        <input type="number" name="" id="" value="${elemento.edad}">
                    </div>
                    <div>
                        <label for="">Provincia</label>
                    </div>
                    <div>
                        <input type="text" name="" id="" value="${elemento.provincia}">
                    </div>
                `)}
                    <input type="button" value="Eliminar usuario">
                    <a href='/'>VOLVER</a>
                </div>
            </body>
            </html>`
            res.send(html);
    } catch (error) {
        res.status(404).json({ error: 'No encontrado' });
    }
    
    })
})

//ROUTE.DELETE PARA BASE DE DATOS PAME_LEAN
router.delete('/proyecto/:id', (req, res) => {
    const conn3 = require('../db/proyecto');
    const id = req.params.id;
    const sql = 'DELETE FROM ' + process.env.LOCAL_TABLE_2 + ' WHERE id=' + id + ';';
    conn3.query(sql, [id], (err, resp) => {
        if(err) throw err;
        if(res.status(200)){
            console.log(`Registro eliminado exitosamente con ID:${id} para la Tabla: ${process.env.LOCAL_TABLE_2}`);
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
                    ${resp.map(element => `
                        <div class="data">
                        <h2>Nombre: <span>${element.Nombre}</span></h2>
                        <h2>Apellido: <span>${element.Apellido}</span></h2>
                        <h2>DNI: <span>${element.Dni}</span></h2>
                        <h2>Celular: <span>${element.Celular}</span></h2>
                        <h2>Sexo: <span>${element.Sexo}</span></h2>
                        <h2>Email: <span>${element.Email}</span></h2>
                        <h2>Fecha de Nacimiento: <span>${element.Nacimiento}</span></h2>
                        <h2>FK_EMAIL: <span>${element.fk_email}</span></h2>
                        <h2>FK_INSCRIPCIONES: <span>${element.fk_inscripciones}</span></h2>
                        <h2>FK_CURSOS: <span>${element.fk_cursos}</span></h2>
                    </div>
                    `)}
                    <div class="links">
                        <a href='/'>INICIO</a>
                        <a href='/query/arts_and_culture'>VOLVER</a>
                    </div>
                </div>
            </body>
            </html>`;
            res.status(200).send(html);
        }
    })
})

module.exports = router;