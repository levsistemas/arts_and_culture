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
                    <a href='/query/arts_and_culture'>VER BASE DE DATOS: ARTS & CULTURE</a>
                    <input type="button" value="Conectar" id="conectar2">
                </div>
            </div>
        </body>
        </html>`
        );
    } catch (error) {
        res.status(404).json({error: 'No encontrado'});
    }
})

module.exports = router;