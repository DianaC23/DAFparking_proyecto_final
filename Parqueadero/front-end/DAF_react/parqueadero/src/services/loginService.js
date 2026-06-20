//Login
const API_URL = 'http://localhost:3000';

export const loginService = {
    //Inicio de sesión 
    iniciarSesion: async (email, contrasena) =>{
        try{
            const response = await fetch(`${API_URL}/login/cliente`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({correo_electronico: email, contrasena: contrasena}),
            });
            const data = await response.json();

            if (response.ok) {
                const datosReal = data.usuario || data.cliente || data.user || data;
                console.log("Datos extraídos para guardar", datosReal);
                localStorage.setItem('nombreUsuario', datosReal.nombre);
                localStorage.setItem('apellidoUsuario',datosReal.apellido);
                localStorage.setItem('rolUsuario', datosReal.rol);
                localStorage.setItem('correoUsuario', datosReal.correo_electronico || email || '');
                localStorage.setItem('telefonoUsuario',datosReal.telefono || '');
                localStorage.setItem('documentoUsuario',datosReal.documento || '');
                localStorage.setItem('direccionUsuario', datosReal.direccion || '');
                return true;
            } else {
                throw new Error(data.mensaje ||"Credenciales incorrectas"); 
            }
        }catch(error){
                console.error('Error en longService', error.message);
                throw error;  
            }
    }
}