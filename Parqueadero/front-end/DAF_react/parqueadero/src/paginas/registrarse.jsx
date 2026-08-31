import { useState } from 'react';
//Estilos propios
import './registrarse.css';
//estilos
import 'primereact/resources/themes/lara-dark-green/theme.css';
import 'primereact/resources/primereact.min.css';
//logo
import logo from '../assets/DAF_LOGO.png';
//botón
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
//LLamar registro de usuarios
import {RegistroClienteService} from '../services/RegistroClienteService';
import { useNavigate } from "react-router-dom";

function Registrarse() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [documento, setDocumento] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo_electronico, setCorreoElectronico] = useState("");
  const [direccion, setDireccion] = useState("");
  const [contrasena,setContrasena] = useState("");
  const [confirmar_contrasena, setConfirmarContrasena] = useState("");
  const [errors, setErrors] = useState({});
  const [registro_exitoso, setRegistroExitoso] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!nombre){
      newErrors.nombre = "El nombre es obligatorio";
    }
    if (!apellido){
          newErrors.apellido = "El apellido es obligatorio";
        }
    if (!documento){
      newErrors.documento = "El documento es obligatorio";
    }
    if (!telefono){
      newErrors.numero_de_telefono = "El numero de telefono es obligatorio";
    }
    if (!correo_electronico){
      newErrors.correo_electronico = "El correo es obligatorio";
    }
    if (!contrasena){
      newErrors.contrasena = "La contreseña es obligatoria";
    }
    if (!confirmar_contrasena){
      newErrors.confirmar_contrasena = "Debe confirmar la contraseña";
    }
    if (contrasena && confirmar_contrasena && contrasena !== confirmar_contrasena)
       {newErrors.confirmar_contrasena = "Las contraseñas no coinciden";
       }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

   try{
    setCargando(true);
    //Mapeo
    const datosUsuario ={
      nombre,
      apellido,
      documento: Number(documento),
      telefono: Number(telefono),
      correo_electronico,
      direccion,
      contrasena
    };
    //Servicio conectando al backend
    const respuesta = await RegistroClienteService.registrar(datosUsuario);
    setRegistroExitoso(respuesta.message || "El usuario ha sido registrado exitosamente");
    //Resetear formulario
    setNombre("");
    setApellido("");
    setDocumento("");
    setTelefono("");
    setCorreoElectronico("");
    setDireccion("");
    setContrasena("");
    setConfirmarContrasena("");
    setErrors({});
   }catch(error){
    //Captura errores de duplicidad del backend
    setErrors({api: error.message});
   }finally{
    setCargando(false);
   }
  };
  const limpiarMensajes = () =>{
    setRegistroExitoso("");
    setErrors({});
  }
  const navigate = useNavigate();
  return (
    <div className="page">
      <div className="logo-section">
        <img src={logo} alt="DAF logo"/>
      </div>
    <div className='container'> 
      <h1>Sistema de DAF Solutions</h1>
      <h2>Registro de usuario</h2>
      {errors.api && <p style={{color: "red", fontWeight: "bold", }}>{errors.api}</p>}{registro_exitoso && <p style={{
        color:"green", fontWeight: "bold"}}>{registro_exitoso}</p>}
      <form onSubmit={handleSubmit} className='p-fluid'>
        <div className='campos'>
          <label>Nombre</label>
          <br />
        <InputText type="text" value={nombre}onChange={(e) => {limpiarMensajes(); setNombre(e.target.value);}}/>
        {errors.nombre && <small style={{color:"red"}}>{errors.nombre}</small>}
        </div>
        <div className='campos'>
          <label>Apellidos</label>
          <br />
        <InputText type="text" value={apellido}onChange={(e) => {limpiarMensajes(); setApellido(e.target.value);}}/>
        {errors.apellido && <small style={{color:"red"}}>{errors.apellido}</small>}
        </div>

      <div className='campos'>
          <label>Documento</label>
          <br />
        <InputText keyfilter = "int" value={documento}onChange={(e) => {limpiarMensajes(); setDocumento(e.target.value);}}/>
        {errors.documento && <small style={{color:"red"}}>{errors.documento}</small>}
        </div>
      <div className='campos'>
          <label>Número de teléfono</label>
          <br />
        <InputText keyfilter = "pnum" value={telefono}onChange={(e) => {limpiarMensajes(); setTelefono(e.target.value);}}/>
        {errors.telefono && <small style={{color:"red"}}>{errors.telefono}</small>}
        </div>
      <div className='campos'>
          <label>Correo Electrónico</label>
          <br />
        <InputText type="email" value={correo_electronico}onChange={(e) => {limpiarMensajes(); setCorreoElectronico(e.target.value);}}/>
        {errors.correo_electronico && <small style={{color:"red"}}>{errors.correo_electronico}</small>}
        </div>
      <div className='campos'>
          <label>Dirección</label>
          <br />
        <InputText value={direccion}onChange={(e) => {limpiarMensajes(); setDireccion(e.target.value);}}/>
        {errors.direccion && <small style={{color:"red"}}>{errors.direccion}</small>}
        </div>
      <div className='campos'>
          <label>Contraseña</label>
          <br />
        <Password value={contrasena} toggleMask feedback={false} onChange={(e) =>{limpiarMensajes(); setContrasena(e.target.value);}}/>
        {errors.contrasena && <small style={{color:"red"}}>{errors.contrasena}</small>}
        </div>
      <div className='campos'>
          <label>Confirmar contrasena</label>
          <br />
        <Password value={confirmar_contrasena} toggleMask feedback = {false} onChange={(e) => {limpiarMensajes(); setConfirmarContrasena(e.target.value);}}/>
        {errors.confirmar_contrasena && <small style={{color:"red"}}>{errors.confirmar_contrasena}</small>}
        </div>
        {/*Botones */}
        <div className='actions-section' style={{display: 'flex', gap: '10px', margin: '20px'}}>
          <Button type='submit' label="Registrarse" loading={cargando} className='pagefail-btn'/>
          <Button type="button" label= "Volver al inicio" onClick={() => navigate('/')} className='pagefail-btn'/>
        </div>
    </form>
    </div>
    </div>
  )
}
export default Registrarse;