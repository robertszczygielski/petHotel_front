import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { HomeService } from "../home.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-home-login',
  templateUrl: './home-login.component.html',
  styleUrls: ['./home-login.component.css'],
  providers: [HomeService]
})
export class HomeLoginComponent implements OnInit {

  protected loginForm: FormGroup;
  private loading: boolean = false;
  private error: string = '';

  constructor(private router: Router,
              private homeService: HomeService) { }

  ngOnInit() {
    this.loginForm = this.prepareLoginForm();

    this.homeService.logout();
  }

  login() {
    this.loading = true;
    this.homeService.login(this.loginForm.controls['username'].value,
      this.loginForm.controls['password'].value,
    )
      .subscribe(result => {
        if (result === true) {
          this.router.navigate(['/']);
        } else {
          this.error = 'Username or password is incorrect';
          this.loading = false;
        }
      }, error => {
        this.loading = false;
        this.error = error;
      });
  }

  logout() {
    this.loading = false;
    this.homeService.logout();
  }

  isLogged(): boolean {
    return this.loading;
  }

  private prepareLoginForm(): FormGroup {
    return new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }
}
