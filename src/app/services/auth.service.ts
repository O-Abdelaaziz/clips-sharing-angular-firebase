import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _angularFireAuth: AngularFireAuth,
    private _angularFireStore: AngularFirestore,
  ) {
  }

  public async createUser(userData : any) {

    const userCredentials = await this._angularFireAuth
      .createUserWithEmailAndPassword(userData.email, userData.password);

    console.log(userCredentials);

    await this._angularFireStore
      .collection('users')
      .add({
        fullName: userData.fullName,
        email: userData.email,
        age: userData.age,
        phoneNumber: userData.phoneNumber
      });
  }
}
