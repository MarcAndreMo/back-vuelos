//Dependencias
//Modulos
//import error from "../../../utils/error.js";
//Constantes
import  err  from "../../../utils/error.js";
//import Joi from "joi";
//middlewares
export default function (store) {

  async function getVuelos(body) {

    let {rows} = await store.query(
      `SELECT * FROM vuelos`
    );
    if (rows == null || rows.length == 0) {
      vuelos = [];
    }

    
    return {
      vuelos: rows,
    };
  }

  async function getVuelosESPEC(params) {
    const { pais_origen, pais_destino, fecha_salida } = params;
  
    // Validación de los campos requeridos
    if (!pais_origen || !pais_destino) {
      throw new Error("Los campos 'pais_origen' y 'pais_destino' son obligatorios.");
    }
  
    // Opcional: Validar que fecha_salida, si se proporciona, sea una fecha válida
    if (fecha_salida && isNaN(Date.parse(fecha_salida))) {
      throw new Error("La fecha de salida proporcionada no es válida.");
    }
  
    let query = `SELECT * FROM vuelos WHERE 1=1`;
  
    const queryParams = [];
  
    // Si existen los parámetros, agregamos las condiciones a la consulta y a los parámetros
    if (pais_origen) {
      query += ` AND pais_origen = $${queryParams.length + 1}`;
      queryParams.push(pais_origen);
    }
    if (pais_destino) {
      query += ` AND pais_destino = $${queryParams.length + 1}`;
      queryParams.push(pais_destino);
    }
    if (fecha_salida) {
      query += ` AND fecha_salida = $${queryParams.length + 1}`;
      queryParams.push(fecha_salida);
    }
  
    // Ejecutar la consulta en la base de datos
    const { rows } = await store.query(query, queryParams);
  
    // Si no se encuentran resultados
    if (rows == null || rows.length === 0) {
      return { vuelos: [] };
    }
  
    return {
      vuelos: rows
    };
  }
  

  
  return {
    getVuelos,
    getVuelosESPEC
  };
  
}
