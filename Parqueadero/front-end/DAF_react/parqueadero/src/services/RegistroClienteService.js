import { default as axios } from 'axios';
//Registrar usuario
const API_URL = 'http://localhost:3000';
export const RegistroClienteService ={
    //Registrar un nuevo usuario
    registrar: async(datosCliente) =>{
        try {
            const response = await axios.post(`${API_URL}/cliente`, datosCliente);
            return response.data;
        } catch (error) {
            if(error.response && error.response.data && error.response.data.message){
                throw new Error("error.response.data.message");
            }
            throw new Error("No se pudo conectar al sevidor, intentalo más tarde"); 
        }
    }
}