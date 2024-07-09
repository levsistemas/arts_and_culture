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
            console.log('ERROR en tabla ' + process.env.PROYECTO_LOCAL_TABLE_1)
            console.log('ERROR:', error)
        }
        if(res.status(200)){
            console.log('Registro insertado correctamente con ID:' + re.insertId + ' en la tabla ' + process.env.PROYECTO_LOCAL_TABLE_1);
        }
    })

    //INSCRIPCIONES - 3
    const sql3 = `INSERT INTO ${process.env.PROYECTO_LOCAL_TABLE_3} (fecha,alumnos_id,curso_id) VALUES (CURRENT_TIMESTAMP,?,?)`;
    //CURSOS - 4
    const sql4 = `INSERT INTO ${process.env.PROYECTO_LOCAL_TABLE_4} (titulo,horas,portada,docentes_id) VALUES (?,?,?,?)`;
    const params3 = [info.alumnos_id,info.curso_id];
    const params4 = [info.titulo,info.horas,info.portada,info.docentes_id];
    //USUARIOS - 2
    const sql2 = `INSERT INTO ${process.env.PROYECTO_LOCAL_TABLE_2} (Nombre, Apellido, Dni, Celular, Sexo, Email, Nacimiento,fk_email,fk_inscripciones,fk_cursos) VALUES (?,?,?,?,?,?,?,?,?,?)`;
    const params2 = [info.Nombre,info.Apellido,info.Dni,info.Celular,info.Sexo,info.Email,info.Nacimiento,info.fk_email,info.fk_inscripciones,info.fk_cursos];

    connection4.query(sql3, params3, (error, re) => {
        if(error){
            console.log('ERROR en tabla ' + process.env.PROYECTO_LOCAL_TABLE_3);
            console.log('ERROR:', error)
        }
        if(res.status(200)){
            console.log(`Registro insertado correctamente con ID: ${re.insertId} en la tabla ${process.env.PROYECTO_LOCAL_TABLE_3}`)
        }
    })
    connection4.query(sql4, params4, (error, respond) => {
        if(error){
            console.log('ERROR en tabla ' + process.env.PROYECTO_LOCAL_TABLE_4)
            console.log('ERROR:', error)
        }
        if(res.status(200)){
            console.log(`Registro insertado correctamente con ID: ${respond.insertId} en la tabla ${process.env.PROYECTO_LOCAL_TABLE_4}`)
        }
    })
    connection4.query(sql2, params2, (error, resp) => {
        if (error) {
            console.log('ERROR en tabla ' + process.env.PROYECTO_LOCAL_TABLE_2)
            console.log('ERROR:', error)
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
                <h1>Registro en proyecto agregado exitosamente con Id: <span>${resp.insertId}</span></h1>
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
        if(res.status(200)){
            res.status(200).send(html);
            console.log('(INSERT/PROYECTO)Registro insertado correctamente con ID:' + resp.insertId + ' en la tabla ' + process.env.PROYECTO_LOCAL_TABLE_2)
        }
    })
})

//REGISTRO O POST DE LA TABLA "EMAIL" UNICAMENTE
router.post("/register", (req, res) => {
    const conn3 = require('../db/proyecto');
    const data = req.body;
    const sql = 'INSERT INTO ' + process.env.PROYECTO_LOCAL_TABLE_1 + ' (email, password, admin, correos) VALUES (?,?,?,?);'
    const parametros = [data.email,data.password,data.admin,data.correos];
    conn3.query(sql, parametros, (error, resp) => {
        if(error) throw error;
        res.send(`Registro añadido exitosamente ID:${req.params.id} para el correo:${data.email}`)
    })
})

//PRUEBAS PARA CONSUMO DE APIS EN METODO POST
router.post('/test', (req, res) => {
    const data = req.body;
    console.log('Datos recibidos:',data);
    res.status(200).send(data);
})

module.exports = router;