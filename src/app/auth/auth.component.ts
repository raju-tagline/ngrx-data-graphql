import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  title = 'ngrx-data';
  public loginForm!: FormGroup;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.createForm();
  }

  /**
   * createForm
   */
  public createForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  /**
   * onSubmit
   */
  public onSubmit() {
    if (!this.loginForm.valid) {
      return;
    } else {
      const data = {
        ...this.loginForm.value,
      };
      this.authService.userLogin(data).subscribe(
        (res: any) => {
          if (res && res.statusCode === 200 && res.data.role === 'teacher') {
            localStorage.setItem('userData', JSON.stringify(res.data));
            this.router.navigate(['dashboard']);
          }
          if (res && res.statusCode === 200 && res.data.role === 'student') {
            localStorage.setItem('userData', JSON.stringify(res.data));
            this.router.navigate(['dashboard']);
          }
        },
        (err) => {
          console.log('LOGIN ::::>> ', err);
        }
      );
    }
  }
}
