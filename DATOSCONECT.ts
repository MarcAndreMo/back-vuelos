import pg from 'pg'

const { Client } = pg;

const obtenerCat = async () => {

  //a que base


  const client = new Client({
    host: 'localhost',
    user: 'postgres', // Cambia esto si usas otro usuario
    password: 'admin', // Asegúrate de que sea una cadena de texto
    database: 'postgres', // Cambia esto si usas otra base de datos
    port: 5432,
  });

  await client.connect();
  
  const res = await client.query('select * from usuarios');

  const result = res.rows;

  

  await client.end();

  return result;
}

obtenerCat().then( (result) =>{ console.log(result)} );