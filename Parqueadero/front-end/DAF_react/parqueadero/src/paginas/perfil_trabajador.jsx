//usestate
import React, {useCallback, useEffect, useState} from "react";
//Estilos propios
import './perfil_trabajador.css';
//estilos
import 'primereact/resources/themes/lara-dark-green/theme.css';
import 'primereact/resources/primereact.min.css';
import { useNavigate, useLocation } from "react-router-dom";
//logo
import logo from '../assets/DAF_LOGO.png';
import { EspacioVehiculoService } from "../services/EspacioService";
import { Dialog } from "primereact/dialog";
//Bitacora
import Bitacora from "./bitacora.jsx";

function PerfilColaborador() {
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
    const[mostrarMapaModal, setMostrarMapaModal] = useState(false);
    const[espacioSeleccionado, setEspacioSeleccionado] = useState(null);
  //Calculadora
  const [mostrarCalculadoraModal, setMostrarCalculadoraModal] = useState(false);
  //Estado para mostrar y ocultar bitacora
  const [mostrarBitacoraModal, setMostrarBitacoraModal] = useState(false);
  const [tipoVehiculo, setTipoVehiculo] = useState("");
  const [horaEntrada, setHoraEntrada] = useState("");
  const [horaSalida, setHoraSalida] = useState("");
  const [resultado, setResultado] = useState(null);
  const [errorCalculo, setErrorCalculo] = useState("");

  const tarifas = {
    bicicleta: 1500,
    moto: 2000,
    carro: 4000,
    camioneta: 5000
  }
  //Lógica para procsar el cobro
  const calcularTarifa = (event) =>{
    event.preventDefault();
    setErrorCalculo("");
    setResultado(null);
    if (!tipoVehiculo || !horaEntrada || !horaSalida) {
      setErrorCalculo("Por favor completa todos los campos.");
      return;
    }
  const [horaEntradaNumero, minutosEntrada] = horaEntrada.split(":").map(Number);
  const [horaSalidaNumero, minutosSalida] = horaSalida.split(":").map(Number);

  const entradaEnMinutos = horaEntradaNumero * 60 + minutosEntrada;
  const salidaEnMinutos = horaSalidaNumero * 60 + minutosSalida;

    if (salidaEnMinutos <= entradaEnMinutos) {
      setErrorCalculo("La hora de salida debe ser posterior a la hora de entrada.");
      return;
    }
    const diferenciaMinutos = salidaEnMinutos - entradaEnMinutos;
    const horas = Math.ceil(diferenciaMinutos / 60);
    const tarifaPorHora = tarifas[tipoVehiculo] || 0;
    const total = horas * tarifaPorHora;

    setResultado({horas, tarifaPorHora, total});
  }
  //Metodo de pago
  const [metodoPago, setMetodoPago] = useState("efectivo");
  const [placaVehiculo, setPlacaVehiculo] = useState("");
   //Comprobante d pago
    const [comprobantePago, setComprobantePago] = useState("");
  //Limpiar formulario
  const limpiarFormularioCalculadora = ()=> {
    setTipoVehiculo("");
    setHoraEntrada("");
    setHoraSalida("");
    setResultado(null);
    setErrorCalculo("");
    setPlacaVehiculo("");
    setMetodoPago("efectivo");
    setComprobantePago("");
  };
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
        navigate('/');
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
                //cerrar sesión
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
            <label style={{ fontWeight: "bold", fontSize: "16px", color: "#94fdff", textAlign:"center" }}>
              Panel de Operaciones del Parqueadero
            </label>
            <div style={{ display: "contents", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "10px" }}>
              {/*Botón para calcular tarifa */}
              <button
                type="button"
                className="boton-calcular"
                onClick={() => setMostrarCalculadoraModal(true)}
                style={{ padding: "12px", fontSize: "14px", textAlign: "center",  color:"#ffffff" }}>
                🧮 Calcular Tarifa
              </button>
              <button type="button" className="boton-limpiar" onClick={() => setMostrarMapaModal(true)}
               style={{ padding: "12px", fontSize: "14px", textAlign: "center" }}>
                🚗 Gestionar Espacios
              </button>
              <button
                type="button"
                className="boton-calcular"
                onClick={() => setMostrarBitacoraModal(true)}
                >
                📝 Bitácora
              </button>
              <button
                type="button"
                className="boton-limpiar"
                onClick={handleLogout}
                style={{ padding: "12px", fontSize: "14px", textAlign: "center" }}>cerrar sesión
              </button>
            </div>
          </div>
          {/**Mostrar bitacora */}
          <Dialog visible={mostrarBitacoraModal} onHide={()=> setMostrarMapaModal(false)}
            breakpoints={{'960px':'85vw', '641px':'100vw'}} style={{width:'50vw'}}
            showHeader={false} contentStyle={{padding:0, backgroundColor: 'transparent',border:'none'}}>
              <Bitacora volverAlPerfil={()=> setMostrarBitacoraModal(false)} usuarioActivo={nombre}/>
          </Dialog>
          {/*calcular tarifa emergente inicio */}
          <Dialog header="Calculadora de Tarifa" visible={mostrarCalculadoraModal} onHide={()=> {setMostrarCalculadoraModal(false); limpiarFormularioCalculadora();}} modal style={{width:'450px'}}>
            <div style = {{color: "white", padding: "10px"}}>
              <form className="calculadora-formulario" onSubmit={calcularTarifa}>
              <div className="campo" style={{marginBottom:"12px"}}>Tipo de vehículo
                <select id="tipoVehiculo" value={tipoVehiculo} onChange={(e)=> setTipoVehiculo(e.target.value)} style={{width:"100%",padding:"10px",borderRadius: "5px", color: "#000"}}>
                  <option value="">Selecciona un vehículo</option>
                  <option value="bicicleta">Bicicleta</option>
                  <option value="moto">Moto</option>
                  <option value="carro">Carro</option>
                  <option value="camioneta">Camioneta</option>
                </select></div>
                  <div className="campo" style={{marginBottom:"12px"}}>
                    Hora de entrada
                    <input id="horaEntrada" type="time" value={horaEntrada} onChange={(e)=> setHoraEntrada(e.target.value)}
                    style={{width:"100%",padding:"10px",borderRadius:"5px",color:"#000"}} />
                    </div>
                  <div className="campo" style={{marginBottom:"15px"}}>
                    Hora de salida
                    <input id="horaSalida" type="time" value={horaSalida} onChange={(e)=>setHoraSalida(e.target.value)} style={{width:"100%",padding:"10px",borderRadius:"5px",color:"#000"}}/>
                    </div>
                    {errorCalculo&&(
                      <div className="mensaje-error" style={{color:"#ff8d8d", marginBottom: "10px", fontWeight:"bold"}}>
                        {errorCalculo}</div>
                    )}
                    <div style={{display:"flex", gap: "10px"}}>
                      <button type="submit" className="boton-calcular" style={{flex:1,padding:"10px"}}>Calcular tarifa</button>
                      <button type="button" className="boton-limpiar" onClick={limpiarFormularioCalculadora} style={{flex:1, padding:"10px"}}>Limpiar</button>
                      </div>
                      {resultado &&(
                        <div className="calculadora-resultado" style={{marginTop:"20px", padding:"15px",backgroundColor:"#00282a",borderRadius:"8px"}}>
                          <h3 style={{marginTop:0, textAlign: "center", color: "#94fdff"}}>Resultado</h3>
                          <div className="resultado-dato" style={{display:"flex",justifyContent:"space-between",marginBottom:"8px"}}>
                          <span> Tiempo:</span>
                          <span>{resultado.horas} hora(s)</span></div>
                          <div className="resultado-dato" style={{display:"flex", justifyContent:"space-between", marginBottom:"8px"}}>
                           <span> Tarifa x Hora:</span>
                            <span>${resultado.tarifaPorHora.toLocaleString("es-CO")}</span>
                           </div>
                        <div style={{display:"flex", justifyContent:"space-between", borderTop:"1px solid #19545b", paddingTop:"8px", fontSize:"17px"}}>
                          Total:
                          <strong style={{color:"#94fdff"}}>${resultado.total.toLocaleString("es-CO")}</strong>
                        </div>
                        {/*Botón pago */}
                        <div className="campo" style={{marginBottom:"12px"}}>
                          <label htmlFor="placaVehiculo" style={{fontSize:"14px"}}>Placa</label>
                          <input type="text" id="placaVehiculo" placeholder="Ej: ABC123" value={placaVehiculo}
                          onChange={(e)=> setPlacaVehiculo(e.target.value.toUpperCase())} style={{width:"100%", padding:"10px", borderRadius: "5px", color: "#000", marginTop:"5px", boxSizing:"border-box"}} />
                        </div>
                        {/*Selector Método de pago */}
                        <div className="campo" style={{marginBottom:"12px"}}>
                          <label htmlFor="metodoPago" style={{fontSize:"14px"}}>Método de pago</label>
                          <select id="metodoPago" value={metodoPago} onChange={(e)=> {setMetodoPago(e.target.value); setComprobantePago("");}} style={{width:"100%", padding: "10px",borderRadius: "5px", color:"#000", marginTop:"15px"}}>
                            <option value="efectivo">Efectivo</option>
                            <option value="tarjeta">Tarjeta</option>
                            <option value="transferencia">Transferencia bancaria</option>
                          </select>
                        </div>
                        {/**Tarjeta o transferencia */}
                        {metodoPago !== "efectivo" &&(
                          <div className="campo" style={{marginBottom:"20px"}}>
                            <label htmlFor="comprobantePago" style={{fontSize:"14px"}}>
                              {metodoPago === "tarjeta" ? "ultimos 4 dígitos":"Número de comprobante: "}</label>
                            <input type="text" id="comprobantePago" placeholder={metodoPago === "tarjeta" ? "Ej:123" : "Ej: 1234567"}
                            onChange={(e)=> setComprobantePago(e.target.value)}
                            style={{width:"100%", padding:"10px", borderRadius: "5px", color: "#000", marginTop: "5px", boxSizing:"border-box"}} />
                          </div>
                        )} 
                        {/*Botón finalizar la validación */}
                        <div style={{marginTop:"15px"}}>
                          <button type="button" className="boton-calcular" style={{width: "100%", padding:"10px", fontWeight:"bold"}}
                          onClick={async()=>{
                            if(!placaVehiculo.trim()){
                              alert("Por favor ingresa la placa del vehículo");
                              return;
                            }
                            if (metodoPago !== "efectivo" && !comprobantePago.trim()) {
                              alert(`Por favor ingresa el número de referencia para el pago con ${metodoPago === "tarjeta" ? "Tarjeta" : "transferencia"}`);
                              return;
                            }
                            try{
                              //Llama al service
                              await EspacioVehiculoService.liberarEspacioPorPlaca(placaVehiculo);
                              alert(`¡Pago de $${resultado.total.toLocaleString("es-CO")} recibido con éxito(${metodoPago.toUpperCase()})!\n${comprobantePago ? `Comprobante: ${comprobantePago}\n`: ''}\nEl vehículo con placa ${placaVehiculo} ha sido retirado`);

                              setMostrarCalculadoraModal(false);
                              limpiarFormularioCalculadora();
                              //Refresca el mapa
                              obtenerEspacios();
                            } catch(error){
                              console.error("Error al procesar el pago y liberación: ", error);
                              alert(`No se pudo liberar el espacio: ${error.message}. Verifica si la placa existe en el sistema.`);
                            }
                          }}>Regístrar pago y liberar espacio</button>
                        </div>                
                        </div>
                    )}
              </form>
              </div>
          </Dialog>
          {/*calcular tarifa emergente final*/}
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