
//Dependencias
import express from "express";
import cors from "cors";


//Modulos
import config from "./config.js";
import vuelos from "./components/vuelos-network.js";
import errors from "../../network/errors.js";
///import commitController from "./components/commit-controller.js";
//Constantes

const app = express();

// Configurar cabeceras y cors

app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Configurar cabeceras y cors
app.use((req, res, next) => {
res.header('Access-Control-Allow-Origin', '*');
//res.header('Access-Control-Allow-Origin: http://localhost:4200');
res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method'); 
res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
next();
});

//middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// ROUER
app.use((req, res, next) => {
  console.log(`[MICRO VUELOS] ${req.method} ${req.originalUrl}`);
  next();
});

app.use(errors);

app.listen(config.port, () => {
  console.log("commit escuchando en el puerto ", config.port);
});


