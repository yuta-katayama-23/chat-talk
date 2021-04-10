import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../feature/services/user.service';

@Component({
  selector: 'ct-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  signup(form: NgForm): void {
    console.log(form.value);
    const { email, password } = form.value;

    this.userService.create(email, password)
      .then(() => this.router.navigateByUrl('/users/new'))
      .catch((error) => console.log(error, error));
  }

}
