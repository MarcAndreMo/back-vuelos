import { Strategy } from "passport-local";
import error from "../../../utils/error.js";
import bcrypt from "bcrypt";

export default function (store) { 
  const localStrategy = new Strategy(async (username, password, done) => {
    try {
         
        const {rows} = await store.query("SELECT * FROM usuarios WHERE usuario = $1", [username]);
        console.log( rows);
        if (rows.length == 0){
          throw new error(`Usuario o contraseña incorrectos`, 400);
        } 
        const user = rows[0];
        
        const matchPassword = await bcrypt.compare(password, user.contrasenia);
        console.log( matchPassword);
        if (!matchPassword)
          throw new error(`Usuario o contraseña incorrectos`, 400);

        done(null, {
          id: user.id,
          correo: user.correo, 
          nombres: user.nombre,
          username: user.usuario,
        });
      
    } catch (error) {
     
      done(error, false);
    }
  });
  return localStrategy;
}

 