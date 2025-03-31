import response from "../network/response.js";
import services from "../services.js";
import { responseInterceptor, fixRequestBody } from "http-proxy-middleware";
 

const ROUTES = [];

services.forEach((service) => {
  ROUTES.push({
    url: `/${service.name}`,
    auth: service.authenticate,
    proxy: {
      target: service.host,
      selfHandleResponse: true, // res.end() will be called internally by responseInterceptor()
      changeOrigin: true,
      pathRewrite,
      onError,
      onProxyReq: fixRequestBody,
      onProxyRes: responseInterceptor(
        async (responseBuffer, proxyRes, req, res) => {
          const response = responseBuffer.toString("utf8"); // convert buffer to string
           
          return response;
        }
      ),
    },
  });
});

function pathRewrite(path, req) {
  const arr = path.split("/");
  arr.splice(2, 1);
  return arr.join("/");
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
