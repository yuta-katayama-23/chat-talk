import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'ct-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLogin: boolean;

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.auth.onAuthStateChanged(user => {
      if (user) { this.isLogin = true; }
      else { this.isLogin = false; }
    });
  }

  logout(): void {
    this.authService.logout()
      .then(() => this.router.navigateByUrl('/login'));
  }

}
