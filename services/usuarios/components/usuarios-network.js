//Dependencias
import express from "express";

//Modulos
import response from "../../../network/response.js";
import Controller from "./usuarios-index.js";

//Constantes
const router = express.Router();

//middlewares
 

// insertar un commit
// router.post("/insertarCommit/", function (req, res, next) {
//   const { author, message, repository, branch, commitHash, date_record } = req.body;

//   Controller.insertarCommit(author, message, repository, branch, commitHash, date_record)
//     .then((data) => {
//       response.success(req, res, data, 200, data.message);
//     })
//     .catch(next);
// });

router.get("/reservaUsuario/:id/reserva", function(req, res, next) {
  const { id } = req.params; 
  Controller.reservaUsuario(id)
    .then((data) => {
      // Manejar la respuesta exitosa
      response.success(req, res, data, 200, data.message);
    })
    .catch(next);
});



export default router;
