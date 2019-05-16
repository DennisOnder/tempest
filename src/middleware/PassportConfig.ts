// tslint:disable: variable-name
import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import config from "../config/config";
import { User } from "../models/user.model";
import { Application } from "express";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.SECRET_OR_KEY
};

class PassportConfig {
  public init(app: Application) {
    app.use(passport.initialize());
    passport.use(
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
  }
}

export default new PassportConfig();
