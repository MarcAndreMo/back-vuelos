
import { createProxyMiddleware } from "http-proxy-middleware";
import fetch from "node-fetch";
import services from "../services.js";

const setupProxies = (app, routes) => {
  routes.forEach((r) => {
    app.use(r.url, createProxyMiddleware(r.proxy));
  });
};
const setupAuth = (app, routes) => {
  routes.forEach((r) => {
    app.use(r.url, async (req, res, next) => {
      // r.url = "/auth"
      // recorrer services and find the service that match with the url
      const service = services.find((s) => s.name === r.url.replace("/", ""));
      if (!service) {
        res.status(404).json({
          error: "No encontrado",
          message: "El servicio no existe",
        });
        return;
      }
      if (!service.authenticate) {
        next();
        return;
      }
      const token = req.headers["authorization"];
      if (!token) {
        res.status(401).json({
          error: "No autorizado",
          message: "No se ha enviado el token de autorización",
        });
        return;
      }
   
      const response = await fetch(`http://localhost:3032/api/auth/verify_token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        body: JSON.stringify({}),
      });
       
      if (response.status !== 200) {
        res.status(401).json({
          error: "No autorizado",
          message: "El token de autorización es inválido",
        });
        return;
      }
      next();
    });
  });
};





export { setupProxies, setupAuth };

