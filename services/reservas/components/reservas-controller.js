//Dependencias
//Modulos
//import error from "../../../utils/error.js";
//Constantes
import  err  from "../../../utils/error.js";
//import Joi from "joi";
//middlewares
export default function (store) {

  async function getReservas(body) {

    let {rows} = await store.query(
      `SELECT * FROM reservas`
    );
    if (rows == null || rows.length == 0) {
      reserva = [];
    }

    
    return {
      reserva: rows,
    };
  }

  async function createReserva(body) {
    const { id_vuelo, id_usuario } = body;

    // Consultar el vuelo y el usuario
    const { rows: vueloRows } = await store.query(
      `SELECT fecha_salida, pais_origen, pais_destino, asientos_disponibles FROM vuelos WHERE id_vuelo = $1`,
      [id_vuelo]
    );

    const { rows: usuarioRows } = await store.query(
      `SELECT nombres, apellidos FROM usuarios WHERE id_usuario = $1`,
      [id_usuario]
    );

    if (vueloRows.length === 0 || usuarioRows.length === 0) {
      throw new Error('El vuelo o el usuario no existen.');
    }

    // Obtener la fecha de salida del vuelo (TIMESTAMP) y los asientos disponibles
    const fechaSalida = vueloRows[0].fecha_salida;
    const asientosDisponibles = vueloRows[0].asientos_disponibles;

    // Verificar que haya asientos disponibles
    if (asientosDisponibles <= 0) {
      throw new Error('No hay asientos disponibles para este vuelo.');
    }

    // Obtener la fecha actual
    const fechaActual = new Date(); // Fecha y hora actuales

    // Comparar la fecha de salida con la fecha actual
    if (fechaActual > fechaSalida) {
      throw new Error('El vuelo ya ha salido. Elija otro horario.');
    }

    // Si la hora es válida, proceder con la inserción de la reserva
    const query = `
      INSERT INTO reservas (id_vuelo, id_usuario, fecha_reserva, estado_reserva, fecha_actualiza, 
        fecha_creacion, usuario_actualiza, usuario_modifica, estado_cobro)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *;
    `;
    
    const values = [
      id_vuelo,
      id_usuario,
      fechaActual,  // fecha_reserva
      'A', // estado_reserva
      fechaActual,  // fecha_actualizacion
      fechaActual,  // fecha_creacion
      'admin',      // usuario_actualizacion (puedes personalizarlo si es necesario)
      'admin',      // usuario_modifica
      'A'   // estado_cobro
    ];

    const { rows: reservaRows } = await store.query(query, values);

    // Reducir los asientos disponibles del vuelo
    const newAsientosDisponibles = asientosDisponibles - 1;

    // Actualizar los asientos disponibles en la tabla vuelos
    await store.query(
      `UPDATE vuelos SET asientos_disponibles = $1 WHERE id_vuelo = $2`,
      [newAsientosDisponibles, id_vuelo]
    );

    // Obtener la información del usuario y del vuelo para incluirla en la respuesta
    const reservaCreada = reservaRows[0];
    const usuario = usuarioRows[0];
    const vuelo = vueloRows[0];

    // Retorna la reserva creada junto con los detalles del usuario y del vuelo
    return {
      reserva: reservaCreada,
      usuario: {
        nombre: usuario.nombres,
        apellido: usuario.apellidos,
      },
      vuelo: {
        pais_origen: vuelo.pais_origen,
        pais_destino: vuelo.pais_destino,
        fecha_salida: vuelo.fecha_salida,
        asiento: newAsientosDisponibles, // Mostrar los nuevos asientos disponibles
      }
    };
}

  



async function deleteReservas(id) {
  // Consultar la reserva que se va a eliminar, junto con los datos del usuario y el vuelo
  const { rows: reservaRows } = await store.query(
    `SELECT reservas.id_reserva, usuarios.nombres, usuarios.apellidos, 
            vuelos.pais_origen, vuelos.pais_destino, vuelos.fecha_salida 
     FROM reservas
     JOIN usuarios ON reservas.id_usuario = usuarios.id_usuario
     JOIN vuelos ON reservas.id_vuelo = vuelos.id_vuelo
     WHERE reservas.id_reserva = $1`,
    [id]
  );

  if (reservaRows.length === 0) {
    throw new Error('Reserva no encontrada.');
  }

  const reserva = reservaRows[0];

  // Obtener el id_vuelo de la reserva eliminada
  const id_vuelo = reserva.id_vuelo;

  // Eliminar la reserva
  const { rows } = await store.query(
    `DELETE FROM reservas WHERE id_reserva = $1 RETURNING *`,
    [id]
  );

  // Aumentar los asientos disponibles en el vuelo correspondiente
  await store.query(
    `UPDATE vuelos SET asientos_disponibles = asientos_disponibles + 1 WHERE id_vuelo = $1`,
    [id_vuelo]
  );

  // Retornar los datos de la reserva eliminada, junto con los detalles
  return {
    reservaEliminada: {
      id_reserva: reserva.id_reserva,
      usuario: {
        nombre: reserva.nombres,
        apellido: reserva.apellidos,
        pais: reserva.pais,
      },
      vuelo: {
        pais_origen: reserva.pais_origen,
        pais_destino: reserva.pais_destino,
        fecha_salida: reserva.fecha_salida,
      }
    }
  };
}

  
  return {
    getReservas,
    createReserva,
    deleteReservas
  };
  
}
