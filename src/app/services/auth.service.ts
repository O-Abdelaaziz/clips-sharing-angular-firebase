import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import IUser from "../models/user";
import {delay, Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private COLLECTION_NAME: string = 'users';
  private usersCollection: AngularFirestoreCollection<IUser>;
  public isAuthenticated$: Observable<boolean>;
  public isAuthenticatedWithDelay$: Observable<boolean>;

  constructor(
    private _angularFireAuth: AngularFireAuth,
    private _angularFireStore: AngularFirestore,
  ) {
    this.usersCollection = this._angularFireStore.collection(this.COLLECTION_NAME);
    this.isAuthenticated$ = this._angularFireAuth.user.pipe(
      map(user => !!user)
    );
    this.isAuthenticatedWithDelay$ = this.isAuthenticated$.pipe(
      delay(1000)
    );
  }

  public async createUser(userData: IUser) {
    if (!userData.password) {
      throw new Error('password not provided!')
    }

    const userCredentials = await this._angularFireAuth
      .createUserWithEmailAndPassword(userData.email, userData.password);

    console.log(userCredentials);

    if (!userCredentials.user) {
      throw new Error("User can't be found");
    }

    await this.usersCollection.doc(userCredentials.user.uid).set({
      fullName: userData.fullName,
      email: userData.email,
      age: userData.age,
      phoneNumber: userData.phoneNumber
    });

    await userCredentials.user.updateProfile({
      displayName: userData.fullName
    });
  }
}

//Update FireBase Rules
// match /{document=**} {
//   allow read: if true;
//   allow write: if request.auth.uid != null;
//}
