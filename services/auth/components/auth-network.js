//Dependencias
import express from "express";

//Modulos
import response from "../../../network/response.js";
import Controller from "./auth-index.js";
import passport from "passport";

//Constantes
const router = express.Router();

//middlewares

router.post("/login",
  passport.authenticate("local", { session: false }),
  function (req, res, next) {
    Controller.login(req.user)
      .then((data) => {
        response.success(req, res, data, 200, data.message);
      })
      .catch(next);
  }
);
 




router.post("/verify_token", 
  function (req, res, next) {
    Controller.verify(req,res)
      .then((data) => {
        response.success(req, res, data, 200, data.message);
      })
      .catch(next);
  }
);

 
export default router;
