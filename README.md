"# back-vuelos" 

//servicio principal 
nodemon .\index.js

//servicio reservas
nodemon .\services\reservas\reservas.js
//servicio vuelos
nodemon .\services\vuelos\vuelos.js
//servicio usuarios
nodemon .\services\usuarios\usuarios.js
//servicio autenticacion
nodemon .\services\auth\auth.js

//claves globales en el .env