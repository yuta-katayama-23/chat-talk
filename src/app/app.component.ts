import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList, SnapshotAction, snapshotChanges } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Post } from './class/post';
import { User } from './class/user';

const CURRENT_USER = new User('1', '田中 太郎');
const ANOTHER_USER = new User('2', '小平 花子');

@Component({
  selector: 'ct-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  posts$: Observable<Post[]>;
  postsRef: AngularFireList<Post>;
  currentUser = CURRENT_USER;
  message = '';
  item$: Observable<any>;

  constructor(private db: AngularFireDatabase) {
    this.item$ = db.object('/item').valueChanges();
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

  addPost(postMsg: string): void {
    if (postMsg) {
      this.postsRef.push(new Post({ user: this.currentUser, message: postMsg }));
      this.message = '';
    }
  }
}
