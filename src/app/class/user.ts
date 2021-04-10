export class User {
  displayName: string;
  email: string;
  photoURL: string;
  uid: string;
  initial: string;

  constructor(user) {
    this.displayName = user.displayName;
    this.email = user.email;
    this.photoURL = user.photoURL ? user.photoURL : null;
    this.uid = user.uid;
    this.initial = user.displayName ? user.displayName.slice(0, 1) : null;
  }
}
