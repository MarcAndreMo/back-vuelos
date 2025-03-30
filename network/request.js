import config from "../config.js";
import fetch from "node-fetch";
import response from "./response.js";
import error from "../utils/error.js";
 
function request(req, res, next, url) {
  let configReq = {
    method: req.method,
  };

  if (req.method == "POST") {
    configReq["body"] = JSON.stringify(req.body);
    configReq["headers"] = { "Content-Type": "application/json" };
  }
  fetch(`${url}/${req.url}`, configReq)
    .then((data) => {
      return data.json();
    })
    .then((json) => {
      res.status(json.status || 200).json(json);
    })
    .catch(next);
}

export default {
  requestOld: requestOld,
  request: request,
};
