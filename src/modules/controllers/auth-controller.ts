import { User } from "@models/user";
import BaseController from "@modules/controllers/base-controller";
import { Router } from "express";
import { Collection } from "mongodb";
import passport from "passport";
import bcrypt from "bcrypt";
import ensureAuthenticated from "@modules/middleware/ensure-authenticated";
import { tr } from "@modules/services/translator";

export default class AuthController extends BaseController {
  private get users(): Collection {
    return this.db.collection("users");
  }

  listen(router: Router): void {
    router.post("/me",ensureAuthenticated, (req, res) => {
      res.send({ user: req.user });
    });

    router.post("/logout", (req, res) => {
      req.logOut((err) => {
        res.send({ success: !err, error: err });
      });
    });

    router.post("/login", (req, res, next) => {
      passport.authenticate("local", {
        successRedirect: "/api/auth/me",
      })(req, res, next);
    });

    router.post("/register", (req, res) => {
      const { first_name, last_name, email, password, password2 } = req.body;
      let errors: { id: number; msg: string }[] = [];

      if (!first_name || !last_name || !email || !password || !password2) {
        errors.push({ id: 0, msg: tr("Please fill in all fields") });
      }
      //check if match
      if (password !== password2) {
        errors.push({ id: 1, msg: tr( "passwords dont match") });
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
            const newUser = {
              first_name,
              last_name,
              password,
            };
            bcrypt.genSalt(10, (err, salt) =>
              bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;

                newUser.password = hash;

                this.users.insertOne(newUser);

                res.redirect("/api/auth/me");
              })
            );
          }
        });
      }
    });
  }
}
