
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
app.options("*", (req, res) => {
  res.sendStatus(200);
});

//middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// ROUER
// ROUER
app.use("/api/vuelos",vuelos );

app.use(errors);

app.listen(config.port, () => {
  console.log("commit escuchando en el puerto ", config.port);
});


