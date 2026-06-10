import React,{useState} from 'react';
//estilos
import 'primereact/resources/themes/lara-dark-green/theme.css';
import 'primereact/resources/primereact.min.css';
//Estilos propios
import './login.css'
//iconos
import 'primeicons/primeicons.css';
//Link en el logo
import {Link} from 'react-router-dom'
//logo
import logo from '../assets/DAF_LOGO.png';
//menu
import { Menubar } from 'primereact/menubar';
//Ingresar datso
import { InputText } from 'primereact/inputtext';
//botón
import { Button } from 'primereact/button';
//Selección
import { TreeSelect } from 'primereact/treeselect';
//Contraseña             
import { Password } from 'primereact/password';
        
//Elementos del menú
        const items =[
            {label: 'Precios', url:'/inicio/#tarifa'},
            {label: 'Ubicaciones' },
            {label: 'sobre nosotros', url :'/inicio/#sobre-nosotros'},
            {label: 'contacto', url:'#contacto'},
            {label: 'Inicio de sesión', url:'/login',
                className:  'menu-login'
             },
            {label: 'Registrarse'}
        ];
function Login(){
    const [selectedNodeKey, setSelectedNodeKey]= useState(null);
    const [nodes] = useState([{
         key: '0',
        label: 'Administrador',
        data: 'admin',
        icon: 'pi pi-fw pi-cog'
    },
    {
        key:'1',
        label: 'Empleado',
        data:'personal',
        icon: 'pi pi-fw pi-id-card'
    },
    {
        key:'2',
        label:'Usuario',
        data:'cliente',
        icon: 'pi pi-fw pi-user'
    }
    ])
    /*Para la contraseña */
    const [value, setValue] = useState('');
    const start = (<Link to={'/'}>
                        <img src={logo}
                         alt="DAF_PARKING"
                         height="80"
                         style={{cursor:'pointer'}}
                        />
                    </Link> 
                    );
    return(
        <div className='fondo'>
            <header> <nav>
                        <Menubar
                        model={items}
                        start={start}
                    className="menu-principal"/> 
                    </nav>
                    </header>
                    <main>
                        <div className="card">
                            <div className="flex flex-column md:flex-row">
                                <div className="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-5">
                                    <i className="pi pi-car" style={{ fontSize: '5rem' }}></i>
                                    <h1>DAF PARKING</h1>
                                    <p>____sistema de parqueadero____</p>
                                    <h3>Iniciar sesión</h3>
                                    <p>Ingresa tus credenciales para continuar</p>
                                    <div className="login-user">
                                        <label className="w-6rem">Tipo de usuario</label><br/>
                                            <TreeSelect value={selectedNodeKey} onChange={(e) => setSelectedNodeKey(e.value)} options={nodes} 
                                            className="md:w-20rem w-full" placeholder="Select Item">
                                            </TreeSelect>
                                    </div>
                                    <div className="login-user">
                                        <label className="w-6rem">Correo electronico</label>
                                        <InputText id="username" type="text" className="w-12rem" />
                                    </div>
                                    <div className="login-user">
                                        <label className="w-6rem">Password</label>
                                        <Password value={value} onChange={(e) => setValue(e.target.value)} toggleMask />
                                    </div>
                                    <Button label="Login" icon="pi pi-user" className="w-10rem mx-auto"></Button>
                                </div>
                            </div>
                        </div>
                    </main>
      <footer id='contacto'>
                <div className='footer-a'>
                    <ul className='footer-li'>
                        <li >DAF SOLUTIONS S.A.S</li>
                        <li >Calle 80 #28-45 Medellín, Colombia</li>
                        <li >Tel: (+57) 312 678 9054</li>
                    </ul>
                </div>
            </footer>   
        </div>
                    
    );
}
export default Login;