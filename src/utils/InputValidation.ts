import validator from "validator";
import IRegistrationRequest from "../interfaces/IRegistrationRequest";

class InputValidation {
  public register(data: IRegistrationRequest) {
    // tslint:disable-next-line
    let errors: any = {};
    if (validator.isEmpty(data.email)) {
      errors.emptyEmail = "An email address is required.";
    }
    if (validator.isEmpty(data.password)) {
      errors.emptyPassword = "A password is required.";
    }
    if (!validator.isEmail(data.email)) {
      errors.invalidEmail = "A valid email address is required.";
    }
    if (!validator.isLength(data.password, { min: 8, max: 24 })) {
      errors.passwordLength =
        "Your password should be between 8 and 24 characters long.";
    }
    if (data.password !== data.confirmPassword) {
      errors.passwordsNotMatching = "Your passwords are not matching.";
    }
    if (Object.keys(errors).length > 0) {
      return errors;
    } else {
      return false;
    }
  }
}

export default new InputValidation();
