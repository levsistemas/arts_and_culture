const express = require('express');
const router = express.Router();

const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json());

app.use(express.urlencoded({extended: true }));

app.use(express.json());

router.post("/arts_and_culture", (req, res) => {
    const connection4 = require('../db/arts_and_culture');
    const info = req.body;
    //EMAIL -1 
    const sql1 = `INSERT INTO ${process.env.PROYECTO_LOCAL_TABLE_1} (email, password, admin, correos) VALUES (?,?,?,?)`;
    const params1 = [info.email,info.password,info.admin,info.correos];
    
    
    connection4.query(sql1, params1, (error, re) => {
        if(error){
            console.log('ERROR VIEJA en tabla ' + process.env.PROYECTO_LOCAL_TABLE_1)
        }
        if(res.status(200)){
            console.log('(INSERT/PROYECTO)Registro insertado correctamente con ID:' + re.insertId + ' en la tabla ' + process.env.PROYECTO_LOCAL_TABLE_1);
        }
    })
    //INSCRIPCIONES - 3
    const sql3 = `INSERT INTO ${process.env.PROYECTO_LOCAL_TABLE_3} (fecha,alumnos_id,curso_id) VALUES (CURRENT_TIMESTAMP,?,?)`;
    //CURSOS - 4
    //const sql4 = 'INSERT INTO ' + process.env.PROYECTO_LOCAL_TABLE_4 + ' (titulo,horas,portada,docentes_id) VALUES (?,`CURRENT_TIMESTAMP`,?,?)';
    const sql4 = `INSERT INTO ${process.env.PROYECTO_LOCAL_TABLE_4} (titulo,horas,portada,docentes_id) VALUES (?,CURRENT_TIMESTAMP,?,?)`;
    const params3 = [info.alumnos_id,info.curso_id];
    const params4 = [info.titulo,info.portada,info.docentes_id];
    //USUARIOS - 2
    const sql2 = `INSERT INTO ${process.env.PROYECTO_LOCAL_TABLE_2} (Nombre, Apellido, Dni, Celular, Sexo, Email, Nacimiento,fk_email,fk_inscripciones,fk_cursos) VALUES (?,?,?,?,?,?,?,?,?,?)`;
    //const params2 = [info.Nombre,info.Apellido,info.Dni,info.Celular,info.Sexo,info.Email,info.Nacimiento,info.fk_email,info.fk_inscripciones,info.fk_cursos];
    const params2 = [info.Nombre,info.Apellido,info.Dni,info.Celular,info.Sexo,info.Email,info.Nacimiento,info.fk_email,info.fk_inscripciones,info.fk_cursos];

    connection4.query(sql3, params3, (error, re) => {
        if(error){
            console.log('ERROR VIEJA en tablaaa ' + process.env.PROYECTO_LOCAL_TABLE_3);
            console.log(params3[0]);
            console.log(params3[1]);
            console.log(params3[2]);
            console.log(params3[3]);
            console.log(params3[4]);
            console.log('alumnos:' + info.alumnos_id)
            console.log('cursos:' + info.curso_id)
            console.log('ERROR:', error)
        }
        if(res.status(200)){
            console.log(`(INSERT/PROYECTO)Registro insertado correctamente con ID: ${re.insertId} en la tabla ${process.env.PROYECTO_LOCAL_TABLE_3}`)
        }
    })
    connection4.query(sql4, params4, (error, respond) => {
        if(error){
            console.log('ERROR VIEJA en tabla ' + process.env.PROYECTO_LOCAL_TABLE_4)
        }
        if(res.status(200)){
            console.log(`(INSERT/PROYECTO)Registro insertado correctamente con ID: ${respond.insertId} en la tabla ${process.env.PROYECTO_LOCAL_TABLE_4}`)
        }
    })
    connection4.query(sql2, params2, (error, resp) => {
        if (error) {
            console.log('ERROR VIEJA en tabla ' + process.env.PROYECTO_LOCAL_TABLE_2)
        }
        
        const html = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Registro generado</title>
            <style>
                * {
                    box-sizing: border-box;
                }

                body {
                    background-color: brown;
                }

                h1,h2 {
                    color: white;
                }

            </style>
        </head>
        <body>
            <div>
                <h1>Registro en proyecto agregado exitosamente con Id: <span style="color: blue;">${resp.insertId}</span></h1>
                <h2>Nombre: <span style="color: rgb(116, 172, 223);background-color: white">${info.Nombre}</span></h2>
                <h2>Apellido: <span style="color: rgb(116, 172, 223);background-color: white">${info.Apellido}</span></h2>
                <h2>DNI: <span style="color: rgb(116, 172, 223);background-color: white">${info.Dni}</span></h2>
                <h2>Celular: <span style="color: rgb(116, 172, 223);background-color: white">${info.Celular}</span></h2>
                <h2>Sexo: <span style="color: rgb(116, 172, 223);background-color: white">${info.Sexo}</span></h2>
                <h2>Email: <span style="color: rgb(116, 172, 223);background-color: white">${info.Email}</span></h2>
                <h2>Fecha de Nacimiento: <span style="color: rgb(116, 172, 223);background-color: white">${info.Nacimiento}</span></h2>
                <h2>FK_EMAIL: <span style="color: rgb(116, 172, 223);background-color: white">${info.fk_email}</span></h2>
                <h2>FK_INSCRIPCIONES: <span style="color: rgb(116, 172, 223);background-color: white">${info.fk_inscripciones}</span></h2>
                <h2>FK_CURSOS: <span style="color: rgb(116, 172, 223);background-color: white">${info.fk_cursos}</span></h2>
                <div style="display:flex;width:50%;justify-content: space-between">
                    <h2><a href='/'>INICIO</a></h2>
                    <h2><a href='/users/local'>VOLVER</a></h2>
                </div>
            </div>
            <script src=""></script>
        </body>
        </html>`;
        if(res.status(200)){
            res.status(200).send(html);
            console.log('(INSERT/PROYECTO)Registro insertado correctamente con ID:' + resp.insertId + ' en la tabla ' + process.env.PROYECTO_LOCAL_TABLE_2)
        }
    })
})

router.post("/register", (req, res) => {
    const conn3 = require('../db/proyecto');
    const data = req.body;
    const sql = 'INSERT INTO ' + process.env.LOCAL_TABLE_1 + ' (email, password, admin, correos) VALUES (?);'
    const parametros = [data.email,data.password,data.admin,data.correos];
    conn3.query(sql, [parametros], (error, resp) => {
        if(error) throw error;
        res.send(`Registro añadido exitosamente ID:${req.params.id} para el correo:${data.email}`)
    })
})

router.post("/proyecto", (req, res) => {
    const connection3 = require('../db/proyecto');
    const info = req.body;
    const sql1 = 'INSERT INTO ' + process.env.LOCAL_TABLE_1 + ' (email, password, admin, correos) VALUES (?)';
    const params1 = [info.email,info.password,info.admin,info.correos];
    
    connection3.query(sql1, [params1], (error, re) => {
        if(error){
            console.log('ERROR VIEJA')
        }
        if(res.status(200)){
            console.log('(INSERT/PROYECTO)Registro insertado correctamente con ID:' + re.insertId + ' en la tabla ' + process.env.LOCAL_TABLE_1);
        }
    })
    const sql3 = 'INSERT INTO ' + process.env.LOCAL_TABLE_3 + ' (registros) VALUES (?)';
    const sql4 = 'INSERT INTO ' + process.env.LOCAL_TABLE_4 + ' (columna_x) VALUES (?)';
    const sql2 = 'INSERT INTO ' + process.env.LOCAL_TABLE_2 + ' (Nombre, Apellido, Dni, Celular, Sexo, Email, Nacimiento, fk_email, fk_registro, fk_x) VALUES (?)';
    const params3 = [info.registros];
    const params4 = [info.columna_x];
    const params2 = [info.Nombre,info.Apellido,info.Dni,info.Celular,info.Sexo,info.Email,info.Nacimiento,3,3,3];

    connection3.query(sql3, [params3], (error, re) => {
        if(error){
            console.log('ERROR VIEJA')
        }
        if(res.status(200)){
            console.log('(INSERT/PROYECTO)Registro insertado correctamente con ID:' + re.insertId + ' en la tabla '+ process.env.LOCAL_TABLE_3)
        }
    })
    connection3.query(sql4, [params4], (error, respond) => {
        if(error){
            console.log('ERROR VIEJA')
        }
        if(res.status(200)){
            console.log('(INSERT/PROYECTO)Registro insertado correctamente con ID:' + respond.insertId + ' en la tabla '+ process.env.LOCAL_TABLE_4)
        }
    })
    connection3.query(sql2, [params2], (error, resp) => {
        if (error) throw error;
        
        const html = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Registro generado</title>
            <style>
                * {
                    box-sizing: border-box;
                }

                body {
                    background-color: brown;
                }

                h1,h2 {
                    color: white;
                }

            </style>
        </head>
        <body>
            <div>
                <h1>Registro en proyecto agregado exitosamente con Id: <span style="color: blue;">${resp.insertId}</span></h1>
                <h2>Nombre: <span style="color: rgb(116, 172, 223);background-color: white">${info.Nombre}</span></h2>
                <h2>Apellido: <span style="color: rgb(116, 172, 223);background-color: white">${info.Apellido}</span></h2>
                <h2>DNI: <span style="color: rgb(116, 172, 223);background-color: white">${info.Dni}</span></h2>
                <h2>Celular: <span style="color: rgb(116, 172, 223);background-color: white">${info.Celular}</span></h2>
                <h2>Sexo: <span style="color: rgb(116, 172, 223);background-color: white">${info.Sexo}</span></h2>
                <h2>Email: <span style="color: rgb(116, 172, 223);background-color: white">${info.Email}</span></h2>
                <h2>Fecha de Nacimiento: <span style="color: rgb(116, 172, 223);background-color: white">${info.Nacimiento}</span></h2>
                <h2>FK_EMAIL: <span style="color: rgb(116, 172, 223);background-color: white">${info.fk_email}</span></h2>
                <h2>FK_REGISTRO: <span style="color: rgb(116, 172, 223);background-color: white">${info.fk_registro}</span></h2>
                <h2>FK_X: <span style="color: rgb(116, 172, 223);background-color: white">${info.fk_x}</span></h2>
                <div style="display:flex;width:50%;justify-content: space-between">
                    <h2><a href='/'>INICIO</a></h2>
                    <h2><a href='/users/local'>VOLVER</a></h2>
                </div>
            </div>
            <script src=""></script>
        </body>
        </html>`;
        if(res.status(200)){
            res.status(200).send(html);
            console.log('(INSERT/PROYECTO)Registro insertado correctamente con ID:' + resp.insertId + ' en la tabla ' + process.env.LOCAL_TABLE_2)
        }
    })
})

router.post('/test', (req, res) => {
    const data = req.body;
    console.log('Datos recibidos:',data);
    res.status(200).send(data);
})

module.exports = router;