//Editar información
const API_URL = 'http://localhost:3000';
 export const clienteService = {
    
     cambiosGuardados: async (usuario) =>{
         try{
            //const documento = usuario.documento;
             const response = await fetch(`${API_URL}/cliente/${usuario.documento}`,{
                 method: 'PUT',
                 headers: {
                     'Content-Type': 'application/json',
                 },
                 body: JSON.stringify(usuario),
             });
             const data = await response.json();
 
             if (response.ok) {
                 const datosReal = data.nombre ? data: (data.usuario || data.cliente || data.user || data);
                 console.log("Datos extraídos para actualizar", datosReal);
                 localStorage.setItem('nombreUsuario', datosReal.nombre);
                 localStorage.setItem('correoUsuario', datosReal.correo_electronico || datosReal.correo || '');
                 localStorage.setItem('telefonoUsuario',datosReal.telefono || '');
                 localStorage.setItem('documentoUsuario',datosReal.documento || '');
                 localStorage.setItem('direccionUsuario', datosReal.direccion || '');
                 return true;
             } else {
                 throw new Error(data.mensaje ||"Error al actualizar"); 
             }
         }catch(error){
                 console.error('Error en la petición', error);
                 throw error;  
             }
     }
 }