import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../feature/services/auth.service';

@Component({
  selector: 'ct-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  signup(form: NgForm): void {
    console.log(form.value);
    const { email, password } = form.value;

    this.authService.create(email, password)
      .then(() => this.router.navigateByUrl('/'))
      .catch((error) => console.log(error, error));
  }

}
