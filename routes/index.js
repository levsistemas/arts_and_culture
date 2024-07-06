const express = require('express');
const router = express.Router();
const app = express();

app.use(express.urlencoded({extended: true }));

app.use(express.json());

app.use(express.static('public'));

router.get('/', (req, res) => {
    try {
        res.send(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Inicio</title>
        </head>
        <body>
            <div>
                <h1>Inicio de la pagina</h1>
                <div>
                    <a href='/users/local'>VER BASE DE DATOS LOCAL</a>
                    <input type="button" value="Conectar" id="conectar1">
                </div>
                <div>
                    <a href='/users/proyecto'>VER BASE DE DATOS LOCAL (PROYECTO)</a>
                    <input type="button" value="Conectar" id="conectar2">
                </div>
                <div>
                    <a href='/users/listado'>VER BASE DE DATOS REMOTA</a>
                    <input type="button" value="Conectar" id="conectar3">
                </div>
            </div>
            <script>
                const VALOR = localStorage.length;
                for (let i=1; i <= VALOR; i++){
                    localStorage.removeItem('usuario'+i);
                }
                localStorage.removeItem('id');
                document.getElementById('conectar2').addEventListener('click', () => {
                    
                })
            </script>
        </body>
        </html>`
        );
    } catch (error) {
        res.status(404).json({error: 'No encontrado'});
    }
})

module.exports = router;