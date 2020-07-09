import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  constructor(public userService: UserService, private router: Router) {}
  registerDone: boolean;
  serverError: boolean;
  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.userService.createUser(form.value).subscribe(
      (data) => {
        this.registerDone = true;
        setTimeout(() => (this.registerDone = false), 4000);
        this.router.navigate(['']);
      },
      (err) => {
        this.serverError = true;
        setTimeout(() => (this.serverError = false), 4000);
        this.router.navigate(['']);
      }
    );
  }
}
