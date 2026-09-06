//Servicio web de la API
//Importar express
const express = require('express');

//Conexión con mongoo
const mongoose = require('mongoose');
const dbconnect = require('./config');
const ModeUser = require('./modelcliente');
const ModeEmpleado = require('./modelempleado');
const ModeTivehiculo = require('./modeltivehiculo');
const ModeVehiculo = require('./modelvehiculo');
const ModeMovimiento = require('./modelmovimiento');
const ModeTarifa = require('./modeltarifa');
const ModeEspacio = require('./modelespacio');
const cors = require('cors');

//Llamar para que reconozca el archivo config
dbconnect();

//Crear aplicación
const app = express();
//cors para que la cnexion funcione sin bloqueos
app.use(cors());
//Para recibir datos JSON
app.use(express.json());
//Puerto del servidor
const PORT = 3000;

//Manejar las rutas
const router = express.Router();
/***********=========================*********
 * RUTA PARA CREAR CLIENTES
 **********=========================**********/
//Crear usuario
router.post('/cliente', async (req, res)=>{
    try {
        const {nombre, apellido, documento, telefono, correo_electronico,direccion, contrasena} = req.body;
        //Detectar si el usuario ya existe
        const existeUsuario =await ModeUser.findOne({$or:[{documento},{correo_electronico}]});
        if (existeUsuario) {
            return res.status(400).json({mensaje: "El usuario ya existe"});
        }
        //Agregar el usuario forzando el rol en cliente
        const nuevoCliente = new ModeUser({
            nombre,
            apellido,
            documento,
            telefono,
            correo_electronico,
            direccion,
            contrasena,
            rol: 'cliente'
        });
        const respuesta = await nuevoCliente.save();
        res.status(201).send(respuesta);
    } catch (error) {
        res.status(500).json({mensaje: "Error al crear",error:error.message});
    }
})

//Consulta general
router.get('/cliente', async (req, res)=>{
    try {
        const respuesta = await ModeUser.find({});
    res.send(respuesta);
    } catch (error) {
        res.status(500).json({mensaje: "Error al consultar",error:error.message});
    }
})

//Consultar por documento
router.get('/cliente/:id_cliente', async (req, res)=>{
    try {
        const documento_buscar = req.params.id_cliente;
        const respuesta = await ModeUser.findOne({documento: documento_buscar});
        if(!respuesta){
            return res.status(404).json({mensaje:"Cliente no encontrado"});
        }
        res.send(respuesta);
    } catch (error) {
        res.status(500).json({mensaje: "Error al consultar por ID",error:error.message});
    }
    
})

//Actualizar datos del usuario
router.put('/cliente/:id_cliente', async(req,res)=>{
    try {
        const correoBuscar = req.body.correo_electronico;
	    console.log("Buscando en MongoDB el correo", correoBuscar);
        console.log("Datos nuevos a guardar: ", req.body);
        const respuesta = await ModeUser.findOneAndUpdate({correo_electronico:correoBuscar}, req.body, {new:true});
        if(!respuesta){
            return res.status(404).json({mensaje:"Cliente no encontrado"});
        }
        res.send(respuesta);
    } catch (error) {
        res.status(500).json({mensaje: "Error al actualizar datos",error:error.message});
    }
    
})

//Eliminar usuario
router.delete('/cliente/:id_cliente',async(req, res)=>{
    try {
        const documento_buscar = req.params.id_cliente;
        const respuesta = await ModeUser.findOneAndDelete({documento: documento_buscar});
        if(!respuesta){
            return res.status(404).json({mensaje:"Cliente no encontrado"});
        }
        res.send({mensaje: "usuario eliminado con exito"});
    } catch (error) {
        res.status(500).json({mensaje:"Error al eliminar", error: error.message});
    }

    
});
/***********=========================*********
 * RUTA PARA INICIO DE SESIÓN
 **********=========================**********/ 
