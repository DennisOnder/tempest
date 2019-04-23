import { Request, Response } from "express";
import IRegistrationRequest from "../interfaces/IRegistrationRequest";
import InputValidation from "../utils/InputValidation";
import bcrypt from "bcrypt";
import { User } from "../models/user.model";

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
              });
            });
          }
        })
        .catch(err => console.error(err));
    } else {
      res.status(400).json(inputErrors);
    }
  }
}

export default new AuthController();
