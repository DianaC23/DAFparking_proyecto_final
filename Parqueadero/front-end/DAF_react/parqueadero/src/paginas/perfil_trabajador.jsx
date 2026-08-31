//usestate
import React, {useCallback, useEffect, useState} from "react";
//Estilos propios
import './perfil_user.css'
//estilos
import 'primereact/resources/themes/lara-dark-green/theme.css';
import 'primereact/resources/primereact.min.css';
import { useNavigate, useLocation } from "react-router-dom";
//logo
import logo from '../assets/DAF_LOGO.png';
import { EspacioVehiculoService } from "../services/EspacioService";
import { Dialog } from "primereact/dialog";

function PerfilColaborador({ irACalculadora }) {
//Estado inicial dinamico para recibir los datos
  const navigate = useNavigate();
  const location = useLocation();
  const datosRuta = location.state?.empleado;
  //Nombre y rol del empleado
  const nombre = datosRuta?.nombre || localStorage.getItem('nombreTrabajador');
  const rol = datosRuta?.rol || localStorage.getItem('rolTrabajador');
  const documento = datosRuta?.documento || localStorage.getItem('documentoTrabajador');
  const turno = datosRuta?.turno || localStorage.getItem('turnoTrabajador');
  //Espacios disponibles de los espacios
  const[vehiculo, setVehiculo] = useState('carro');
    const[espacio, setEspacio] = useState(false);
    const[mostrarMapaModal, setMostrarMapaModal] = useState([]);
    const[espacioSeleccionado, setEspacioSeleccionado] = useState(null);
    //Consulta los espacios
    const obtenerEspacios = useCallback( async() =>{
                    try {
                        const datosEspacios = await EspacioVehiculoService.consultarEspacioParqueadero(vehiculo);
                        console.log("Estructura real recibida de los espacios:", datosEspacios);
                        setEspacio(datosEspacios || []);
                }   catch (error) {
                        console.error("Error al traer los espacios: ",error);
                }},[vehiculo]);

useEffect(()=>{
    if(nombre){
        obtenerEspacios();
        const intervalo = setInterval(obtenerEspacios, 30000);
        return ()=> clearInterval(intervalo);
    }
},[obtenerEspacios, nombre]);
  useEffect(()=>{
    if (!nombre) {
        alert("Sesión no válida");
        navigate('/login');
    }},[nombre, navigate]);
    const limite = 8;
        const espacioBackendA = (espacio || []).filter(e =>e.ubicacion?.includes('A'));
        const espacioBackendB = (espacio || []).filter(e =>e.ubicacion?.includes('B'));
        const filaA = Array.from({length:limite},(_, index) =>{
            const numeroIdentificador = `A${index+1}`;
            const espacioExistente = espacioBackendA.find(e => e.ubicacion === `Fila A - ${numeroIdentificador}`);
            if(espacioExistente && espacioExistente.disponibilidad === true){
                return{
                    ...espacioExistente,numeroEspacio:numeroIdentificador,
                    disponibilidad:true
                };
            }
            return {
                numeroEspacio:numeroIdentificador,disponibilidad:false,ubicacion:`Fila A - ${numeroIdentificador}`
            };
        });
        const filaB = Array.from({length:limite},(_, index) =>{
            const numeroIdentificador = `B${index+1}`;
            const espacioExistente = espacioBackendB.find(e => e.ubicacion === `Fila B - ${numeroIdentificador}`);
            if(espacioExistente && espacioExistente.disponibilidad === true){
                return{
                    ...espacioExistente,numeroEspacio:numeroIdentificador,
                    disponibilidad:true
                };
            }
            return {
                numeroEspacio:numeroIdentificador,disponibilidad:false,ubicacion: `Fila B -${numeroIdentificador}`} });
        //Calculo rapido para el boton de alerta sumatoria
        const motosTotales =16;
        const carrosTotales =16;
        const camionTotales =16;
        const bicicletaTotales =16;
        const arregloEspaciosSeguro = Array.isArray(espacio) ? espacio : [];
        const motosDisponibles = arregloEspaciosSeguro.filter(e =>e.tipoDeEspacio === 'moto' && !e.disponibilidad).length;
        const carrosDisponibles = arregloEspaciosSeguro.filter(e =>e.tipoDeEspacio === 'carro' && !e.disponibilidad).length;
        const camionesDisponibles = arregloEspaciosSeguro.filter(e =>e.tipoDeEspacio === 'camion' && !e.disponibilidad).length;
        const bicicletasDisponibles = arregloEspaciosSeguro.filter(e =>e.tipoDeEspacio === 'bicicleta' && !e.disponibilidad).length;
        const handleLogout = () =>{
        localStorage.clear();
        navigate('/login');
        };

    if (!nombre) {
        return(
            <div ><h2>cargando perfil</h2></div>
        );
    }
  return (
    <div className='fondo'><div className="calculadora-page">
      <div className="calculadora">
        <div className="calculadora-logo">
          <img src={logo}alt="Logo DAF" style={{width: '150px', height: 'auto'}}/>
        </div>
        <div className="calculadora-derecha">
          <div className="encabezado">
            <h1 className="calculadora-titulo">
              Bienvenido, {nombre}
            </h1>
            <p className="calculadora-descripcion">
              Rol: <strong>{rol || 'Operador de turno'}</strong>
            </p>
          </div>

          <div className="calculadora-resultado" style={{ marginTop: "15px" }}>
            <div className="resultado-dato">
              <span>Documento:</span>
              <strong>{documento}</strong>
            </div>
            <div className="resultado-dato">
              <span>Turno Asignado:</span>
              <strong>{turno || 'No asignado'}</strong>
            </div>
          </div>
          <div className="calculadora-formulario" style={{ marginTop: "20px" }}>
            <label style={{ fontWeight: "bold", fontSize: "16px", color: "#94fdff" }}>
              Panel de Operaciones del Parqueadero
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "10px" }}>
              <button
                type="button"
                className="boton-calcular"
                onClick={irACalculadora}
                style={{ padding: "12px", fontSize: "14px", textAlign: "center" }}
              >
                🧮 Calcular Tarifa
              </button>
              <button
                type="button"
                className="boton-limpiar"
                onClick={() => setMostrarMapaModal(true)}
                style={{ padding: "12px", fontSize: "14px", textAlign: "center" }}
              >
                🚗 Gestionar Espacios
                

              </button>
              <button
                type="button"
                className="boton-limpiar"
                onClick={() => alert("Abriendo bitácora de novedades...")}
                style={{ padding: "12px", fontSize: "14px", textAlign: "center" }}
              >
                📝 Bitácora
              </button>
              <button
                type="button"
                className="boton-limpiar"
                onClick={() => alert(`Disponibilidad actual:\n- Carros libres: ${carrosDisponibles} de ${carrosTotales}\n- Motos libres: ${motosDisponibles} de ${motosTotales}\n- Camiones libres: ${camionesDisponibles} de ${camionTotales}\n- Bicicleta libres: ${bicicletasDisponibles} de ${bicicletaTotales}`)}
                style={{ padding: "12px", fontSize: "14px", textAlign: "center" }}
              >
                🚗 Consultar Disponibilidad
              </button>
              <button
                type="button"
                className="boton-limpiar"
                onClick={handleLogout}
                style={{ padding: "12px", fontSize: "14px", textAlign: "center" }}>cerrar sesión
              </button>
            </div>
          </div>
          {/*Modal emergente */}
          <Dialog header = "Mapa de ocupación" visible={mostrarMapaModal} onHide={()=> setMostrarMapaModal(false)} modal>
                <div className="mapa-parqueadero">
                        <h2>Piso 1-parqueadero principal</h2>
                        <select value={vehiculo} onChange={(e)=> setVehiculo(e.target.value)} className="p-inputtext p-component" style={{width: '180px'}}>
                            <option value="carro">Carros</option>
                            <option value="moto">Motos</option>
                            <option value="camion">Camiones</option>
                            <option value="bicicleta">Bicicletas</option>
                        </select>
                        <h3>Fila A</h3>
                        <div className="fila fila-contenedor">
                            {filaA.map((esp) => (
                                <div key={esp.ubicacion} className={`espacio ${esp.disponibilidad ? "Ocupado" : "libre"} ${
                                    espacioSeleccionado?.ubicacion === esp.ubicacion ? "seleccionado" : ""
                                }`} onClick = {() => !esp.disponibilidad && setEspacioSeleccionado(esp)}>
                                    <h3>{esp.ubicacion}</h3> <i className={esp.disponibilidad ?
                                        "pi pi-lock": "pi pi-circle"}/>
                                    <p>{esp.disponibilidad ? "Ocupado" : "Disponible"}</p>
                                </div>
                            ))}
                        </div>
                        <div className="carretera">
                            <div className="flecha">←</div>
                            <i className="pi pi-car"></i>
                            <div className="flecha">→</div>
                        </div>
                        <h3>Fila B</h3>
                        <div className="fila fila-inferior">
                            {filaB.map((esp) => (
                                <div key={esp.ubicacion} className={`espacio ${esp.disponibilidad ? "ocupado" : "libre"} ${
                                    espacioSeleccionado?.ubicacion === esp.ubicacion ? "seleccionado" : ""
                                }`} onClick = {() => !esp.disponibilidad && setEspacioSeleccionado(esp)}>
                                    <h3>{esp.ubicacion}</h3> <i className={esp.disponibilidad ?
                                        "pi pi-lock": "pi pi-check-circle"
                                    }/>
                                    <p>{esp.disponibilidad ? "Ocupado" : "Disponible"}</p>
                                </div>
                            ))}
                        </div>
                    </div>
          </Dialog>
        </div>
      </div>
    </div></div>
    
  );
}

export default PerfilColaborador;