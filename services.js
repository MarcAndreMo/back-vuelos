export default [
   
    {
      name: "auth", //Nombre del servicio. https://192.168.1.2:3000/api/{nombre}
      host: "http://localhost:3032", // Ip o Dominio donde esta ubicado. https://192.168.1.2:3000 | https://192.168.1.2 | https://api.com
      authenticate: false, //Si requiere token para realizar la peticion.
    },
    {
      name: "vuelos", //Nombre del servicio. https://192.168.1.2:3000/api/{nombre}
      host: "http://localhost:3033", // Ip o Dominio donde esta ubicado. https://192.168.1.2:3000 | https://192.168.1.2 | https://api.com
      authenticate: true, //Si requiere token para realizar la peticion.
    },
    {
      name: "reservas", //Nombre del servicio. https://192.168.1.2:3000/api/{nombre}
      host: "http://localhost:3034", // Ip o Dominio donde esta ubicado. https://192.168.1.2:3000 | https://192.168.1.2 | https://api.com
      authenticate: true, //Si requiere token para realizar la peticion.
    },
    {
      name: "usuarios", //Nombre del servicio. https://192.168.1.2:3000/api/{nombre}
      host: "http://localhost:3035", // Ip o Dominio donde esta ubicado. https://192.168.1.2:3000 | https://192.168.1.2 | https://api.com
      authenticate: true, //Si requiere token para realizar la peticion.
    },
    
    
  ];
  