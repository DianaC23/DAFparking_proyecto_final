//Estilos propios
import './inicio.css';
//estilos
import 'primereact/resources/themes/lara-dark-green/theme.css';
import 'primereact/resources/primereact.min.css';

//iconos
import 'primeicons/primeicons.css';
//menu
import { Menubar } from 'primereact/menubar';
//logo
import logo from '../assets/DAF_LOGO.png';

        
//Elementos del menú
        const items =[
            {label: 'Precios'},
            {label: 'Ubicaciones' },
            {label: 'sobre nosotros' },
            {label: 'contacto'},
            {label: 'Inicio de sesión',
                className:  'menu-login'
             },
            {label: 'Registrarse'}
        ];

function Inicio(){
    const start = (
                    <img src={logo}
                     alt="DAF_PARKING"
                     height="50" />
                );
    
    return(
        <div className='fondo'>
            <header>
            <Menubar
            model={items}
            start={start}
            className="menu-principal"/> 
            </header>
            
        </div>  
    )
}
export default Inicio;