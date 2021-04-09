import { User } from './user';

export class Post {

  date: number;

  constructor(public user: User, public message: string) {
    this.date = Date.now();
  }
}
