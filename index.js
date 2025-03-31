//Dependencias
import pg from 'pg'

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

//Modulos
import config from "./config.js";
import errors from "./network/errors.js";
import servicesRoutes from "./gateway/services-routes.js";
import {  setupProxies,setupAuth} from "./gateway/middlewares.js";
import response from "./network/response.js";

//Conexion a base
const app = express();
const serviceRouter = express.Router();

//permisos de las peticiones
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method'); 
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });

  //manejo de los microservicios
  //services
app.use(express.json({ limit: '100mb'}));
setupAuth(serviceRouter, servicesRoutes);
setupProxies(serviceRouter, servicesRoutes);

//direccion de las rutas 
//routers
app.use(`/api/v1`, serviceRouter);
app.set('trust proxy', true);

//manejo de errores
app.use(errors);//  HERE:
app.use((req, res) => {
 // console.log( "error 404", req);
  response.error(req, res, "Service not found", 404);
});

//inicio del servidor
app.listen(config.port, () => {
    console.log("ApiGateWay escuchando en el puerto ", config.port);
  });



