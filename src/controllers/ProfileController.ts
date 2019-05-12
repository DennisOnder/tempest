import { Request, Response } from "express";
import IProfileRequest from "../interfaces/IProfileRequest";
import InputValidation from "../utils/InputValidation";
import { Profile } from "../models/profile.model";

class ProfileController {
  public async create(req: Request, res: Response) {
    try {
      const profileExists = await Profile.findOne({
        where: { user_id: req.user.id }
      });
      if (profileExists) {
        res.status(404).json({ error: "You already have a profile." });
      } else {
        const handle = req.body.handle
          ? req.body.handle
          : `${req.body.firstName.toLowerCase()}-${req.body.lastName.toLowerCase()}-${Math.floor(
              Math.random() * 10
            )}${Math.floor(Math.random() * 10)}${Math.floor(
              Math.random() * 10
            )}`;
        const profile: IProfileRequest = {
          user_id: req.user.id,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          biography: req.body.biography,
          handle
        };
        const inputErrors = await InputValidation.profile(profile);
        if (inputErrors) {
          res.status(400).json(inputErrors);
        } else {
          const newProfile = await new Profile(profile);
          // tslint:disable-next-line: no-shadowed-variable
          newProfile.save().then(profile => res.status(200).json(profile));
          console.log(`Profile ${profile.handle} has been created.`);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
  public async getProfile(req: Request, res: Response) {
    const profile = await Profile.findOne({
      where: { handle: req.params.handle }
    });
    if (profile) {
      res.status(200).json(profile);
    } else {
      res.status(400).json({ error: "Profile not found." });
    }
  }
  public async editProfile(req: Request, res: Response) {
    const profile = await Profile.findOne({
      where: { user_id: req.user.id }
    });
    if (profile) {
      const handle = req.body.handle
        ? req.body.handle
        : `${req.body.firstName.toLowerCase()}-${req.body.lastName.toLowerCase()}-${Math.floor(
            Math.random() * 10
          )}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`;
      const editedProfile: IProfileRequest = {
        user_id: req.user.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        biography: req.body.biography,
        handle
      };
      const inputErrors = await InputValidation.profile(editedProfile);
      if (inputErrors) {
        res.status(400).json(inputErrors);
      } else {
        await profile.update(editedProfile);
        console.log(`Profile ${profile.handle} has been created.`);
      }
    } else {
      res.status(404).json({ error: "Profile not found." });
    }
  }
  public async deleteProfile(req: Request, res: Response) {
    const profile = await Profile.findOne({ where: { user_id: req.user.id } });
    if (profile) {
      await profile.destroy();
      console.log(`Profile ${profile.handle} has been deleted.`);
      res.status(200).json({ success: true, timestamp: Date.now() });
    } else {
      res.status(404).json({ error: "Profile not found." });
    }
  }
}

export default new ProfileController();
