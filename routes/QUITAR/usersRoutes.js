const express = require('express');
const router = express.Router();

const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json());

app.use(express.urlencoded({extended: true }));

app.use(express.json());

// Obtiene una lista de usuario..
router.get("/local", (request, response) => {
    const connection1 = require('../db/db.js');
    const sql = 'SELECT * FROM ' + process.env.DATABASE + '.' + process.env.TABLE;
    connection1.query(sql, (err, result) => {
        if (err) throw err;
        const html = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Consulta...</title>
        </head>
        <body>
            <div>
                <h1>Consultando la base de datos local:</h1>
                ${result.map(elements => `
                <p>Nombre: ${elements.nombre}</p>
                <p>Apellido: ${elements.apellido}</p>
                <p>Edad: ${elements.edad}</p>
                <p>Fecha: ${elements.fecha}</p>
                <p>Provincia: ${elements.provincia}</p>
                <div style="display:flex;width:50%;justify-content: space-between">
                    <h2><a href="/users/consulta=${elements.id}">CONSULTAR</a></h2>
                    <h2><a href="/edit/${elements.id}">EDITAR</a></h2>
                    <h2><a href="/eliminar/${elements.id}">ELIMINAR</a></h2>
                </div>
                <hr>
                `).join('')}
                <a href='/'>VOLVER</a>
            </div>
            <script>
                let n=1
                console.log(n)
                ${result.map(element => `
                    //console.log(element.nombre)
                    localStorage.setItem('usuario'+n,'${element.nombre}')
                    localStorage.setItem('id','${element.id}')
                    n=n+1
                `)}
            </script>
        </body>
        </html>`
        response.send(html);
    });
});

router.get("/proyecto", (request, response) => {
    const connection3 = require('../db/proyecto')
    const sql1 = 'SELECT * FROM ' + process.env.DATABASE1 + '.' + process.env.LOCAL_TABLE_2;
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
            <title>Consulta en proyecto...</title>
        </head>
        <body>
            <div>
                <h1>Consultando la base de datos local (Proyecto):</h1>
                ${result.map(elements => `
                <h2>Id: <span style="color: blue">${elements.id}</span></h2>
                <h2>Nombre: <span style="color: blue">${elements.Nombre}</span></h2>
                <h2>Apellido: <span style="color: blue">${elements.Apellido}</span></h2>
                <h2>Dni: <span style="color: blue">${elements.Dni}</span></h2>
                <h2>Celular: <span style="color: blue">${elements.Celular}</span></h2>
                <h2>Sexo: <span style="color: blue">${elements.Sexo}</span></h2>
                <h2>Email: <span style="color: blue">${elements.Email}</span></h2>
                <h2>Nacimiento: <span style="color: blue">${elements.Nacimiento}</span></h2>
                <h2>FK_EMAIL: <span style="color: blue">${elements.fk_email}</span></h2>
                <h2>FK_REGISTRO: <span style="color: blue">${elements.fk_registro}</span></h2>
                <h2>FK_X: <span style="color: blue">${elements.fk_x}</span></h2>
                <div style="display:flex;width:50%;justify-content:space-between">
                    <a href="/users/proyecto/${elements.id}"><h2>CONSULTAR</h2></a>
                    <a href="/edit/proyecto/editar=${elements.id}"><h2>EDITAR</h2></a>
                    <h2><a href="/users/proyecto/eliminar/${elements.id}">ELIMINAR</a></h2>
                </div>
                <hr>
                `).join('')}
                <a href='/'>VOLVER</a>
            </div>
        </body>
        </html>`
        response.send(html);
    });
});

