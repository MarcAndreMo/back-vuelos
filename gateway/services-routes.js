import response from "../network/response.js";
import services from "../services.js";
import { responseInterceptor, fixRequestBody } from "http-proxy-middleware";
import jwt from "jsonwebtoken";
//import store from "../store/dbmssql.js";

const ROUTES = [];

services.forEach((service) => {
  console.log( service);
  ROUTES.push({
    url: `/${service.name}`,
    auth: service.authenticate,
    proxy: {
      target: service.host,
      selfHandleResponse: true, // res.end() will be called internally by responseInterceptor()
      changeOrigin: true,
    //  pathRewrite,
      onError,
      onProxyReq: (proxyReq, req, res) => {
        console.log(`[PROXY-REQ] → ${req.method} ${req.originalUrl}`);
        fixRequestBody(proxyReq, req, res);
      },
      onProxyRes: responseInterceptor(async (responseBuffer, proxyRes, req, res) => {
        const responseText = responseBuffer.toString("utf8");
        console.log("[✅ INTERCEPTED RESPONSE]", responseText);
        return responseText;
      }),
      
     /*  onProxyRes: responseInterceptor(
        async (responseBuffer, proxyRes, req, res) => {
          console.log( "x");
          const response = responseBuffer.toString("utf8"); // convert buffer to string
        
           
          
          return response;
        }
      ), */
    },
  });
});
function pathRewrite(path, req) {
  const parts = path.split("/");
  if (parts.length >= 4) {
    // parts[3] es el nombre del servicio
    return `/api/${parts[3]}/${parts.slice(4).join("/")}`;
  }
  return path;
}

function onError(err, req, res, target) {
  let mensaje =
    err.code === "ECONNREFUSED"
      ? `No se pudo establecer una conexion con el servicio ${req.url
          .split("/")[2]
          .toUpperCase()} [${err}]`
      : err.message;
  response.error(req, res, mensaje, err.statusCode);
}
export default ROUTES;
