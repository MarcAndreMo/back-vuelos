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
 

  return {
    verify,
    login,
    
  };
}
