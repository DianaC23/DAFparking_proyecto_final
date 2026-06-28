//Llama los datos de los vehiculos de un usuario
const API_URL = 'http://localhost:3000';
export const TipoVehiculoService = {
    obtenerVehiculosPorUsuario: async(documentoCliente) =>{
        try{
            //Llama a la URL usando la cedula del cliente actual
            const respuesta = await fetch(`${API_URL}/vehiculo/usuario/${documentoCliente}`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!respuesta.ok){
                throw new Error('Error al obtener datos de los vehículos');
            }
            
            return await respuesta.json();
        }catch (error){
            console.error("Error en TipoVehiculoService", error);
            throw error;
        }
    },
    agregarVehiculoPorUsuario: async (datosVehiculo) =>{
        try{
            const respuesta = await fetch(`${API_URL}/vehiculo`,{
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(datosVehiculo),
        });
            if (!respuesta.ok){
                const errorJSON = await respuesta.json();
                console.error("Error del backend", errorJSON);
                throw new Error(errorJSON.error || errorJSON.mensaje || 'Error al agregar vehiculo');
            }
            return await respuesta.json();
        }catch(error){
            console.error("Error en TipoVehiculoService", error);
            throw error;
        }
    }
}