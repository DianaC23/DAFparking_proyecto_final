import React,{useState} from 'react';
//estilos
import 'primereact/resources/themes/lara-dark-green/theme.css';
import 'primereact/resources/primereact.min.css';
//Estilos propios
import './login.css'
//iconos
import 'primeicons/primeicons.css';
//long service
import { loginService } from '../services/loginService';
//Link en el logo
import {Link, useNavigate} from 'react-router-dom'
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
    const navigate = useNavigate();
    //captura las credenciales
    const [selectedNodeKey, setSelectedNodeKey]= useState(null);
    const [email, setEmail]= useState('');
    const [contrasena, setContrasena]= useState('');
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
        label:'Cliente',
        data:'cliente',
        icon: 'pi pi-fw pi-user'
    }
    ])
    //Funcion para procesar el Login y hara la redirección
    const handleLogin = async (e) =>{
        e.preventDefault();//Evita recargar la pagina

        try{
            console.log("Intentando ingresar con: ", email);

            const exito = await loginService.iniciarSesion(email,contrasena);

            if (exito) {
                console.log("Login exitoso");
                navigate('/perfil_user');
            }
        }catch(error){
            console.error("Error en autenticación;",error.message);
            alert("Error al iniciar sesión" + error.message);
        }
        //Conexión con base  de datos
        console.log('Datos enviados: ', {selectedNodeKey,email,contrasena});
        navigate('/perfil_user');
    }
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
                        <div className="card-login">
                            <div className="flex flex-column md:flex-row">
                                <form onSubmit={handleLogin} className='w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-5'>
                                    <i className="pi pi-car" style={{ fontSize: '5rem' }}></i>
                                    <h1>DAF PARKING</h1>
                                    <p>____sistema de parqueadero____</p>
                                    <h3>Iniciar sesión</h3>
                                    <p>Ingresa tus credenciales para continuar</p>
                                    <div className="login-user">
                                        <label className="w-6rem">Tipo de rol</label><br/>
                                            <TreeSelect value={selectedNodeKey} onChange={(e) => setSelectedNodeKey(e.value)} options={nodes} className="md:w-20rem w-full" placeholder="Selecciona tipo" required>
                                            </TreeSelect>
                                    </div>
                                    <div className="login-user">
                                        <label className="w-6rem">Correo electronico</label>
                                        <InputText id="username" type="email" className="w-12rem" onChange={(e) => setEmail(e.target.value)}required/>
                                    </div>
                                    <div className="login-user">
                                        <label className="w-6rem">Password</label>
                                        <Password value={contrasena} onChange={(e) => setContrasena(e.target.value)} toggleMask feedback={false} required />
                                    </div>
                                    <Button type="submit" label='Login' icon="pi pi-user" className="w-10rem mx-auto"></Button>
                                </form>
                                
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