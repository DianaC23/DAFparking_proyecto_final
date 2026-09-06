import { useEffect, useState } from "react";
//Estilos propios
import './perfil_trabajador.css';
//estilos
import 'primereact/resources/themes/lara-dark-green/theme.css';
import 'primereact/resources/primereact.min.css';
import logo from '../assets/DAF_LOGO.png';
import { useNavigate, useLocation } from "react-router-dom";
import { Dialog } from "primereact/dialog";
//Bitacora
import Bitacora from "./bitacora.jsx";
//Para ingresos estimados
import { EspacioVehiculoService } from "../services/EspacioService.js";

function PerfilGerente() {
const navigate = useNavigate();
  const location = useLocation();
  const datosRuta = location.state?.empleado;
  //Nombre y datos
  const nombreGerente = datosRuta?.nombre || localStorage.getItem('nombreTrabajador') || "Gerente";
  const rolGerente = datosRuta?.rol || localStorage.getItem('rolTrabajador') || "Gerente operativo";
  const documentoGerente = datosRuta?.documento || localStorage.getItem('documentoTrabajador') || "";

    // Estado con datos del gerente
  const [gerente] = useState({
    nombre: nombreGerente,
    documento: documentoGerente,
    rol: rolGerente,
    sede: "Sede Principal - DAF"
  });
  //Estado para mostrar y ocultar bitacora
const [mostrarBitacoraModal, setMostrarBitacoraModal] = useState(false);

  // Resumen estadístico del parqueadero
  const [metricas, setMetricas] = useState({
    ingresosHoy: "$ 0",
    vehiculosIngresados: 0,
    ocupacionActual: "0%",
    novedadesAbiertas: 0
  });
  const [cargando, setCargando] = useState(false);
  //Estados del perfil trabajador
    //Calculadora
    const [mostrarCalculadoraModal, setMostrarCalculadoraModal] = useState(false);
    const [tipoVehiculo, setTipoVehiculo] = useState("");
    const [horaEntrada, setHoraEntrada] = useState("");
    const [horaSalida, setHoraSalida] = useState("");
    const [resultado, setResultado] = useState(null);
    const [errorCalculo, setErrorCalculo] = useState("");
     //precios
      
    const tarifas = {
    bicicleta: 1500,
    moto: 2000,
    carro: 4000,
    camioneta: 5000
     }
     //Logíca de cálculo
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
  };
  
  //Seguridad de la sesión
  useEffect(()=>{
    if (!nombreGerente || nombreGerente === "Gerente") {
      alert("Sesión no válida");
      navigate('/login');
    }
  },[nombreGerente, navigate]);
  //Conexión con los espacios
  useEffect(()=>{
    const calcularDashboard = async () =>{
      try{
        setCargando(true);
        const todosLosEspacios = await EspacioVehiculoService.consultarTodosLosEspacios();

        if (!todosLosEspacios || todosLosEspacios.length === 0) {
          setCargando(false);
          return;
        }
        //Filtrar cuales celdas estan ocupadas
        const ocupados = todosLosEspacios.filter(e => e.disponibilidad === false);
        //Calcular ocupación
        const totalCeldas = todosLosEspacios.length;
        const totalOcupados = ocupados.length;
        const porcentajeOcupacion = Math.round((totalOcupados/totalCeldas) * 100 || 0);
      
        //Calcular ingresos
        const tarifaAsociados ={bicicleta:1500, moto:2000, carro:4000, camioneta:5000};
        let totalIngresosProyecto = 0;
        ocupados.forEach(vehiculo =>{
          const precioPorHora = tarifaAsociados[vehiculo.tipoDeEspacio] || 3000;
          totalIngresosProyecto += (precioPorHora *2.5);
        });
        setMetricas({
          ingresosHoy: `$ ${Math.round(totalIngresosProyecto).toLocaleString("es-CO")}`,
          vehiculosIngresados: totalOcupados,
          ocupacionActual: `${porcentajeOcupacion}%`,
          novedadesAbiertas: totalOcupados > 5 ? 2 : 0
        });
      }catch(error){
        console.error("Error al procesas las métricas", error);
      } finally{
        setCargando(false);
      }
    };
    calcularDashboard();
  },[]);

          //cerrar sesión
        const handleLogout = () =>{
        localStorage.clear();
        navigate('/login');
        };

  return (
    <div
      style={{display: "flex",justifyContent: "center",alignItems: "center",minHeight: "100vh",backgroundColor: "#0f0f1a",padding: "20px",
        fontFamily: "Arial, sans-serif",boxSizing: "border-box"}}>
      <div
        style={{width: "100%",maxWidth: "850px",backgroundColor: "#161626",borderRadius: "12px",padding: "30px",
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.5)",border: "1px solid #2a2a40", color: "#ffffff"}}>
        {/* Encabezado con Logo e Info */}
        <div
          style={{display: "flex",justifyContent: "space-between",alignItems: "center",borderBottom: "1px solid #2a2a40",
            paddingBottom: "20px",marginBottom: "25px" }}>
          <div>
            <span
              style={{backgroundColor: "#00adb5",color: "#fff",padding: "4px 10px",borderRadius: "12px",
                fontSize: "12px",fontWeight: "bold",textTransform: "uppercase"}}>Panel de Control
            </span>
            <h1 style={{ margin: "10px 0 5px 0", color: "#94fdff", fontSize: "24px" }}>
              Bienvenida, {gerente.nombre}
            </h1>
            <p style={{ margin: 0, color: "#aaa", fontSize: "14px" }}>
              {gerente.rol} • {gerente.sede}
            </p>
          </div>
          <div
            style={{width: "70px",height: "70px",borderRadius: "10px",backgroundColor: "#1a1a2e",display: "flex",justifyContent: "center",
              alignItems: "center",border: "1px solid #94fdff" }} >
            <img
              src={logo}
              alt="Logo DAF"
              style={{ maxWidth: "80%", maxHeight: "80%", objectFit: "contain" }}
            />
          </div>
        </div>

        {/* Módulos de Métricas Rápidas */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "15px",
            marginBottom: "30px"
          }}
        >
          <div
            style={{
              backgroundColor: "#1a1a2e",
              padding: "15px",
              borderRadius: "8px",
              borderLeft: "4px solid #00adb5"
            }}
          >
            <span style={{ fontSize: "12px", color: "#aaa" }}>Ingresos Estimados Hoy</span>
            <h3 style={{ margin: "5px 0 0 0", color: "#94fdff", fontSize: "20px" }}>
              {cargando ? "cargando...":metricas.ingresosHoy}
            </h3>
          </div>

          <div
            style={{
              backgroundColor: "#1a1a2e",
              padding: "15px",
              borderRadius: "8px",
              borderLeft: "4px solid #4e00c2"
            }}
          >
            <span style={{ fontSize: "12px", color: "#aaa" }}>Ocupación Actual</span>
            <h3 style={{ margin: "5px 0 0 0", color: "#ffffff", fontSize: "20px" }}>
              {cargando ? "cargando...":metricas.ocupacionActual}
            </h3>
          </div>

          <div
            style={{
              backgroundColor: "#1a1a2e",
              padding: "15px",
              borderRadius: "8px",
              borderLeft: "4px solid #00f2fe"
            }}
          >
            <span style={{ fontSize: "12px", color: "#aaa" }}>Flujo de Vehículos</span>
            <h3 style={{ margin: "5px 0 0 0", color: "#ffffff", fontSize: "20px" }}>
              {cargando ? "cargando...":metricas.vehiculosIngresados}
            </h3>
          </div>

          <div
            style={{
              backgroundColor: "#1a1a2e",
              padding: "15px",
              borderRadius: "8px",
              borderLeft: "4px solid #ff4d4d"
            }}
          >
            <span style={{ fontSize: "12px", color: "#aaa" }}>Novedades Turno</span>
            <h3 style={{ margin: "5px 0 0 0", color: "#ff4d4d", fontSize: "20px" }}>
              {metricas.novedadesAbiertas}
            </h3>
          </div>
        </div>

        {/* Menú Gerencial de Acciones */}
        <div>
          <label
            style={{
              fontWeight: "bold",
              fontSize: "16px",
              color: "#94fdff",
              display: "block",
              marginBottom: "15px"
            }}
          >
            Módulos de Gestión Gerencial
          </label>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "12px"
            }}
          >
            <button type="button" className="boton-operacion"
              onClick={()=>setMostrarCalculadoraModal(true)} style={{padding: "14px", fontSize: "14px",fontWeight: "bold", backgroundColor: "#1a1a2e",color: "#94fdff",
                border: "1px solid #94fdff",borderRadius: "8px",cursor: "pointer",textAlign: "center"}}>
              🧮 Simular Tarifa / Cobro
            </button>

            <button
              type="button" className="boton-operacion"
              onClick={()=> setMostrarBitacoraModal(true)}
              style={{padding: "14px", fontSize: "14px",fontWeight: "bold", backgroundColor: "#1a1a2e",color: "#94fdff",
                border: "1px solid #94fdff",borderRadius: "8px",cursor: "pointer",textAlign: "center"}}>
              📝 Revisar Bitácora
            </button>

            <button
              type="button"
              onClick={()=> navigate('/registrarse')} className="boton-operacion"
              style={{padding: "14px",fontSize: "14px",fontWeight: "bold",backgroundColor: "#1a1a2e",
                color: "#94fdff",border: "1px solid #94fdff",borderRadius: "8px",cursor: "pointer",textAlign: "center"}}>
              👤 Registrar Nuevo Usuario
            </button>

              <button
                type="button"
                className="boton-limpiar"
                onClick={handleLogout}
                style={{ padding: "14px", fontSize: "14px",fontWeight: "bold", backgroundColor: "#1a1a2e",color: "#94fdff",
                border: "1px solid #94fdff",borderRadius: "8px",cursor: "pointer",textAlign: "center"}}>cerrar sesión
              </button>
          </div>
        </div>
        {/**Mostrar bitacora */}
          <Dialog header="Simulador de cobros por horas" visible={mostrarCalculadoraModal}
          style={{width: '450px'}} onHide={()=>setMostrarCalculadoraModal(false)}>
          <form onSubmit={calcularTarifa} style={{display:"flex", flexDirection:"column", gap:"12px", marginTop:"10px", color:"#ffffff"}}>
            <div>
              <label style={{display:"block", marginBottom:"5px", fontWeight:"bold"}}>Tipo de vehículo</label>
              <select value={tipoVehiculo} 
              onChange={(e)=> setTipoVehiculo(e.target.value)}
                style={{width:"100%", padding:"10px", borderRadius:"6px", backgroundColor:"#1a1a2e",
                  color:"#ffffff", border:"1px solid #2a2a40"}} required>
                    <option value="">Seleccione...</option>
                    <option value="bicicleta">Bicicleta (Valor hora: $1500)</option>
                    <option value="moto">Moto (Valor hora: $2000)</option>
                    <option value="carro">Carro (Valor hora: $4000)</option>
                    <option value="camioneta">Camión (Valor hora: $5000)</option>
              </select>
            </div>
            <div>
              <label style={{display:"block", marginBottom:"5px",fontWeight:"bold"}}>Hora de Entrada</label>
              <input type="time" value={horaEntrada} onChange={(e)=> setHoraEntrada(e.target.value)}
              style={{width: "100%", padding:"10px", borderRadius:"6px", backgroundColor:"#1a1a2e",
                color:"#ffffff", border:"1px solid #2a2a40", boxSizing:"border-box"}}required />
            </div>
            <div>
              <label style={{display:"block", marginBottom:"5px",fontWeight:"bold"}}>Hora de Salida</label>
              <input type="time" value={horaSalida} onChange={(e)=> setHoraSalida(e.target.value)}
              style={{width: "100%", padding:"10px", borderRadius:"6px", backgroundColor:"#1a1a2e",
                color:"#ffffff", border:"1px solid #2a2a40", boxSizing:"border-box"}}required />
            </div>
            {errorCalculo && <p style={{color:"#ff4d4d", margin:"5px 0", fontWeight:"bold"}}>{errorCalculo}</p>}
            <button type="submit" className="boton-operacion" style={{margin:"1px 0 0 0",
              width:"100%", backgroundColor:"#00adb5"
            }}>Calcular</button>
            <button type="button" className="boton-operador" onClick={()=> {setTipoVehiculo(""); setHoraEntrada(""); setResultado(null); setErrorCalculo("");}} style={{margin:"10px 140px"}}>Limpiar simulación</button>
            {resultado &&(
              <div style={{marginTop:"15px",padding:"12px",backgroundColor:"#1a1a2e", borderRadius:"6px", border:"1px solid #94fdff"}}>
                <p>Horas facturadas: <strong>{resultado.horas}</strong></p>
                <p>Tarifa aplicada <strong>${resultado.tarifaPorHora}</strong></p>
                <h3>Total estimado: ${resultado.total}</h3>
              </div>
            )}
            </form></Dialog>
            {/**Mostrar bitacora */}
          <Dialog visible={mostrarBitacoraModal}
            breakpoints={{'960px':'85vw', '641px':'100vw'}} style={{width:'50vw'}}
            showHeader={false} contentStyle={{padding:0, backgroundColor: 'transparent',border:'none'}}>
              <Bitacora volverAlPerfil={()=> setMostrarBitacoraModal(false)} usuarioActivo={nombreGerente}/>
          </Dialog>
      </div>
    </div>
  );
}

export default PerfilGerente;