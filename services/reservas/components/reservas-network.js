//Dependencias
import express from "express";

//Modulos
import response from "../../../network/response.js";
import Controller from "./reservas-index.js";

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

router.get("/getReservas", function (req, res, next) {
  
    Controller.getReservas(req.body)
      .then((data) => {
        // Manejar la respuesta exitosa
        response.success(req, res, data, 200, data.message);
      })
      .catch(next);
 
});

router.post("/createReserva", function (req, res, next) {
        Controller.createReserva(req.body)
        .then((data) => {
        // Manejar la respuesta exitosa
        response.success(req, res, data, 200, data.message);
        })
        .catch(next);
});

router.delete("/deleteReserva/:id", function (req, res, next) {
   
    const { id } = req.params; 
        Controller.deleteReservas(id)
        .then((data) => {
        // Manejar la respuesta exitosa
        response.success(req, res, data, 200, 'Reserva eliminada con éxito');
        })
        .catch(next);
});



export default router;
