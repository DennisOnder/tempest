import { Request, Response } from "express";
import IPostRequest from "../interfaces/IPostRequest";
import InputValidation from "../utils/InputValidation";
import { Post } from "../models/post.model";

class PostController {
  public async create(req: Request, res: Response) {
    try {
      const post: IPostRequest = {
        user_id: req.user.id,
        title: req.body.title,
        handle: req.body.title
          .split(" ")
          .join("-")
          .toLowerCase(),
        body: req.body.body
      };
      const inputErrors = InputValidation.post(post);
      if (!inputErrors) {
        const newPost = await new Post(post);
        // tslint:disable-next-line: no-shadowed-variable
        newPost.save().then(post => res.status(200).json(post));
        console.log(`Post ${post.handle} has been created.`);
      } else {
        res.status(400).json(inputErrors);
      }
    } catch (err) {
      res.status(400).json(err);
    }
  }
  public async get(req: Request, res: Response) {
    try {
      const handle = req.params.handle;
      const post = await Post.findOne({ where: { handle } });
      res.status(200).json(post);
    } catch (err) {
      res.status(400).json(err);
    }
  }
  public async edit(req: Request, res: Response) {
    try {
      // tslint:disable-next-line: variable-name
      const user_id = req.user.id;
      const handle = req.params.handle;
      const post: IPostRequest = {
        user_id: req.user.id,
        title: req.body.title,
        handle: req.body.title
          .split(" ")
          .join("-")
          .toLowerCase(),
        body: req.body.body
      };
      const inputErrors = InputValidation.post(post);
      if (!inputErrors) {
        // tslint:disable-next-line: no-shadowed-variable
        const post = await Post.findOne({ where: { user_id, handle } });
        if (post) {
          post
            .update({
              title: req.body.title,
              handle: req.body.title
                .split(" ")
                .join("-")
                .toLowerCase(),
              body: req.body.body
            })
            // tslint:disable-next-line: no-shadowed-variable
            .then(post => res.status(200).json(post));
          console.log(
            `Post ${handle} has been updated. New handle: ${post.handle}.`
          );
        } else {
          res.status(404).json({ error: "Post not found." });
        }
      } else {
        res.status(400).json(inputErrors);
      }
    } catch (error) {
      res.status(400).json(error);
    }
  }
  public async delete(req: Request, res: Response) {
    // tslint:disable-next-line: variable-name
    const user_id = req.user.id;
    const handle = req.params.handle;
    const post = await Post.findOne({ where: { user_id, handle } });
    if (post) {
      post
        .destroy()
        .then(() =>
          res.status(200).json({ success: true, timestamp: Date.now() })
        );
      console.log(`Post ${post.handle} has been removed.`);
    } else {
      res.status(404).json({ error: "Post not found." });
    }
  }
}

export default new PostController();
