import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  userModel = {
    email: '',
    password: '',
  };
  loginDone: boolean;
  serverError: boolean;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    if (this.userService.isLoggedIn())
      this.router.navigateByUrl('/userprofile');
  }

  onSubmit(form: NgForm) {
    this.serverError = false;

    this.userService.login(form.value).subscribe(
      (res) => {
        this.userService.setToken(res['token']);
        this.loginDone = true;
        this.router.navigateByUrl('/userprofile');
      },
      (err) => {
        this.serverError = true;
      }
    );
  }
}
