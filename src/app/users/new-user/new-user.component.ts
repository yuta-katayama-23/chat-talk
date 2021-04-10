import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../feature/services/user.service';

@Component({
  selector: 'ct-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  submit(form: NgForm): void {
    this.userService.update(form.value)
      .then(() => this.router.navigateByUrl('/'));
  }

}
