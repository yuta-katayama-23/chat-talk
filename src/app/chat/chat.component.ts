import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList, SnapshotAction, snapshotChanges } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Post } from '../class/post';
import { User } from '../class/user';

const CURRENT_USER = new User('1', '田中 太郎');
const ANOTHER_USER = new User('2', '小平 花子');

@Component({
  selector: 'ct-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  posts$: Observable<Post[]>;
  postsRef: AngularFireList<Post>;

  currentUser = CURRENT_USER;
  message = '';

  constructor(private db: AngularFireDatabase) {
    this.postsRef = db.list('/posts');
    this.posts$ = this.postsRef.snapshotChanges()
      .pipe(
        map((snapshots: SnapshotAction<Post>[]) => {
          return snapshots.map(snapshot => {
            const value = snapshot.payload.val();
            return new Post({ key: snapshot.payload.key, ...value });
          });
        })
      );
  }

  ngOnInit(): void {
  }

  addPost(postMsg: string): void {
    if (postMsg) {
      this.postsRef.push(new Post({ user: this.currentUser, message: postMsg }));
    }
  }

  updatePost(post: Post): void {
    // 省略形として以下の書き方もある
    // const {key , message} = post;
    // this.postsRef.update(key, { message });

    this.postsRef.update(post.key, { message: post.message });
  }

  deletePost(post: Post): void {
    this.postsRef.remove(post.key);
  }

}
