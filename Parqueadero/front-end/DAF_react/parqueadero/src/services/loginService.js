const API_URL = 'http://localhost:3000';

export const loginService = {
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
                localStorage.setItem('nombreUsuario', data.nombre);
                localStorage.setItem('apellidousuario',data.apellido);
                localStorage.setItem('rolUsuario', data.rol);
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