//Inicio de sesion
//con POST en la ruta debe ir el /login
router.post('/login/cliente',async(req, res)=>{
    try{
        //Guarda el usuario y la contraseña desde mongo db
        const{correo_electronico,contrasena}=req.body;
    //Buscar si el nombre existe en mongodb
    //Busca en la base de datos el usuario que se recibio
    const usuarioExiste = await ModeUser.findOne({correo_electronico});
    //Validar si existe
    //Si el usuario No existe
    if(!usuarioExiste){
        return res.status(401).json({mensaje: "Error de autenticación"});
    }
    //Validar si la contraseña existe
    //Compara la contraseña
    if(usuarioExiste.contrasena=== contrasena){
        //200= todo salio perfecto, ${usuarioExiste.nombre}`} para que aparezca el nombre del usuario
        return res.status(200).json({mensaje:"Autenticación satisfactora, Bienvenido",
             nombre: usuarioExiste.nombre, 
             apellido: usuarioExiste.apellido,
             rol: usuarioExiste.rol || "cliente",
            telefono: usuarioExiste.telefono,
		documento: usuarioExiste.documento,
            direccion: usuarioExiste.direccion});
    }else{//401= no autorrizado
        return res.status(401).json({mensaje: "Error de autenticación"});
    }
} catch(error){//obligatorio si la base de datos falla
    //500= Error ineterno
        return res.status(500).json({mensaje:"Error",error:error.message});}
});
/***********=========================*********
 * RUTA PARA CREAR EMPLEADOS
 **********=========================**********/ 
//Crear empleado
router.post('/empleado', async (req, res)=>{
    try {
        const respuesta = await ModeEmpleado.create(req.body);
        res.send(respuesta);
    } catch (error) {
        res.status(500).json({mensaje: "Error al crear empleados",error:error.message});
    }
})

//Consulta general
router.get('/empleado', async (req, res)=>{
    try {
        const respuesta = await ModeEmpleado.find({});
    res.send(respuesta);
    } catch (error) {
        res.status(500).json({mensaje: "Error al consultar",error:error.message});
    }
})

//Consultar por documento
router.get('/empleado/:id_empleado', async (req, res)=>{
    try {
        const documento_buscar = req.params.id_empleado;
        const respuesta = await ModeEmpleado.findOne({documento: documento_buscar});
        if(!respuesta){
            return res.status(404).json({mensaje:"Empleado no encontrado"});
        }
        res.send(respuesta);
    } catch (error) {
        res.status(500).json({mensaje: "Error al consultar por ID",error:error.message});
    }
    
})

//Actualizar datos del usuario
router.put('/empleado/:id_empleado', async(req,res)=>{
    try {
        const documento_buscar = req.params.id_empleado;
        const respuesta = await ModeEmpleado.findOneAndUpdate({documento: documento_buscar}, req.body, {new:true});
        if(!respuesta){
            return res.status(404).json({mensaje:"Empleado no encontrado"});
        }
        res.send(respuesta);
    } catch (error) {
        res.status(500).json({mensaje: "Error al actualizar datos",error:error.message});
    }
    
})

//Eliminar usuario
router.delete('/empleado/:id_empleado',async(req, res)=>{
    try {
        const documento_buscar = req.params.id_empleado;
        const respuesta = await ModeEmpleado.findOneAndDelete({documento: documento_buscar});
        if(!respuesta){
            return res.status(404).json({mensaje:"Empleado no encontrado"});
        }
        res.send({mensaje: "empleado eliminado con exito"});
    } catch (error) {
        res.status(500).json({mensaje:"Error al eliminar", error: error.message});
    }
});
/***********=========================*********
 * RUTA PARA LOGIN EMPLEADOS
 **********=========================**********/ 
//Inicio de sesion
//con POST en la ruta debe ir el /login
router.post('/login/empleado',async(req, res)=>{
    try{
        //Guarda el usuario y la contraseña desde mongo db
        const{correo_electronico,contrasena}=req.body;
    //Buscar si el correo existe en mongodb
    //Busca en la base de datos el usuario que se recibio
    const empleadoExiste = await ModeEmpleado.findOne({correo_electronico});
    //Validar si existe
    if(!empleadoExiste){
        return res.status(401).json({mensaje: "Error de autenticación"});
    }
    //Validar si la contraseña existe
    //Compara la contraseña
    //Administrador
    if(empleadoExiste.contrasena=== contrasena){
        return res.status(200).json({
            ok: true,
            mensaje:`Autenticación satisfactora, Bienvenido ${empleadoExiste.rol} ${empleadoExiste.nombre} `,
            empleado: empleadoExiste});
    }else{//401= no autorrizado
        return res.status(401).json({mensaje: "Error de autenticación"});
    }
} catch(error){//obligatorio si la base de datos falla
    //500= Error ineterno
        return res.status(500).json({mensaje:"Error",error:error.message});}
});
/***********=========================*********
 * RUTA PARA TIPO DE VEHICULO
 **********=========================**********/ 
