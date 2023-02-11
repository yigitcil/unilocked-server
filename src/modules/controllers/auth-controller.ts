import { User } from "@models/user";
import BaseController from "@modules/controllers/base-controller";
import { Router } from "express";
import { Collection } from "mongodb";
import passport from "passport";
import bcrypt from "bcrypt";
import ensureAuthenticated from "@modules/middleware/ensure-authenticated";
import { tr } from "@modules/services/translator";
import gravatar from "gravatar";
import jsonError from "@modules/middleware/json-error";

export default class AuthController extends BaseController {
  private get users(): Collection {
    return this.db.collection("users");
  }

  listen(router: Router): void {
    router.get("/me", ensureAuthenticated, (req, res) => {
      res.send({ success: true, user: req.user });
    });

    router.post("/logout", (req, res) => {
      req.logOut((err) => {
        res.send({ success: !err, error: err });
      });
    });

    router.post(
      "/login",
      (req, res, next) => {
        passport.authenticate("local", (error, user, info) => {
          if (error || !user) {
            res.status(401).send({ success: false, error: info.message });
          } else {
            req.logIn(user, (err) => {
              if (err) {
                res.status(401).send({ success: false, error: err });
              } else {
                res.send({ success: true, user: user });
              }
            });
          }
        })(req, res, next);
      },
      jsonError
    );

    router.post("/register", (req, res, next) => {
      const { first_name, last_name, email, password, password2 } = req.body;
      let errors: { id: number; msg: string }[] = [];

      if (!first_name || !last_name || !email || !password || !password2) {
        errors.push({ id: 0, msg: tr("Please fill in all fields") });
      }
      //check if match
      if (password !== password2) {
        errors.push({ id: 1, msg: tr("passwords dont match") });
      }

      //check if password is more than 6 characters
      if (password.length < 6) {
        errors.push({ id: 2, msg: tr("password atleast 6 characters") });
      }
      if (errors.length > 0) {
        res.status(403).send({ errors: errors });
      } else {
        this.users.findOne({ email: email }).then((user) => {
          if (user) {
            errors.push({ id: 3, msg: tr("email already registered") });
            res.status(403).send({ errors: errors });
          } else {
            const avatar = gravatar.url(email);
            const newUser = {
              email,
              first_name,
              last_name,
              password,
              avatar,
            };
            bcrypt.genSalt(10, (err, salt) =>
              bcrypt.hash(newUser.password, salt, async (err, hash) => {
                if (err) throw err;

                newUser.password = hash;

                await this.users.insertOne(newUser);

                /*const { password, ...user } = await this.users.findOne({
                  email: email,
                });*/ // Parolayı gizleme

                res.send({
                  success: true,
                  needsEmailConfirmation: true,
                });
              })
            );
          }
        });
      }
    });
  }
}
