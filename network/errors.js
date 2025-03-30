import response from "./response.js";
import fetch from "node-fetch";
import dotenv from "dotenv";
import lang from "../utils/lang/lang.js";
dotenv.config();

async function errors(err, req, res, next) {
  if (process.env.fullLog == "false") {
    console.error("[error]", err.message);
  } else {
    console.error("[error]", err);
  }
  let message = err.message || "Error interno";
  const status = err.statusCode || 500;
  if (err?.original?.code && lang.database[err?.original?.code])
    message = lang.database[err?.original?.code];
  response.error(req, res, message, status);
}

export default errors;