//Crear tipo de vehiculo
router.post('/tipovehiculo', async (req, res)=>{
    try {
        const tipoVehiculoCreado = await ModeTivehiculo.create(req.body);
        res.send(tipoVehiculoCreado);
    } catch (error) {
        res.status(500).json({mensaje: "Error al crear vehiculo",error:error.message});
    }
})

//Consulta general
router.get('/tipovehiculo', async (req, res)=>{
    try {
        const respuesta = await ModeTivehiculo.find({});
    res.send(respuesta);
    } catch (error) {
        res.status(500).json({mensaje: "Error al consultar",error:error.message});
    }
})
//Consultar por placa
router.get('/tipovehiculo/:placa', async (req, res)=>{
    try {
        const placa_buscar = req.params.placa;
        const respuesta = await ModeTivehiculo.findOne({placa: placa_buscar});
        if(!respuesta){
            return res.status(404).json({mensaje:"vehiculo no encontrado"});
        }
        res.send(respuesta);
    } catch (error) {
        res.status(500).json({mensaje: "Error al consultar por placa",error:error.message});
    }
    
});
//Actualizar datos del vehiculo
router.put('/tipovehiculo/:placa', async(req,res)=>{
    try {
        const placa_buscar = req.params.placa;
        const respuesta = await ModeTivehiculo.findOneAndUpdate({placa: placa_buscar}, req.body, {new:true});
        if(!respuesta){
            return res.status(404).json({mensaje:"vehiculo no encontrado"});
        }
        res.send(respuesta);
    } catch (error) {
        res.status(500).json({mensaje: "Error al actualizar datos",error:error.message});
    }
})

//Eliminar vehiculo
router.delete('/tipovehiculo/:placa',async(req, res)=>{
    try {
        const placa_buscar = req.params.placa;
        const respuesta = await ModeTivehiculo.findOneAndDelete({placa: placa_buscar});
        if(!respuesta){
            return res.status(404).json({mensaje:"vehiculo no encontrado"});
        }
        res.send({mensaje: "vehiculo eliminado con exito"});
    } catch (error) {
        res.status(500).json({mensaje:"Error al eliminar", error: error.message});
    }
})
/***********=========================*********
 * RUTA PARA VEHICULO
 **********=========================**********/ 
//Crear información de los vehiculos
router.post('/vehiculo', async (req, res)=>{
    try{
        const infovehiculo = await ModeVehiculo.create(req.body);
        res.status(201).send(infovehiculo);
    }catch(error){
        res.status(500).json({mensaje:"Error al insertar los datos del vehiculo",error:error.message});
    }
})
//Consulta general
router.get('/vehiculo', async (req, res)=>{
    try {
        const infovehiculo = await ModeVehiculo.find({});
        res.send(infovehiculo);
    } catch (error) {
        res.status(500).json({mensaje:"Error al consultar datos", error:error.message});
    }
})
//Consultar placa por documento
router.get('/vehiculo/usuario/:id_cliente', async (req, res) =>{
    try{
        const idClienteParam = req.params.id_cliente;
        const todosLosVehiculos = await ModeVehiculo.find({});
        const vehiculosFiltrados = todosLosVehiculos.filter(carro =>{
            if(!carro.documento)return false;
            return String(carro.documento).trim() === String(idClienteParam).trim();
        });
        res.send(vehiculosFiltrados);
    }catch(error){
        console.error("Error en el backend", error.message);
        res.status(500).json({mensaje:"Error al consultar", error: error.message});
    }
}

);
//Consultar por placa
router.get('/vehiculo/:placa', async (req, res)=>{
    try {
        const placa_buscar = req.params.placa;
        const respuesta = await ModeVehiculo.findOne({placa: placa_buscar});
        if(!respuesta){
            return res.status(404).json({mensaje:"Datos del vehiculo no encontrado"});
        }
        res.send(respuesta);
    } catch (error) {
        res.status(500).json({mensaje:"Error al consultar datos por placa", error:error.message});
    }
})
//Actualizar datos
router.put('/vehiculo/:placa', async (req, res)=>{
    try {
        const placa_buscar = req.params.placa;
        const respuesta = await ModeVehiculo.findOneAndUpdate({placa: placa_buscar}, req.body, {new:true});
        if(!respuesta){
            return res.status(404).json({mensaje:"Datos del vehiculo actualizados"});
        }
        res.send(respuesta);s
    } catch (error) {
        res.status(500).json({mensaje:"Error al consultar datos por placa", error:error.message});
    }
})
//Eliminar datos
router.delete('/vehiculo/:placa', async(req, res)=>{
    try {
        const placa_buscar = req.params.placa;
        const respuesta = await ModeVehiculo.findOneAndDelete({placa:placa_buscar});
        if(!respuesta){
            return res.status(404).json({mensaje:"vehiculo no encontrado"});
        }
        res.send({mensaje: "Datos del vehiculo eliminado con exito"});
    } catch (error) {
        res.status(500).json({mensaje:"Error al eliminar datos del vehiculo", error:error.message});
    }
})
/***********=========================*********
 * RUTA PARA TIPO DE MOVIMIENTO
 **********=========================**********/
