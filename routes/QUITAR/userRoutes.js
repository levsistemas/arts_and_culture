const express = require('express');
const router = express.Router();

// Obtiene informacion de UN usuario..
router.get("/:id", (req, res) => {
    const id = req.params.id;
    response.send("respuesta de informacion de usuario con ID especificado WIP...");
});

module.exports = router;