router.post("/proyectos", (req, res) => {
    const connection3 = require('../db/proyecto');
    const info = req.body;
    const sql = `INSERT INTO ${process.env.DATABASE1}.${process.env.LOCAL_TABLE_2} (Nombre,Apellido,Dni,Celular,Sexo,Email,Nacimiento) VALUES (?)`;
    const params = [info.Nombre,info.Apellido,info.Dni,info.Celular,info.Sexo,info.Email,info.Nacimiento];
    
    connection3.query(sql, [params], (error,resp) => {
        if (error) throw error;
        console.log("Resp:",resp)
        const html = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Registro generado</title>
        </head>
        <body>
            <div>
                <h1>Registro agregado exitosamente en proyecto con Id:${resp.insertId}</h1>
                <p>Nombre: <span style="color: brown">${info.Nombre}</span></p>
                <p>Apellido: <span style="color: brown">${info.Apellido}</span></p>
                <p>DNI: <span style="color: brown">${info.Dni}</span></p>
                <p>Celular: <span style="color: brown">${info.Celular}</span></p>
                <p>Sexo: <span style="color: brown">${info.Sexo}</span></p>
                <p>Email: <span style="color: brown">${info.Email}</span></p>
                <p>Fecha de Nacimiento: <span style="color: brown">${info.Nacimiento}</span></p>
                <div style="display:flex;width:50%;justify-content: space-between">
                    <h2><a href='/'>INICIO</a></h2>
                    <h2><a href='/users/local'>VOLVER</a></h2>
                </div>
            </div>
            <script src=""></script>
            </body>
            </html>`;
            res.status(200).send(html);
            console.log('(USERS/PROYECTOS)Registro insertado correctamente con ID:' + resp.insertId);
            //res.json(rows);
    })
})

router.post('/test', (req, res) => {
    const data = req.body;
    console.log('Datos recibidos:',data);
    res.send('ROGER THAT');
})

router.get("/listado", (request, response) => {
    const connection2 = require('../db/remote')
    const sql = 'SELECT * FROM ' + process.env.REMOTE_DATABASE + '.' + process.env.REMOTE_TABLE;
    connection2.query(sql, (err, result) => {
        if (err) throw err;
        const html = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Consulta...</title>
        </head>
        <body>
            <div>
                <h1>Consultando la base de datos Remota:</h1>
                ${result.map(elements => `
                <h3>Nombre: <span style="color: red">${elements.nombre}</span></h3>
                <h3>Segundo Nombre: <span style="color: red">${elements.segundo_nombre}</span></h3>
                <h3>Apellido: <span style="color: red">${elements.apellido}</span></h3>
                <h3>Dirección: <span style="color: red">${elements.direccion}</span></h3>
                <h3>Localidad: <span style="color: red">${elements.localidad}</span></h3>
                <h3>Nacionalidad: <span style="color: red">${elements.nacionalidad}</span></h3>
                <h3>DNI: <span style="color: red">${elements.dni}</span></h3>
                <h3>Fecha de Nacimiento: <span style="color: red">${elements.fecha_nacimiento}</span></h3>
                <h3>Sexo: <span style="color: red">${elements.sexo}</span></h3>
                <div style="display:flex;width:50%;justify-content: space-between">
                    <h2><a href='/users/remoto/consulta=${elements.id}'>Consultar</a></h2>
                    <h2><a href='/edit/remoto/editar=${elements.id}'>Editar</a></h2>
                    <h2><a href='/'>Volver</a></h2>
                </div>
                <hr>
                `).join('')}
            </div>
        </body>
        </html>`
        response.send(html);        
    });
});