//Crear movimiento del vehiculo para identificar si va de salida o de entrada
router.post('/movimiento', async (req, res)=>{
    try{
        const infomovimiento = await ModeMovimiento.create(req.body);
        res.status(201).send(infomovimiento);
        
    }catch(error){
        res.status(500).json({mensaje:"Error al procesar movimiento",error:error.message});
    }
})
//Consulta general
router.get('/movimiento', async (req, res)=>{
    try {
        const infomovimiento = await ModeMovimiento.find({});
        res.send(infomovimiento);
    } catch (error) {
        res.status(500).json({mensaje:"Error al consultar movimientos", error:error.message});
    }
})
//Consultar por placa
router.get('/movimiento/:documento', async (req, res)=>{
    try {
        const documento_buscar = req.params.documento;
        const respuestas = await ModeMovimiento.find({documento: documento_buscar});
        res.json(respuestas || []);
    } catch (error) {
        res.status(500).json({mensaje:"Error al consultar datos por placa", error:error.message});
    }
})
/***********=========================*********
 * RUTA PARA TIPO DE TARIFA
 **********=========================**********/ 
//Crear información de las tarifas 
router.post('/tarifa', async (req, res)=>{
    try{
        const infotarifa = await ModeTarifa.create(req.body);
        res.status(201).send(infotarifa);
    }catch(error){
        res.status(500).json({mensaje:"Error al insertar los valores de la tarifa",error:error.message});
    }
})
//Consulta general
router.get('/tarifa', async (req, res)=>{
    try {
        const infotarifa = await ModeTarifa.find({});
        res.send(infotarifa);
    } catch (error) {
        res.status(500).json({mensaje:"Error al consultar tipo de tarifa", error:error.message});
    }
})
//Consultar por placa
router.get('/tarifa/:placa', async (req, res)=>{
    try {
        const placa_buscar = req.params.placa;
        const respuesta = await ModeTarifa.findOne({placa: placa_buscar});
        if(!respuesta){
            return res.status(404).json({mensaje:"Valores de la tarifa no encontrado"});
        }
        res.send(respuesta);
    } catch (error) {
        res.status(500).json({mensaje:"Error al consultar valores de la tarifa", error:error.message});
    }
})
//Actualizar datos
router.put('/tarifa/:placa', async (req, res)=>{
    try {
        const placa_buscar = req.params.placa;
        const respuesta = await ModeTarifa.findOneAndUpdate({placa: placa_buscar}, req.body, {new:true});
        if(!respuesta){
            return res.status(404).json({mensaje:"Valores de tarifa actualizados"});
        }
        res.send(respuesta);s
    } catch (error) {
        res.status(500).json({mensaje:"Error al consultar valores por placa", error:error.message});
    }
})
//Eliminar datos
router.delete('/tarifa/:placa', async(req, res)=>{
    try {
        const placa_buscar = req.params.placa;
        const respuesta = await ModeTarifa.findOneAndDelete({placa:placa_buscar});
        if(!respuesta){
            return res.status(404).json({mensaje:"Tarifa no encontrada"});
        }
        res.send({mensaje: "Valores de la tarifa eliminados con exito"});
    } catch (error) {
        res.status(500).json({mensaje:"Error al eliminar valores de la tarifa", error:error.message});
    }
})
/***********=========================*********
 * RUTA PARA TIPO DE ESPACIO
 **********=========================**********/ 
