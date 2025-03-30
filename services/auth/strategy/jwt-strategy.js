import { Strategy, ExtractJwt } from 'passport-jwt';
import dotenv from "dotenv";
dotenv.config();

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.KEY_TOKEN,
  };
const strategy = new Strategy(options, (payload, done) => {
    if (payload && payload.id) {
      const expire = payload.exp;
      const now = Date.now() / 1000;
      if (expire < now) {
        done(null, false);
      } else {
        done(null, payload);
      }
    }else{
      done(null, false);
    }
  }
  );

export default strategy;
  