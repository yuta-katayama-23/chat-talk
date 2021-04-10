import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'ct-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLogin: boolean;

  constructor(private auth: AngularFireAuth) { }

  ngOnInit(): void {
    this.auth.onAuthStateChanged(user => {
      if (user) { this.isLogin = true; }
      else { this.isLogin = false; }
      console.log(this.isLogin);
    });
  }

}
