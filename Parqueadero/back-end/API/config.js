//Indica la información para conectar con la base de datos
const mongoose = require('mongoose');
//Guarda la conexión del modulo
const dbconnect = () =>{
    mongoose.connect("mongodb://localhost:27017/login_node")
    .then(()=> console.log("Coneción exitosa con monogb"))
    .catch((error) => console.log("Error al conectar con mongodb"));
}
module.exports = dbconnect;