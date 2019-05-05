import validator from "validator";
import IRegistrationRequest from "../interfaces/IRegistrationRequest";
import ILoginRequest from "../interfaces/ILoginRequest";
import IPostRequest from "../interfaces/IPostRequest";
import IProfileRequest from "../interfaces/IProfileRequest";

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
  public post(data: IPostRequest) {
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
  public profile(data: IProfileRequest) {
    // tslint:disable-next-line
    let error: any = {};
    if (validator.isEmpty(data.firstName)) {
      error.firstNameEmpty = "Your first name is required.";
    }
    if (validator.isEmpty(data.lastName)) {
      error.lastNameEmpty = "Your last name is required.";
    }
    if (validator.isLength(data.firstName, { min: 3, max: 20 })) {
      error.firstNameLength =
        "Your first name should be more than 3 characters long.";
    }
    if (validator.isLength(data.lastName, { min: 3, max: 20 })) {
      error.lastNameLength =
        "Your last name should be more than 3 characters long.";
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
