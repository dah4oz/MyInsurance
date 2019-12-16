import { Component, OnInit } from '@angular/core';
import {Customer} from '../models/customer';
import {ApiService} from '../api.service';
import {currentUser} from '../global';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  customersList: Customer[];

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.apiService.getCustomers().subscribe((data) => {this.customersList = data; });
  }

  login() {
    console.log('Login: ', this.username);
    if (this.username && this.password) {
      for (const customer of this.customersList) {
        if (customer.name === this.username && customer.password === this.password) {
          currentUser.isLoggedIn = true;
          currentUser.username = customer.name;
          currentUser.password = customer.password;
          this.router.navigate(['/home']);
        }
      }
    }
  }

}
