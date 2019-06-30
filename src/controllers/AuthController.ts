// tslint:disable: no-shadowed-variable
import { Request, Response } from "express";
import IRegistrationRequest from "../interfaces/IRegistrationRequest";
import ILoginRequest from "../interfaces/ILoginRequest";
import InputValidation from "../utils/InputValidation";
import bcrypt from "bcryptjs";
import { User } from "../models/user.model";
import jsonwebtoken from "jsonwebtoken";
import config from "../config/config";

class AuthController {
  public register(req: Request, res: Response) {
    const data: IRegistrationRequest = {
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword
    };
    const inputErrors = InputValidation.register(data);
    if (!inputErrors) {
      User.findOne({
        where: { email: data.email }
      })
        .then(user => {
          if (user) {
            res.status(401).send("User already exists");
          } else {
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(data.password, salt, (err, hash) => {
                const newUser = new User({
                  email: data.email,
                  password: hash
                });
                newUser
                  .save()
                  .then(user => res.json(user))
                  .catch(err => console.error(err));
                console.log(`User ${data.email} just registered.`);
              });
            });
          }
        })
        .catch(err => console.error(err));
    } else {
      res.status(400).json(inputErrors);
    }
  }
  public async login(req: Request, res: Response) {
    try {
      const data: ILoginRequest = {
        email: req.body.email,
        password: req.body.password
      };
      const inputErrors = await InputValidation.login(data);
      if (!inputErrors) {
        const user = await User.findOne({ where: { email: data.email } });
        if (user) {
          bcrypt.compare(data.password, user.password, (err, match) => {
            if (match) {
              const payload = {
                id: user.id,
                email: user.email
              };
              jsonwebtoken.sign(
                payload,
                config.SECRET_OR_KEY,
                { expiresIn: "24h" },
                (err, token) => {
                  return res
                    .status(200)
                    .json({ success: true, token: `Bearer ${token}` });
                }
              );
            }
          });
        } else {
          return res.status(400).json({ error: "No user has been found." });
        }
      } else {
        return res.status(400).json(inputErrors);
      }
    } catch (err) {
      return res.status(400).json(err);
    }
  }
  public async current(req: Request, res: Response) {
    try {
      const payload = {
        id: req.user.id,
        email: req.user.email,
        createdAt: req.user.createdAt,
        updatedAt: req.user.updatedAt
      };
      res.status(200).json(payload);
    } catch (err) {
      console.error(err);
    }
  }
}

export default new AuthController();
