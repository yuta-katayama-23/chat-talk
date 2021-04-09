export class User {

  initial: string;
  constructor(public uid: string, public name: string) {
    this.initial = name.slice(0, 1);
  }
}
