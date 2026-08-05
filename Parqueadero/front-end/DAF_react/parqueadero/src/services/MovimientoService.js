//Para movimientos y mis reservas
const API_URL = 'http://localhost:3000';
 export const movimientosService = {
    
     consultarMovimientos: async (usuario) =>{
         try{
            //const documento = usuario.documento;
             const response = await fetch(`${API_URL}/movimiento/${usuario.documento}`,{
                 method: 'GET',
                 headers: {
                     'Content-Type': 'application/json',
                 }
             });
             const data = await response.json();
 
             if (response.ok) {
                 console.log("Datos de movimientos recibidos: ",data);
                 return data;
             } else {
                 throw new Error(data.mensaje ||"Error al consultar movimientos y reservas"); 
             }
         }catch(error){
                 console.error('Error en la petición', error);
                 throw error;  
             }
     }
 }