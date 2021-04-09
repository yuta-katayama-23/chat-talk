import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';

import { Post } from './class/post';
import { User } from './class/user';

const CURRENT_USER = new User('1', '田中 太郎');
const ANOTHER_USER = new User('2', '小平 花子');

const POSTS: Post[] = [
  new Post(ANOTHER_USER, 'お疲れ様です。'),
  new Post(ANOTHER_USER, 'この前の件ですがどうなりましたか？'),
  new Post(CURRENT_USER, 'お疲れ様です。'),
  new Post(CURRENT_USER, 'クライアントからOK出ました！'),
];

@Component({
  selector: 'ct-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // posts = POSTS;
  posts$: Observable<Post[]>;
  postsRef: AngularFireList<Post>;
  currentUser = CURRENT_USER;
  message = '';
  item$: Observable<any>;

  constructor(private db: AngularFireDatabase) {
    this.item$ = db.object('/item').valueChanges();
    this.postsRef = db.list('/posts');
    this.posts$ = this.postsRef.valueChanges();
  }

  addPost(message: string): void {
    if (message) {
      this.postsRef.push(new Post(this.currentUser, message));
      this.message = '';
    }
  }
}
