import validator from "validator";
import IRegistrationRequest from "../interfaces/IRegistrationRequest";
import ILoginRequest from "../interfaces/ILoginRequest";
import IPostRequest from "../interfaces/IPostRequest";

class InputValidation {
  public register(data: IRegistrationRequest) {
    // tslint:disable-next-line
    let error: any = {};
    if (validator.isEmpty(data.email)) {
      error.emptyEmail = "An email address is required.";
    }
    if (validator.isEmpty(data.password)) {
      error.emptyPassword = "A password is required.";
    }
    if (!validator.isEmail(data.email)) {
      error.invalidEmail = "A valid email address is required.";
    }
    if (!validator.isLength(data.password, { min: 8, max: 24 })) {
      error.passwordLength =
        "Your password should be between 8 and 24 characters long.";
    }
    if (data.password !== data.confirmPassword) {
      error.passwordsNotMatching = "Your passwords are not matching.";
    }
    return this.checkForErrors(error);
  }
  public login(data: ILoginRequest) {
    // tslint:disable-next-line
    let error: any = {};
    if (validator.isEmpty(data.email)) {
      error.emptyEmail = "An email address is required.";
    }
    if (validator.isEmpty(data.password)) {
      error.emptyPassword = "A password is required.";
    }
    if (!validator.isEmail(data.email)) {
      error.invalidEmail = "A valid email address is required.";
    }
    return this.checkForErrors(error);
  }
  public createPost(data: IPostRequest) {
    // tslint:disable-next-line
    let error: any = {};
    if (validator.isEmpty(data.title)) {
      error.emptyTitle = "A title is required.";
    }
    if (validator.isEmpty(data.body)) {
      error.emptyPost = "Empty posts are not allowed.";
    }
    return this.checkForErrors(error);
  }
  private checkForErrors(errObject) {
    if (Object.keys(errObject).length > 0) {
      return errObject;
    } else {
      return false;
    }
  }
}

export default new InputValidation();