router.get("/remoto/consulta=:id", (request, response) => {
    const connection2 = require('../db/remote')
    const id = request.params.id;
    const sql = 'SELECT * FROM ' + process.env.REMOTE_TABLE + ' WHERE ID=?';
    connection2.query(sql, [id], (err, result) => {
        if (err) throw err;
        response.send(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Consulta...</title>
        </head>
        <body>
            <div>
                ${result.map(elemento =>`
                <h1>Consultando el registro remoto... <span style="color: red">${elemento.nombre} ${elemento.apellido}</span></h1>
                <h3>Nombre: <span style="color: red">${elemento.nombre}</span></h3>
                <h3>Segundo Nombre: <span style="color: red">${elemento.segundo_nombre}</span></h3>
                <h3>Apellido: <span style="color: red">${elemento.apellido}</span></h3>
                <h3>Dirección: <span style="color: red">${elemento.direccion}</span></h3>
                <h3>Localidad: <span style="color: red">${elemento.localidad}</span></h3>
                <h3>Nacionalidad: <span style="color: red">${elemento.nacionalidad}</span></h3>
                <h3>DNI: <span style="color: red">${elemento.dni}</span></h3>
                <h3>Fecha de Nacimiento: <span style="color: red">${elemento.fecha_nacimiento}</span></h3>
                <h3>Sexo: <span style="color: red">${elemento.sexo}</span></h3>
                <div style="display:flex;width:50%;justify-content: space-between">
                    <h2><a href='/'>INICIO</a></h2>
                    <h2><a href='/users/listado'>VOLVER</a></h2>
                    <h2><a href='/edit/remoto/editar=${elemento.id}'>EDITAR</a></h2>
                </div>
                `)}
            </div>
        </body>
        </html>`);        
    });
});

router.get("/consulta=:id", (request, response) => {
    const connection1 = require('../db/db.js');
    const id = request.params.id;
    const sql = 'SELECT * FROM ' + process.env.TABLE + ' WHERE ID=?';
    connection1.query(sql, [id], (err, result) => {
        if (err) throw err;
        response.send(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Consulta...</title>
        </head>
        <body>
            <div>
                <h1>Consultando el registro...</h1>
                ${result.map(elemento =>
                    `<p>ID: ${elemento.id}</p>
                    <p>Nombre: ${elemento.nombre}</p>
                    <p>Apellido: ${elemento.apellido}</p>
                    <p>Edad: ${elemento.edad}</p>
                    <p>Fecha: ${elemento.fecha}</p>
                    <p>Provincia: ${elemento.provincia}</p>
                    <div style="display:flex;width:50%;justify-content: space-between">
                        <h2><a href='/'>INICIO</a></h2>
                        <h2><a href='/users/local'>VOLVER</a></h2>
                        <h2><a href='/edit/${elemento.id}'>EDITAR</a></h2>
                    </div>
                `)}
            </div>
        </body>
        </html>`);        
    });
});

router.get("/proyecto/:id", (request, response) => {
    const connection3 = require('../db/proyecto')
    const id = request.params.id;
    const sql = 'SELECT * FROM ' + process.env.LOCAL_TABLE_2 + ' WHERE ID=?';
    connection3.query(sql, [id], (err, result) => {
        if (err) throw err;
        response.send(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Consulta en proyecto...</title>
        </head>
        <body>
            <div>
                ${result.map(element => `
                <h1>Consultando el registro en proyecto... ${element.Nombre} ${element.Apellido}</h1>
                <h3>ID: <span style="color: blue">${element.id}</span></h3>
                <h3>Nombre: <span style="color: blue">${element.Nombre}</span></h3>
                <h3>Apellido: <span style="color: blue">${element.Apellido}</span></h3>
                <h3>DNI: <span style="color: blue">${element.Dni}</span></h3>
                <h3>Celular: <span style="color: blue">${element.Celular}</span></h3>
                <h3>Sexo: <span style="color: blue">${element.Sexo}</span></h3>
                <h3>Email: <span style="color: blue">${element.Email}</span></h3>
                <h3>Nacimiento: <span style="color: blue">${element.Nacimiento}</span></h3>
                <h3>FK_EMAIL: <span style="color: blue">${element.fk_email}</span></h3>
                <h3>FK_REGISTRO: <span style="color: blue">${element.fk_registro}</span></h3>
                <h3>FK_X: <span style="color: blue">${element.fk_x}</span></h3>
                <div style="display:flex;width:50%;justify-content:space-between">
                    <h2><a href='/'>INICIO</a></h2>
                    <h2><a href='/users/proyecto'>VOLVER</a></h2>
                    <h2><a href='/edit/proyecto/editar=${element.id}'>EDITAR</a></h2>
                </div>
                `).join('')}
            </div>
        </body>
        </html>`);        
    });
});

module.exports = router;