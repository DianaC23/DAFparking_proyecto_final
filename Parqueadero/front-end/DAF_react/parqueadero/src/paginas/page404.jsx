//Estilos propios
import './page404.css';
//estilos
import 'primereact/resources/themes/lara-dark-green/theme.css';
import 'primereact/resources/primereact.min.css';
//Iconos
import 'primeicons/primeicons.css';
//Imagen
import imagen from '../assets/icono_auto_bloqueado.jpg';
//botón
import { Button } from 'primereact/button';

function Pagina404() {
    return(
        <div className='pagefail'>
            <div className='pagefail-content'><h1>Error 404</h1>
                <h2>Página no encontrada</h2>
                <img src={imagen} alt="Auto bloqueado" className='img-pagefail'/>
                <p className='pagefail-p'>La página que buscas no está disponible o fue movida a otra ubicación</p>
                <a href="/">
                    <Button type="button" url= "./Paginas/inic" className='pagefail-btn'>Volver al inicio</Button>
                </a>
            </div>
            
        </div>
    )    
}
export default Pagina404;