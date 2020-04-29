import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';
import { HttpService } from '../../shared-service/http.service';

export interface IUser {
  id?: number;
  email: string;
  password: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: IUser = { email: null, password: null };
  currentUser = {};
  loggedIn = false;
  constructor(
    private router: Router,
    private toastService: ToastService,
    private http: HttpService
  ) {
  }

  ngOnInit() {
    const token = localStorage.getItem('id_token');
    console.log('from login ngOnInit toekn: ', token);
    if(token != null) {
      this.loggedIn = true;
      this.router.navigate(['']);
    } else {
      this.loggedIn = false;
    }
  }



  async login(user: IUser) {
    // console.log('from login component login() ');
    // const payload = {
    //   email: 'jgguerrero@mail.fresnostate.edu',
    //   password: 'password123abc'
    // };
    // console.log('from login user: ', user);
    const resp: any = await this.http.post('user/login', user);
    // console.log('respo from login()', resp);
    if(resp && resp.token) {
      localStorage.setItem('id_token', resp.token);
      this.toastService.showToast('success', 3000, 'Login Successful');
      this.router.navigate(['']);
    } else {
      this.toastService.showToast('danger', 3000, 'Login Failed');

    }
  }


}
