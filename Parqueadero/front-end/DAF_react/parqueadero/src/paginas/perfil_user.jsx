//usestate
import React,{useState, useEffect  } from "react";
//Navigate
import { useNavigate } from "react-router-dom";
//Estilos propios
import './perfil_user.css'
//estilos
import 'primereact/resources/themes/lara-dark-green/theme.css';
import 'primereact/resources/primereact.min.css';
//menú lateral
import { PanelMenu } from 'primereact/panelmenu';
//Iconos
import 'primeicons/primeicons.css';
//avatar
import { Avatar } from 'primereact/avatar';
//Botón
import { Button } from 'primereact/button';
import {ButtonGroup} from 'primereact/buttongroup';
//card
import { Card } from 'primereact/card';
//Cambio de datos del usuario
import {clienteService } from '../services/ClienteService'; 
//Llamar datos del vehiculo del usuario
import {TipoVehiculoService} from '../services/TipoVehiculoService';

//Panel de las tarifas
import { Panel } from 'primereact/panel';
//Tabla y columnas
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

function PerfilUser(){
    const navigate = useNavigate();
    //mi perfil
    const[vistaActiva, setVistaActiva] = useState("perfil");
    const[mostrarCuadro, setMostrarCuadro] = useState(false);
    const [usuario, setUsuario] = useState({
        nombre: 'usuario',
        apellido: '',
        rol: 'invitado',
        correo: '',
        telefono: '',
        documento: '',
        direccion: '',
        contrasena:''
    });
    //Mis vehiculos
    const[vehiculosuser, setVehiculosUser] = useState([]);
    const[nuevoVehiculo, setNuevoVehiculo] = useState({
        tipo: '',
        placa: '',
        modelo: '',
        marca:'',
        color:''
    });

    useEffect(() =>{
        //1.Cargar los datos del usuario
        const cargarDatosUsuario = () =>{
            const nombreGuardado = localStorage.getItem('nombreUsuario');
            const apellidoGuardado = localStorage.getItem('apellidoUsuario');
            const rolGuardado = localStorage.getItem('rolUsuario');
            const correoGuardado = localStorage.getItem('correoUsuario');
            const telefonoGuardado = localStorage.getItem('telefonoUsuario');
            const documentoGuardado = localStorage.getItem('documentoUsuario');
            const direccionGuardado = localStorage.getItem('direccionUsuario');
            const contrasenaGuardado = localStorage.getItem('contrasenaUsuario');
            if(nombreGuardado){
                setUsuario({
                    nombre: nombreGuardado,
                    apellido: apellidoGuardado || '',
                    rol: rolGuardado || 'Cliente',
                    correo: correoGuardado || 'No registrado',
                    telefono: telefonoGuardado || 'No registrado',
                    documento: documentoGuardado ||'No esta registrado',
                    direccion: direccionGuardado,
                    contrasena: contrasenaGuardado
                });
            }else{
                navigate('/login');
            }
        };
            cargarDatosUsuario();
            window.addEventListener('storage', cargarDatosUsuario);
            
            return() =>{
                window.removeEventListener('storage', cargarDatosUsuario);
            };
        }, [navigate]);
//2.cargar vehiculos del usuario
    useEffect(()=>{
        const cargarDatosVehiculo = async () =>{
        if(usuario && usuario.documento && usuario.documento !== 'No esta registrado') {
            try {
                console.log("Enviando petición HTTP  para el documento:", usuario.documento);
                const datosTiVehiculos = await TipoVehiculoService.obtenerVehiculosPorUsuario(usuario.documento);
                console.log("Datos que vienen del back-end", datosTiVehiculos);
                setVehiculosUser(datosTiVehiculos);
            } catch (error) {
                console.error("Error al cargar vehículos", error);
                setVehiculosUser([]);
            }
        }};
        cargarDatosVehiculo ();
            
        }, [usuario]);

        const handleLogout = () =>{
        localStorage.clear();
        navigate('/');
        }
        //Función para agregar vehiculos
        const handleAgregarVehiculo = async (e) =>{
            e.preventDefault();
            try{
                //Verificación de seguridad del documento
                if(!usuario || !usuario.documento || usuario.documento === 'No esta registrado'){
                    alert("Error: No se ha detectado el documento de tu centa de usuario");
                    return;
                }
                
                //Estructra los datos uniendo el documento del usuario actual
                const datosVehiculo = {
                    tipo: nuevoVehiculo.tipo,
                    placa: nuevoVehiculo.placa,
                    modelo: Number(nuevoVehiculo.modelo),//Lo convertimos a número por seguridad de mongoose
                    marca: nuevoVehiculo.marca,
                    color: nuevoVehiculo.color,
                    documento:usuario.documento//Se coloca el documento de la cuenta que inicio sesión
                };
                console.log("Insertando vehiculos",datosVehiculo);
                const respuesta = await TipoVehiculoService.agregarVehiculoPorUsuario(datosVehiculo);
                if(respuesta){
                    alert("Vehiculo agregado con exito");
                    setVehiculosUser(prevVehiculos => [...prevVehiculos,respuesta]);

                    setMostrarCuadro(false);
                    setNuevoVehiculo({tipo:'',placa: '',modelo: '',marca:'',color:''})
                }
            }catch(error){
                console.error("Error al guardar vehiculo", error);
                alert(error.message || "No se guardo el vehiculo");
            }
        }
        //Para la sección de editar perfiL
        //Función para procesar la actualización de datos
        const handleUpdate = async (e) =>{
            e.preventDefault();
            try{
                const datosParaEnviar = {
                    ...usuario,
                    correo_electronico: usuario.correo
                };
            console.log("Enviando datos", datosParaEnviar);

            const ok = await clienteService.cambiosGuardados(datosParaEnviar);
            if(ok){
                alert("Datos actualizado con éxito");
                setMostrarCuadro(false);
                setUsuario(prev =>({...prev, contrasena: ''}));
            }
        }catch(error){
            console.error("Error al actualizar", error);
            alert(error.message || "No se guardaron los cambios");
        }};

            //Elementos del menú
        const items = [
            {icon: "pi pi-user" ,label:'Mi perfil', command: ()=> setVistaActiva("perfil")},
            {icon: "pi pi-car" ,label: 'Mis vehículos', command: ()=> setVistaActiva("vehiculos")},
            {icon: "pi pi-book" ,label:'Reservar espacio', command: ()=> setVistaActiva("espacios")},
            {icon:"pi pi-calendar" ,label:'Mis reservas', command: ()=> setVistaActiva("reservas")},
            {icon: "pi pi-arrow-right-arrow-left" ,label:'Movimientos', command: ()=> setVistaActiva("movimientos")},
            {icon: "pi pi-dollar" ,label:'Tarifas', command: ()=> setVistaActiva("tarifas")},
             {icon: "pi pi-wallet" ,label:'Pagos', command: ()=> setVistaActiva("pagos")},
            {icon: "pi pi-sign-out" ,label:'Cerrar sesión', command: handleLogout}
        ]
    return(
        <div className='fondo'>
            <nav>
                <header className='topbar-perfil'>
                    <div className='topbar'>
                        <h1>Parqueadero seguro</h1>
                        <div className="usuario-contenedor">
                            <Avatar icon="pi pi-user" size="large" style={{ backgroundColor: '#94FDFF', color: '#ffffff' }} shape="circle" />
                            <div className="usuario-info">
                               <h4>{usuario.nombre} {usuario.apellido}</h4>
                                <span>{usuario.rol}</span> 
                            </div>
                        </div>
                            
                    </div>
                </header>
            </nav>
            <main className="contenedor-principal">
                <PanelMenu model={items} className="menu-lateral-pu" /> 
                {/**Contenido del menu lateral */}
                {/*perfil */}
                {vistaActiva === "perfil" && (
                <div className="perfil-cliente">
                    <Card className = "profile-Card shadow-4">
                        <h2 className="card-tittle">Mi perfil</h2>
                    <Avatar icon="pi pi-user" size="large" style={{ backgroundColor: '#94FDFF', color: '#ffffff' }} shape="circle" />
                        <div className="avatar-seccion">
                               <h4 className="info-main">{usuario.nombre} {usuario.apellido}</h4>
                                <span className="info-main">{usuario.rol}</span>
                                <div className="info-list">
                                    <div className="info-row">
                                        <i className="pi pi-user"></i>
                                       <span >
                                    Nombre
                                    </span>
                                    <span>
                                    {usuario.nombre}
                                </span> 
                                    </div>
                                   <div className="info-row">
                                        <i className="pi pi-user"></i>
                                        <span >
                                        Apellido
                                        </span>
                                        <span>
                                        {usuario.apellido}
                                        </span> 
                                   </div>
                                    <div className="info-row">
                                        <i className="pi pi-envelope"></i>
                                        <span >
                                            Correo
                                        </span>
                                        <span>
                                            {usuario.correo}
                                        </span>
                                    </div>
                                    <div className="info-row">
                                        <i className="pi pi-phone"></i>
                                            <span >
                                            Teléfono
                                        </span>
                                        <span>
                                            {usuario.telefono}
                                        </span>
                                    </div>
                               <div className="info-row">
                                <i className="pi pi-id-card"></i>
                                    <span >
                                    Documento
                                </span>
                                <span>
                                    {usuario.documento}
                                </span>
                               </div>
                                <div className="info-row">
                                    <i className="pi pi-home"></i>
                                    <span >
                                    Dirección
                                    </span>
                                    <span>
                                        {usuario.direccion}
                                    </span>
                                </div>
                                </div>
                            </div>
                            {/**Boton de editar */}
                            <div className="action-button-container">
                                {!mostrarCuadro && (
                                    <button className="btn-editar" onClick={() => setMostrarCuadro(true)}>
                                    <i className=" pi pi-pencil"></i>Editar información
                                </button>
                                )}
                                
                            </div>
                            {/*Acciones del boton editar */}
                            {mostrarCuadro && (
                                <div className="edit-info">
                                    <Button  rounded  severity="danger" aria-label="Cancel"className="btn-cerrar" onClick={() => setMostrarCuadro(false)}>X</Button>
                                    <h2>Editar perfil</h2>
                                    <form className="form-edit-info" onSubmit={handleUpdate}>
                                        <h4>Nombre</h4>
                                        <input type="text"
                                        value={usuario.nombre}
                                        onChange={(e=> setUsuario({...usuario,
                                            nombre: e.target.value
                                        }))} />
                                        <h4>Apellido</h4>
                                        <input type="text"
                                        value={usuario.apellido}
                                        onChange={(e=> setUsuario({...usuario,
                                            apellido: e.target.value
                                        }))} />
                                        <h4>Correo</h4>
                                        <input type="text"
                                        value={usuario.correo}
                                        onChange={(e=> setUsuario({...usuario,
                                            correo_electronico: e.target.value
                                        }))} />
                                        <h4>Teléfono</h4>
                                        <input type="number"
                                        value={usuario.telefono}
                                        onChange={(e=> setUsuario({...usuario,
                                            telefono: e.target.value
                                        }))} />
                                        <h4>Documento</h4>
                                        <input type="number"
                                        value={usuario.documento}
                                        onChange={(e=> setUsuario({...usuario,
                                            documento: e.target.value
                                        }))} />
                                        <h4>Dirección</h4>
                                        <input type="text"
                                        value={usuario.direccion}
                                        onChange={(e=> setUsuario({...usuario,
                                            direccion: e.target.value
                                        }))} />
                                        <h4>Contraseña</h4>
                                        <input type="password"
                                        placeholder="Ingresa una nueva contraseña"
                                        value={usuario.contrasena || ''}
                                        onChange={(e=> setUsuario({...usuario,
                                            contrasena: e.target.value
                                        }))} />
                                        <button type="submit">Guardar cambios</button>
                                    </form>
                                </div>
                            )}
                    </Card>
                            
                    </div> )}
                    {/**Mis vehiculos */}
                    {vistaActiva === "vehiculos" && (
                <div className="perfil-cliente">
                    <h1>Mis vehiculos</h1>
                    <p>Administrar los vehiculos registrados en tu cuenta</p>
                    {!mostrarCuadro &&(
                        <Button label="Agregar vehiculo" icon="pi pi-plus" iconPos="right" onClick={() => setMostrarCuadro(true)}/>
                    )}
                    
                        {/*Acciones del boton agregar vehiculos */}
                        {mostrarCuadro && (
                                <div className="add-car">
                                    <Button  rounded  severity="danger" aria-label="Cancel"className="btn-cerrar" onClick={() => setMostrarCuadro(false)}>X</Button>
                                    <h2>Agregar Vehiculo</h2>
                                    <form className="form-edit-info" onSubmit={handleAgregarVehiculo}>
                                        <h4>Tipo de vehiculo</h4>
                                        <input type="text"
                                        value={nuevoVehiculo.tipo}
                                        onChange={(e=> setNuevoVehiculo({...nuevoVehiculo,
                                            tipo: e.target.value
                                        }))} />
                                        <h4>Placa</h4>
                                        <input type="text"
                                        value={nuevoVehiculo.placa}
                                        onChange={(e=> setNuevoVehiculo({...nuevoVehiculo,
                                            placa: e.target.value
                                        }))} />
                                        <h4>Modelo</h4>
                                        <input type="text"
                                        value={nuevoVehiculo.modelo}
                                        onChange={(e=> setNuevoVehiculo({...nuevoVehiculo,
                                            modelo: e.target.value
                                        }))} />
                                        <h4>Marca</h4>
                                        <input type="text"
                                        value={nuevoVehiculo.marca}
                                        onChange={(e=> setNuevoVehiculo({...nuevoVehiculo,
                                            marca: e.target.value
                                        }))} />
                                        <h4>Color</h4>
                                        <input type="text"
                                        value={nuevoVehiculo.color}
                                        onChange={(e=> setNuevoVehiculo({...nuevoVehiculo,
                                            color: e.target.value
                                        }))} />
                                        
                                        <button type="submit">Agregar vehiculo</button>
                                    </form>
                                </div>
                            )}
                    <DataTable value={vehiculosuser} tableStyle={{ minWidth: '50rem' }}>
                        <Column field="tipo" header="Tipo de vehiculo"></Column>
                        <Column field="placa" header="Placa"></Column>
                        <Column field="modelo" header="Modelo"></Column>
                        <Column field="marca" header="Marca"></Column>
                        <Column field="color" header="Color"></Column>
                    </DataTable>
                    <ButtonGroup>
                            <Button label="Editar" icon="pi pi-check"  />
                            <Button label="eliminar" icon="pi pi-trash" />
                        </ButtonGroup>
                    </div> )}
                    {/**Reservar espacio*/}
                    {vistaActiva === "espacios" && (
                <div className="perfil-cliente">
                    <h1>Aun no esta listo :3</h1>
                    </div> )}
                    {/**Mis reservas */}
                    {vistaActiva === "reservas" && (
                <div className="perfil-cliente">
                    <h1>Aun no esta listo :3</h1>
                    </div> )}
                    {/**Movimientos */}
                    {vistaActiva === "movimientos" && (
                <div className="perfil-cliente">
                    <h1>Aun no esta listo :3</h1>
                    </div> )}
                    {/**tarifas */}
                    {vistaActiva === "tarifas" && (
                <div className="perfil-cliente">
                    <div className='columna' id='tarifa'>
                    <Panel header = "Tarifas">
                        <div className='tabla-tarifa'>
                        <table className='tarifa'>
                            <thead>
                                <tr>
                                <th>Tipo de vehiculo</th>
                                <th>Hora</th>
                                <th>Mensualidad</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr><td>Bicicleta</td>
                                <td>1.500</td>
                                <td>20.000</td></tr>
                                <tr><td>Moto</td>
                                <td>2.000</td>
                                <td>30.000</td></tr>
                                <tr><td>Carro</td>
                                <td>5.000</td>
                                <td>60.000</td></tr>
                                <tr><td>Camión</td>
                                <td>8.000</td>
                                <td>100.000</td></tr> 
                            </tbody>
                        </table>
                    </div>
                    </Panel>
                    
                </div>
                    </div> )}
                    {/**pagos */}
                    {vistaActiva === "pagos" && (
                <div className="perfil-cliente">
                    <h1>Aun no esta listo :3</h1>
                    </div> )}
            </main>
            <footer>
                 <footer id='contacto'>
                <div className='footer-a'>
                    <ul className='footer-li'>
                        <li >DAF SOLUTIONS S.A.S</li>
                        <li >Calle 80 #28-45 Medellín, Colombia</li>
                        <li >Tel: (+57) 312 678 9054</li>
                    </ul>
                </div>
            </footer>
            </footer>
        </div>
    )
}
export default PerfilUser;