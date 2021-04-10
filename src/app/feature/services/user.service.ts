import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { User } from 'src/app/class/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFireDatabase
  ) { }

  // FIXME firebase.auth.UserCredentialにすると、以下のエラーが出る
  // Namespace '"C:/Users/user/OneDrive/\u30C9\u30AD\u30E5\u30E1\u30F3\u30C8/chat-talk/node_modules/firebase/index"'
  // has no exported member 'auth'.
  create(email: string, password: string): Promise<any> {
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then(credential => {
        const { user } = credential;
        const actionCodeSettings = {
          url: `http://localhost:4200/?newAccount=true&email=${user.email}`
        };
        user.sendEmailVerification(actionCodeSettings);
        this.db.object(`/users/${user.uid}`).set(new User(user));
      });
  }

  update(values: { displayName?: string, photoURL?: string }): Promise<void> {
    return this.auth.currentUser
      .then(user => {
        if (user) {
          user.updateProfile(values)
            .then(() => this.db.object(`/users/${user.uid}`).update(values))
            .catch(error => console.error(error));
        }
      });
  }
}
