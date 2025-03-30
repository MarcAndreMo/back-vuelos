
import pg from "pg"
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } from "../config.js"

// export const pool = new pg.Pool({
//   host: DB_HOST,
//   user: DB_USER,
//   password: DB_PASSWORD, 
//   database: DB_DATABASE, 
//   port: DB_PORT,
// })

// const { Client } = pg;

// const obtenerCat = async () => {

//   //a que base
//   const client = new Client({
//     host: 'localhost',
//     user: 'postgres', // Cambia esto si usas otro usuario
//     password: 'admin', // Asegúrate de que sea una cadena de texto
//     database: 'postgres', // Cambia esto si usas otra base de datos
//     port: 5432,
//   });

//   await client.connect();
  
//   const res = await client.query('select * from usuarios');

//   const result = res.rows;

  

//   await client.end();

//   return result;
// }

// obtenerCat().then( (result) =>{ console.log(result)} );