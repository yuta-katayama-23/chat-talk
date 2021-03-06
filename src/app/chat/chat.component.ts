import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList, SnapshotAction } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Post } from '../class/post';
import { User } from '../class/user';


@Component({
  selector: 'ct-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  posts$: Observable<Post[]>;
  postsRef: AngularFireList<Post>;

  currentUser: User;
  currentUser$: Observable<User>;
  message = '';

  loginValid: boolean;

  constructor(
    private db: AngularFireDatabase,
    private auth: AngularFireAuth
  ) {
    this.postsRef = db.list('/posts');
  }

  ngOnInit(): void {
    this.currentUser$ = this.auth.authState.pipe(
      map(user => {
        if (user) {
          // FIXME 非同期処理なので、this.currentUserにセットするのが、NewUserComponentのupdateの後とは限らず、
          // その場合、displayNameが空になってしまう
          // 今はaddPostで無理くり修正した
          this.currentUser = new User(user);
          this.loginValid = true;
          console.log(this.currentUser);
          return this.currentUser;
        }
        return null;
      })
    );

    this.posts$ = this.postsRef.snapshotChanges()
      .pipe(
        map((snapshots: SnapshotAction<Post>[]) => {
          return snapshots.map(snapshot => {
            const value = snapshot.payload.val();
            return new Post({ key: snapshot.payload.key, ...value });
          });
        })
      );

    setTimeout(() => {
      this.scrollBottom();
    }, 1500);
  }

  addPost(postMsg: string): void {
    if (postMsg) {
      if (!this.currentUser.displayName) {
        this.db.list<User>('/users').valueChanges()
          .pipe(
            map((users: User[]) => {
              const filtered = users.filter(user => user.uid === this.currentUser.uid);
              this.currentUser = new User(filtered[0]);
              this.postsRef.push(new Post({ user: this.currentUser, message: postMsg }));
            })
          ).subscribe();
      } else {
        this.postsRef.push(new Post({ user: this.currentUser, message: postMsg }))
          .then(() => {
            this.scrollBottom();
          });
      }
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

  private scrollBottom(): void {
    const obj = document.querySelector('.chat-line');
    obj.scrollTop = obj.scrollHeight;
  }
}
