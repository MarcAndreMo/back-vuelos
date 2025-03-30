
//const store = require('../../../store/mysql');
//import store from "../../../store/dbposgre.js";
//import cache from "../../../store/cache.js";
import store from "../../../store/dbmssql.js";

//import ctrl from "../controllers/caracteristicas-controller.js";
import ctrl from "./auth-controller.js";
import strategiesInit from "./auth-secure.js";
const myStore = store()
strategiesInit(myStore);  
export default ctrl(store());