//Dependencias
//Modulos
//import error from "../../../utils/error.js";
//Constantes
import  err  from "../../../utils/error.js";
//import Joi from "joi";
//middlewares
export default function (store) {

  async function reservaUsuario(id) {
    // Consulta para obtener las reservas junto con la información del usuario
    const { rows } = await store.query(
      `SELECT reservas.id_reserva, reservas.id_vuelo, reservas.fecha_reserva, reservas.estado_reserva, 
              usuarios.nombres, usuarios.apellidos, usuarios.identificacion, usuarios.correo
       FROM reservas
       JOIN usuarios ON reservas.id_usuario = usuarios.id_usuario
       WHERE reservas.id_usuario = $1`,
      [id]
    );
  
    if (rows == null || rows.length == 0) {
      throw new Error('Reserva no encontrada.');
    }
  
    // Retornar la reserva junto con los datos del usuario
    return {
      reserva: rows.map(row => ({
        id_reserva: row.id_reserva,
        id_vuelo: row.id_vuelo,
        fecha_reserva: row.fecha_reserva,
        estado_reserva: row.estado_reserva,
        usuario: {
          nombres: row.nombres,
          apellidos: row.apellidos,
          identificacion: row.identificacion,
          email: row.correo
        }
      }))
    };
  }
  

  return {
    reservaUsuario,

  };
  
}
