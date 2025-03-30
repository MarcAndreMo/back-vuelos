//Dependencias
//Modulos
//import error from "../../../utils/error.js";
//Constantes
import  err  from "../../../utils/error.js";
//import Joi from "joi";
//middlewares
export default function (store) {

  async function getVuelos(body) {
    console.log( 'heeyyyy');
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

  
  return {
    getVuelos
  };
  
}
