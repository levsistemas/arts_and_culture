
const MiSaludo =  (request, response) => {
    response.send("Hola mundo desde express... con watch desde router")
};

module.exports = { MiSaludo };