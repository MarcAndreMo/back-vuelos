import dotenv from "dotenv";
dotenv.config();
//import { Sequelize } from "sequelize";
import error from "../utils/error.js";

import pg from "pg"
function getConnectionString(dbname, dialect) {
  const user = process.env.DB_USER;
  const password = encodeURIComponent(process.env.PASS);
  const host = process.env.HOST;
  const port = process.env.PORTDB;
  const db = dbname || process.env.DB; // usa el que venga o el del .env
  console.log({
    user, password, host, port, db, dialect
  })
  return `${dialect}://${user}:${password}@${host}:${port}/${db}`;
}

let pool = null;

export default (name, dialect = "postgres") => {

  if (pool) {
    return pool;
  }



  (async () => {
    try {
      const user = process.env.DB_USER;
      const password = encodeURIComponent(process.env.PASS);
      const host = process.env.HOST;
      const port = process.env.PORTDB;
      const db =  process.env.DB;
      pool = new pg.Pool({
        host: host,
        user: user,
        password: password, 
        database: db, 
        port: port,
      })
      console.log(
        `STORE: DB , connectado a la base de datos  correctamente`
      );
    } catch (err) {
      throw error(`
    STORE:  DB  ,
    A ocurrido un error al intentar conectarse a la base de datos  
        ${err.message}`);
    }
  })();

  return pool;
};
