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
            <header> <nav>
                <Menubar
                model={items}
                start={start}
            className="menu-principal"/> 
            </nav>
            </header>
            <main>
                <section className='hero'>
                    <span className='badge'>
                        <p><b>° Estacionamiento inteligente</b></p>
                    </span>
                    <h1>Tu parqueadero,<br /> Más fácil y seguro</h1>
                    <p>
                        ¡Bienvenido!
                    Tu tranquilidad empieza aquí.<br/>
                    Seguridad, confianza y el cuidado que tú vehículo merece.
                    </p>
                    <button>Reservar ahora</button>
                </section>
                <section className='beneficios'>
                    <div className='card'>
                        <span className="pi pi-car"></span>
                        <h3>Reserva tu espacio</h3>
                        <p>Encuentra y reserva tu parqueadero ideal.</p>
                    </div>
                    <div className='card'>
                        <span className="pi pi-calendar"></span>
                        <h3>Entra sin complicaciones</h3>
                        <p>Reserve en línea</p>
                    </div>
                    <div className='card'>
                        <span className="pi pi-shield"></span>
                        <h3>Seguridad garantizada</h3>
                        <p>Monitoreo 24/7.</p>
                    </div>
                    <div className='card'>
                        <span className="pi pi-wallet"></span>
                        <h3>Paga fácilmente</h3>
                        <p>Multiples metodos de pago.</p>
                    </div>
                </section>
                <section className='tarifas-container'>
                    <h4>Tarifas</h4>
                    <div className='tabla-tarifa'>
                        <table>
                            <tr>
                                <th>Tipo de vehiculo</th>
                                <th>Hora</th>
                                <th>Mensualidad</th>
                            </tr>
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
                        </table>
                    </div>
                </section>
            </main>
            <footer>
                <div className='footer-a'>
                    <ul>
                        <li>DAF SOLUTIONS S.A.S</li>
                        <li>Calle 80 #28-45 Medellín, Colombia</li>
                        <li>Tel: (+57) 312 678 9054</li>
                    </ul>
                </div>
            </footer>
        </div>  
    )
}
export default Inicio;