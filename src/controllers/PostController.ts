import { Request, Response } from "express";
import IPostRequest from "../interfaces/IPostRequest";
import InputValidation from "../utils/InputValidation";
import { Post } from "../models/post.model";

class PostController {
  public async create(req: Request, res: Response) {
    try {
      const title = req.body.title;
      const post: IPostRequest = {
        user_id: req.user.id,
        title,
        handle: title
          .split(" ")
          .join("-")
          .toLowerCase(),
        body: req.body.body
      };
      const inputErrors = InputValidation.createPost(post);
      if (!inputErrors) {
        const newPost = await new Post(post);
        // tslint:disable-next-line: no-shadowed-variable
        newPost.save().then(post => res.status(200).json(post));
      } else {
        res.status(400).json(inputErrors);
      }
    } catch (err) {
      res.status(400).json(err);
    }
  }
}

export default new PostController();
