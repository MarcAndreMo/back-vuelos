
//Dependencias
import express from "express";

//Modulos
import config from "./config.js";
import auth from "./components/auth-network.js";
import errors from "../../network/errors.js";
//Constantes
const app = express();
// Configurar cabeceras y cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUER
app.use(errors);//  HERE:
app.use("/api/auth", auth);

app.use(errors);

app.listen(config.port, () => {
  console.log("auth escuchando en el puerto ", config.port);
});
