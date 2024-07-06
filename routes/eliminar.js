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
            res.status(200).send(`Registro eliminado exitosamente con ID:${id}`);
            console.log(`Registro eliminado exitosamente con ID:${id}`);
        }
    })
})

module.exports = router;