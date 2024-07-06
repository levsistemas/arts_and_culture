const express = require('express');
const bodyParser = require('body-parser')
const saludoRoutes = require('./routes/saludoRoutes');
const usersRoutes = require('./routes/usersRoutes');
const userRoutes = require('./routes/userRoutes');
const index = require('./routes/index');
const edit = require('./routes/edit');
const eliminar = require('./routes/eliminar');
const insert = require('./routes/insert')

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true }));


const PORT = 3000;

app.use(bodyParser.json());

app.use("/", index);

app.use("/insert", insert)

app.use("/edit", edit);

app.use("/eliminar", eliminar);

app.use("/saludo", saludoRoutes);

app.use("/users", usersRoutes);

app.use("/user", userRoutes);

app.listen( PORT, () => {
    console.log("Server running at port: " + PORT);
});

module.exports = app;