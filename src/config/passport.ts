import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import config from "./config";
import { User } from "../models/user.model";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secret: config.SECRET_OR_KEY
};

passport.use(
  // tslint:disable-next-line: variable-name
  new Strategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findOne({ where: { id: jwt_payload.id } });
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);
