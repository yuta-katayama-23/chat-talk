import { Component, OnInit } from '@angular/core';
import { AngularFireList, AngularFireDatabase, SnapshotAction } from '@angular/fire/database';
import { User } from 'src/app/class/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ct-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  usersRef: AngularFireList<User>;
  users$: Observable<User[]>;

  constructor(private db: AngularFireDatabase) {
    this.usersRef = this.db.list('/users');
  }

  ngOnInit(): void {
    this.users$ = this.usersRef.snapshotChanges()
      .pipe(
        map((snapshots: SnapshotAction<User>[]) => {
          return snapshots.map(snapshot => {
            const value = snapshot.payload.val();
            return new User(value);
          });
        }));
  }

}
