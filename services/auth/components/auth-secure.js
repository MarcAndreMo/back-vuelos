//Dependencias
import passport from 'passport';
//Modulos
import localStrategy from '../strategy/local-strategy.js';
import jwtStrategy from '../strategy/jwt-strategy.js';
//Constantes
//Middlewares
export default function init(store){
    passport.use(localStrategy(store));
    passport.use(jwtStrategy);
}
