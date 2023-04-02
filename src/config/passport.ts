import passport, { use } from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { UserController } from "../modules/controllers/user-controller";
import bcrypt from "bcrypt";
import { tr } from "../modules/services/translator";
import { User } from "@models/user";

export default class PassportConfig {
  public init() {
    const userController = new UserController();
    passport.use(
      new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
        //match user
        userController
          .byEmail(email)
          .select("+password")
          .then((user) => {
            if (!user) {
              return done(null, false, { message: tr("Email not registered") });
            }
            //math passwords
            bcrypt.compare(password, user.password, (err, isMatch) => {
              if (err) throw err;
              if (isMatch) {
                return done(null, user);
              } else {
                return done(null, false, { message: tr("Password incorrect") });
              }
            });
          })
          .catch((err) => {
            console.log(err);
          });
      })
    );
    passport.serializeUser(function (user: any, done) {
      done(null, user._id);
    });
    passport.deserializeUser(function (id: string, done) {
      userController
        .byId(id)
        .then((user) => {
          if (user) {
            delete user.password;
          }
          done(null, user);
        })
        .catch((err) => {
          done(err, null);
        });
       
        
    });
  }
}
