import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import IUser from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private COLLECTION_NAME: string = 'users';
  private usersCollection: AngularFirestoreCollection<IUser>;

  constructor(
    private _angularFireAuth: AngularFireAuth,
    private _angularFireStore: AngularFirestore,
  ) {
    this.usersCollection = this._angularFireStore.collection(this.COLLECTION_NAME);
  }

  public async createUser(userData: IUser) {
    if (!userData.password) {
      throw new Error('password not provided!')
    }

    const userCredentials = await this._angularFireAuth
      .createUserWithEmailAndPassword(userData.email, userData.password);

    console.log(userCredentials);

    await this.usersCollection
      .add({
        fullName: userData.fullName,
        email: userData.email,
        age: userData.age,
        phoneNumber: userData.phoneNumber
      });
  }
}
