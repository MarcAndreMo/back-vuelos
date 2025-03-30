
//const store = require('../../../store/mysql');
//import store from "../../../store/dbposgre.js";
//import cache from "../../../store/cache.js";
import store from "../../../store/dbmssql.js";

//import ctrl from "../controllers/caracteristicas-controller.js";
import ctrl from "./vuelos-controller.js";

export default ctrl(store('commits'));