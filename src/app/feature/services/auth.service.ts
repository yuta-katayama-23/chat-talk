import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) { }

  login(email: string, password: string): Promise<any | void> {
    return this.auth.signInWithEmailAndPassword(email, password)
      .catch(error => console.error(error));
  }

  logout(): Promise<void> {
    return this.auth.signOut();
  }
}
