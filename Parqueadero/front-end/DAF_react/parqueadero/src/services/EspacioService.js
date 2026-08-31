
const API_URL = 'http://localhost:3000';
export const EspacioVehiculoService = {
    //Consultar espacio
    consultarEspacioVehiculo: async(tipo) =>{
        try{
            const respuesta = await fetch(`${API_URL}/espacio?tipoDeEspacio=${tipo}`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!respuesta.ok){
                throw new Error('Error al obtener datos de los espacios');
            }
            return await respuesta.json();
        }
        
        catch (error){
            console.error("Error en TipoVehiculoService", error);
            throw error;
        }},
    //espacio
    consultarEspacioParqueadero: async(tipo) =>{
        try{
            const respuesta = await fetch(`${API_URL}/espacio?tipoDeEspacio=${tipo}`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!respuesta.ok){
                throw new Error('Error al obtener datos de los espacios');
            }
            return await respuesta.json();
        }
        
        catch (error){
            console.error("Error en TipoVehiculoService", error);
            throw error;
        }},
    //Guardar espacio
    guardarEspacio:async(datos)=>{
        try {
            const respuesta = await fetch(`${API_URL}/espacio`,{
                method: 'POST',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify(datos)
            });
            if (!respuesta.ok) {
                throw new Error('Error al guardar espacio');
            }return await respuesta.json();
        } catch (error) {
            console.error("Error al guardar en espacioVehiculoService",error);
            throw error;
        }
    },
    //Liberar espacio
    /*liberarEspacio:async(idEspacio)=>{
        try {
            const respuesta = await fetch(`${API_URL}/espacio/${placa}`,{
                method: 'DELETE',
                headers: {'Content-type':'application/json'}
            });
            if(!respuesta.ok){
                const errorData =await respuesta.json();
                throw new Error(errorData.mensaje || 'Error al eliminar el espacio')
            }
            return await respuesta.json();
        } catch (error) {
            console.error("Error en espacioVehiculoService", error);
            throw error;
            
        }
    }*/
}