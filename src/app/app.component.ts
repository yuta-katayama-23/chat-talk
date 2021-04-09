import { Component } from '@angular/core';

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
  posts = POSTS;
  currentUser = CURRENT_USER;
  message = '';

  addPost(message: string): void {
    if (message) {
      this.posts.push(new Post(this.currentUser, message));
    }
  }
}
