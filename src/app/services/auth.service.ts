import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import IUser from "../models/user";
import {Observable, of} from "rxjs";
import {map, delay, filter, switchMap} from "rxjs/operators";
import {ActivatedRoute, Router, NavigationEnd} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private COLLECTION_NAME: string = 'users';
  private usersCollection: AngularFirestoreCollection<IUser>;
  public isAuthenticated$: Observable<boolean>;
  public isAuthenticatedWithDelay$: Observable<boolean>;
  private redirect: boolean = false;

  constructor(
    private _angularFireAuth: AngularFireAuth,
    private _angularFireStore: AngularFirestore,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
  ) {
    this.usersCollection = this._angularFireStore.collection(this.COLLECTION_NAME);
    this.isAuthenticated$ = this._angularFireAuth.user.pipe(
      map(user => !!user)
    );
    this.isAuthenticatedWithDelay$ = this.isAuthenticated$.pipe(
      delay(1000)
    );
    this._router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(e => this._activatedRoute.firstChild),
      switchMap(activatedRoute => activatedRoute?.data ?? of({}))
    ).subscribe(
      data => {
      this.redirect = data['authOnly'] ?? false
    }
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

  public async onLogout($event?: Event) {
    if ($event) {
      $event.preventDefault();
    }
    await this._angularFireAuth.signOut();
    if (this.redirect) {
      await this._router.navigateByUrl("/");
    }
  }
}

//Update FireBase Rules
// match /{document=**} {
//   allow read: if true;
//   allow write: if request.auth.uid != null;
//}
