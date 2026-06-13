//Paleta de colores: #19545B, #00282A Y #94FDFF
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
//Muestra que pagina se mostrara primero
import Inicio from './paginas/inicio';
import Login from './paginas/login';
import PerfilUser from './paginas/perfil_user';
import Registrarse from './paginas/registrarse';
function App(){
  return(
    <BrowserRouter>   
      <Routes>
        <Route path='/' element={<Inicio/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/perfil_user' element={<PerfilUser/>}/>
        <Route path='/registrarse' element={<Registrarse/>}/>
          </Routes> 
    </BrowserRouter>
   
  )
  
}
export default App;     