//Consultar espacios filtrados por tipo
router.get('/espacio' , async (req, res)=>{
    try {
        const {tipoDeEspacio} = req.query;
        const filtro = {};
        if (tipoDeEspacio) {
            filtro.tipoDeEspacio = tipoDeEspacio;}
            const infoespacio = await ModeEspacio.find(filtro);
            return res.status(200).json(infoespacio || []);
        
    } catch (error) {
        console.error("Error al consultar espacios",error);
        return res.status(500).json({
            mensaje: "Error al consuktar coordenadas", error: error.message
        })
    }
})
//Crear información de los espacios  
router.post('/espacio', async (req, res)=>{
    try{
        const{ubicacion, disponibilidad, documento, placa, nombre, tipoDeEspacio,capacidad} = req.body;
            //Buscar ubicación de la celda
            const infoespacio = await ModeEspacio.findOneAndUpdate(
                {ubicacion:ubicacion},{
                    documento,
                    nombre,
                    tipoDeEspacio,
                    capacidad,
                    disponibilidad: true,
                    placa: placa ? String(placa).toUpperCase(): ''
                },{new: true, upsert: true}
            );
        try {
            //Guardar el historial en movimientos
                const celdaAsignada = req.body.espacio || ubicacion || infoespacio.space || "Sin asignar";
                //Tarifas asignadas
            let tarifaCalculada = 0;
            const tipoFormateado = String(tipoDeEspacio || '').toLowerCase().trim();
                if(tipoFormateado === 'bicicleta'){
                    tarifaCalculada = 1500;
                }else if(tipoFormateado === 'moto'){
                    tarifaCalculada = 2000;
                }else if(tipoFormateado === 'carro'){
                    tarifaCalculada = 5000;
                }else if(tipoFormateado === 'camion'){
                    tarifaCalculada = 8000;
                }else{
                    tarifaCalculada = 3000;//Tarifa de respaldo
                }
            await ModeMovimiento.create({
                documento: documento || 'No registrado',
                placa: placa ||'sin placa',
                espacio: celdaAsignada,
                valor_pagado: tarifaCalculada,
                rol:'Entrada',
                tipoDeEspacio: String(tipoDeEspacio || 'No especificado'),
                fecha: new Date()
            });
            console.log(`Historial de movimiento duplicado con exito: ${celdaAsignada}`);
        } catch (errorMovimiento) {
            console.error("No se pudo crear pero el espacio se guardo: ", errorMovimiento.message);
        }
        return res.status(201).send(infoespacio); 
    }catch(error){
        console.error("Error al guardar en espacios y movimientos: ", error);
        res.status(500).json({mensaje:"Error al insertar las coordenadas del espacio",error:error.message});
    }
});
//Consulta general
router.get('/espacio/cliente/:documento', async (req, res)=>{
    try {
        const documentoUsuario = req.params.documento;
        const {tipoDeEspacio} = req.query;
        const filtro ={documento: documentoUsuario};
        if ((tipoDeEspacio)) {
            filtro.tipoDeEspacio = tipoDeEspacio;
        }
        const infoespacio = await ModeEspacio.find(filtro);
        res.json(infoespacio || []);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al consultar coordenadas del espacio", error: error.message});
    }
})
//Consultar por placa
router.get('/espacio/:placa', async (req, res)=>{
    try {
        const placa_buscar = req.params.placa;
        const respuesta = await ModeEspacio.findOne({placa: placa_buscar});
        if(!respuesta){
            return res.status(404).json({mensaje:"Coordenadas del espacio no encontradas"});
        }
        res.send(respuesta);
    } catch (error) {
        res.status(500).json({mensaje:"Error al consultar coordenadas del espacio", error:error.message});
    }
})
//Actualizar datos
router.put('/espacio/:placa', async (req, res)=>{
    try {
        const placa_buscar = req.params.placa;
        const respuesta = await ModeEspacio.findOneAndUpdate({placa: placa_buscar}, req.body, {new:true});
        if(!respuesta){
            return res.status(404).json({mensaje:"Coordenadas de este espacio no encontradas"});
        }
        res.json({mensaje:"Coordenadas encontradas", datos: respuesta});
    } catch (error) {
        res.status(500).json({mensaje:"Error al consultar coordenadas por placa", error:error.message});
    }
})
//Eliminar datos
router.delete('/espacio/:placa', async(req, res)=>{
    try {
        const placa_buscar = req.params.placa;
        const respuesta = await ModeEspacio.findOneAndDelete({placa:placa_buscar});
        if(!respuesta){
            return res.status(404).json({mensaje:"Coordenada de espacio no encontrada"});
        }
        res.send({mensaje: "Coordenadas de espacio eliminadas con exito"});
    } catch (error) {
        res.status(500).json({mensaje:"Error al eliminar coordenadas del espacio", error:error.message});
    }
})
//json hara uso de las rutas
//Vincular las rutas a la aplicación express
app.use(router);
//Iniciar el servidor
app.listen(PORT, () =>{
    console.log(`Servidor activo en ${PORT}`)
})