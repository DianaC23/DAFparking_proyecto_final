const API_URL = 'http://localhost:3000';
 export const EmpleadoService = {
     datosEmpleado: async (email, contrasena) =>{//Recibe los datos directamente del empleado
         try{
            //LLAMAR DATOS DEL EMPLEADO
             const respuesta = await fetch(`${API_URL}/login/empleado`,{
                 method: 'POST',
                 headers: {
                     'Content-Type': 'application/json',
                 },
                 body: JSON.stringify({correo_electronico:email,contrasena:contrasena})
             });
             const data = await respuesta.json();
             if (respuesta.status === 200){
                console.log("Respuesta exitosa",data);
                return data.empleado;
            }else{
                throw new Error(data.mensaje ||"Error en la autenticación");
                
            }
         }catch(error){
                 console.error('Error en la petición', error.message);
                 throw error;  
             }
     }
 }