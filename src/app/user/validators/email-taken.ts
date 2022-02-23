import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Inject, Injectable} from "@angular/core";
import {AbstractControl, AsyncValidator, ValidationErrors} from "@angular/forms";

@Injectable()
export class EmailTaken implements AsyncValidator {

  constructor(private _authService: AngularFireAuth) {

  }

  validate(control: AbstractControl): Promise<ValidationErrors | null> {
    this._authService.fetchSignInMethodsForEmail(control.value).then(
      (response) =>
        response.length ? {emailTaken: true} : null
    );
  }

}
