import { useState } from 'react'
//Estilos propios
import './registrarse.css';
//estilos
import 'primereact/resources/themes/lara-dark-green/theme.css';
import 'primereact/resources/primereact.min.css';
//logo
import logo from '../assets/DAF_LOGO.png';

function Registrarse() {

  const [nombre, setNombre] = useState("")
  const [documento, setDocumento] = useState("")
  const [numero_de_telefono, setNumeroDeTelefono] = useState("")
  const [correo_electronico, setCorreoElectronico] = useState("")
  const [contrasena,setContrasena] = useState("")
  const [confirmar_contrasena, setConfirmarContrasena] = useState("")
  const [errors, setErrors] = useState({})
  const [registro_exitoso, setRegistroExitoso] = useState("")
  const handleSubmit = (e) => {
    e.preventDefault()

    let newErrors = {}

    if (!nombre){
      newErrors.nombre = "El nombre es obligatorio"
    }

    if (!documento){
      newErrors.documento = "El documento es obligatorio"
    }

    if (!numero_de_telefono){
      newErrors.numero_de_telefono = "El numero de telefono es obligatorio"
    }

    if (!correo_electronico){
      newErrors.correo_electronico = "El correo es obligatorio"
    }
    
    if (!contrasena){
      newErrors.contrasena = "La contreseña es obligatoria"
    }

    if (!confirmar_contrasena){
      newErrors.confirmar_contrasena = "Debe confirmar la contraseña"
    }

    if (contrasena && confirmar_contrasena && contrasena !== confirmar_contrasena)
       {newErrors.confirmar_contrasena = "Las contraseñas no coinciden"
       }

    console.log(newErrors)

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)

      return 
    }

    setRegistroExitoso("El usuario ha sido registrado con exito")
    
    setNombre("")

    setDocumento("")

    setNumeroDeTelefono("")

    setCorreoElectronico("")

    setContrasena("")
    
    setConfirmarContrasena("")

    setErrors({})

    console.log("Registro exitoso")
  }

  return (
    <div className="page">
      <div className="logo-section">
        <img src={logo} alt="DAF logo" srcset="" />

      </div>

    <div className='container'> 
      <h1>Sistema de DAF Solutions</h1>

      <h2>Registro de usuario</h2>

      <form onSubmit={handleSubmit}>

      <label>Nombre completo</label>
      <br />
      <input
       type="text"
       value={nombre}
       onChange={(e) => {
       setRegistroExitoso("")
       setNombre(e.target.value)
       }}
       />
      
      {errors.nombre && <p style={{color: "red"}}>{errors.nombre}</p>}

      <br />
      <br />

      <label>Documento</label>
      <br />
      <input
       type="number"
       value={documento}
       onChange={(e) => {
       setRegistroExitoso("")
       setDocumento(e.target.value)
       }}
        />

      {errors.documento && <p style={{color: "red"}}>{errors.documento}</p>}

      <br />
      <br />

      <label>Número de teléfono</label>
      <br />
      <input 
      type="tel"
      value= {numero_de_telefono}
      onChange={(e) => {
      setRegistroExitoso("")
      setNumeroDeTelefono(e.target.value)
       }}
      />

      {errors.numero_de_telefono && <p style={{color: "red"}}>{errors.numero_de_telefono}</p>}

      <br />
      <br />

      <label>Correo electrónico</label>
      <br />
      <input
      type="email"
      value= {correo_electronico}
      onChange={(e) => {
      setRegistroExitoso("")
      setCorreoElectronico(e.target.value)
      }}
      />

      {errors.correo_electronico && <p style={{color: "red"}}>{errors.correo_electronico}</p>}

      <br />
      <br />

      <label>Contrasena</label>
      <br />
      <input
      type="password"
      value= {contrasena}
      onChange={(e) => {
      setRegistroExitoso("")
      setContrasena(e.target.value)
      }}
      />

      {errors.contrasena && <p style={{color: "red"}}>{errors.contrasena}</p>}

      <br />
      <br />

      <label>Confirmar contrasena</label>
      <br />
      <input
      type="password"
      value= {confirmar_contrasena}
      onChange={(e) => {
      setRegistroExitoso("")
      setConfirmarContrasena(e.target.value)
      }}
      />

      {errors.confirmar_contrasena && <p style={{color: "red"}}>{errors.confirmar_contrasena}</p>}
      
      <br />
      <br />

      <button>Registrarse</button>

      {registro_exitoso && <p>{registro_exitoso}</p>}

    </form>
    </div>
    </div>
    
  )
}

export default Registrarse;