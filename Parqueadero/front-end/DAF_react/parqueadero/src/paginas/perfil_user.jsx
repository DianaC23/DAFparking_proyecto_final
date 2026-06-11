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
//badge
import { Badge } from 'primereact/badge';
        
function PerfilUser(){
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState({
        nombre: 'usuario',
        apellido: '',
        rol: 'invitado'
    });
    useEffect(() =>{
        const cargarDatosUsuario = () =>{
            const nombreGuardado = localStorage.getItem('nombreUsuario');
            const apellidoGuardado = localStorage.getItem('apellidoUsuario');
            const rolGuardado = localStorage.getItem('rolUsuario');

            if(nombreGuardado){
                setUsuario({
                    nombre: nombreGuardado,
                    apellido: apellidoGuardado || '',
                    rol: rolGuardado || 'Cliente'
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
        navigate('/login');
        }
            //Elementos del menú
        const items = [
            {icon: "pi pi-user" ,label:'Mi perfil'},
            {icon: "pi pi-car" ,label: 'Mis vehículos'},
            {icon: "pi pi-book" ,label:'Reservar espacio'},
            {icon:"pi pi-calendar" ,label:'Mis eservas'},
            {icon: "pi pi-arrow-right-arrow-left" ,label:'Movimientos'},
            {icon: "pi pi-dollar" ,label:'Tarifas'},
             {icon: "pi pi-wallet" ,label:'Pagos'},
            {icon: "pi pi-sign-out" ,label:'Cerrar sesión', command: handleLogout}
        ]
    return(
        <div className='fondo'>
            
            <nav>
                <header className='topbar'>
                    <div className='topbar-right'>
                        <div className='notificaciones'>
                            <i className='pi pi-bell'></i>
                            <Badge value={3} ></Badge>
                            <Avatar icon="pi pi-user" size="large" style={{ backgroundColor: '#94FDFF', color: '#ffffff' }} shape="circle" />
                            <div className="usuario-info">
                               <h4>{usuario.nombre} {usuario.apellido}</h4>
                                <span>{usuario.rol}</span> 
                            </div>
                        </div>
                    </div>

                </header>
            </nav>
            <main>
                <PanelMenu model={items} className="w-full md:w-20rem" />   
            </main>
            <footer>
                <h2>footer</h2>
            </footer>
        </div>
    )
}
export default PerfilUser;