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

//card
import { Card } from 'primereact/card';
        
function PerfilUser(){
    const navigate = useNavigate();
    //mi perfil
    const[vistaActiva, setVistaActiva] = useState("perfil");
    const [usuario, setUsuario] = useState({
        nombre: 'usuario',
        apellido: '',
        rol: 'invitado',
        correo: '',
        telefono: '',
        documento: '',
        direccion: ''
    });
    useEffect(() =>{
        const cargarDatosUsuario = () =>{
            const nombreGuardado = localStorage.getItem('nombreUsuario');
            const apellidoGuardado = localStorage.getItem('apellidoUsuario');
            const rolGuardado = localStorage.getItem('rolUsuario');
            const correoGuardado = localStorage.getItem('correoUsuario');
            const telefonoGuardado = localStorage.getItem('telefonoUsuario');
            const documentoGuardado = localStorage.getItem('documentoUsuario');
            const direccionGuardado = localStorage.getItem('direccionUsuario');
            if(nombreGuardado){
                setUsuario({
                    nombre: nombreGuardado,
                    apellido: apellidoGuardado || '',
                    rol: rolGuardado || 'Cliente',
                    correo: correoGuardado || 'No registrado',
                    telefono: telefonoGuardado || 'No registrado',
                    documento: documentoGuardado ||'No esta registrado',
                    direccion: direccionGuardado
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

        const handleLogout = () =>{
        localStorage.clear();
        navigate('/');
        }
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
                <PanelMenu model={items} className="menu-lateral" /> 
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
                                <i className="pi pi-file"></i>
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
                            {/**Boton de editar aun no esta listo */}
                            <div className="action-button-container">
                                <button className="btn-editar">
                                    <i className=" pi pi-pencil"></i>Editar información
                                </button>
                            </div>
                    </Card>
                            
                    </div> )}
                    {/**Mis vehiculos */}
                    {vistaActiva === "vehiculos" && (
                <div className="perfil-cliente">
                    <h1>vehiculos</h1>
                    </div> )}
                    {/**Reservar espacio*/}
                    {vistaActiva === "espacios" && (
                <div className="perfil-cliente">
                    <h1>espacial</h1>
                    </div> )}
                    {/**Mis reservas */}
                    {vistaActiva === "reservas" && (
                <div className="perfil-cliente">
                    <h1>secreto</h1>
                    </div> )}
                    {/**Movimientos */}
                    {vistaActiva === "movimientos" && (
                <div className="perfil-cliente">
                    <h1>baile</h1>
                    </div> )}
                    {/**tarifas */}
                    {vistaActiva === "tarifas" && (
                <div className="perfil-cliente">
                    <h1>precios</h1>
                    </div> )}
                    {/**pagos */}
                    {vistaActiva === "pagos" && (
                <div className="perfil-cliente">
                    <h1>dollar</h1>
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