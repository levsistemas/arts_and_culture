const express = require('express');
const router = express.Router();
const app = express();

const bodyParser = require('body-parser')
app.use(bodyParser.json());

app.use(express.static('public'));

router.get('/:id', (req, res) => {
    const connection1 = require('../db/db.js');
    const id = req.params.id;
    const sql = 'SELECT * FROM ' + process.env.TABLE + ' WHERE ID=?';
    connection1.query(sql, [id], (err, response) => {
        try {
            const html = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>EDICION</title>
            </head>
            <body>
                <div>
                ${response.map(elemento => 
                    `<h1>Editando usuario: ${elemento.nombre} ${elemento.apellido}</h1>
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
                    <input type="button" value="Guardar cambios">
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

router.get('/proyecto/editar=:id', (req, res) => {
    const connection3 = require('../db/proyecto');
    const id = req.params.id;
    const sql = 'SELECT * FROM ' + process.env.LOCAL_TABLE_2 + ' WHERE ID=?';
    connection3.query(sql, [id], (err, response) => {
        try {
            const html = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>EDICION (Proyecto)</title>
                <style>
                    div {
                        margin-top:10px;
                    }
                </style>
            </head>
            <body>
                <div>
                ${response.map(element =>`
                    <h1>Editando usuario: <span style="color: blue">${element.Nombre} ${element.Apellido}</span></h1>
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
                        <label for="">DNI</label>
                    </div>
                    <div>
                        <input type="number" name="" id="" value="${element.Dni}">
                    </div>
                    <div>
                        <label for="">Celular</label>
                    </div>
                    <div>
                        <input type="text" name="" id="" value="${element.Celular}">
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
                        <input type="text" name="" id="" value="${element.Email}" style="width: 300px">
                    </div>
                    <div>
                        <input type="button" value="Guardar cambios" id="guardar">
                        <a href='/users/proyecto'>VOLVER</a>
                    </div>
                </div>
                    <script>
                    const GUARDAR = document.getElementById("guardar")
                    const DATOS = ['${element.Nombre}','${element.Apellido}','${element.Dni}','${element.Celular}','${element.Sexo}','${element.Email}']
                    GUARDAR.addEventListener('click', () => {
                        const BODY = ${req.params.body};
                        function verificarDatos(){
                            const VERIFICAR_DATOS = [document.querySelectorAll('input')[0].value,document.querySelectorAll('input')[1].value,document.querySelectorAll('input')[2].value,document.querySelectorAll('input')[3].value,document.querySelectorAll('input')[4].value,document.querySelectorAll('input')[5].value];
                            return VERIFICAR_DATOS;
                        }
                        const VERIFICAR_DATOS = verificarDatos();
                        console.log(DATOS)
                        console.log(VERIFICAR_DATOS)
                        let distinto=0
                        for(let i=0; i<= DATOS.length-1;i++){
                            if(!DATOS.includes(VERIFICAR_DATOS[i])){
                                distinto=distinto+1
                            }
                        }
                        function redirect(){
                            if(distinto==DATOS.length){
                                console.log('PUT...')
                                const REDIRECT = 'PUT'
                                return REDIRECT
                            } else {
                                console.log('PATCH...')
                                const REDIRECT = 'PATCH'
                                return REDIRECT
                            }

                        }
                        const REDIRECT = redirect()
                        console.log('Resultado:' + REDIRECT)
                        localStorage.setItem('name',VERIFICAR_DATOS[0]);
                        localStorage.setItem('surname',VERIFICAR_DATOS[1]);
                        localStorage.setItem('dni',VERIFICAR_DATOS[2]);
                        localStorage.setItem('celular',VERIFICAR_DATOS[3]);
                        localStorage.setItem('sexo',VERIFICAR_DATOS[4]);
                        localStorage.setItem('email',VERIFICAR_DATOS[5]);
                        if(REDIRECT=='PUT'){
                            window.location.href='/edit/proyecto/editar/${id}/${id}';
                        } else {
                            window.location.href='/edit/proyecto/editar/${id}';
                        }
                    })
                    </script>
                `)}
            </body>
            </html>`
            res.send(html);
        } catch (error) {
            res.status(404).json({ error: 'No encontrado' });
        }
    })
})

//INTENTEMOS GENERAR ROUTER.PUT PARA BASE DE DATOS PAME_LEAN
router.put('/proyecto/editado/:id', (req, res) => {
    const conn3 = require('../db/proyecto');
    const id = req.params.id;
    const info = req.body;
    const sql = 'UPDATE ' + process.env.LOCAL_TABLE_2 + ' SET ? WHERE ' + process.env.LOCAL_TABLE_2 + '.' + 'id=' + id + ';'
    console.log(id);
    console.log(info);
    console.log(sql);
    conn3.query(sql, [info, id], (err, resp) => {
        if(err) throw err;
        res.status(200).send('Registro actualizado exitosamente con ID:' + id)
    })
})

//ACTUALIZANDO
router.get('/proyecto/editar/:id/:id', (req, res) => {
    const connection3 = require('../db/proyecto');
    const id = req.params.id;
    console.log('REQ PARAMS BODY: ', req.params.body);
    const sql = `UPDATE ${process.env.LOCAL_TABLE_2} SET 'Nombre' = 'Leandro', 'Apellido' = 'Vega', 'Dni' = '32000000', 'Celular' = '115544332', 'Sexo' = 'Masculino', 'Email' = 'levsistemasit@gmail.com' WHERE '${process.env.LOCAL_TABLE_2}'.'id'=${id};`
    console.log(sql);
    connection3.query(sql, valores, (err, response) => {
        try {
            const html = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>EDICION (Proyecto)</title>
                <style>
                    div {
                        margin-top:10px;
                    }
                </style>
            </head>
            <body>
                <div>
                    ${response.map(element =>`
                    
                    <h1>Editando usuario: <span style="color: blue">${element.Nombre} ${element.Apellido}</span></h1>
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
                        <label for="">DNI</label>
                    </div>
                    <div>
                        <input type="number" name="" id="" value="${element.Dni}">
                    </div>
                    <div>
                        <label for="">Celular</label>
                    </div>
                    <div>
                        <input type="text" name="" id="" value="${element.Celular}">
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
                        <input type="text" name="" id="" value="${element.Email}" style="width: 300px">
                    </div>
                    <div>
                        <input type="button" value="Guardar cambios" id="guardar">
                        <a href='/users/proyecto'>VOLVER</a>
                    </div>
                    `)}
                </div>
                <script>
                    const GUARDAR = document.getElementById("guardar")
                    GUARDAR.addEventListener('click', () => {
                        console.log('probando guardar...')
                        //window.location.href='/edit/proyecto/editar/${id}'
                    })
                </script>
            </body>
            </html>`
            res.send(html);
        } catch (error) {
            res.status(404).json({ error: 'No encontrado' });
        }
    })
})
//REMOTO
router.get('/remoto/editar=:id', (req, res) => {
    const connection2 = require('../db/remote');
    const id = req.params.id;
    const sql = 'SELECT * FROM ' + process.env.REMOTE_TABLE + ' WHERE ID=?';
    connection2.query(sql, [id], (err, response) => {
        try {
            const html = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>EDICION</title>
            </head>
            <body>
                <div>
                    ${response.map(element =>`
                    <h1>Editando usuario remoto: <span style="color: blue">${element.nombre} ${element.apellido}</span></h1>
                    <div>
                        <label for="">Nombre</label>
                    </div>
                    <div>
                        <input type="text" name="" id="" value="${element.nombre}">
                    </div>
                    <div>
                        <label for="">Segundo nombre</label>
                    </div>
                    <div>
                        <input type="text" name="" id="" value="${element.segundo_nombre}">
                    </div>
                    <div>
                        <label for="">Apellido</label>
                    </div>
                    <div>
                        <input type="text" name="" id="" value="${element.apellido}">
                    </div>
                    <div>
                        <label for="">Dirección</label>
                    </div>
                    <div>
                        <input type="text" name="" id="" value="${element.direccion}">
                    </div>
                    <div>
                        <label for="">Localidad</label>
                    </div>
                    <div>
                        <input type="text" name="" id="" value="${element.localidad}">
                    </div>
                    <div>
                        <label for="">Nacionalidad</label>
                    </div>
                    <div>
                        <input type="text" name="" id="" value="${element.nacionalidad}">
                    </div>
                    <div>
                        <label for="">Dni</label>
                    </div>
                    <div>
                        <input type="number" name="" id="" value="${element.dni}">
                    </div>
                    <div>
                        <label for="">Fecha de Nacimiento</label>
                    </div>
                    <div>
                        <input type="text" name="" id="" value="${element.fecha_nacimiento}">
                    </div>
                    <div>
                        <label for="">Genero</label>
                    </div>
                    <div>
                        <input type="text" name="" id="" value="${element.sexo}">
                    </div>
                    <input type="button" value="Guardar cambios">
                    <a href='/users/listado'>VOLVER</a>
                    `)}
                </div>
            </body>
            </html>`
            res.send(html);
        } catch (error) {
            res.status(404).json({ error: 'No encontrado' });
        }
    })
})

module.exports = router;