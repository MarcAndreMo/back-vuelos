import e from "express";
import  jwt  from "jsonwebtoken";
import  err  from "./../../../utils/error.js";
import dotenv from "dotenv";
import { v1 as uuidv1 } from "uuid";
import bcryptjs from "bcrypt";
dotenv.config();


const config = process.env;

export default function (store) {


  async function verify(req, res, next) {

      const token1 = req.headers["authorization"];
      
      const token = token1.replace("Bearer ", "");



    if (!token) {
      throw new err("A token is required for authentication", 403);
    }

    try {
      const decoded = jwt.verify(token, config.KEY_TOKEN);
      req.user = decoded;
    } catch (error) {
      throw new err("Invalid Token", 401 );
    }

    return {"message":"Token valido"};
  }

  async function login(user) {
    const tokenExpirationTime = "1h";
    const jti = uuidv1();
    const options = { algorithm: "HS256" };
    const payload = {
      id:      user.id,
      correo:    user.correo,
      nombres:  user.nombres,
      username: user.username,  
      jti: jti,
    };
    //TODO: agregar insert de inicio de sesion (auditoria)
    const token = jwt.sign(
      { ...payload, expires_in: Math.floor(Date.now() / 1000) + 60 * 60 },
      process.env.KEY_TOKEN,
      { ...options, expiresIn: tokenExpirationTime || "10h" }
    );
    return { 
      token: token,
      token_type: "bearer",
      name: user.nombres,
    };
  }

  async function mostrarUsuarios(req, res, next) {
    let list_usuarios = await store.rawQuery(
      `SELECT * FROM tbusuarios`
    );
    if (list_usuarios == null || list_usuarios.length == 0) {
      list_usuarios = [];
    }

    return {
      list_usuarios: list_usuarios,
    };
  }


  async function registroUsuario(nombre, id) {
    
    //encriptar contraseña
   /*  let clave = "admin";
    const salt = await bcryptjs.genSalt();
    clave = await bcryptjs.hash(clave, salt);
    console.log( clave);
    try {
      await store.query(
        'insert into usuarios (id,nombre) values ($1, $2) RETURNING*',
         [id,nombre]);

      return true; // La inserción fue exitosa
    } catch (error) {
      console.error('Error al insertar el usuario:', error);
      throw new err("Invalid params", 401 );
    } */
  }

 

  return {
    mostrarUsuarios,
    verify,
    login,
    registroUsuario,
  };
}
